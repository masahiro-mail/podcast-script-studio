import React from 'react';
import { Input } from '@/components/ui';
import { validateTheme } from '@/utils';

interface ThemeInputProps {
  theme: string;
  onChange: (theme: string) => void;
  disabled?: boolean;
}

const ThemeInput: React.FC<ThemeInputProps> = ({
  theme,
  onChange,
  disabled = false,
}) => {
  const validationErrors = validateTheme(theme);
  const error = validationErrors.length > 0 ? validationErrors[0].message : undefined;
  
  return (
    <div className="space-y-4">
      <Input
        label="今回のPodcastテーマ"
        placeholder="例：AIは夢を見るのか？"
        value={theme}
        onChange={(e) => onChange(e.target.value)}
        error={error}
        disabled={disabled}
        maxLength={50}
        helperText="15文字程度で、視聴者が興味を持つテーマを入力してください"
      />
      
      {/* テーマ例 */}
      {!theme && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            テーマ例：
          </h4>
          <div className="flex flex-wrap gap-2">
            {[
              'AIと人間の共存',
              '未来の働き方',
              'デジタルデトックス',
              '宇宙開発の現在',
              '持続可能な社会',
              'メタバースの可能性'
            ].map((example) => (
              <button
                key={example}
                onClick={() => onChange(example)}
                className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export { ThemeInput };