import React from 'react';
import { ArrowLeft, RotateCcw, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui';
import { FinalPreview } from './FinalPreview';
import { useAppStore, useSettingsStore, useGenerationStore } from '@/store';

const OutputStep: React.FC = () => {
  const { goToPreviousStep, resetToFirstStep, showNotification } = useAppStore();
  const { settings } = useSettingsStore();
  const { theme, generatedContent, resetGeneration } = useGenerationStore();
  
  // 新しいPodcastを作成
  const handleCreateNew = () => {
    const confirmed = window.confirm(
      '新しいPodcastを作成しますか？現在の内容はリセットされます。'
    );
    
    if (confirmed) {
      resetGeneration();
      resetToFirstStep();
      showNotification('新しいPodcastの作成を開始します', 'info');
    }
  };
  
  // 統計情報
  const stats = {
    totalCharacters: generatedContent.script.length + generatedContent.title.length + generatedContent.summary.length + generatedContent.snsPost.length,
    estimatedReadingTime: Math.ceil(generatedContent.script.length / 400), // 400文字/分で計算
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      {/* ヘッダー */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          ステップ4：最終出力
        </h2>
        <p className="text-gray-600">
          完成した台本とSNS投稿です。コピーしてご活用ください。
        </p>
      </div>
      
      {/* プロジェクト情報 */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-sm text-gray-600">テーマ</div>
            <div className="font-medium text-gray-800">「{theme}」</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">キャラクター</div>
            <div className="font-medium text-gray-800">{settings.characterName}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">予想収録時間</div>
            <div className="font-medium text-gray-800">約{stats.estimatedReadingTime}分</div>
          </div>
        </div>
      </div>
      
      {/* 最終プレビュー */}
      <FinalPreview
        settings={settings}
        content={generatedContent}
      />
      
      {/* 統計情報 */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-medium text-gray-800 mb-3">
          📊 生成統計
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-blue-600">
              {generatedContent.script.length}
            </div>
            <div className="text-sm text-gray-600">台本文字数</div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-green-600">
              {generatedContent.title.length}
            </div>
            <div className="text-sm text-gray-600">タイトル文字数</div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-purple-600">
              {generatedContent.summary.length}
            </div>
            <div className="text-sm text-gray-600">要約文字数</div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-orange-600">
              {generatedContent.snsPost.length}
            </div>
            <div className="text-sm text-gray-600">SNS文字数</div>
          </div>
        </div>
        
        <div className="mt-4 text-center text-sm text-gray-600">
          総文字数: {stats.totalCharacters.toLocaleString()} 文字
        </div>
      </div>
      
      {/* アクションボタン */}
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Button
          variant="secondary"
          onClick={goToPreviousStep}
          icon={<ArrowLeft className="w-4 h-4" />}
        >
          戻る：編集
        </Button>
        
        <div className="flex space-x-3">
          <Button
            variant="ghost"
            onClick={handleCreateNew}
            icon={<RotateCcw className="w-4 h-4" />}
          >
            新しいPodcastを作成
          </Button>
        </div>
      </div>
      
      {/* 完了メッセージ */}
      <div className="text-center">
        <div className="text-sm text-gray-500 mb-2">
          🎉 Podcastの台本作成が完了しました！
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-green-600 h-2 rounded-full w-full transition-all duration-300"></div>
        </div>
        <div className="text-sm text-gray-500 mt-2">
          進行状況: 4 / 4 ステップ完了
        </div>
      </div>
      
      {/* フィードバック */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
        <p className="text-sm text-yellow-800">
          💝 このツールが役に立ちましたか？ 
          <br className="sm:hidden" />
          より良いサービスにするため、ぜひフィードバックをお聞かせください。
        </p>
      </div>
    </div>
  );
};

export { OutputStep };