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

### 手順(1) アプリをインスタンスに登録

- [mstdn_cli/1_create_app.js](examples/mstdn_cli/1_create_app.js)

このプログラムを実行するには, 次のコマンドを実行します. すると, 情報が返されます.

```bash
$ node 1_create_app.js 
{ id: 000000,
  redirect_uri: '...',
  client_id: '...',
  client_secret: '...'}
```

### 手順(2) アクセストークンを取得しよう

- [mstdn_cli/2_auth.js](examples/mstdn_cli/2_auth.js)

プログラムを実行するには, 次のコマンドを実行します

```bash
$ node 2_auth.js
```

### 手順(3) タイムラインを取得してみよう

- [mstdn_cli/3_get_timeline.js](examples/mstdn_cli/3_get_timeline.js)

このプログラムを実行するには, 次のコマンドを実行します.

```bash
$ node 3_get_timeline.js
```

`timelines/home` の部分を `timelines/public` に変えれば, 公開タイムラインを取得できます.<br>
なお, タイムラインには, `/home`、 `/local`、`/public`、`/hashtag`、`/mentions` があります.

#### 発言してみよう

- [mstdn_cli/4_toot.js](examples/mstdn_cli/4_toot.js)

プログラムを実行します.

```bash
$ node 4_toot.js
```

## Electron のアプリに仕上げよう

- [mstdn_cli/main.js](examples/mstdn_cli/main.js)
- [mstdn_cli/index.html](examples/mstdn_cli/index.html)
- [mstdn_cli/src/index.js](exmaples/mstdn_cli/src/index.js)

React では最初からHTMLタグはエスケープされているので, HTMLタグまで画面に表示してしまいます.
そこで, `dangerouslySetInnerHTML` を利用して, HTMLを直接, span 要素に指定します.

- [mstdn_cli/styles.js](examples/mstdn_cli/src/styles.js)

こちらは CSS の要素を定義しただけのものです.

#### マストドンのクライアントアプリを実行しよう

```bash
$ npm run build
$ npm start
```

## まとめ

- マストドンのWebAPIを利用すれば, オリジナルのマストドンのクライアントアプリを作ることができます.
- Electron を使えば, 手軽にデスクトップアプリが作成できます. 
  React/JSX を組み込んだアプリも, これまでとほとんど同じ手順で開発できるのがメリットです
- 他にも, 多くのサービスが, WebAPIを提供しています. それらAPIをElectron から利用することで, 専用のデスクトップアプリを開発することができます.
