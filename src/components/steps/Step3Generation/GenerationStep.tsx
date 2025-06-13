import React from 'react';
import { FileText, ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui';
import { ContentTabs } from './ContentTabs';
import { ContentEditor } from './ContentEditor';
import { useAppStore, useGenerationStore } from '@/store';
import { useContentGeneration } from '@/hooks';
import { ContentField } from '@/types';

const GenerationStep: React.FC = () => {
  const { goToPreviousStep, goToNextStep } = useAppStore();
  const { theme, generatedContent, getContentStats } = useGenerationStore();
  const { updateContent, regenerateContent, generateAllContent } = useContentGeneration();
  
  // コンテンツ統計
  const stats = getContentStats();
  
  // 全コンテンツ再生成
  const handleRegenerateAll = async () => {
    await generateAllContent();
  };
  
  // 次のステップへ
  const handleNext = () => {
    if (!stats.isValid) {
      alert('台本とタイトルを生成してから次に進んでください');
      return;
    }
    goToNextStep();
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      {/* ヘッダー */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
            <FileText className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          ステップ3：コンテンツ生成と編集
        </h2>
        <p className="text-gray-600">
          AIが生成したコンテンツです。各項目は自由に編集できます。
        </p>
      </div>
      
      {/* テーマ表示 */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
        <div className="text-sm text-gray-600 mb-1">選択中のテーマ</div>
        <div className="text-lg font-medium text-gray-800">「{theme}」</div>
      </div>
      
      {/* 全体操作 */}
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        <div className="text-sm text-gray-600">
          進行状況: {stats.isValid ? '✅ 必須項目完了' : '⏳ 台本・タイトルが必要'}
        </div>
        
        <Button
          variant="primary"
          onClick={handleRegenerateAll}
          icon={<RefreshCw className="w-4 h-4" />}
        >
          全コンテンツ再生成
        </Button>
      </div>
      
      {/* コンテンツタブ */}
      <ContentTabs>
        {(activeTab: ContentField, setActiveTab) => (
          <ContentEditor
            field={activeTab}
            value={generatedContent[activeTab]}
            onChange={(value) => updateContent(activeTab, value)}
            onRegenerate={() => regenerateContent(activeTab)}
          />
        )}
      </ContentTabs>
      
      {/* 生成のヒント */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          💡 コンテンツ編集のポイント
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• 各項目は個別に再生成できます</li>
          <li>• 生成されたコンテンツは自由に編集してください</li>
          <li>• 台本の長さは約3分間（800-1000文字）を目安にしています</li>
          <li>• SNS投稿は280文字以内でハッシュタグも含まれます</li>
        </ul>
      </div>
      
      {/* アクションボタン */}
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <Button
          variant="secondary"
          onClick={goToPreviousStep}
          icon={<ArrowLeft className="w-4 h-4" />}
        >
          戻る：テーマ
        </Button>
        
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-2">
            台本: {stats.scriptWordCount}語 | タイトル: {stats.titleLength}文字
          </div>
          <div className="text-sm text-gray-600">
            要約: {stats.summaryLength}文字 | SNS: {stats.snsPostLength}文字
          </div>
        </div>
        
        <Button
          variant="primary"
          onClick={handleNext}
          disabled={!stats.isValid}
          icon={<ArrowRight className="w-4 h-4" />}
        >
          次へ：最終出力
        </Button>
      </div>
      
      {/* 進行状況 */}
      <div className="text-center">
        <div className="text-sm text-gray-500">
          進行状況: 3 / 4 ステップ
        </div>
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div className="bg-primary-600 h-2 rounded-full w-3/4 transition-all duration-300"></div>
        </div>
      </div>
    </div>
  );
};

export { GenerationStep };