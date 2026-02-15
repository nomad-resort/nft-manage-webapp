# NFT Management Webapp

Shopifyの注文情報をフックとして、自動的にNFT（Crossmint経由）をミント・管理するためのダッシュボードアプリケーションです。

## 概要

このWebアプリケーションは、Shopifyストアと連携し、特定の商品が購入された際に自動的にNFTを発行する仕組みを管理します。
管理者はダッシュボードを通じて、Shopifyの商品IDとNFTコレクションのマッピング設定、注文履歴の確認、システム監査ログの閲覧などを行うことができます。

## 主な機能

- **ダッシュボード**: ミント状況やシステム稼働状況の可視化
- **商品マッピング管理**: Shopifyの商品IDとNFT設定の紐付け管理
- **注文履歴**: Shopifyからの注文とNFTミントステータスの追跡
- **監査ログ**: システム操作やエラーログの確認
- **Webフック受信**: Shopifyからの注文通知を受け取り、ミント処理をトリガー
- **メール通知**: エラー発生時の管理者への通知 (Resend使用)

## 技術スタック

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/), [Shadcn/ui](https://ui.shadcn.com/) (Radix UI)
- **Database / Auth**: [Supabase](https://supabase.com/)
- **Email**: [Resend](https://resend.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

## セットアップ手順

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd nft-management-webapp
```

### 2. 依存関係のインストール

```bash
npm install
# または
yarn install
# または
pnpm install
```

### 3. 環境変数の設定

`.env.local.example` をコピーして `.env.local` を作成し、必要なAPIキーを設定してください。

```bash
cp .env.local.example .env.local
```

**必要な環境変数:**

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase Anon Key
- `SUPABASE_SERVICE_ROLE_KEY`: Service Role Key (API内での管理者操作用)
- `SHOPIFY_WEBHOOK_SECRET`: Shopify Webhooks検証用のシークレットキー
- `CROSSMINT_API_KEY`: Crossmint API Key (ミント権限付きのServer-side API Key)
- `RESEND_API_KEY`: Resend API Key (メール通知用)
- `ADMIN_EMAIL`: エラー通知を受け取るメールアドレス

### 4. データベースのセットアップ

SupabaseのSQLエディタで `supabase_schema.sql` の内容を実行し、必要なテーブル (`mappings`, `mint_logs`, `audit_logs`) とRLSポリシーを作成してください。

### 5. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` にアクセスしてください。
初回ログインにはSupabaseのAuthenticationでユーザーを作成するか、サインアップを有効にする必要があります。

## 検証とテスト

Shopify Webhookの受信と処理をローカルでテストするためのスクリプトが含まれています。

1. ローカルサーバーが起動していることを確認 (`npm run dev`)
2. `verify_webhook.js` 内の `SHOPIFY_WEBHOOK_SECRET` と `product_id` を適宜修正
3. スクリプトを実行:

```bash
node verify_webhook.js
```

ダッシュボードの「最近のアクティビティ」または `mint_logs` テーブルで結果を確認できます。

## ディレクトリ構成

- `app/`: Next.js App Routerのメインディレクトリ
  - `(dashboard)/`: 認証後の管理画面レイアウトとページ
  - `api/`: APIルート (Webhook受信処理など)
  - `auth/`, `login/`: 認証関連
- `components/`: UIコンポーネント
- `lib/`: ユーティリティ関数や設定など
- `supabase_schema.sql`: データベーススキーマ定義
