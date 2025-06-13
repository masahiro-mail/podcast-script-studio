import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { CharacterSettings, ValidationError } from '@/types';
import { FirestoreService } from '@/services/firebase/firestore';

interface SettingsState {
  // データ状態
  settings: CharacterSettings;
  isSettingsSaved: boolean;
  isSaving: boolean;
  validationErrors: ValidationError[];
  
  // アクション
  updateSettings: (settings: Partial<CharacterSettings>) => void;
  updateField: (field: keyof CharacterSettings, value: string) => void;
  saveSettings: (userId: string) => Promise<void>;
  loadSettings: (userId: string) => Promise<void>;
  resetSettings: () => void;
  validateSettings: () => boolean;
  clearValidationErrors: () => void;
}

const defaultSettings: CharacterSettings = {
  characterName: '',
  persona: '',
  personality: '',
  expertise: '',
  targetAudience: '',
  openingScript: '',
  closingScript: '',
};

// バリデーション関数
const validateCharacterSettings = (settings: CharacterSettings): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  if (!settings.characterName.trim()) {
    errors.push({ field: 'characterName', message: 'キャラクター名は必須です' });
  } else if (settings.characterName.length > 50) {
    errors.push({ field: 'characterName', message: 'キャラクター名は50文字以内にしてください' });
  }
  
  if (!settings.persona.trim()) {
    errors.push({ field: 'persona', message: '口調・話し方の特徴は必須です' });
  } else if (settings.persona.length < 10) {
    errors.push({ field: 'persona', message: '口調の説明は10文字以上で入力してください' });
  }
  
  if (!settings.personality.trim()) {
    errors.push({ field: 'personality', message: '性格は必須です' });
  } else if (settings.personality.length < 5) {
    errors.push({ field: 'personality', message: '性格は5文字以上で入力してください' });
  }
  
  if (!settings.expertise.trim()) {
    errors.push({ field: 'expertise', message: '専門分野は必須です' });
  } else if (settings.expertise.length < 5) {
    errors.push({ field: 'expertise', message: '専門分野は5文字以上で入力してください' });
  }
  
  if (!settings.targetAudience.trim()) {
    errors.push({ field: 'targetAudience', message: 'ターゲット視聴者は必須です' });
  } else if (settings.targetAudience.length < 10) {
    errors.push({ field: 'targetAudience', message: 'ターゲット視聴者は10文字以上で入力してください' });
  }
  
  return errors;
};

export const useSettingsStore = create<SettingsState>()(
  devtools(
    persist(
      (set, get) => ({
        // 初期状態
        settings: defaultSettings,
        isSettingsSaved: false,
        isSaving: false,
        validationErrors: [],
        
        // 設定更新
        updateSettings: (newSettings) => {
          set(
            (state) => ({
              settings: { ...state.settings, ...newSettings },
              isSettingsSaved: false,
              validationErrors: [],
            }),
            false,
            'updateSettings'
          );
        },
        
        updateField: (field, value) => {
          set(
            (state) => ({
              settings: { ...state.settings, [field]: value },
              isSettingsSaved: false,
              validationErrors: state.validationErrors.filter(error => error.field !== field),
            }),
            false,
            'updateField'
          );
        },
        
        // バリデーション
        validateSettings: () => {
          const { settings } = get();
          const errors = validateCharacterSettings(settings);
          
          set({ validationErrors: errors }, false, 'validateSettings');
          
          return errors.length === 0;
        },
        
        clearValidationErrors: () => {
          set({ validationErrors: [] }, false, 'clearValidationErrors');
        },
        
        // Firebase操作
        saveSettings: async (userId) => {
          const { settings, validateSettings } = get();
          
          set({ isSaving: true }, false, 'saveSettings:start');
          
          try {
            // バリデーション
            if (!validateSettings()) {
              throw new Error('設定に不備があります');
            }
            
            // Firestore保存
            const firestoreService = FirestoreService.getInstance();
            await firestoreService.saveUserSettings(userId, settings);
            
            set({
              isSettingsSaved: true,
              isSaving: false,
            }, false, 'saveSettings:success');
            
          } catch (error) {
            set({ isSaving: false }, false, 'saveSettings:error');
            throw error;
          }
        },
        
        loadSettings: async (userId) => {
          try {
            const firestoreService = FirestoreService.getInstance();
            const loadedSettings = await firestoreService.loadUserSettings<CharacterSettings>(userId);
            
            if (loadedSettings) {
              set({
                settings: { ...defaultSettings, ...loadedSettings },
                isSettingsSaved: true,
                validationErrors: [],
              }, false, 'loadSettings:success');
            }
          } catch (error) {
            console.error('Failed to load settings:', error);
            // エラーが発生しても初期設定のまま続行
          }
        },
        
        // リセット
        resetSettings: () => {
          set({
            settings: defaultSettings,
            isSettingsSaved: false,
            validationErrors: [],
          }, false, 'resetSettings');
        },
      }),
      {
        name: 'settings-store',
        partialize: (state) => ({
          settings: state.settings,
        }),
      }
    ),
    {
      name: 'settings-store',
    }
  )
);