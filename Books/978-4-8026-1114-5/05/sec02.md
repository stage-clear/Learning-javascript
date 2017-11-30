# Web アプリ用フレームワーク Express 
## Express のインストール

```bash
# プロジェクトのディレクトリを作成
$ mkdir express_test
$ cd express_test
$ npm init -y
# Express のインストール
$ npm install --save express
```

## Hello World を作ろう
- [express_test/hello.js](examples/express_test/hello.js)

```bash
$ node hello.js
起動しました http://localhost:3000
```

## いろいろなパスに対応しよう
- [express_test/dics.js](examples/express_test/dics.js)

```bash
$ node dice.js
起動しました http://localhost:3000
```

### URLのパターンマッチを利用しよう
- [express_test/dice-ex.js](examples/express_test/dice-ex.js)

```bash
$ node dice-ex.js
```

### URL パラメータのクエリ文字列を取得しよう
- [express_test/dice-q.js](examples/express_test/dice-q.js)

```bash
$ node dice-q.js
```

## POSTメソッドを受け付けるには？
- [express_test/post-test.js](examples/express_test/post-test.js)

```bash
$ node post-test.js
```

### POSTされたデータを表示しよう
実際にPOSTされたデータを取得するためにはこれだけでは不十分で, 「body-parser」というライブラリを別途インストールしなければなりません.

```bash
$ npm install --save body-parser
```

- [express_test/post-show.js](examples/express_test/post-show.js)

```bash
$ npm node post-show.js
```

### アップロードされたファイルを受け取ろう
ファイルを受け取るには, multer というモジュールを利用します

```bash
$ npm install --save multer
```

- [express_test/post-upload.js](examples/express_test/post-upload.js)

```bash
$ node post-upload.js
```

## COLUMN 
### アップロードファイルのセキュリティ

## 自動的にファイルを返すには？
任意のディレクトリにあるファイルを自動的に
- [express_test/static.js](examples/express_test/static.js)

```bash
$ node static.js
```

## まとめ
- Express を使うと, 手軽に Node.js で Web サーバーを書くことができます
- Express では, 特定のパスに対するアクションを, JavaScript のコールバック関数で指定できます
- また, Multer モジュールを使えば, ファイルのアップロードも手軽に記述できます
