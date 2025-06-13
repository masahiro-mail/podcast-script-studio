import React from 'react';
import { Loader2 } from 'lucide-react';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  message?: string;
  overlay?: boolean;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  message,
  overlay = false,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };
  
  const spinnerClasses = `animate-spin text-primary-600 ${sizeClasses[size]} ${className}`;
  
  const content = (
    <div className="flex flex-col items-center justify-center space-y-2">
      <Loader2 className={spinnerClasses} />
      {message && (
        <p className="text-sm text-gray-600 font-medium">
          {message}
        </p>
      )}
    </div>
  );
  
  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 shadow-xl">
          {content}
        </div>
      </div>
    );
  }
  
  return content;
};

export { LoadingSpinner };