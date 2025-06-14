import { CharacterSettings } from '@/types';
import { GeminiAPIService } from './api';
import { PromptTemplates, PromptUtils } from './prompts';

export class ContentGeneratorService {
  private static instance: ContentGeneratorService;
  private geminiAPI: GeminiAPIService;
  
  private constructor() {
    this.geminiAPI = GeminiAPIService.getInstance();
  }
  
  static getInstance(): ContentGeneratorService {
    if (!this.instance) {
      this.instance = new ContentGeneratorService();
    }
    return this.instance;
  }
  
  // テーマ生成
  async generateTheme(settings: CharacterSettings): Promise<string> {
    const validationErrors = PromptUtils.validateSettings(settings);
    if (validationErrors.length > 0) {
      throw new Error(`設定に不備があります: ${validationErrors.join(', ')}`);
    }
    
    const prompt = PromptTemplates.generateTheme(settings);
    const response = await this.geminiAPI.generateText(prompt);
    
    // テーマを抽出してクリーンアップ
    const theme = PromptUtils.extractTheme(response);
    
    if (!theme || theme.length === 0) {
      throw new Error('テーマの生成に失敗しました。再試行してください。');
    }
    
    if (theme.length > 20) {
      // 長すぎる場合は切り詰める
      return theme.substring(0, 20);
    }
    
    return theme;
  }
  
  // 台本生成
  async generateScript(settings: CharacterSettings, theme: string): Promise<string> {
    if (!theme.trim()) {
      throw new Error('テーマが設定されていません。');
    }
    
    const validationErrors = PromptUtils.validateSettings(settings);
    if (validationErrors.length > 0) {
      throw new Error(`設定に不備があります: ${validationErrors.join(', ')}`);
    }
    
    const prompt = PromptTemplates.generateScript(settings, theme);
    const response = await this.geminiAPI.generateText(prompt);
    
    const script = PromptUtils.cleanResponse(response);
    
    if (!script || script.length < 100) {
      throw new Error('台本の生成に失敗しました。再試行してください。');
    }
    
    return script;
  }
  
  // タイトル生成
  async generateTitle(script: string, settings: CharacterSettings): Promise<string> {
    if (!script.trim()) {
      throw new Error('台本が設定されていません。');
    }
    
    // 台本が長すぎる場合は最初の500文字のみ使用
    const truncatedScript = script.length > 500 ? script.substring(0, 500) + '...' : script;
    
    const prompt = PromptTemplates.generateTitle(truncatedScript, settings);
    const response = await this.geminiAPI.generateText(prompt);
    
    const title = PromptUtils.cleanResponse(response);
    
    if (!title || title.length === 0) {
      throw new Error('タイトルの生成に失敗しました。再試行してください。');
    }
    
    // タイトルが長すぎる場合は切り詰める
    if (title.length > 30) {
      return title.substring(0, 30);
    }
    
    return title;
  }
  
  // 要約生成
  async generateSummary(script: string): Promise<string> {
    if (!script.trim()) {
      throw new Error('台本が設定されていません。');
    }
    
    // 台本が長すぎる場合は最初の800文字のみ使用
    const truncatedScript = script.length > 800 ? script.substring(0, 800) + '...' : script;
    
    const prompt = PromptTemplates.generateSummary(truncatedScript);
    const response = await this.geminiAPI.generateText(prompt);
    
    const summary = PromptUtils.cleanResponse(response);
    
    if (!summary || summary.length === 0) {
      throw new Error('要約の生成に失敗しました。再試行してください。');
    }
    
    // 要約が長すぎる場合は切り詰める
    if (summary.length > 200) {
      return summary.substring(0, 200);
    }
    
    return summary;
  }
  
  // SNS投稿生成
  async generateSNSPost(script: string, title: string, settings: CharacterSettings): Promise<string> {
    if (!script.trim()) {
      throw new Error('台本が設定されていません。');
    }
    
    if (!title.trim()) {
      throw new Error('タイトルが設定されていません。');
    }
    
    const prompt = PromptTemplates.generateSNSPost(script, title, settings);
    const response = await this.geminiAPI.generateText(prompt);
    
    const snsPost = PromptUtils.cleanResponse(response);
    
    if (!snsPost || snsPost.length === 0) {
      throw new Error('SNS投稿の生成に失敗しました。再試行してください。');
    }
    
    // X(Twitter)の文字制限に合わせる
    if (snsPost.length > 280) {
      return snsPost.substring(0, 280);
    }
    
    return snsPost;
  }
  
  // 全コンテンツ一括生成
  async generateAllContent(settings: CharacterSettings, theme: string): Promise<{
    script: string;
    title: string;
    summary: string;
    snsPost: string;
  }> {
    // 順次生成（各ステップで前の結果を使用）
    const script = await this.generateScript(settings, theme);
    const title = await this.generateTitle(script, settings);
    const summary = await this.generateSummary(script);
    const snsPost = await this.generateSNSPost(script, title, settings);
    
    return {
      script,
      title,
      summary,
      snsPost,
    };
  }
  
  // サービス状態確認
  isReady(): boolean {
    return this.geminiAPI.isConfigured();
  }
  
  // 接続テスト
  async testConnection(): Promise<boolean> {
    return await this.geminiAPI.testConnection();
  }
}