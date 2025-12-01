# Git Karma

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![English](https://img.shields.io/badge/lang-English-blue.svg)](README.md)

**Git Karma** は、オープンソースソフトウェアのための相互貢献プラットフォームです。開発者がスキルを「物々交換」できるようにすることで、OSS体験をゲーム化します。他者を助けることで「カルマ」を獲得し、そのカルマを使って自分のプロジェクトへの協力を得ることができます。

> 「あなたのプロジェクトが進まないのは、あなたが誰かのプロジェクトを助けていないからだ。」

[English README is here](README.md)

</div>

## コンセプト

Git Karmaは、開発者のための「時間銀行」として機能します。貢献の循環型経済を作り出すことで、放置されたOSSプロジェクトの問題を解決します。従来の「Issue発見」サービスとは異なり、Git Karmaは**相互的な交換**に焦点を当てています。

## 特徴

- **🤝 相互貢献マッチング**: あなたのスキル（例: Python, React）と、それを必要としているプロジェクトを自動的にマッチングさせます。
- **💎 カルマシステム**: 貢献（コード、ドキュメント、レビュー）によってポイントを獲得し、それを使って自分のリポジトリへの貢献者を募集できるクレジット制システムです。
- **🛡️ 品質の担保**: 相互評価システムにより、質の高い貢献を保証します。スパムを防ぐため、マージされたPRを通じて貢献が検証されます。
- **🔄 Pay It Forward (恩送り)**: 新しいユーザーは、自分のリポジトリを登録する前に、既存のIssueに貢献しなければならない「デポジット制」を採用しています。
- **🏆 ゲーミフィケーション**: 継続的な活動に対してバッジを獲得したり、ストリーク（連続記録）を維持したりできます。

## 始め方

1. **GitHubでサインアップ**: GitHubアカウントを使用してGit Karmaプラットフォームにログインします。
2. **Pay it Forward (デポジット)**: 助けを求める前に、まず他者を助ける必要があります。厳選された「Good First Issue」リストから1つ解決して、アカウントを有効化してください。
3. **カルマを獲得**: 貢献が検証されると、最初のカルマポイントを獲得できます。
4. **プロジェクトを登録**: 獲得したカルマを使用して、自分のリポジトリをリストアップし、貢献者を募集します。

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

# Git Karma

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![English](https://img.shields.io/badge/lang-English-blue.svg)](README.md)

**Git Karma** は、オープンソースソフトウェアのための相互貢献プラットフォームです。開発者がスキルを「物々交換」できるようにすることで、OSS体験をゲーム化します。他者を助けることで「カルマ」を獲得し、そのカルマを使って自分のプロジェクトへの協力を得ることができます。

> 「あなたのプロジェクトが進まないのは、あなたが誰かのプロジェクトを助けていないからだ。」

[English README is here](README.md)

</div>

## コンセプト

Git Karmaは、開発者のための「時間銀行」として機能します。貢献の循環型経済を作り出すことで、放置されたOSSプロジェクトの問題を解決します。従来の「Issue発見」サービスとは異なり、Git Karmaは**相互的な交換**に焦点を当てています。

## 特徴

- **🤝 相互貢献マッチング**: あなたのスキル（例: Python, React）と、それを必要としているプロジェクトを自動的にマッチングさせます。
- **💎 カルマシステム**: 貢献（コード、ドキュメント、レビュー）によってポイントを獲得し、それを使って自分のリポジトリへの貢献者を募集できるクレジット制システムです。
- **🛡️ 品質の担保**: 相互評価システムにより、質の高い貢献を保証します。スパムを防ぐため、マージされたPRを通じて貢献が検証されます。
- **🔄 Pay It Forward (恩送り)**: 新しいユーザーは、自分のリポジトリを登録する前に、既存のIssueに貢献しなければならない「デポジット制」を採用しています。
- **🏆 ゲーミフィケーション**: 継続的な活動に対してバッジを獲得したり、ストリーク（連続記録）を維持したりできます。

## 始め方

1. **GitHubでサインアップ**: GitHubアカウントを使用してGit Karmaプラットフォームにログインします。
2. **Pay it Forward (デポジット)**: 助けを求める前に、まず他者を助ける必要があります。厳選された「Good First Issue」リストから1つ解決して、アカウントを有効化してください。
3. **カルマを獲得**: 貢献が検証されると、最初のカルマポイントを獲得できます。
4. **プロジェクトを登録**: 獲得したカルマを使用して、自分のリポジトリをリストアップし、貢献者を募集します。

> *注: 当初はWebプラットフォームとして構築されますが、将来的にはターミナルで操作できるCLIツールの提供も計画しています。*

## ディレクトリ構成

- **`src/`**: Next.js App Router アプリケーション (フロントエンド & API)。
- **`prisma/`**: データベーススキーマとマイグレーション。
- **`public/`**: 静的アセット。

## 前提条件

- Node.js 18以上
- Docker & Docker Compose (ローカルデータベース用)

## 開発 (ローカルでの実行)

1. リポジトリをクローンし、依存関係をインストールします:
   ```bash
   git clone https://github.com/yamadarikuto/git-karma.git
   cd git-karma
   npm install
   ```

2. 環境変数をセットアップします:
   ```bash
   cp .env.example .env
   # 設定をカスタマイズしたい場合は .env を編集してください。Dockerを使用する場合はデフォルトのままで動作します。
   ```

3. データベースを起動します:
   ```bash
   docker-compose up -d
   ```

4. データベースを初期化します:
   ```bash
   npx prisma migrate dev
   ```

5. 開発サーバーを起動します:
   ```bash
   npm run dev
   ```

   ブラウザで [http://localhost:3000](http://localhost:3000) を開いて結果を確認してください。

### バックエンド開発環境

- **Database**: Prisma ORM (v7) を使用。
  - クライアント生成: `npx prisma generate` (出力先: `src/generated/client`)
- **Testing**: Vitest を使用。
  - テスト実行: `npm test`
- **Code Quality**: Husky と lint-staged により、コミット時に以下を自動チェックします。
  - Lint (ESLint)
  - Type Check (TypeScript)
  - Tests (Vitest)

## ドキュメント

### プロジェクトドキュメント
- **[システムアーキテクチャ](docs/ARCHITECTURE.md)**: 技術スタックと構造の概要。
- **[データベーススキーマ](docs/DATABASE.md)**: ER図とモデルの詳細。
- **[ロードマップ](docs/ROADMAP.ja.md)**: 今後の計画。
- **[ブレインストーミング](docs/FEATURE_IDEA.ja.md)**: 野心的なアイデア集。
- **[コーディング規約](docs/CODING_RULE.ja.md)**: 開発の標準と規約。
- **[AIガイドライン](docs/AI_GUIDELINE.md)**: AIツールの使用に関するポリシー。
- **[変更履歴](CHANGELOG.md)**: バージョン履歴。

### コミュニティヘルス
- **[セキュリティポリシー](.github/SECURITY.md)**: 脆弱性の報告について。
- **[サポート](.github/SUPPORT.md)**: ヘルプの求め方。
- **[行動規範](.github/CODE_OF_CONDUCT.md)**: コミュニティの基準。

## コントリビューション

コントリビューションを歓迎します！プルリクエストの送信方法、問題の報告、改善の提案については、[貢献ガイドライン](CONTRIBUTING.ja.md)をご覧ください。

## ライセンス

このプロジェクトは MIT ライセンスの下でライセンスされています。詳細は [LICENSE](LICENSE) ファイルをご覧ください。
