# 環境構築ガイド: 開発環境(Development) vs 本番環境(Production)

このドキュメントでは、GitKarmaの認証機能やデータベース接続において、ローカル開発環境と本番環境をどのように使い分けるかを解説します。

## 1. 概要

| 項目 | 開発環境 (Local) | 本番環境 (Production) |
| :--- | :--- | :--- |
| **URL** | `http://localhost:3000` | `https://git-karma.com` (例) |
| **環境変数** | `.env.local` (優先), `.env` | Vercel等の管理画面 |
| **GitHub App** | GitKarma (Local) | GitKarma (Prod) |
| **Database** | **Supabase Local (Docker)** | Supabase Cloud (Managed) |

---

## 2. GitHub OAuth App の使い分け

GitHubログイン機能を使うには、GitHub上で「OAuth App」を作成する必要があります。
セキュリティとリダイレクト設定のため、**開発用と本番用で別々のAppを作成**します。

### 🅰️ 開発用 (Local)
手元のPCで動かすための設定です。

- **App Name**: `GitKarma (Local)`
- **Homepage URL**: `http://localhost:3000`
- **Callback URL**: `http://localhost:3000/api/auth/callback/github`
- **Client ID/Secret**: `.env.local` ファイルに記述します。

### 🅱️ 本番用 (Production)
インターネット上に公開するための設定です。

- **App Name**: `GitKarma`
- **Homepage URL**: `https://your-domain.com`
- **Callback URL**: `https://your-domain.com/api/auth/callback/github`
- **Client ID/Secret**: ホスティングサービス（Vercelなど）の環境変数設定画面に入力します。

---

## 3. 環境変数の管理

### 開発環境 (.env.local)
開発環境では、`.env` よりも優先される **`.env.local`** を使用します。
このファイルはGitにコミットされません。**秘密鍵やローカルDB接続情報はここに記述します。**

```env
# .env.local (Local Development)
# Supabase Localのデフォルト接続情報
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:54322/postgres"
DIRECT_URL="postgresql://postgres:postgres@127.0.0.1:54322/postgres"

# ローカル生成したAUTH_SECRET (Vercel Prodとは別物)
AUTH_SECRET="your-generated-random-secret"

# 開発用GitHub App
AUTH_GITHUB_ID="local-app-client-id"
AUTH_GITHUB_SECRET="local-app-client-secret"
```

### 本番環境 (Vercel Variables)
Vercelのダッシュボード (`Settings` > `Environment Variables`) で設定します。

- `DATABASE_URL`: 本番DB (Supabase Cloud) の接続文字列
- `AUTH_SECRET`: 本番用の強力なランダム文字列
- `AUTH_GITHUB_ID`: 本番用GitHub AppのID
- `AUTH_GITHUB_SECRET`: 本番用GitHub AppのSecret

---

## 4. データベース (Supabase Local)

本プロジェクトでは、開発環境のデータベースとして **Supabase Local (Docker)** を推奨しています。

### セットアップ手順
1.  **依存関係のインストール**:
    ```bash
    npm install
    # Supabase CLIもインストールされます
    ```
2.  **起動**:
    ```bash
    npm run supa:start
    ```
    初回はDockerイメージのダウンロードに時間がかかります。
3.  **スキーマの適用**:
    ローカルDBに対して直近のマイグレーションを適用します。
    ```bash
    npm run migrate:local
    ```

### 便利コマンド (package.json)
| コマンド | 説明 |
| :--- | :--- |
| `npm run supa:start` | ローカルSupabase/DBを起動 |
| `npm run supa:stop` | ローカルSupabase/DBを停止 |
| `npm run supa:status`| ステータス確認 (DB URL等) |
| `npm run db:reset` | DBを初期化し、全マイグレーションを再適用 |

> [!NOTE]
> `npm run migrate` (dev) は、`.env` を参照するため、通常は本番や共通設定用です。
> ローカルDBに変更を適用する際は、必ず **`npm run migrate:local`** を使用してください。

---

## 5. 運用フロー

1.  **開発**:
    - `npm run supa:start` でDB起動。
    - コード編集。
    - DBスキーマ変更時は `schema.prisma` を編集し、`npm run migrate:local`。
2.  **デプロイ**:
    - コードをGitHubにプッシュ（自動でVercelにデプロイ）。
    - 本番DBへのマイグレーションは `npm run migrate:prod` 等で実施（またはCI/CDで自動化）。
3.  **本番確認**:
    - 本番URLで動作確認。
