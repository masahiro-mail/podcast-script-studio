import { signInAnonymously, signInWithCustomToken, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './config';

export class AuthService {
  private static instance: AuthService;
  
  private constructor() {}
  
  static getInstance(): AuthService {
    if (!this.instance) {
      this.instance = new AuthService();
    }
    return this.instance;
  }
  
  // 匿名認証
  async signInAnonymously(): Promise<User> {
    try {
      const result = await signInAnonymously(auth);
      return result.user;
    } catch (error) {
      console.error('Anonymous sign-in failed:', error);
      throw new Error('認証に失敗しました');
    }
  }
  
  // カスタムトークン認証
  async signInWithToken(token: string): Promise<User> {
    try {
      const result = await signInWithCustomToken(auth, token);
      return result.user;
    } catch (error) {
      console.error('Custom token sign-in failed:', error);
      throw new Error('トークン認証に失敗しました');
    }
  }
  
  // 認証状態の監視
  onAuthStateChange(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, callback);
  }
  
  // 現在のユーザー取得
  getCurrentUser(): User | null {
    return auth.currentUser;
  }
  
  // サインアウト
  async signOut(): Promise<void> {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Sign-out failed:', error);
      throw new Error('サインアウトに失敗しました');
    }
  }
}