import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { AuthService } from '@/services/firebase/auth';
import { useAppStore } from '@/store';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { setAuthenticated, showNotification } = useAppStore();
  const authService = AuthService.getInstance();
  
  useEffect(() => {
    // 認証状態の監視
    const unsubscribe = authService.onAuthStateChange((user) => {
      setUser(user);
      setAuthenticated(!!user, user?.uid || null);
      setIsLoading(false);
      setError(null);
      
      if (user) {
        showNotification('認証が完了しました', 'success');
      }
    });
    
    // 初回認証試行
    const initAuth = async () => {
      try {
        // カスタムトークンがある場合は優先使用
        const customToken = (window as any).__initial_auth_token;
        if (customToken) {
          await authService.signInWithToken(customToken);
        } else {
          // 匿名認証
          await authService.signInAnonymously();
        }
      } catch (error) {
        console.error('Authentication failed:', error);
        setError('認証に失敗しました');
        setIsLoading(false);
      }
    };
    
    // 現在のユーザーが存在しない場合のみ認証試行
    if (!authService.getCurrentUser()) {
      initAuth();
    }
    
    return unsubscribe;
  }, [setAuthenticated, showNotification]);
  
  // 手動でサインイン（匿名認証）
  const signIn = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const user = await authService.signInAnonymously();
      setUser(user);
      setAuthenticated(true, user.uid);
      showNotification('認証が完了しました', 'success');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '認証に失敗しました';
      setError(errorMessage);
      showNotification(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };
  
  // サインアウト
  const signOut = async () => {
    setIsLoading(true);
    
    try {
      await authService.signOut();
      setUser(null);
      setAuthenticated(false, null);
      showNotification('サインアウトしました', 'info');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'サインアウトに失敗しました';
      setError(errorMessage);
      showNotification(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };
  
  // 認証状態の再試行
  const retry = async () => {
    setError(null);
    await signIn();
  };
  
  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    userId: user?.uid || null,
    signIn,
    signOut,
    retry,
  };
};