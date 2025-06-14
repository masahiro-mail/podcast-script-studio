// Firebase v9 module declarations
declare module 'firebase/app' {
  export function initializeApp(config: any): any;
}

declare module 'firebase/auth' {
  export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    emailVerified: boolean;
    isAnonymous: boolean;
  }
  
  export function getAuth(app?: any): any;
  export function signInAnonymously(auth: any): Promise<any>;
  export function signInWithCustomToken(auth: any, token: string): Promise<any>;
  export function onAuthStateChanged(auth: any, callback: (user: User | null) => void): () => void;
}

declare module 'firebase/firestore' {
  export function getFirestore(app?: any): any;
  export function doc(firestore: any, path: string, ...pathSegments: string[]): any;
  export function setDoc(docRef: any, data: any): Promise<void>;
  export function getDoc(docRef: any): Promise<any>;
  export function collection(firestore: any, path: string, ...pathSegments: string[]): any;
  export function query(ref: any, ...constraints: any[]): any;
  export function orderBy(field: string, direction?: 'asc' | 'desc'): any;
  export function limit(limit: number): any;
  export function getDocs(query: any): Promise<any>;
  
  export class Timestamp {
    static now(): Timestamp;
    static fromDate(date: Date): Timestamp;
    toDate(): Date;
  }
}