import React from 'react';
import { Lightbulb, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';
import { ThemeInput } from './ThemeInput';
import { AIThemeGenerator } from './AIThemeGenerator';
import { useAppStore, useSettingsStore } from '@/store';
import { useContentGeneration } from '@/hooks';
import { validateTheme } from '@/utils';

const ThemeStep: React.FC = () => {
  const { goToPreviousStep, goToNextStep } = useAppStore();
  const { settings, isSettingsSaved } = useSettingsStore();
  const { theme, generateTheme, setTheme, generateAllContent } = useContentGeneration();
  
  // テーマ変更ハンドラー
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };
  
  // AI生成ハンドラー
  const handleGenerateTheme = async () => {
    if (!isSettingsSaved) {
      alert('先にキャラクター設定を保存してください');
      return;
    }
    
    await generateTheme();
  };
  
  // 次のステップハンドラー
  const handleNext = async () => {
    if (!theme.trim()) {
      alert('テーマを入力または生成してください');
      return;
    }
    
    const validationErrors = validateTheme(theme);
    if (validationErrors.length > 0) {
      alert(`テーマエラー: ${validationErrors[0].message}`);
      return;
    }
    
    // 次のステップに進み、すぐにコンテンツ生成開始
    goToNextStep();
    
    // 少し遅延してからコンテンツ生成開始
    setTimeout(() => {
      generateAllContent();
    }, 500);
  };
  
  // バリデーション
  const validationErrors = validateTheme(theme);
  const canGoNext = theme.trim().length > 0 && validationErrors.length === 0;
  
  return (
    <div className="space-y-6 animate-fade-in">
      {/* ヘッダー */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full">
            <Lightbulb className="w-6 h-6 text-yellow-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          ステップ2：テーマ決定
        </h2>
        <p className="text-gray-600">
          今回のPodcastのテーマを入力するか、キャラクター設定に基づいてAIに提案させましょう。
        </p>
      </div>
      
      {/* 設定チェック */}
      {!isSettingsSaved && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="text-orange-800 text-sm">
            <strong>注意:</strong> キャラクター設定が保存されていません。
            先にステップ1で設定を保存してください。
          </div>
        </div>
      )}
      
      {/* 現在のキャラクター設定表示 */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          現在のキャラクター設定
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">キャラクター名:</span> {settings.characterName || '未設定'}
          </div>
          <div>
            <span className="font-medium">専門分野:</span> {settings.expertise || '未設定'}
          </div>
          <div className="col-span-2">
            <span className="font-medium">ターゲット:</span> {settings.targetAudience || '未設定'}
          </div>
        </div>
      </div>
      
      {/* テーマ入力セクション */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          テーマを入力
        </h3>
        <ThemeInput
          theme={theme}
          onChange={handleThemeChange}
          disabled={!isSettingsSaved}
        />
      </div>
      
      {/* 区切り */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-50 text-gray-500">または</span>
        </div>
      </div>
      
      {/* AI生成セクション */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <AIThemeGenerator
          onGenerate={handleGenerateTheme}
          disabled={!isSettingsSaved}
        />
      </div>
      
      {/* アクションボタン */}
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <Button
          variant="secondary"
          onClick={goToPreviousStep}
          icon={<ArrowLeft className="w-4 h-4" />}
        >
          戻る：設定
        </Button>
        
        <div className="text-center">
          {theme && (
            <div className="text-sm text-gray-600 mb-2">
              選択中のテーマ: <span className="font-medium">「{theme}」</span>
            </div>
          )}
        </div>
        
        <Button
          variant="primary"
          onClick={handleNext}
          disabled={!canGoNext}
          icon={<ArrowRight className="w-4 h-4" />}
        >
          台本を生成する
        </Button>
      </div>
      
      {/* 進行状況 */}
      <div className="text-center">
        <div className="text-sm text-gray-500">
          進行状況: 2 / 4 ステップ
        </div>
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div className="bg-primary-600 h-2 rounded-full w-2/4 transition-all duration-300"></div>
        </div>
      </div>
    </div>
  );
};

export { ThemeStep };