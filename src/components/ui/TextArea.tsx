import React from 'react';
import { AlertCircle } from 'lucide-react';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  maxLength?: number;
  showCharCount?: boolean;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ 
    label, 
    error, 
    helperText, 
    maxLength,
    showCharCount = false,
    className = '', 
    id,
    value,
    ...props 
  }, ref) => {
    const inputId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    const charCount = value ? value.toString().length : 0;
    
    const textareaClasses = `
      form-textarea
      ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
      ${className}
    `;
    
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="form-label">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          <textarea
            ref={ref}
            id={inputId}
            className={textareaClasses}
            maxLength={maxLength}
            value={value}
            {...props}
          />
          
          {error && (
            <div className="absolute top-3 right-3 pointer-events-none">
              <AlertCircle className="text-red-500 w-5 h-5" />
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-1">
          <div>
            {error && (
              <p className="form-error">
                {error}
              </p>
            )}
            
            {helperText && !error && (
              <p className="form-helper">
                {helperText}
              </p>
            )}
          </div>
          
          {(showCharCount || maxLength) && (
            <div className="text-sm text-gray-500">
              {charCount}
              {maxLength && `/${maxLength}`}
            </div>
          )}
        </div>
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export { TextArea };