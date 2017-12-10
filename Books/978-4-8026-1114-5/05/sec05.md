# React + Express dえ掲示板を作ろう

## ここで作る掲示板について
ここで作る掲示板とは, 名前と本文を書き込むだけという, とても簡単な掲示板です.
データの保存には, NeDB を利用します. このNeDB は, Node.js と一緒に使われることの多い NoSQL のデータベース
「MongoDB」のAPIと互換性があり, また, ファイルベースの簡易データベースであるため, 特別なセットアップが不要とういのがメリットです.

## プロジェクトを作成しよう

```bash
# プロジェクトのディレクトリを作成
$ mkdir bbs
$ cd bbs
$ npm init -y
# Express のインストール
$ npm install --save express
# NeDB のインストール
$ npm i --save nedb
# SuperAgent （Ajax）のインストール
$ npm install --save superagent
# Webpack と React をインストール
$ npm i --save react react-dom
$ npm i --save-dev webpack
$ npm i --save-dev babel-loader babel-core
$ npm i --save-dev babel-preset-es2015 babel-preset-react
```

プロジェクトのファイル構成

```
.
├── package.json
├── bbs-server.js
├── bbs.db
├── public
│   ├── bundle.js
│   ├── index.html
├── src
│   └── index.js
└── webpack.config.js
```

[bbs/webpack.config.js](examples/bbs/webpack.config.js)<br>

プログラムを実行するには, コマンドラインから次のコマンドを実行します.

```bash
# Webpack を実行したクライアント側をビルド
$ npm run build
# Webサーバを実行
$ node bbs-server.js
```

## Web サーバー側のプログラム
[bbs/bbs-server.js](examples/bbs/bbs-server.js)<br>

## クライアント側（React）のプログラム
[bbs/src/index.js](examples/bbs/src/index.js)

## COLUMN
### JSON 形式の簡単データベース NeDB
- NeDB はJSON形式でデータが保存される
- 1データベースが1ファイルというシンプルな構成
- 並べ替えや, データの抽出が手軽に出来る
- すべてが JavaScript で記述されているので, 外部のバイナリに依存しない

```js
// モジュールの取り込み
const Datastore = require('nedb')

// データベースと接続する
const db = new Datastore({
  filename: 'ファイル名',
  autoload: true // 自動でデータを読み込むかどうか
})
```

ファイルの読み込みは, 非同期で行われるため, もし, ファイルを読み込んだ直後に
何かの操作を行いたい場合には, 明示的に, `loadDatabase()` メソッドを呼ぶ必要があります

```js
const Datastore = require('nedb)
const db = new Datastore({filename: 'ファイル名'})
db.loadDatabase((err) => {
  // ここにファイルを読み込んだ直後の処理
})
```

データベースにオブジェクトを挿入するには, `insert()` メソッドを使います.
データを挿入すると, 自動的にオブジェクト固有のIDが振られ, `_id` プロパティに設定されます.

```js
// 挿入したいデータを用意する
const doc = {
  name: 'xxx',
  body: 'xxx'
}

// データを挿入する
db.insert(doc, function (err, newDoc) {
  console.log(newDoc._id)
})
```

データを抽出するには `find()` メソッドを使います.
第1引数にからのオブジェクトを指定すれば, 無条件に全てのデータを抽出します.

```js
db.find({}, function (err, docs) {
  // ここで抽出した docs を処理する
})
```

もし, 数値データで, 特定の値以上のデータが必要な場合には,
以下のようなオペレータ（$lt, $lte, $gt, $gte, $in, $nin, $ne, $exists, $regex） を指定して,
`find()` を指定します

```js
// price が 5000 以上のものを抽出
db.find({'price': { $gt: 5000 }}, function (err, docs) {
  // ここで抽出したデータ docs を処理する
})
```

並べ替えと抽出個数の制限も指定できます.
並べ替えを行う場合は, `sort()` メソッドを, 抽出個数の制限は `limit()` メソッドを呼び出します.
なお, `skip()` メソッドを指定することで, ページング処理を実現できます.

```js
// 値段（price）順に並べ替え, 最大5個抽出する
db.find({}).sort({price: 1}).limit(5).exec(function (err, docs) {
  // ここで抽出したデータ docs を処理する
})
```

そして, 値を更新するには, `update()` メソッドを利用します.

```js
//[書式]
db.update(検索クエリー, 更新内容, オプション, コールバック)
```

名前(name) が Taro さんの年齢を 25 に修正する例

```js
db.update(
  { name: 'Taro' },           // 検索条件
  { name: 'Taro', age: 25 },  // 修正内容
  {},
  function (err, numReplaced) {
    // ここにデータ更新後の処理
  }
)
```

## まとめ
- 本節では簡単な掲示板アプリを作って見ました
- 自分だけでなく, 他の人とデータを共有する場合には, Webサーバーにデータを保存する必要があります.
  ここでも, Webサーバ側と, React でクライアント側の両方の処理を作成しました
- サーバとクライアントで役割をうまく分割するなら, 双方のプログラムも簡潔に記述できるようになります
- NeDB を使えば, ファイル1つで, 1つのデータベースを実現できて便利です
