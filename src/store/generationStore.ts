import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { GeneratedContent, ContentField } from '@/types';

interface GenerationState {
  // データ状態
  theme: string;
  generatedContent: GeneratedContent;
  
  // 生成状態
  isGenerating: Record<ContentField | 'theme', boolean>;
  generationErrors: Record<ContentField | 'theme', string | null>;
  lastGenerated: Record<ContentField | 'theme', Date | null>;
  
  // アクション
  setTheme: (theme: string) => void;
  updateContent: (field: ContentField, value: string) => void;
  setGenerating: (field: ContentField | 'theme', isGenerating: boolean) => void;
  setGenerationError: (field: ContentField | 'theme', error: string | null) => void;
  setLastGenerated: (field: ContentField | 'theme', date: Date) => void;
  resetGeneration: () => void;
  resetContent: () => void;
  
  // 統計
  getContentStats: () => {
    scriptWordCount: number;
    titleLength: number;
    summaryLength: number;
    snsPostLength: number;
    isValid: boolean;
  };
}

const defaultContent: GeneratedContent = {
  script: '',
  title: '',
  summary: '',
  snsPost: '',
};

const defaultGenerationState = {
  isGenerating: {
    theme: false,
    script: false,
    title: false,
    summary: false,
    snsPost: false,
  },
  generationErrors: {
    theme: null,
    script: null,
    title: null,
    summary: null,
    snsPost: null,
  },
  lastGenerated: {
    theme: null,
    script: null,
    title: null,
    summary: null,
    snsPost: null,
  },
};

export const useGenerationStore = create<GenerationState>()(
  devtools(
    (set, get) => ({
      // 初期状態
      theme: '',
      generatedContent: defaultContent,
      ...defaultGenerationState,
      
      // テーマ
      setTheme: (theme) => {
        set({ theme }, false, 'setTheme');
      },
      
      // コンテンツ更新
      updateContent: (field, value) => {
        set(
          (state) => ({
            generatedContent: {
              ...state.generatedContent,
              [field]: value,
            },
          }),
          false,
          'updateContent'
        );
      },
      
      // 生成状態管理
      setGenerating: (field, isGenerating) => {
        set(
          (state) => ({
            isGenerating: {
              ...state.isGenerating,
              [field]: isGenerating,
            },
            // 生成開始時はエラーをクリア
            generationErrors: isGenerating
              ? {
                  ...state.generationErrors,
                  [field]: null,
                }
              : state.generationErrors,
          }),
          false,
          'setGenerating'
        );
      },
      
      setGenerationError: (field, error) => {
        set(
          (state) => ({
            generationErrors: {
              ...state.generationErrors,
              [field]: error,
            },
            // エラー発生時は生成中フラグを解除
            isGenerating: {
              ...state.isGenerating,
              [field]: false,
            },
          }),
          false,
          'setGenerationError'
        );
      },
      
      setLastGenerated: (field, date) => {
        set(
          (state) => ({
            lastGenerated: {
              ...state.lastGenerated,
              [field]: date,
            },
            // 生成完了時は生成中フラグを解除
            isGenerating: {
              ...state.isGenerating,
              [field]: false,
            },
          }),
          false,
          'setLastGenerated'
        );
      },
      
      // リセット
      resetGeneration: () => {
        set({
          theme: '',
          generatedContent: defaultContent,
          ...defaultGenerationState,
        }, false, 'resetGeneration');
      },
      
      resetContent: () => {
        set({
          generatedContent: defaultContent,
        }, false, 'resetContent');
      },
      
      // 統計計算
      getContentStats: () => {
        const { generatedContent } = get();
        
        const scriptWordCount = generatedContent.script
          ? generatedContent.script.replace(/\s+/g, ' ').trim().split(' ').length
          : 0;
        
        const titleLength = generatedContent.title.length;
        const summaryLength = generatedContent.summary.length;
        const snsPostLength = generatedContent.snsPost.length;
        
        const isValid = 
          generatedContent.script.length > 0 && 
          generatedContent.title.length > 0;
        
        return {
          scriptWordCount,
          titleLength,
          summaryLength,
          snsPostLength,
          isValid,
        };
      },
    }),
    {
      name: 'generation-store',
    }
  )
);