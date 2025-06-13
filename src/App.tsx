import React from 'react';
import { Layout } from '@/components/layout';
import { 
  SettingsStep, 
  ThemeStep, 
  GenerationStep, 
  OutputStep 
} from '@/components/steps';
import { ErrorAlert } from '@/components/ui';
import { useAppStore } from '@/store';
import { useAuth } from '@/hooks';
import '@/styles/globals.css';

const App: React.FC = () => {
  const { currentStep, error, clearError } = useAppStore();
  const { isLoading: authLoading, error: authError, retry } = useAuth();
  
  // ステップに応じたコンポーネントを返す
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <SettingsStep />;
      case 2:
        return <ThemeStep />;
      case 3:
        return <GenerationStep />;
      case 4:
        return <OutputStep />;
      default:
        return <SettingsStep />;
    }
  };
  
  // 認証ローディング中
  if (authLoading) {
    return (
      <Layout showStepIndicator={false}>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">アプリケーションを初期化中...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout currentStep={currentStep}>
      {/* 認証エラー */}
      {authError && (
        <div className="mb-6">
          <ErrorAlert
            error={authError}
            onRetry={retry}
            onDismiss={() => {}} // 認証エラーは手動では消せない
          />
        </div>
      )}
      
      {/* アプリケーションエラー */}
      {error && (
        <div className="mb-6">
          <ErrorAlert
            error={error}
            onDismiss={clearError}
          />
        </div>
      )}
      
      {/* メインコンテンツ */}
      <div className="max-w-4xl mx-auto">
        {renderCurrentStep()}
      </div>
    </Layout>
  );
};

export default App;