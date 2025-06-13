import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Firebase アプリの初期化
export const app = initializeApp(firebaseConfig);

// 認証とFirestoreのインスタンス
export const auth = getAuth(app);
export const db = getFirestore(app);

// アプリID
export const appId = import.meta.env.VITE_APP_ID || 'podcast-studio-app';

// 環境チェック
export const isDevelopment = import.meta.env.DEV;
export const isProduction = import.meta.env.PROD;