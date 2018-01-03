# じぶんのSNSを作ろう

## ここで作るSNSの機能

### 一般的なSNSの機能
- プロフィール機能
- メッセージ送受信
- タイムライン
- 日記機能
- コミュニティ機能


### ここでは
- ユーザー認証の仕組み
- タイムライン

## プロジェクトの作成

```bash
$ mkdir sns
$ cd sns
$ npm init -y
$ npm i --save react react-dom react-router-dom
$ npm i --save express nedb superagent
$ npm i --save-dev webpack babel-loader babel-core
$ npm i --save-dev babel-preset-es2015 babel-preset-react
```

### プロジェクトのファイル一覧

```text
 .
 ├── package.json
 ├── sns-server.js
 ├── public
 │   ├── bundle.js
 │   ├── default.css
 │   ├── index.html
 │   └── user.png
 ├── server
 │   ├── database.js
 │   ├── timeline.db
 │   └── user.db
 ├── src
 │   ├── index.js
 │   ├── sns_login.js
 │   ├── sns_timeline.js
 │   ├── sns_users.js
 │   └── styles.js
 └── webpack.config.js
```

### プログラムを実行する方法

```bash
# React クライアントをビルド
$ npm run build
# サーバーを開始する
$ npm start
```

## サーバー側 - SNSサーバー

|URL|必要なパラメータ|APIの説明|
|:--|:--|:--|
|`/api/adduser`|`userid`, `passwd`|新規ユーザーを追加|
|`/api/login`|`userid`, `passwd`|ユーザー認証して, 認証トークンを返す|
|`/api/add_friend`|`userid`, `token`, `friendid`|ユーザーに友達を追加する|
|`/api/get_allusers`|なし|すべてのユーザーを列挙して返す|
|`/api/add_timeline`|`userid`, `token`, `comment`|自分のタイムラインにコメントを書き込む|
|`/api/get_friends_timeline`|`userid`, `token`|自分と友達のタイムラインを返す|
|`/api/get_user`|`userid`|ユーザーの情報（友達一覧）を返す|

### ログインの仕組み

### サーバー側 メインプログラム
[sns/sns-server.js](examples/sns/sns-server.js)

### サーバー側 データベースのモジュール
[sns/server/database.js](examples/sns/server/database.js)

## COLUMN
### SHA ハッシュとは？
SHA とは Secure Hash Algorighm の略, ハッシュ関数（要約関数）のひとつ.<br>
米国立標準技術研究所（NIST）によって標準ハッシュ関数に指定された方式です.
ハッシュ関数は, 同じデータから必ず同じハッシュ値を算出します.
少しでもデータが異なると, 全く異なるハッシュ値が得られます.
そのため, 暗号化, 改ざん検出や, データが壊れていないことを確かめるのにも利用されます

## クライアント側 - SNSクライアント
[sns/src/index.js](examples/sns/src/index.js)

### SNS クライアント - ログイン画面
[sns/src/sns_login.js](examples/sns/src/sns_login.js)

### SNS クライアント - ユーザーの一覧画面
[sns/src/sns_users.js](examples/sns/src/sns_users.js)

### SNS クライアント - タイムライン画面
[sns/src/sns_timeline.js](examples/sns/src/sns_timeline.js)

## まとめ
- SNSの例として, ユーザーの一覧から友達を追加し, 友達のタイムラインを表示する機能を作って見ました
- 紙面の関係で, 限られた機能しか実装しませんでしたが, ユーザー認証が必要な React アプリの作り方の参考になるものです.
  特に生のパスワードをサーバー側にもクライアント側にも保存していない部分に注目して下さい
- React Router を使うことにより, 各画面を非常にすっきりと分割して管理できる部分も見ることができました
