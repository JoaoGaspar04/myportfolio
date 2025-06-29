import { useState, useCallback } from 'react';
import { SecurityUtils } from '../utils/security';

interface FormField {
  value: string;
  error: string;
  touched: boolean;
}

interface ValidationRules {
  required?: boolean;
  email?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

export const useSecureForm = <T extends Record<string, any>>(
  initialValues: T,
  validationRules: Partial<Record<keyof T, ValidationRules>> = {}
) => {
  const [fields, setFields] = useState<Record<keyof T, FormField>>(() => {
    const initialFields = {} as Record<keyof T, FormField>;
    Object.keys(initialValues).forEach(key => {
      initialFields[key as keyof T] = {
        value: initialValues[key as keyof T] || '',
        error: '',
        touched: false
      };
    });
    return initialFields;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);

  const validateField = useCallback((name: keyof T, value: string): string => {
    const rules = validationRules[name];
    if (!rules) return '';

    // Sanitize input
    const sanitizedValue = SecurityUtils.sanitizeInput(value);

    if (rules.required && !sanitizedValue.trim()) {
      return 'Este campo é obrigatório';
    }

    if (rules.email && sanitizedValue && !SecurityUtils.validateEmail(sanitizedValue)) {
      return 'Email inválido';
    }

    if (rules.minLength && sanitizedValue.length < rules.minLength) {
      return `Mínimo ${rules.minLength} caracteres`;
    }

    if (rules.maxLength && sanitizedValue.length > rules.maxLength) {
      return `Máximo ${rules.maxLength} caracteres`;
    }

    if (rules.pattern && sanitizedValue && !rules.pattern.test(sanitizedValue)) {
      return 'Formato inválido';
    }

    if (rules.custom) {
      const customError = rules.custom(sanitizedValue);
      if (customError) return customError;
    }

    return '';
  }, [validationRules]);

  const setFieldValue = useCallback((name: keyof T, value: string) => {
    const sanitizedValue = SecurityUtils.sanitizeInput(value);
    const error = validateField(name, sanitizedValue);

    setFields(prev => ({
      ...prev,
      [name]: {
        value: sanitizedValue,
        error,
        touched: true
      }
    }));
  }, [validateField]);

  const setFieldTouched = useCallback((name: keyof T) => {
    setFields(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        touched: true,
        error: validateField(name, prev[name].value)
      }
    }));
  }, [validateField]);

  const validateForm = useCallback((): boolean => {
    let isValid = true;
    const newFields = { ...fields };

    Object.keys(fields).forEach(key => {
      const fieldKey = key as keyof T;
      const error = validateField(fieldKey, fields[fieldKey].value);
      newFields[fieldKey] = {
        ...newFields[fieldKey],
        error,
        touched: true
      };
      if (error) isValid = false;
    });

    setFields(newFields);
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
    
    if (!validateForm()) {
      throw new Error('Por favor, corrija os erros no formulário');
    }

    setIsSubmitting(true);

    try {
      const values = {} as T;
      Object.keys(fields).forEach(key => {
        const fieldKey = key as keyof T;
        values[fieldKey] = fields[fieldKey].value as T[keyof T];
      });

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
        touched: false
      };
    });
    setFields(resetFields);
    setSubmitCount(0);
  }, [initialValues]);

  const getFieldProps = useCallback((name: keyof T) => ({
    value: fields[name].value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
      setFieldValue(name, e.target.value),
    onBlur: () => setFieldTouched(name),
    'aria-invalid': !!fields[name].error,
    'aria-describedby': fields[name].error ? `${String(name)}-error` : undefined
  }), [fields, setFieldValue, setFieldTouched]);

  const hasErrors = Object.values(fields).some(field => !!field.error);
  const isFormValid = !hasErrors && Object.values(fields).every(field => field.touched);

  return {
    fields,
    setFieldValue,
    setFieldTouched,
    validateForm,
    handleSubmit,
    resetForm,
    getFieldProps,
    isSubmitting,
    submitCount,
    hasErrors,
    isFormValid
  };
};