import { doc, setDoc, getDoc, collection, query, orderBy, limit, getDocs, Timestamp } from 'firebase/firestore';
import { db, appId } from './config';

export class FirestoreService {
  private static instance: FirestoreService;
  
  private constructor() {}
  
  static getInstance(): FirestoreService {
    if (!this.instance) {
      this.instance = new FirestoreService();
    }
    return this.instance;
  }
  
  // ユーザー設定の保存
  async saveUserSettings<T>(userId: string, data: T): Promise<void> {
    try {
      const docRef = doc(db, 'artifacts', appId, 'users', userId, 'podcastSettings', 'config');
      await setDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Failed to save user settings:', error);
      throw new Error('設定の保存に失敗しました');
    }
  }
  
  // ユーザー設定の読み込み
  async loadUserSettings<T>(userId: string): Promise<T | null> {
    try {
      const docRef = doc(db, 'artifacts', appId, 'users', userId, 'podcastSettings', 'config');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        delete data.updatedAt; // タイムスタンプは除外
        return data as T;
      }
      
      return null;
    } catch (error) {
      console.error('Failed to load user settings:', error);
      throw new Error('設定の読み込みに失敗しました');
    }
  }
  
  // 生成履歴の保存
  async saveGenerationHistory(userId: string, sessionId: string, data: any): Promise<void> {
    try {
      const docRef = doc(db, 'artifacts', appId, 'users', userId, 'history', sessionId);
      await setDoc(docRef, {
        ...data,
        createdAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Failed to save generation history:', error);
      throw new Error('履歴の保存に失敗しました');
    }
  }
  
  // 生成履歴の読み込み
  async loadGenerationHistory(userId: string, limitCount: number = 10): Promise<any[]> {
    try {
      const collectionRef = collection(db, 'artifacts', appId, 'users', userId, 'history');
      const q = query(collectionRef, orderBy('createdAt', 'desc'), limit(limitCount));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Failed to load generation history:', error);
      throw new Error('履歴の読み込みに失敗しました');
    }
  }
  
  // データの汎用保存
  async saveData<T>(path: string, data: T): Promise<void> {
    try {
      const pathSegments = path.split('/');
      const docRef = doc(db, pathSegments.join('/'));
      await setDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Failed to save data:', error);
      throw new Error('データの保存に失敗しました');
    }
  }
  
  // データの汎用読み込み
  async loadData<T>(path: string): Promise<T | null> {
    try {
      const pathSegments = path.split('/');
      const docRef = doc(db, pathSegments.join('/'));
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        delete data.updatedAt;
        return data as T;
      }
      
      return null;
    } catch (error) {
      console.error('Failed to load data:', error);
      throw new Error('データの読み込みに失敗しました');
    }
  }
}