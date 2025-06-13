import { CharacterSettings } from '@/types';

export const PromptTemplates = {
  // テーマ生成用プロンプト
  generateTheme: (settings: CharacterSettings) => `
あなたはクリエイティブなアイデアマンです。以下のペルソナを持つキャラクターが話しそうな、ユニークで面白いPodcastのテーマを1つだけ提案してください。

キャラクター設定:
- 名前: ${settings.characterName}
- 口調: ${settings.persona}
- 性格: ${settings.personality}
- 専門分野: ${settings.expertise}
- ターゲット: ${settings.targetAudience}

要求:
- テーマは「」で囲んでください
- 15文字以内で簡潔に
- 視聴者が興味を持つ内容にしてください
- キャラクターの専門分野に関連させてください

テーマ:`,

  // 台本生成用プロンプト
  generateScript: (settings: CharacterSettings, theme: string) => `
あなたは以下の設定を持つPodcasterです。設定に完璧になりきって、指定されたテーマで魅力的なPodcast台本を作成してください。

キャラクター設定:
- 名前: ${settings.characterName}
- 口調: ${settings.persona}
- 性格: ${settings.personality}
- 専門分野: ${settings.expertise}
- ターゲット: ${settings.targetAudience}

テーマ: 「${theme}」

要求:
- 約3分間の台本 (800-1000文字)
- キャラクターの口調を完璧に再現してください
- 聴きやすい構成 (導入→本題→まとめ)
- 専門知識を分かりやすく説明
- オープニング・エンディングは含めない（本文のみ）
- 自然な話し言葉で書いてください

台本:`,

  // タイトル生成用プロンプト
  generateTitle: (script: string, settings: CharacterSettings) => `
以下のPodcast台本の内容を要約し、視聴者がクリックしたくなるような魅力的なタイトルを1つ生成してください。

台本:
${script}

キャラクター: ${settings.characterName}
ターゲット: ${settings.targetAudience}

要求:
- 20文字以内
- キャッチーで印象的
- 内容を的確に表現
- 検索されやすいキーワードを含む
- 数字や具体的な表現を使う

タイトル:`,

  // 要約生成用プロンプト
  generateSummary: (script: string) => `
以下のPodcast台本の内容を、配信プラットフォームの概要欄用に要約してください。

台本:
${script}

要求:
- 150字程度
- 内容のポイントを簡潔に
- 視聴者が「聴きたい」と思う表現
- 検索キーワードを自然に含める
- 具体的な内容に触れる

要約:`,

  // SNS投稿生成用プロンプト
  generateSNSPost: (script: string, title: string, settings: CharacterSettings) => `
以下のPodcast台本とタイトルを元に、X(旧Twitter)用の告知投稿を作成してください。

タイトル: ${title}
台本概要: ${script.substring(0, 200)}...
キャラクター: ${settings.characterName}

要求:
- 280文字以内
- 魅力的で拡散されやすい内容
- 適切な絵文字を使用（2-3個程度）
- 関連ハッシュタグを3-5個
- 聴きたくなるような表現
- 親しみやすい口調

投稿文:`
};

// プロンプト用のユーティリティ関数
export const PromptUtils = {
  // 文字数制限チェック
  validateLength: (text: string, maxLength: number): boolean => {
    return text.length <= maxLength;
  },
  
  // テーマ抽出（「」で囲まれた部分を取得）
  extractTheme: (response: string): string => {
    const themeMatch = response.match(/「(.*?)」/);
    return themeMatch ? themeMatch[1] : response.trim();
  },
  
  // レスポンステキストのクリーンアップ
  cleanResponse: (text: string): string => {
    return text
      .trim()
      .replace(/^(台本:|タイトル:|要約:|投稿文:|テーマ:)\s*/i, '')
      .replace(/\n{3,}/g, '\n\n');
  },
  
  // キャラクター設定の妥当性チェック
  validateSettings: (settings: CharacterSettings): string[] => {
    const errors: string[] = [];
    
    if (!settings.characterName.trim()) {
      errors.push('キャラクター名が設定されていません');
    }
    if (!settings.persona.trim()) {
      errors.push('口調が設定されていません');
    }
    if (!settings.personality.trim()) {
      errors.push('性格が設定されていません');
    }
    if (!settings.expertise.trim()) {
      errors.push('専門分野が設定されていません');
    }
    if (!settings.targetAudience.trim()) {
      errors.push('ターゲット視聴者が設定されていません');
    }
    
    return errors;
  }
};