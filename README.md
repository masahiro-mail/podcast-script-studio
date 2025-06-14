# Podcast Script Studio

AIキャラクター台本生成ツール - キャラクター設定に基づいて高品質なPodcast台本を自動生成

## 🎯 概要

Podcast Script Studioは、キャラクターペルソナを設定することで、AI（Gemini API）が台本、タイトル、要約、SNS投稿を自動生成するWebアプリケーションです。

### 主な機能

- **4ステップウィザード**: 直感的な操作で台本作成
- **キャラクターペルソナ設定**: 口調、性格、専門分野を詳細設定
- **AI自動生成**: テーマから台本まで全自動
- **リアルタイム編集**: 生成後の自由な編集
- **一括コピー機能**: 完成した台本を簡単にコピー

## 🏗️ 技術スタック

- **フロントエンド**: React 18, TypeScript, Tailwind CSS
- **状態管理**: Zustand
- **データベース**: Firebase Firestore
- **認証**: Firebase Authentication (匿名認証)
- **AI API**: Google Gemini 2.0 Flash
- **ビルドツール**: Vite
- **アイコン**: Lucide React

## 🚀 セットアップ

### 前提条件

- Node.js 18以上
- Firebase プロジェクト
- Gemini API キー

### インストール

1. **リポジトリのクローン**
```bash
git clone <repository-url>
cd podcast-script-studio
```

2. **依存関係のインストール**
```bash
npm install
```

3. **環境変数の設定**
```bash
cp .env.example .env.local
```

`.env.local` を編集して必要な環境変数を設定：

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Gemini API Configuration
VITE_GEMINI_API_KEY=your_gemini_api_key

# App Configuration
VITE_APP_ID=podcast-studio-app
```

### 開発サーバー起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開いてアプリケーションにアクセス。

## 🌐 Vercel デプロイメント

このプロジェクトは Vercel での本番デプロイに最適化されています。

### 自動デプロイ（推奨）

1. **Vercel アカウントにログイン**: [vercel.com](https://vercel.com)
2. **GitHub リポジトリを接続**
3. **環境変数を設定**:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_GEMINI_API_KEY`
4. **自動デプロイ開始**

### 手動デプロイ

```bash
# Vercel CLI をインストール
npm install -g vercel

# プロジェクトディレクトリでデプロイ
vercel --prod
```

## 📱 使用方法

### ステップ1: 初期設定
- キャラクター名、口調、性格、専門分野を設定
- ターゲット視聴者を明確化
- オープニング・エンディングの定型文を設定（任意）

### ステップ2: テーマ決定
- 手動でテーマを入力
- または、AI にテーマを自動生成させる

### ステップ3: コンテンツ生成・編集
- AI が台本、タイトル、要約、SNS投稿を自動生成
- 各項目を個別に編集可能
- 個別再生成機能

### ステップ4: 最終出力
- 完成版台本（定型文込み）をコピー
- SNS告知ポストをコピー
- 各種統計情報を確認

## 🛠️ 開発

### ビルド

```bash
npm run build
```

### 型チェック

```bash
npm run type-check
```

### リント

```bash
npm run lint
npm run lint:fix
```

### テスト

```bash
npm run test
npm run test:ui
```

## 📁 プロジェクト構造

```
src/
├── components/          # Reactコンポーネント
│   ├── ui/             # 再利用可能UIコンポーネント
│   ├── layout/         # レイアウトコンポーネント
│   └── steps/          # ステップ別コンポーネント
├── hooks/              # カスタムHooks
├── services/           # 外部サービス統合
│   ├── firebase/       # Firebase関連
│   └── gemini/         # Gemini API関連
├── store/              # Zustand状態管理
├── types/              # TypeScript型定義
├── utils/              # ユーティリティ関数
└── styles/             # スタイルファイル
```

## 🔧 設定ファイル

- `vite.config.ts`: Vite設定
- `tailwind.config.js`: Tailwind CSS設定
- `tsconfig.json`: TypeScript設定
- `package.json`: 依存関係とスクリプト

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📞 サポート

問題や質問がある場合は、[Issues](https://github.com/your-repo/issues)で報告してください。

---

Made with ❤️ using Claude & Gemini AI