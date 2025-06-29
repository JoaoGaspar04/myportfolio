import { useState, useCallback, useEffect } from 'react';
import { SecurityUtils } from '../utils/security';

interface FormField {
  value: string;
  error: string;
  touched: boolean;
  dirty: boolean;
}

interface ValidationRules {
  required?: boolean;
  email?: boolean;
  phone?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
  asyncValidation?: (value: string) => Promise<string | null>;
}

interface FormOptions {
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  sanitizeOnChange?: boolean;
  debounceMs?: number;
}

export const useSecureForm = <T extends Record<string, any>>(
  initialValues: T,
  validationRules: Partial<Record<keyof T, ValidationRules>> = {},
  options: FormOptions = {}
) => {
  const {
    validateOnChange = true,
    validateOnBlur = true,
    sanitizeOnChange = true,
    debounceMs = 300
  } = options;

  const [fields, setFields] = useState<Record<keyof T, FormField>>(() => {
    const initialFields = {} as Record<keyof T, FormField>;
    Object.keys(initialValues).forEach(key => {
      initialFields[key as keyof T] = {
        value: initialValues[key as keyof T] || '',
        error: '',
        touched: false,
        dirty: false
      };
    });
    return initialFields;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);
  const [isValidating, setIsValidating] = useState(false);

  // Debounced validation
  const [validationTimeouts, setValidationTimeouts] = useState<Record<string, NodeJS.Timeout>>({});

  const validateField = useCallback(async (name: keyof T, value: string): Promise<string> => {
    const rules = validationRules[name];
    if (!rules) return '';

    // Sanitize input if enabled
    const sanitizedValue = sanitizeOnChange ? SecurityUtils.sanitizeInput(value) : value;

    // Required validation
    if (rules.required && !sanitizedValue.trim()) {
      return 'Este campo é obrigatório';
    }

    // Skip other validations if field is empty and not required
    if (!sanitizedValue.trim() && !rules.required) {
      return '';
    }

    // Email validation
    if (rules.email && !SecurityUtils.validateEmail(sanitizedValue)) {
      return 'Email inválido ou de domínio suspeito';
    }

    // Phone validation
    if (rules.phone && !SecurityUtils.validatePhone(sanitizedValue)) {
      return 'Número de telefone inválido';
    }

    // Length validations
    if (rules.minLength && sanitizedValue.length < rules.minLength) {
      return `Mínimo ${rules.minLength} caracteres`;
    }

    if (rules.maxLength && sanitizedValue.length > rules.maxLength) {
      return `Máximo ${rules.maxLength} caracteres`;
    }

    // Pattern validation
    if (rules.pattern && !rules.pattern.test(sanitizedValue)) {
      return 'Formato inválido';
    }

    // Malicious content detection
    if (SecurityUtils.detectMaliciousContent(sanitizedValue)) {
      return 'Conteúdo não permitido detectado';
    }

    // Custom validation
    if (rules.custom) {
      const customError = rules.custom(sanitizedValue);
      if (customError) return customError;
    }

    // Async validation
    if (rules.asyncValidation) {
      try {
        const asyncError = await rules.asyncValidation(sanitizedValue);
        if (asyncError) return asyncError;
      } catch (error) {
        return 'Erro na validação';
      }
    }

    return '';
  }, [validationRules, sanitizeOnChange]);

  const setFieldValue = useCallback((name: keyof T, value: string) => {
    const sanitizedValue = sanitizeOnChange ? SecurityUtils.sanitizeInput(value) : value;

    setFields(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        value: sanitizedValue,
        dirty: true
      }
    }));

    // Debounced validation
    if (validateOnChange) {
      // Clear existing timeout
      if (validationTimeouts[name as string]) {
        clearTimeout(validationTimeouts[name as string]);
      }

      // Set new timeout
      const timeout = setTimeout(async () => {
        setIsValidating(true);
        const error = await validateField(name, sanitizedValue);
        
        setFields(prev => ({
          ...prev,
          [name]: {
            ...prev[name],
            error
          }
        }));
        
        setIsValidating(false);
      }, debounceMs);

      setValidationTimeouts(prev => ({
        ...prev,
        [name as string]: timeout
      }));
    }
  }, [validateField, validateOnChange, sanitizeOnChange, debounceMs, validationTimeouts]);

  const setFieldTouched = useCallback(async (name: keyof T) => {
    setFields(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        touched: true
      }
    }));

    if (validateOnBlur) {
      setIsValidating(true);
      const error = await validateField(name, fields[name].value);
      
      setFields(prev => ({
        ...prev,
        [name]: {
          ...prev[name],
          error
        }
      }));
      
      setIsValidating(false);
    }
  }, [validateField, validateOnBlur, fields]);

  const validateForm = useCallback(async (): Promise<boolean> => {
    setIsValidating(true);
    let isValid = true;
    const newFields = { ...fields };

    // Validate all fields
    const validationPromises = Object.keys(fields).map(async (key) => {
      const fieldKey = key as keyof T;
      const error = await validateField(fieldKey, fields[fieldKey].value);
      newFields[fieldKey] = {
        ...newFields[fieldKey],
        error,
        touched: true
      };
      if (error) isValid = false;
    });

    await Promise.all(validationPromises);
    setFields(newFields);
    setIsValidating(false);
    
    return isValid;
  }, [fields, validateField]);

  const handleSubmit = useCallback(async (
    onSubmit: (values: T) => Promise<void> | void,
    identifier: string = 'form'
  ) => {
    // Rate limiting
    if (!SecurityUtils.checkRateLimit(identifier, 3, 60000)) {
      throw new Error('Muitas tentativas. Tente novamente em 1 minuto.');
    }

    setSubmitCount(prev => prev + 1);
    
    const isValid = await validateForm();
    if (!isValid) {
      throw new Error('Por favor, corrija os erros no formulário');
    }

    setIsSubmitting(true);

    try {
      const values = {} as T;
      Object.keys(fields).forEach(key => {
        const fieldKey = key as keyof T;
        values[fieldKey] = fields[fieldKey].value as T[keyof T];
      });

      // Log sanitized data for security monitoring
      console.log('Form submission:', SecurityUtils.sanitizeForLogging(values));

      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  }, [fields, validateForm]);

  const resetForm = useCallback(() => {
    const resetFields = {} as Record<keyof T, FormField>;
    Object.keys(initialValues).forEach(key => {
      resetFields[key as keyof T] = {
        value: initialValues[key as keyof T] || '',
        error: '',
        touched: false,
        dirty: false
      };
    });
    setFields(resetFields);
    setSubmitCount(0);
    setIsValidating(false);
    
    // Clear validation timeouts
    Object.values(validationTimeouts).forEach(timeout => clearTimeout(timeout));
    setValidationTimeouts({});
  }, [initialValues, validationTimeouts]);

  const getFieldProps = useCallback((name: keyof T) => ({
    value: fields[name].value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
      setFieldValue(name, e.target.value),
    onBlur: () => setFieldTouched(name),
    'aria-invalid': !!fields[name].error,
    'aria-describedby': fields[name].error ? `${String(name)}-error` : undefined,
    'data-dirty': fields[name].dirty,
    'data-touched': fields[name].touched
  }), [fields, setFieldValue, setFieldTouched]);

  const getFieldError = useCallback((name: keyof T) => fields[name].error, [fields]);
  const isFieldTouched = useCallback((name: keyof T) => fields[name].touched, [fields]);
  const isFieldDirty = useCallback((name: keyof T) => fields[name].dirty, [fields]);

  const hasErrors = Object.values(fields).some(field => !!field.error);
  const isFormValid = !hasErrors && Object.values(fields).every(field => field.touched);
  const isDirty = Object.values(fields).some(field => field.dirty);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(validationTimeouts).forEach(timeout => clearTimeout(timeout));
    };
  }, [validationTimeouts]);

  return {
    fields,
    setFieldValue,
    setFieldTouched,
    validateForm,
    handleSubmit,
    resetForm,
    getFieldProps,
    getFieldError,
    isFieldTouched,
    isFieldDirty,
    isSubmitting,
    isValidating,
    submitCount,
    hasErrors,
    isFormValid,
    isDirty
  };
};