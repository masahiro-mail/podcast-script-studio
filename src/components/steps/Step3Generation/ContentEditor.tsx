import React from 'react';
import { RefreshCw } from 'lucide-react';
import { TextArea, Button } from '@/components/ui';
import { ContentField } from '@/types';
import { CONTENT_FIELDS } from '@/utils';
import { useGenerationStore } from '@/store';

interface ContentEditorProps {
  field: ContentField;
  value: string;
  onChange: (value: string) => void;
  onRegenerate: () => void;
  disabled?: boolean;
}

const ContentEditor: React.FC<ContentEditorProps> = ({
  field,
  value,
  onChange,
  onRegenerate,
  disabled = false,
}) => {
  const { isGenerating, generationErrors, lastGenerated } = useGenerationStore();
  const isGeneratingThis = isGenerating[field];
  const error = generationErrors[field];
  const lastGeneratedTime = lastGenerated[field];
  
  const fieldConfig = CONTENT_FIELDS[field];
  
  return (
    <div className="space-y-4">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-800">
            {fieldConfig.label}
          </h3>
          <p className="text-sm text-gray-600">
            {fieldConfig.description}
          </p>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onRegenerate}
          disabled={disabled || isGeneratingThis}
          loading={isGeneratingThis}
          icon={<RefreshCw className="w-4 h-4" />}
        >
          再生成
        </Button>
      </div>
      
      {/* エディター */}
      <div className="relative">
        <TextArea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={
            isGeneratingThis 
              ? `${fieldConfig.label}を生成中...` 
              : `${fieldConfig.label}がここに表示されます...`
          }
          rows={fieldConfig.rows}
          maxLength={fieldConfig.maxLength}
          showCharCount={true}
          disabled={isGeneratingThis}
          className={isGeneratingThis ? 'bg-gray-50' : ''}
        />
        
        {/* 生成中オーバーレイ */}
        {isGeneratingThis && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
            <div className="flex items-center space-x-2 text-primary-600">
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span className="text-sm font-medium">生成中...</span>
            </div>
          </div>
        )}
      </div>
      
      {/* ステータス表示 */}
      <div className="flex items-center justify-between text-sm">
        <div>
          {error && (
            <div className="text-red-600">
              エラー: {error}
            </div>
          )}
          
          {!error && lastGeneratedTime && (
            <div className="text-gray-500">
              生成日時: {lastGeneratedTime.toLocaleTimeString()}
            </div>
          )}
        </div>
        
        <div className="text-gray-500">
          {value.length} / {fieldConfig.maxLength} 文字
        </div>
      </div>
      
      {/* フィールド別のヒント */}
      {field === 'script' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-700">
            💡 台本は約3分間の長さを想定しています。キャラクターの口調で自然な話し言葉になるよう調整してください。
          </p>
        </div>
      )}
      
      {field === 'title' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-700">
            💡 タイトルは視聴者の興味を引く、キャッチーで分かりやすいものにしましょう。
          </p>
        </div>
      )}
      
      {field === 'snsPost' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-700">
            💡 SNS投稿は280文字以内で、ハッシュタグや絵文字を効果的に使って拡散を狙いましょう。
          </p>
        </div>
      )}
    </div>
  );
};

export { ContentEditor };