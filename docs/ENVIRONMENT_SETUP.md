# 環境構築ガイド: 開発環境(Development) vs 本番環境(Production)

このドキュメントでは、GitKarmaの認証機能やデータベース接続において、ローカル開発環境と本番環境をどのように使い分けるかを解説します。

## 1. 概要

| 項目 | 開発環境 (Local) | 本番環境 (Production) |
| :--- | :--- | :--- |
| **URL** | `http://localhost:3000` | `https://git-karma.com` (例) |
| **環境変数** | `.env` ファイル | Vercel等の管理画面 |
| **GitHub App** | GitKarma (Local) | GitKarma (Prod) |
| **Database** | Docker (Local PostgreSQL) | Vercel Postgres / Supabase |

---

## 2. GitHub OAuth App の使い分け

GitHubログイン機能を使うには、GitHub上で「OAuth App」を作成する必要があります。
セキュリティとリダイレクト設定のため、**開発用と本番用で別々のAppを作成**します。

### 🅰️ 開発用 (Local)
手元のPCで動かすための設定です。

- **App Name**: `GitKarma (Local)`
- **Homepage URL**: `http://localhost:3000`
- **Callback URL**: `http://localhost:3000/api/auth/callback/github`
- **Client ID/Secret**: `.env` ファイルに記述します。

### 🅱️ 本番用 (Production)
インターネット上に公開するための設定です。

- **App Name**: `GitKarma`
- **Homepage URL**: `https://your-domain.com`
- **Callback URL**: `https://your-domain.com/api/auth/callback/github`
- **Client ID/Secret**: ホスティングサービス（Vercelなど）の環境変数設定画面に入力します。

---

## 3. 環境変数の管理

### 開発環境 (.env)
プロジェクトルートにある `.env` ファイルで管理します。このファイルは **Gitにコミットしてはいけません**（`.gitignore` に含める）。

```env
# .env (Local)
# .env (Local)
DATABASE_URL="postgresql://user:password@localhost:6543/gitkarma?pgbouncer=true" # Transaction Pooler
DIRECT_URL="postgresql://user:password@localhost:5432/gitkarma" # Session/Direct
AUTH_SECRET="local-generated-secret"
AUTH_GITHUB_ID="local-app-client-id"
AUTH_GITHUB_SECRET="local-app-client-secret"
```

### マイグレーションの実行
マイグレーション（テーブル作成・変更）を行う際は、以下のコマンドを使用してください。
`DIRECT_URL` を自動的に使用して実行されます。

```bash
npm run migrate
```

### 本番環境 (Vercel Variables)
Vercelのダッシュボード (`Settings` > `Environment Variables`) で設定します。

- `DATABASE_URL`: 本番DBの接続文字列
- `AUTH_SECRET`: 本番用の強力なランダム文字列
- `AUTH_GITHUB_ID`: 本番用GitHub AppのID
- `AUTH_GITHUB_SECRET`: 本番用GitHub AppのSecret

---

## 4. データベースの分離

### 開発環境
Docker Composeを使用して、ローカルにPostgreSQLを立ち上げます。
データは自分のPC内にのみ保存され、壊しても問題ありません。

### 本番環境
マネージドデータベース（Vercel Postgres, Supabase, Neonなど）を使用します。
本番データはここに保存されます。開発中のテストデータが混ざらないように、完全に別のデータベースを使用します。

## 5. 運用フロー

1.  **開発**: Local設定で機能を実装・テストする。
2.  **デプロイ**: コードをGitHubにプッシュし、Vercelにデプロイする。
3.  **本番確認**: Production設定（Vercel環境変数）が正しく設定されていれば、本番URLでログイン機能が動作する。
