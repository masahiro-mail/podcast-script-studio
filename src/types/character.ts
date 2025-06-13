export interface CharacterSettings {
  characterName: string;
  persona: string;
  personality: string;
  expertise: string;
  targetAudience: string;
  openingScript: string;
  closingScript: string;
}

export interface CharacterFormData extends CharacterSettings {}

// バリデーションエラー
export interface ValidationError {
  field: keyof CharacterSettings;
  message: string;
}

// フォームフィールド設定
export interface FormField {
  name: keyof CharacterSettings;
  label: string;
  placeholder: string;
  type: 'input' | 'textarea';
  required: boolean;
  minLength?: number;
  maxLength?: number;
  rows?: number;
}