# minskey

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/yamader/minskey/gh-pages.yml)
![GitHub License](https://img.shields.io/github/license/yamader/minskey)

(消極的な理由によって)最小限の機能のみを実装したMisskeyクライアントです。

Next.jsのStatic Exportによってビルドされ、状態はすべてローカルに保存されるようになっています。

**Minskeyは現在開発中です。開発ステータスは[こちら](https://github.com/yamader/minskey/issues/4)を参照してください。**

## 使い方

安定版は[minskey.dyama.net](https://minskey.dyama.net/)で公開されています。

なんとなく使い方はわかると思います。

## 開発

Node.js開発環境とPnpm実行環境を構築してください。Minskeyでは[Volta](https://volta.sh/)を推奨しています。

```bash
volta setup
volta node@lts
volta install pnpm
pnpm install
```

依存関係をインストール後、以下のコマンドで開発環境を起動できます。

```bash
pnpm run dev
```
