# Security Policy

## Supported Versions

このプロジェクトでサポートされているバージョンのセキュリティアップデートです。

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

セキュリティの脆弱性を発見した場合は、以下の手順に従って報告してください：

1. **公開Issues での報告は避けてください** - セキュリティの問題は非公開で報告してください
2. **GitHubのSecurity Advisoriesを使用** - このリポジトリの「Security」タブから報告
3. **詳細な情報を提供** - 脆弱性の詳細、再現手順、影響範囲を明記

## セキュリティのベストプラクティス

このアプリケーションを使用する際は、以下のセキュリティ対策を推奨します：

- 環境変数（`.env.local`）にはAPIキーなどの機密情報のみを保存
- 本番環境では必ずHTTPSを使用
- Firebase セキュリティルールを適切に設定
- APIキーの定期的なローテーション
- 依存関係の定期的なアップデート

## 報告への対応

セキュリティ脆弱性の報告を受けた場合：

1. **確認**: 48時間以内に受領確認
2. **調査**: 5営業日以内に初期調査結果を報告
3. **修正**: 重大度に応じて適切な期間内に修正
4. **公開**: 修正後、適切なタイミングで公開

ご協力ありがとうございます。