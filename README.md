# minskey

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/yamader/minskey/gh-pages.yml)
![GitHub License](https://img.shields.io/github/license/yamader/minskey)

(消極的な理由によって)最小限の機能のみを実装したMisskeyクライアントです。

Next.jsのStatic Exportsによってビルドされ，状態はすべてローカルに保存されるようになっています。

**Minskeyは現在開発中です。開発ステータスは[こちら](https://github.com/yamader/minskey/issues/4)を参照してください。**

## 使い方

[master](https://github.com/yamader/minskey/tree/master)ブランチが[minskey.dyama.net](https://minskey.dyama.net/)にデプロイされています。

使い方はなんとなくでわかると思います。

## 開発

Next.jsの開発環境が必要です。

```sh
USE=corepack emerge nodejs
pnpm i
pnpm dev
```
