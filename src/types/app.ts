import { CharacterSettings } from './character';
import { GeneratedContent } from './content';

export type Step = 1 | 2 | 3 | 4;

export interface AppState {
  // UI状態
  currentStep: Step;
  isLoading: boolean;
  error: string | null;
  notification: string | null;
  
  // データ状態
  settings: CharacterSettings;
  theme: string;
  generatedContent: GeneratedContent;
  
  // フラグ
  isSettingsSaved: boolean;
  isAuthenticated: boolean;
  userId: string | null;
}

// 通知の種類
export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number;
  timestamp: Date;
}

// エラー情報
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
  recoverable: boolean;
}

// ナビゲーション
export interface NavigationState {
  canGoNext: boolean;
  canGoBack: boolean;
  nextLabel: string;
  backLabel: string;
}

// アプリ設定
export interface AppConfig {
  apiKey: string;
  appId: string;
  isDevelopment: boolean;
  features: {
    analytics: boolean;
    errorReporting: boolean;
    offlineSupport: boolean;
  };
}