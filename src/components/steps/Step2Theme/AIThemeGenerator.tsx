import React from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui';
import { useGenerationStore } from '@/store';

interface AIThemeGeneratorProps {
  onGenerate: () => void;
  disabled?: boolean;
}

const AIThemeGenerator: React.FC<AIThemeGeneratorProps> = ({
  onGenerate,
  disabled = false,
}) => {
  const { isGenerating, generationErrors } = useGenerationStore();
  const isGeneratingTheme = isGenerating.theme;
  const themeError = generationErrors.theme;
  
  return (
    <div className="space-y-4">
      <div className="text-center border-2 border-dashed border-gray-300 rounded-lg p-6">
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full">
            <Sparkles className="w-6 h-6 text-purple-600" />
          </div>
        </div>
        
        <h3 className="text-lg font-medium text-gray-800 mb-2">
          AIにテーマを考えてもらう
        </h3>
        
        <p className="text-sm text-gray-600 mb-4">
          キャラクター設定に基づいて、AIが最適なPodcastテーマを提案します
        </p>
        
        <Button
          variant="primary"
          onClick={onGenerate}
          loading={isGeneratingTheme}
          disabled={disabled || isGeneratingTheme}
          icon={<Sparkles className="w-4 h-4" />}
        >
          {isGeneratingTheme ? 'テーマを考え中...' : 'テーマを自動生成'}
        </Button>
      </div>
      
      {/* エラー表示 */}
      {themeError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="text-red-600 text-sm">
              <strong>生成エラー:</strong> {themeError}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onGenerate}
              className="ml-auto"
              icon={<RefreshCw className="w-4 h-4" />}
            >
              再試行
            </Button>
          </div>
        </div>
      )}
      
      {/* 生成のコツ */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-800 mb-2">
          💡 AIテーマ生成のポイント
        </h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• キャラクターの専門分野に関連したテーマが提案されます</li>
          <li>• ターゲット視聴者に適した難易度で生成されます</li>
          <li>• 気に入らない場合は何度でも再生成できます</li>
          <li>• 生成されたテーマは自由に編集できます</li>
        </ul>
      </div>
    </div>
  );
};

export { AIThemeGenerator };