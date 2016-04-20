# Connect


Connectは、「ミドルウェア」(middleware)と呼ばれるモジュール化された
コンポーネント群を使って、Webアプリケーションのロジックを裁量可能な方式で
実装するためのフレームワーク


## セットアップ


```bash
$ npm install connect
```

__最小限の Connect アプリケーション__

```javascript
// minimal_connect.js
var connect = require('connect');
var app = connect();
app.listen(3000);
```


## Connect ミドルウェアの仕組み

- リクエストとレスポンスオブジェクト。nextコールバック関数を受け取る
- `next()` が省略されると、残りのミドルウェアが実行されない


```javascript
// 例）リクエストメソッドとURLを記録するログファイル
function logger(res, req, next) {
  console.log('%s %s', req.method, req.url);
  next();
}

// 例）"Hello, World"で応答するミドルウェア
function hello(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World');
}
```
- [サンプル](example/authentication.js)


## 設定変更可能なミドルウェアの作成

- configurable


```javascript
function setup(options) {
  // 初期設定のロジック
  // ミドルウェアの初期設定をここに追加する

  return function(req, res, next) {
    // ミドルウェアのロジック
    // 外側の setup 関数からリターンした後でも
    // オプションにアクセスすることができる
  }
}

// 使用例
app.use(setup({some: 'options'}));
```

### 設定変更可能な Logger ミドルウェア

```javascript
// 実装例
var app = connect()
  .use(logger(':method :url'))
  .use(hello);
```

```javascript
function setup(format) {
  // logger コンポーネントは正規表現を使って
  // リクエストプロパティとの照合を行う
  var regexp = /:(\w+)/g;

  // この関数が, connect によって使われる
  // 実際の logger コンポーネントとなる
  return function logger(req, res, next) {
    // リクエストのログエントリを正規表現によって整形
    var str = format.replace(regexp, function(match, prop) {
      return req[prop];
    });

    // リクエストのログエントリをコンソールに印字
    console.log(str);
    // 次のミドルウェアコンポーネントに制御を渡す
    return next();
  }
}

// 直接エクスポートするのは logger の setup
module.exports = setup;
```

### ルーティングを行うミドルウェアの構築

- [サンプル(app)](example/router_example)
- [サンプル(setup)](example/router)


### URLの書き換えを行うミドルウェアの構築

```javascript
var connect = require('connect');
var url = require('url');
var app = connect()
  .use(rewrite)
  .use(showPost)
  .listen(3000);

var path = url.parse(req.url).pathname;

function rewrite(req, res, next) {
  var match = path.match(/^\/blog\/posts\/(.+)/);
  if (match) {
    // /blog/posts のリクエストについてのみルックアップ
    findPostIdBySlug(match[1], function(err, id) {
      // 参照エラーハンドラに知らせて処理を終了
      if (err) return next(err);
      // スラッグ名にマッチするIDが存在しなければ,
      // 'User not found' とういうエラー引数とともに処理終了
      if (!id) return next(new Error('User Not Found.'));

      // 今後のミドルウェアで実際のIDを利用できるように
      // req.url プロパティを上書き
      req.url = '/blog/posts/' + id;

      return next();
    });
  } else {
    return next();
  }
}
```

__これらのサンプルが示している模範__

「ミドルウェアを構築するときは、小さくて設定変更が可能な部品に徹するべきだ」


## エラー処理のミドルウェアを使う

エラーは、すべてのアプリケーションに存在する。
エラーがシステムレベルにあろうと、ユーザーレベルにあろうと、
いや、予期せぬエラーさえも、あらゆるエラー状況に対応できるように
準備を整えておくのが賢明である。

### Connect のデフォルトエラーハンドラ

```javascript
// これは `foo()` という関数が定義されていないので
// ReferenceError というエラーを送出する
var connect = require('connect');

connect()
  .use(function hello(req, res) {
    foo();
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World');
  })
  .listen(3000);
```

### アプリケーションエラーを自分で処理する

普通のミドルウェアが受け取る引数は、req|res|next の3つだが、
エラー処理用ミドルウェア関数は、err|req|res|next と、4つの引数を
受け取るように定義しなければならない。

```javascript
functin errorHandler() {
  var env = process.env.NODE_ENV || 'development';

  // エラー処理用ミドルウェアは4つの引数を定義
  return function(err, req, res, next) {
    res.statusCode = 500;

    // errorHandler ミドルウェアは環境変数 NODE_ENV
    // の値によって異なった振る舞いをする
    switch(env) {
      case 'development':
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(err));
        break;
      default:
        res.end('Server error');
    }
  };
}
```

* Connect はエラーに遭遇すると、エラー処理用のミドルウェアだけを呼び出すように切り替わる

### 複数のエラー処理用ミドルウェアを使う

- [サンプル](example/multi_error)
