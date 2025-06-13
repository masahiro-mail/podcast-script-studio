import React from 'react';
import { AlertTriangle, X, RefreshCw } from 'lucide-react';
import { Button } from './Button';

export interface ErrorAlertProps {
  error: string | Error;
  onDismiss?: () => void;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({
  error,
  onDismiss,
  onRetry,
  retryLabel = '再試行',
  className = '',
}) => {
  const errorMessage = error instanceof Error ? error.message : error;
  
  return (
    <div className={`
      bg-red-50 border border-red-200 rounded-lg p-4 mb-4
      ${className}
    `}>
      <div className="flex items-start">
        <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
        
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800">
            エラーが発生しました
          </h3>
          <p className="mt-1 text-sm text-red-700">
            {errorMessage}
          </p>
          
          {onRetry && (
            <div className="mt-3">
              <Button
                variant="danger"
                size="sm"
                onClick={onRetry}
                icon={<RefreshCw className="w-4 h-4" />}
              >
                {retryLabel}
              </Button>
            </div>
          )}
        </div>
        
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="ml-3 text-red-400 hover:text-red-600 focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export { ErrorAlert };