# Contributing to Podcast Script Studio

このプロジェクトへのコントリビューションをご検討いただき、ありがとうございます！

## 開発環境のセットアップ

1. **リポジトリをフォーク**
2. **ローカルにクローン**
   ```bash
   git clone https://github.com/your-username/podcast-script-studio.git
   cd podcast-script-studio
   ```
3. **依存関係をインストール**
   ```bash
   npm install
   ```
4. **環境変数を設定**
   ```bash
   cp .env.example .env.local
   # .env.local を編集して必要なAPIキーを設定
   ```

## 開発ワークフロー

1. **ブランチを作成**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **開発とテスト**
   ```bash
   npm run dev          # 開発サーバー起動
   npm run type-check   # 型チェック
   npm run lint         # リンター実行
   npm run test         # テスト実行
   ```

3. **コミット**
   ```bash
   git commit -m "feat: add amazing feature"
   ```

4. **プッシュしてPR作成**
   ```bash
   git push origin feature/your-feature-name
   ```

## コミットメッセージ規約

[Conventional Commits](https://www.conventionalcommits.org/) 形式を使用してください：

- `feat:` 新機能
- `fix:` バグ修正
- `docs:` ドキュメント更新
- `style:` コードスタイル変更
- `refactor:` リファクタリング
- `test:` テスト追加・修正
- `chore:` その他の変更

## コーディング規約

- **TypeScript**: 型安全性を重視
- **ESLint + Prettier**: コードフォーマット自動化
- **コンポーネント**: 再利用可能な設計
- **ネーミング**: 分かりやすい名前を使用
- **コメント**: 複雑なロジックには適切なコメント

## プルリクエスト

- 明確なタイトルと説明を記載
- 関連するIssueがあれば参照
- テストが通ることを確認
- 必要に応じてスクリーンショットを添付

## Issue報告

バグ報告や機能リクエストは以下の情報を含めてください：

- **環境情報**: OS, ブラウザ, Node.jsバージョン
- **再現手順**: 具体的なステップ
- **期待する動作**: 何が起こるべきか
- **実際の動作**: 何が起こったか
- **エラーメッセージ**: あれば全文

## 質問・議論

- GitHub Discussionsを使用
- 質問前にREADMEと既存のIssuesを確認
- 具体的で分かりやすい質問を心がける

ご協力ありがとうございます！🎉