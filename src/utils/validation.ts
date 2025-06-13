import { CharacterSettings, ValidationError } from '@/types';

// 基本バリデーション関数
export const ValidationUtils = {
  // 必須チェック
  required: (value: string, fieldName: string): ValidationError | null => {
    if (!value || value.trim().length === 0) {
      return {
        field: fieldName as keyof CharacterSettings,
        message: `${fieldName}は必須です`
      };
    }
    return null;
  },
  
  // 最小文字数チェック
  minLength: (value: string, min: number, fieldName: string): ValidationError | null => {
    if (value.trim().length < min) {
      return {
        field: fieldName as keyof CharacterSettings,
        message: `${fieldName}は${min}文字以上で入力してください`
      };
    }
    return null;
  },
  
  // 最大文字数チェック
  maxLength: (value: string, max: number, fieldName: string): ValidationError | null => {
    if (value.length > max) {
      return {
        field: fieldName as keyof CharacterSettings,
        message: `${fieldName}は${max}文字以内で入力してください`
      };
    }
    return null;
  },
  
  // 不正文字チェック
  noSQLInjection: (value: string, fieldName: string): ValidationError | null => {
    const sqlPatterns = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/i;
    if (sqlPatterns.test(value)) {
      return {
        field: fieldName as keyof CharacterSettings,
        message: `${fieldName}に不正な文字列が含まれています`
      };
    }
    return null;
  },
  
  // XSS対策
  noXSS: (value: string, fieldName: string): ValidationError | null => {
    const xssPatterns = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    if (xssPatterns.test(value)) {
      return {
        field: fieldName as keyof CharacterSettings,
        message: `${fieldName}に不正なスクリプトが含まれています`
      };
    }
    return null;
  }
};

// キャラクター設定専用バリデーション
export const validateCharacterSettings = (settings: CharacterSettings): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  // キャラクター名
  const nameErrors = [
    ValidationUtils.required(settings.characterName, 'キャラクター名'),
    ValidationUtils.maxLength(settings.characterName, 50, 'キャラクター名'),
    ValidationUtils.noXSS(settings.characterName, 'キャラクター名'),
    ValidationUtils.noSQLInjection(settings.characterName, 'キャラクター名')
  ].filter(Boolean);
  errors.push(...nameErrors);
  
  // 口調・話し方
  const personaErrors = [
    ValidationUtils.required(settings.persona, '口調・話し方'),
    ValidationUtils.minLength(settings.persona, 10, '口調・話し方'),
    ValidationUtils.maxLength(settings.persona, 500, '口調・話し方'),
    ValidationUtils.noXSS(settings.persona, '口調・話し方'),
    ValidationUtils.noSQLInjection(settings.persona, '口調・話し方')
  ].filter(Boolean);
  errors.push(...personaErrors);
  
  // 性格
  const personalityErrors = [
    ValidationUtils.required(settings.personality, '性格'),
    ValidationUtils.minLength(settings.personality, 5, '性格'),
    ValidationUtils.maxLength(settings.personality, 200, '性格'),
    ValidationUtils.noXSS(settings.personality, '性格'),
    ValidationUtils.noSQLInjection(settings.personality, '性格')
  ].filter(Boolean);
  errors.push(...personalityErrors);
  
  // 専門分野
  const expertiseErrors = [
    ValidationUtils.required(settings.expertise, '専門分野'),
    ValidationUtils.minLength(settings.expertise, 5, '専門分野'),
    ValidationUtils.maxLength(settings.expertise, 200, '専門分野'),
    ValidationUtils.noXSS(settings.expertise, '専門分野'),
    ValidationUtils.noSQLInjection(settings.expertise, '専門分野')
  ].filter(Boolean);
  errors.push(...expertiseErrors);
  
  // ターゲット視聴者
  const audienceErrors = [
    ValidationUtils.required(settings.targetAudience, 'ターゲット視聴者'),
    ValidationUtils.minLength(settings.targetAudience, 10, 'ターゲット視聴者'),
    ValidationUtils.maxLength(settings.targetAudience, 300, 'ターゲット視聴者'),
    ValidationUtils.noXSS(settings.targetAudience, 'ターゲット視聴者'),
    ValidationUtils.noSQLInjection(settings.targetAudience, 'ターゲット視聴者')
  ].filter(Boolean);
  errors.push(...audienceErrors);
  
  // オープニングスクリプト（任意項目）
  if (settings.openingScript) {
    const openingErrors = [
      ValidationUtils.maxLength(settings.openingScript, 500, 'オープニングスクリプト'),
      ValidationUtils.noXSS(settings.openingScript, 'オープニングスクリプト'),
      ValidationUtils.noSQLInjection(settings.openingScript, 'オープニングスクリプト')
    ].filter(Boolean);
    errors.push(...openingErrors);
  }
  
  // エンディングスクリプト（任意項目）
  if (settings.closingScript) {
    const closingErrors = [
      ValidationUtils.maxLength(settings.closingScript, 500, 'エンディングスクリプト'),
      ValidationUtils.noXSS(settings.closingScript, 'エンディングスクリプト'),
      ValidationUtils.noSQLInjection(settings.closingScript, 'エンディングスクリプト')
    ].filter(Boolean);
    errors.push(...closingErrors);
  }
  
  return errors;
};

// テーマバリデーション
export const validateTheme = (theme: string): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  const themeErrors = [
    ValidationUtils.required(theme, 'テーマ'),
    ValidationUtils.minLength(theme, 3, 'テーマ'),
    ValidationUtils.maxLength(theme, 50, 'テーマ'),
    ValidationUtils.noXSS(theme, 'テーマ'),
    ValidationUtils.noSQLInjection(theme, 'テーマ')
  ].filter(Boolean);
  
  errors.push(...themeErrors);
  return errors;
};

// 入力値サニタイズ
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // XSS対策
    .replace(/javascript:/gi, '') // JavaScript実行防止
    .replace(/on\w+\s*=/gi, '') // イベントハンドラー除去
    .trim();
};

// フォームデータ全体のサニタイズ
export const sanitizeCharacterSettings = (settings: CharacterSettings): CharacterSettings => {
  return {
    characterName: sanitizeInput(settings.characterName),
    persona: sanitizeInput(settings.persona),
    personality: sanitizeInput(settings.personality),
    expertise: sanitizeInput(settings.expertise),
    targetAudience: sanitizeInput(settings.targetAudience),
    openingScript: sanitizeInput(settings.openingScript),
    closingScript: sanitizeInput(settings.closingScript),
  };
};