export interface GeneratedContent {
  script: string;
  title: string;
  summary: string;
  snsPost: string;
}

export type ContentField = keyof GeneratedContent;

export interface ContentGeneration {
  theme: string;
  content: GeneratedContent;
  createdAt: Date;
  sessionId: string;
}

// コンテンツ統計
export interface ContentStats {
  scriptWordCount: number;
  titleLength: number;
  summaryLength: number;
  snsPostLength: number;
  isValid: boolean;
}

// 生成状態
export interface GenerationState {
  isGenerating: Record<ContentField | 'theme', boolean>;
  error: Record<ContentField | 'theme', string | null>;
  lastGenerated: Record<ContentField | 'theme', Date | null>;
}

// 生成リクエスト
export interface GenerationRequest {
  type: ContentField | 'theme';
  settings?: any;
  theme?: string;
  script?: string;
  title?: string;
}