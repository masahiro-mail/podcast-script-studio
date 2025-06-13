import React from 'react';
import { Input, TextArea } from '@/components/ui';
import { CharacterSettings, ValidationError } from '@/types';
import { CHARACTER_FORM_FIELDS } from '@/utils';

interface CharacterFormProps {
  settings: CharacterSettings;
  onChange: (field: keyof CharacterSettings, value: string) => void;
  errors: ValidationError[];
}

const CharacterForm: React.FC<CharacterFormProps> = ({
  settings,
  onChange,
  errors,
}) => {
  const getFieldError = (fieldName: keyof CharacterSettings): string | undefined => {
    const error = errors.find(e => e.field === fieldName);
    return error?.message;
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CHARACTER_FORM_FIELDS.map((field) => {
          const error = getFieldError(field.name);
          const value = settings[field.name];
          
          if (field.type === 'input') {
            return (
              <div key={field.name} className={field.name === 'characterName' || field.name === 'personality' ? '' : 'md:col-span-2'}>
                <Input
                  label={field.label}
                  placeholder={field.placeholder}
                  value={value}
                  onChange={(e) => onChange(field.name, e.target.value)}
                  error={error}
                  required={field.required}
                  maxLength={field.maxLength}
                />
              </div>
            );
          } else {
            return (
              <div key={field.name} className="md:col-span-2">
                <TextArea
                  label={field.label}
                  placeholder={field.placeholder}
                  value={value}
                  onChange={(e) => onChange(field.name, e.target.value)}
                  error={error}
                  required={field.required}
                  rows={field.rows}
                  maxLength={field.maxLength}
                  showCharCount={true}
                />
              </div>
            );
          }
        })}
      </div>
      
      {/* フォーム説明 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          💡 設定のポイント
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• キャラクターの口調は具体的に書くと、より自然な台本が生成されます</li>
          <li>• 専門分野は複数指定することで、幅広いテーマに対応できます</li>
          <li>• ターゲット視聴者を明確にすると、適切な難易度の内容が生成されます</li>
          <li>• オープニング・エンディングは省略可能です（後で最終出力時に結合されます）</li>
        </ul>
      </div>
    </div>
  );
};

export { CharacterForm };