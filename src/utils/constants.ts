// アプリケーション定数

// ステップ定義
export const STEPS = {
  SETTINGS: 1 as const,
  THEME: 2 as const,
  GENERATION: 3 as const,
  OUTPUT: 4 as const,
} as const;

// ステップラベル
export const STEP_LABELS = {
  [STEPS.SETTINGS]: '初期設定',
  [STEPS.THEME]: 'テーマ決定',
  [STEPS.GENERATION]: 'コンテンツ生成',
  [STEPS.OUTPUT]: '最終出力',
} as const;

// ステップ説明
export const STEP_DESCRIPTIONS = {
  [STEPS.SETTINGS]: 'キャラクターの個性や台本の骨格を設定します',
  [STEPS.THEME]: '今回のPodcastのテーマを決定します',
  [STEPS.GENERATION]: 'AI が台本、タイトル、要約、SNS投稿を生成します',
  [STEPS.OUTPUT]: '完成した台本をコピーしてご活用ください',
} as const;

// フォームフィールド定義
export const CHARACTER_FORM_FIELDS = [
  {
    name: 'characterName' as const,
    label: 'キャラクター名',
    placeholder: '例：AIアシスタントのジェミニ',
    type: 'input' as const,
    required: true,
    maxLength: 50,
  },
  {
    name: 'persona' as const,
    label: '口調・話し方の特徴',
    placeholder: '例：常に敬語を使い、分かりやすい比喩を多用する。語尾に「ですね」をつけることが多い。',
    type: 'textarea' as const,
    required: true,
    minLength: 10,
    maxLength: 500,
    rows: 3,
  },
  {
    name: 'personality' as const,
    label: '性格',
    placeholder: '例：知的で好奇心旺盛、時々お茶目。相手の立場に立って考える思いやりがある。',
    type: 'input' as const,
    required: true,
    minLength: 5,
    maxLength: 200,
  },
  {
    name: 'expertise' as const,
    label: '専門分野・得意な話題',
    placeholder: '例：最新のAI技術、プログラミング、宇宙科学、哲学的な思考',
    type: 'textarea' as const,
    required: true,
    minLength: 5,
    maxLength: 200,
    rows: 2,
  },
  {
    name: 'targetAudience' as const,
    label: 'ターゲット視聴者',
    placeholder: '例：テクノロジーに興味がある20代〜40代の男女、新しい知識を求める学習意欲の高い人',
    type: 'textarea' as const,
    required: true,
    minLength: 10,
    maxLength: 300,
    rows: 2,
  },
  {
    name: 'openingScript' as const,
    label: 'オープニングの挨拶',
    placeholder: '例：皆さん、こんにちは！あなたの知的好奇心を満たす、ジェミニのポッドキャストへようこそ。',
    type: 'textarea' as const,
    required: false,
    maxLength: 500,
    rows: 3,
  },
  {
    name: 'closingScript' as const,
    label: 'エンディングの締め',
    placeholder: '例：さて、本日の話はここまで。次回もあなたを新たな発見へとお連れします。お楽しみに！',
    type: 'textarea' as const,
    required: false,
    maxLength: 500,
    rows: 3,
  },
] as const;

// コンテンツフィールド定義
export const CONTENT_FIELDS = {
  script: {
    label: '台本',
    description: 'メインのPodcast台本',
    maxLength: 2000,
    rows: 15,
  },
  title: {
    label: 'タイトル',
    description: 'Podcastのタイトル',
    maxLength: 50,
    rows: 2,
  },
  summary: {
    label: '要約（概要欄用）',
    description: '配信プラットフォームの概要欄に使用',
    maxLength: 300,
    rows: 4,
  },
  snsPost: {
    label: 'SNS告知ポスト',
    description: 'X(Twitter)などでの告知用',
    maxLength: 280,
    rows: 5,
  },
} as const;

// API設定
export const API_CONFIG = {
  GEMINI: {
    MAX_RETRIES: 3,
    TIMEOUT: 30000, // 30秒
    RATE_LIMIT_DELAY: 1000, // 1秒
  },
  FIREBASE: {
    TIMEOUT: 10000, // 10秒
  },
} as const;

// UI設定
export const UI_CONFIG = {
  NOTIFICATION_DURATION: 3000, // 3秒
  LOADING_DELAY: 500, // ローディング表示の最小時間
  DEBOUNCE_DELAY: 300, // 入力のデバウンス時間
  ANIMATION_DURATION: 200, // アニメーション時間
} as const;

// ローカルストレージキー
export const STORAGE_KEYS = {
  SETTINGS: 'podcast-studio-settings',
  THEME: 'podcast-studio-theme',
  DRAFT_CONTENT: 'podcast-studio-draft',
  USER_PREFERENCES: 'podcast-studio-preferences',
} as const;

// エラーメッセージ
export const ERROR_MESSAGES = {
  NETWORK: 'ネットワーク接続に問題があります。接続を確認してください。',
  API_LIMIT: 'API呼び出し制限に達しました。しばらく待ってから再試行してください。',
  VALIDATION: '入力内容に不備があります。確認してください。',
  GENERATION: 'コンテンツの生成に失敗しました。再試行してください。',
  SAVE: 'データの保存に失敗しました。',
  LOAD: 'データの読み込みに失敗しました。',
  UNKNOWN: '予期しないエラーが発生しました。',
} as const;

// 成功メッセージ
export const SUCCESS_MESSAGES = {
  SETTINGS_SAVED: '設定を保存しました！',
  THEME_GENERATED: '新しいテーマを生成しました！',
  CONTENT_GENERATED: 'コンテンツを生成しました！',
  COPIED: 'クリップボードにコピーしました！',
  RESET: '設定をリセットしました。',
} as const;