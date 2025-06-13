import { useCallback } from 'react';
import { ContentGeneratorService } from '@/services/gemini';
import { useAppStore, useSettingsStore, useGenerationStore } from '@/store';
import { ContentField, APIError } from '@/types';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '@/utils';

export const useContentGeneration = () => {
  const { showNotification, setLoading } = useAppStore();
  const { settings } = useSettingsStore();
  const {
    theme,
    generatedContent,
    setTheme,
    updateContent,
    setGenerating,
    setGenerationError,
    setLastGenerated,
  } = useGenerationStore();
  
  const contentGenerator = ContentGeneratorService.getInstance();
  
  // エラーハンドリング
  const handleError = useCallback((error: unknown, field: ContentField | 'theme') => {
    console.error(`Generation error for ${field}:`, error);
    
    let errorMessage: string;
    
    if (error instanceof APIError) {
      if (error.statusCode === 429) {
        errorMessage = ERROR_MESSAGES.API_LIMIT;
      } else {
        errorMessage = error.message;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = ERROR_MESSAGES.GENERATION;
    }
    
    setGenerationError(field, errorMessage);
    showNotification(errorMessage, 'error');
  }, [setGenerationError, showNotification]);
  
  // テーマ生成
  const generateTheme = useCallback(async () => {
    setGenerating('theme', true);
    
    try {
      const newTheme = await contentGenerator.generateTheme(settings);
      setTheme(newTheme);
      setLastGenerated('theme', new Date());
      showNotification(SUCCESS_MESSAGES.THEME_GENERATED, 'success');
    } catch (error) {
      handleError(error, 'theme');
    }
  }, [settings, contentGenerator, setTheme, setLastGenerated, showNotification, setGenerating, handleError]);
  
  // 台本生成
  const generateScript = useCallback(async () => {
    if (!theme) {
      showNotification('テーマを先に設定してください', 'warning');
      return;
    }
    
    setGenerating('script', true);
    
    try {
      const script = await contentGenerator.generateScript(settings, theme);
      updateContent('script', script);
      setLastGenerated('script', new Date());
      showNotification('台本を生成しました', 'success');
    } catch (error) {
      handleError(error, 'script');
    }
  }, [theme, settings, contentGenerator, updateContent, setLastGenerated, showNotification, setGenerating, handleError]);
  
  // タイトル生成
  const generateTitle = useCallback(async () => {
    if (!generatedContent.script) {
      showNotification('台本を先に生成してください', 'warning');
      return;
    }
    
    setGenerating('title', true);
    
    try {
      const title = await contentGenerator.generateTitle(generatedContent.script, settings);
      updateContent('title', title);
      setLastGenerated('title', new Date());
      showNotification('タイトルを生成しました', 'success');
    } catch (error) {
      handleError(error, 'title');
    }
  }, [generatedContent.script, settings, contentGenerator, updateContent, setLastGenerated, showNotification, setGenerating, handleError]);
  
  // 要約生成
  const generateSummary = useCallback(async () => {
    if (!generatedContent.script) {
      showNotification('台本を先に生成してください', 'warning');
      return;
    }
    
    setGenerating('summary', true);
    
    try {
      const summary = await contentGenerator.generateSummary(generatedContent.script);
      updateContent('summary', summary);
      setLastGenerated('summary', new Date());
      showNotification('要約を生成しました', 'success');
    } catch (error) {
      handleError(error, 'summary');
    }
  }, [generatedContent.script, contentGenerator, updateContent, setLastGenerated, showNotification, setGenerating, handleError]);
  
  // SNS投稿生成
  const generateSNSPost = useCallback(async () => {
    if (!generatedContent.script || !generatedContent.title) {
      showNotification('台本とタイトルを先に生成してください', 'warning');
      return;
    }
    
    setGenerating('snsPost', true);
    
    try {
      const snsPost = await contentGenerator.generateSNSPost(
        generatedContent.script, 
        generatedContent.title, 
        settings
      );
      updateContent('snsPost', snsPost);
      setLastGenerated('snsPost', new Date());
      showNotification('SNS投稿を生成しました', 'success');
    } catch (error) {
      handleError(error, 'snsPost');
    }
  }, [generatedContent.script, generatedContent.title, settings, contentGenerator, updateContent, setLastGenerated, showNotification, setGenerating, handleError]);
  
  // 全コンテンツ一括生成
  const generateAllContent = useCallback(async () => {
    if (!theme) {
      showNotification('テーマを先に設定してください', 'warning');
      return;
    }
    
    setLoading(true);
    
    try {
      // 順次生成
      setGenerating('script', true);
      const script = await contentGenerator.generateScript(settings, theme);
      updateContent('script', script);
      setLastGenerated('script', new Date());
      
      setGenerating('title', true);
      const title = await contentGenerator.generateTitle(script, settings);
      updateContent('title', title);
      setLastGenerated('title', new Date());
      
      setGenerating('summary', true);
      const summary = await contentGenerator.generateSummary(script);
      updateContent('summary', summary);
      setLastGenerated('summary', new Date());
      
      setGenerating('snsPost', true);
      const snsPost = await contentGenerator.generateSNSPost(script, title, settings);
      updateContent('snsPost', snsPost);
      setLastGenerated('snsPost', new Date());
      
      showNotification(SUCCESS_MESSAGES.CONTENT_GENERATED, 'success');
    } catch (error) {
      handleError(error, 'script'); // 代表してscriptのエラーとして処理
    } finally {
      setLoading(false);
    }
  }, [theme, settings, contentGenerator, updateContent, setLastGenerated, showNotification, setLoading, setGenerating, handleError]);
  
  // 個別コンテンツ再生成
  const regenerateContent = useCallback(async (field: ContentField) => {
    switch (field) {
      case 'script':
        await generateScript();
        break;
      case 'title':
        await generateTitle();
        break;
      case 'summary':
        await generateSummary();
        break;
      case 'snsPost':
        await generateSNSPost();
        break;
    }
  }, [generateScript, generateTitle, generateSummary, generateSNSPost]);
  
  // サービス準備状態
  const isReady = useCallback(() => {
    return contentGenerator.isReady();
  }, [contentGenerator]);
  
  return {
    // 状態
    theme,
    generatedContent,
    isReady: isReady(),
    
    // テーマ関連
    generateTheme,
    setTheme,
    
    // コンテンツ生成
    generateScript,
    generateTitle,
    generateSummary,
    generateSNSPost,
    generateAllContent,
    regenerateContent,
    
    // コンテンツ更新
    updateContent,
  };
};