import { APIError, GeminiRequest, GeminiResponse } from '@/types';

export class GeminiAPIService {
  private static instance: GeminiAPIService;
  private apiKey: string;
  private baseURL: string = 'https://generativelanguage.googleapis.com/v1beta';
  private requestQueue: Array<() => Promise<any>> = [];
  private isProcessing = false;
  private lastRequestTime = 0;
  private minInterval = 1000; // 1秒間隔
  
  private constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!this.apiKey) {
      throw new Error('Gemini API key not configured. Please check VITE_GEMINI_API_KEY in your environment variables.');
    }
  }
  
  static getInstance(): GeminiAPIService {
    if (!this.instance) {
      this.instance = new GeminiAPIService();
    }
    return this.instance;
  }
  
  // レート制限対応の遅延
  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  // リクエストキューの処理
  private async processQueue(): Promise<void> {
    if (this.isProcessing) return;
    this.isProcessing = true;
    
    while (this.requestQueue.length > 0) {
      const request = this.requestQueue.shift()!;
      
      // レート制限チェック
      const timeSinceLastRequest = Date.now() - this.lastRequestTime;
      if (timeSinceLastRequest < this.minInterval) {
        await this.delay(this.minInterval - timeSinceLastRequest);
      }
      
      try {
        await request();
        this.lastRequestTime = Date.now();
      } catch (error) {
        console.error('Queued request failed:', error);
      }
    }
    
    this.isProcessing = false;
  }
  
  // 基本API呼び出しメソッド
  private async makeRequest(prompt: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.requestQueue.push(async () => {
        try {
          const requestBody: GeminiRequest = {
            contents: [
              {
                parts: [
                  {
                    text: prompt
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 2048,
              stopSequences: []
            }
          };
          
          const response = await fetch(
            `${this.baseURL}/models/gemini-2.0-flash:generateContent?key=${this.apiKey}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(requestBody),
            }
          );
          
          if (!response.ok) {
            const errorText = await response.text();
            let errorMessage = `HTTP ${response.status}`;
            
            try {
              const errorData = JSON.parse(errorText);
              errorMessage = errorData.error?.message || errorMessage;
            } catch {
              errorMessage = errorText || errorMessage;
            }
            
            if (response.status === 429) {
              throw new APIError('API呼び出し制限に達しました。しばらく待ってから再試行してください。', response.status, true);
            } else if (response.status >= 500) {
              throw new APIError('サーバーエラーが発生しました。', response.status, true);
            } else {
              throw new APIError(`API エラー: ${errorMessage}`, response.status, false);
            }
          }
          
          const data: GeminiResponse = await response.json();
          
          if (!data.candidates || data.candidates.length === 0) {
            throw new APIError('APIから有効な応答がありませんでした。', undefined, false);
          }
          
          const candidate = data.candidates[0];
          if (!candidate.content?.parts?.[0]?.text) {
            throw new APIError('APIレスポンスの形式が不正です。', undefined, false);
          }
          
          resolve(candidate.content.parts[0].text);
        } catch (error) {
          if (error instanceof APIError) {
            reject(error);
          } else if (error instanceof TypeError) {
            reject(new APIError('ネットワーク接続に問題があります。', undefined, true));
          } else {
            reject(new APIError(`予期しないエラー: ${error}`, undefined, false));
          }
        }
      });
      
      this.processQueue();
    });
  }
  
  // 公開メソッド: テキスト生成
  async generateText(prompt: string): Promise<string> {
    if (!prompt.trim()) {
      throw new APIError('プロンプトが空です。', undefined, false);
    }
    
    try {
      const response = await this.makeRequest(prompt);
      return response.trim();
    } catch (error) {
      console.error('Gemini API generation failed:', error);
      throw error;
    }
  }
  
  // APIキーの状態確認
  isConfigured(): boolean {
    return !!this.apiKey;
  }
  
  // API接続テスト
  async testConnection(): Promise<boolean> {
    try {
      await this.generateText('Hello, can you respond with "OK"?');
      return true;
    } catch (error) {
      console.error('Gemini API connection test failed:', error);
      return false;
    }
  }
  
  // 統計情報
  getStats() {
    return {
      queueLength: this.requestQueue.length,
      isProcessing: this.isProcessing,
      lastRequestTime: this.lastRequestTime,
      configured: this.isConfigured()
    };
  }
}