# マストドンのクライアントを作ってみよう
## マストドンとは？

|URL|説明|
|:--|:--|
|https://mstdn.jp|日本向けの最初の大規模インスタンス|
|https://pawoo.net|Pixivが運営するインスタンス|
|https://friends.nico|ドワンゴが運営するインスタンス|
|https://mustardon.tokyo|東京に関するインスタンス|
|https://mastodon.yokohama|横浜に関するインスタンス|
|https://mstdn.osaka|大阪に関するインスタンス|

## マストドンの Web API を使おう

1. OAuth2 のアプリをマストドンのインスタンスに登録
2. ユーザがサイト上で認証を行い, アクセストークンを取得
3. アクセストークンを用いて API にアクセス

```bash
# プロジェクトを作成
$ mkdir mstdn_cli 
$ cd mstdn_cli 
$ npm init -y
# マストドンのライブラリをインストール
$ npm i --save mastodon-api
```

Electron と React のモジュールも一緒にインストールしてしまいます

```bash
$ npm i --save readline-sync
$ npm i --save-dev electron 
$ npm i --save-dev react react-dom
$ npm i --save-dev babel-core babel-preset-es2015 babel-preset-react
$ npm i --save-dev webpack babel-loader
```

### 手順（1）アプリをインスタンスに登録

- [mstdn_cli/1_create_app.js](examples/mstdn_cli/1_create_app.js)

```bash
$ node 1_create_app.js 
{ id: 000000,
  ...
  ...}
```
