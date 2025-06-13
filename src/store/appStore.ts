import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Step, NotificationType, Notification } from '@/types';

interface AppState {
  // UI状態
  currentStep: Step;
  isLoading: boolean;
  error: string | null;
  notifications: Notification[];
  
  // ユーザー状態
  isAuthenticated: boolean;
  userId: string | null;
  
  // アクション
  setStep: (step: Step) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  showNotification: (message: string, type?: NotificationType, duration?: number) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  setAuthenticated: (isAuthenticated: boolean, userId?: string | null) => void;
  
  // ナビゲーション
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  resetToFirstStep: () => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    (set, get) => ({
      // 初期状態
      currentStep: 1,
      isLoading: false,
      error: null,
      notifications: [],
      isAuthenticated: false,
      userId: null,
      
      // UI アクション
      setStep: (step) => {
        set({ currentStep: step }, false, 'setStep');
      },
      
      setLoading: (loading) => {
        set({ isLoading: loading }, false, 'setLoading');
      },
      
      setError: (error) => {
        set({ error }, false, 'setError');
      },
      
      clearError: () => {
        set({ error: null }, false, 'clearError');
      },
      
      // 通知
      showNotification: (message, type = 'info', duration = 3000) => {
        const id = Math.random().toString(36).substr(2, 9);
        const notification: Notification = {
          id,
          type,
          message,
          duration,
          timestamp: new Date(),
        };
        
        set(
          (state) => ({
            notifications: [...state.notifications, notification],
          }),
          false,
          'showNotification'
        );
      },
      
      removeNotification: (id) => {
        set(
          (state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
          }),
          false,
          'removeNotification'
        );
      },
      
      clearNotifications: () => {
        set({ notifications: [] }, false, 'clearNotifications');
      },
      
      // 認証
      setAuthenticated: (isAuthenticated, userId = null) => {
        set({ isAuthenticated, userId }, false, 'setAuthenticated');
      },
      
      // ナビゲーション
      goToNextStep: () => {
        const { currentStep } = get();
        if (currentStep < 4) {
          set({ currentStep: (currentStep + 1) as Step }, false, 'goToNextStep');
        }
      },
      
      goToPreviousStep: () => {
        const { currentStep } = get();
        if (currentStep > 1) {
          set({ currentStep: (currentStep - 1) as Step }, false, 'goToPreviousStep');
        }
      },
      
      resetToFirstStep: () => {
        set({ currentStep: 1 }, false, 'resetToFirstStep');
      },
    }),
    {
      name: 'app-store',
    }
  )
);