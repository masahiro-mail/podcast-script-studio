import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { StepIndicator } from './StepIndicator';
import { LoadingSpinner, ToastContainer } from '@/components/ui';
import { useAppStore } from '@/store';
import { Step } from '@/types';

interface LayoutProps {
  children: React.ReactNode;
  showStepIndicator?: boolean;
  currentStep?: Step;
  completedSteps?: Step[];
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  showStepIndicator = true,
  currentStep,
  completedSteps = []
}) => {
  const { 
    isLoading, 
    userId, 
    notifications, 
    removeNotification,
    currentStep: storeCurrentStep 
  } = useAppStore();
  
  const displayStep = currentStep || storeCurrentStep;
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* ヘッダー */}
      <Header userId={userId} />
      
      {/* ステップインジケーター */}
      {showStepIndicator && (
        <StepIndicator 
          currentStep={displayStep} 
          completedSteps={completedSteps}
        />
      )}
      
      {/* メインコンテンツ */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
      
      {/* フッター */}
      <Footer />
      
      {/* グローバルローディング */}
      {isLoading && (
        <LoadingSpinner 
          overlay 
          size="lg" 
          message="処理中です..." 
        />
      )}
      
      {/* 通知システム */}
      <ToastContainer 
        toasts={notifications} 
        onClose={removeNotification} 
      />
    </div>
  );
};

export { Layout };