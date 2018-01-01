# 誰でもページを編集できる Wiki システムを作ってみよう
## Wiki システムについて
Wikipedia は世界中の人が自由に編集できる百科事典で, MediaWiki という Wiki システムを用いて作られています.<br>
また, Wiki を記述する際には, Wiki 記法やマークダウン記法でページを作成できるのが一般的で,
ここでは, パーサージェネレータの PEG.js を利用して, Wiki 記法をパースし, タイトルたリストなどを表現できるものにします.

## Wiki アプリの構成

## プロジェクトを作成する

```bash
# プロジェクトを作成
$ mkdir wiki
$ cd wiki
$ npm init -y
# 必要なモジュールをインストール
$ npm i --save react react-dom react-router-dom
$ npm i --save express body-parser nedb superagent
$ npm i --save-dev webpack babel-loader babel-core
$ npm i --save-dev babel-preset-es2015 babel-preset-react
$ npm i --save-dev pegjs
```

```bash
$ npm install
```

### プルジェクトのファイル構成

```text
.
├── package.json
├── public
│   ├── bundle.js
│   ├── default.css
│   └── index.html
├── src
│   ├── index.js
│   ├── styles.js
│   ├── wiki_parser.pegjs
│   ├── wiki_parser.js
│   ├── wiki_edit.js
│   └── wiki_show.js
├── webpack.config.js
├── wiki-server.js
└── wiki.db
```

### プログラムを実行しよう

```bash
# Wiki パーサーを生成
$ npm run build:server
# React をビルド
$ npm run build
# Web サーバーを実行
$ npm start
```

## Web サーバー側のプログラム - Wiki サーバー

|APIのURL|メソッド|説明|
|:--|:--|:--|
|`/api/get/:wikiname`|GET|wikiname に応じた Wiki のデータを取得|
|`/api/out/:wikiname`|POST|wikiname に Wiki のデータを保存|

- [wiki/wiki-server.js](examples/wiki/wiki-server.js)

## Wiki クライアントアプリ
- [wiki/src/index.js](examples/wiki/src/index.js)

### Wiki クライアント - 編集画面コンポーネント
- [wiki/src/wiki_edit.js](examples/wiki/src/wiki_edit.js)

### Wiki クライアント - Wiki 画面表示コンポーネント
- [wiki/src/wiki_show.js](examples/wiki/src/wiki_show.js)

## Wikiパーサー - PEG.js でパーサーを作ろう

> PEG.js のサイト<br>
> [URL](https://pegjs.org/)

基本的に改行2つぶんで各要素が区切られます.
そして, 要素の先頭が `*` であればタイトル, `-` であればリスト, `>` であれば引用, `@` であればリンクです.

```text
* タイトル

- リスト1
- リスト2
- リスト3

> 引用テキスト

@リンク
```

- [wiki/src/wiki_parser.pegjs](examples/wiki/src/wiki_parser.pegjs)

```bash
$ npm run build:parser
```

- [wiki/test-parser.js](examples/wiki/test-parser.js)

### PEG.js の記述方法

```text
ルール名 = ルール
```

```text
ルール名 = ルールA / ルールB / ルールC
```

```text
ルール名 = ルール { return 対応するJSコード }
```

```text
int = [0-9]+
```

```text
zipcode = left:$[0-9]+ "-" right:$[0-9]+ { return {left, right} }
```

## まとめ
- これまで学んだ React Router や NoDB などを利用して, Wii アプリを作成してみました
- Express と React-Router を組み合わせて使うときは, どのURLにどの機能を割り振るかを, しっかりと分けておく必要があります
- PEG.js を使うと, 手軽にパーサーを作成できます. 
  紙面に限りがあるため, 非常に簡単な Wiki 記法しか定義していませんが, もう少し手を加えながら, Markdown 記法なども定義できるでしょう
