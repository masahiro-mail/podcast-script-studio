import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button, ButtonProps } from './Button';

export interface CopyButtonProps extends Omit<ButtonProps, 'onClick' | 'children'> {
  text: string;
  onCopy?: (text: string) => void;
  successMessage?: string;
  children?: React.ReactNode;
}

const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  onCopy,
  successMessage = 'コピーしました！',
  children,
  ...buttonProps
}) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      
      setCopied(true);
      onCopy?.(text);
      
      // Reset after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };
  
  return (
    <Button
      {...buttonProps}
      onClick={handleCopy}
      icon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      variant={copied ? 'primary' : buttonProps.variant || 'ghost'}
    >
      {copied ? successMessage : (children || 'コピー')}
    </Button>
  );
};

export { CopyButton };