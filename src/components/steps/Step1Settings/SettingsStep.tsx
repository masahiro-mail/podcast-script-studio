import React, { useEffect } from 'react';
import { Settings, Save, ArrowRight } from 'lucide-react';
import { Button, ErrorAlert } from '@/components/ui';
import { CharacterForm } from './CharacterForm';
import { useAppStore, useSettingsStore } from '@/store';
import { useAuth } from '@/hooks';
import { SUCCESS_MESSAGES } from '@/utils';

const SettingsStep: React.FC = () => {
  const { goToNextStep, showNotification } = useAppStore();
  const { 
    settings, 
    validationErrors, 
    isSaving, 
    isSettingsSaved,
    updateField, 
    saveSettings, 
    loadSettings,
    validateSettings 
  } = useSettingsStore();
  const { userId, isAuthenticated } = useAuth();
  
  // ユーザー認証後に設定を読み込み
  useEffect(() => {
    if (isAuthenticated && userId) {
      loadSettings(userId);
    }
  }, [isAuthenticated, userId, loadSettings]);
  
  // 設定変更ハンドラー
  const handleFieldChange = (field: keyof typeof settings, value: string) => {
    // リアルタイムサニタイズ
    const sanitizedValue = value
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '');
    
    updateField(field, sanitizedValue);
  };
  
  // 設定保存
  const handleSave = async () => {
    if (!userId) {
      showNotification('認証が必要です', 'error');
      return;
    }
    
    // バリデーション実行
    if (!validateSettings()) {
      showNotification('入力内容を確認してください', 'error');
      return;
    }
    
    try {
      await saveSettings(userId);
      showNotification(SUCCESS_MESSAGES.SETTINGS_SAVED, 'success');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '設定の保存に失敗しました';
      showNotification(errorMessage, 'error');
    }
  };
  
  // 次のステップへ
  const handleNext = () => {
    // 保存されていない場合は警告
    if (!isSettingsSaved) {
      showNotification('設定を保存してから次に進んでください', 'warning');
      return;
    }
    
    // バリデーション確認
    if (!validateSettings()) {
      showNotification('入力内容を確認してください', 'error');
      return;
    }
    
    goToNextStep();
  };
  
  // 次へボタンの有効性
  const canGoNext = isSettingsSaved && validationErrors.length === 0;
  
  return (
    <div className="space-y-6 animate-fade-in">
      {/* ヘッダー */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full">
            <Settings className="w-6 h-6 text-primary-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          ステップ1：初期設定
        </h2>
        <p className="text-gray-600">
          キャラクターの個性や台本の骨格を設定します。この設定は自動で保存されます。
        </p>
      </div>
      
      {/* 認証エラー */}
      {!isAuthenticated && (
        <ErrorAlert 
          error="認証が完了していません。しばらくお待ちください。"
        />
      )}
      
      {/* バリデーションエラー */}
      {validationErrors.length > 0 && (
        <ErrorAlert 
          error={`入力エラー: ${validationErrors.map(e => e.message).join(', ')}`}
        />
      )}
      
      {/* フォーム */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <CharacterForm
          settings={settings}
          onChange={handleFieldChange}
          errors={validationErrors}
        />
      </div>
      
      {/* アクションボタン */}
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          {isSettingsSaved ? (
            <>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>設定が保存されています</span>
            </>
          ) : (
            <>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>未保存の変更があります</span>
            </>
          )}
        </div>
        
        <div className="flex space-x-3">
          <Button
            variant="secondary"
            onClick={handleSave}
            loading={isSaving}
            disabled={!isAuthenticated || validationErrors.length > 0}
            icon={<Save className="w-4 h-4" />}
          >
            設定を保存
          </Button>
          
          <Button
            variant="primary"
            onClick={handleNext}
            disabled={!canGoNext}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            次へ：テーマ決定
          </Button>
        </div>
      </div>
      
      {/* 進行状況 */}
      <div className="text-center">
        <div className="text-sm text-gray-500">
          進行状況: 1 / 4 ステップ
        </div>
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div className="bg-primary-600 h-2 rounded-full w-1/4 transition-all duration-300"></div>
        </div>
      </div>
    </div>
  );
};

export { SettingsStep };