import React from 'react';
import { FileText } from 'lucide-react';
import { CopyButton } from '@/components/ui';
import { CharacterSettings, GeneratedContent } from '@/types';
// import { SUCCESS_MESSAGES } from '@/utils';
import { useAppStore } from '@/store';

interface FinalPreviewProps {
  settings: CharacterSettings;
  content: GeneratedContent;
}

const FinalPreview: React.FC<FinalPreviewProps> = ({
  settings,
  content,
}) => {
  const { showNotification } = useAppStore();
  
  // 完成版台本の組み立て
  const finalScript = React.useMemo(() => {
    const parts = [];
    
    // オープニング
    if (settings.openingScript.trim()) {
      parts.push(settings.openingScript.trim());
      parts.push(''); // 空行
    }
    
    // メイン台本
    if (content.script.trim()) {
      parts.push('(ここから本文)');
      parts.push('');
      parts.push(content.script.trim());
      parts.push('');
      parts.push('(ここまで本文)');
      parts.push('');
    }
    
    // エンディング
    if (settings.closingScript.trim()) {
      parts.push(settings.closingScript.trim());
    }
    
    return parts.join('\n');
  }, [settings, content.script]);
  
  const handleCopy = (_text: string, type: string) => {
    showNotification(`${type}をコピーしました！`, 'success');
  };
  
  return (
    <div className="space-y-6">
      {/* 完成版台本 */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-800">
              完成版台本（定型文込み）
            </h3>
          </div>
          <CopyButton
            text={finalScript}
            onCopy={(text) => handleCopy(text, '台本')}
            variant="primary"
          >
            台本をコピー
          </CopyButton>
        </div>
        
        <div className="p-4">
          <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
              {finalScript || '台本が生成されていません'}
            </pre>
          </div>
          
          <div className="mt-2 text-sm text-gray-600">
            文字数: {finalScript.length} 文字
          </div>
        </div>
      </div>
      
      {/* SNS投稿 */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-800">
            SNS告知ポスト
          </h3>
          <CopyButton
            text={content.snsPost}
            onCopy={(text) => handleCopy(text, 'SNS投稿')}
            variant="secondary"
          >
            SNS投稿をコピー
          </CopyButton>
        </div>
        
        <div className="p-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
            <div className="text-sm text-gray-800 whitespace-pre-wrap">
              {content.snsPost || 'SNS投稿が生成されていません'}
            </div>
            
            <div className="mt-2 text-xs text-gray-600">
              {content.snsPost.length} / 280 文字
            </div>
          </div>
        </div>
      </div>
      
      {/* その他のコンテンツ */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* タイトル */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-800">タイトル</h4>
            <CopyButton
              text={content.title}
              onCopy={(text) => handleCopy(text, 'タイトル')}
              size="sm"
            />
          </div>
          <div className="text-sm text-gray-700 bg-gray-50 rounded p-3">
            {content.title || 'タイトルが生成されていません'}
          </div>
        </div>
        
        {/* 要約 */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-800">要約（概要欄用）</h4>
            <CopyButton
              text={content.summary}
              onCopy={(text) => handleCopy(text, '要約')}
              size="sm"
            />
          </div>
          <div className="text-sm text-gray-700 bg-gray-50 rounded p-3 max-h-24 overflow-y-auto">
            {content.summary || '要約が生成されていません'}
          </div>
        </div>
      </div>
      
      {/* 使用方法のヒント */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-green-800 mb-2">
          🎉 使用方法
        </h3>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• 完成版台本をコピーして、録音・収録にご利用ください</li>
          <li>• SNS投稿をコピーして、X(Twitter)やInstagramで告知しましょう</li>
          <li>• タイトルは各配信プラットフォームのタイトル欄に使用できます</li>
          <li>• 要約は概要欄・説明欄に貼り付けてください</li>
        </ul>
      </div>
    </div>
  );
};

export { FinalPreview };