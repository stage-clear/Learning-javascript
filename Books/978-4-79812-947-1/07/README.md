# Connect の組み込みミドルウェア

## クッキー、リクエスト本体、クエリ文字列の解析

- CookieParser(): ブラウザからのクッキーを解析して `req.cookies` に入れる
- bodyParser(): リクエスト本体を消費しながら解析して `req.body` に入れる
- limit(): bodyParser() との共同作業で、リクエストが大きくなりすぎるのを防ぐ
- query(): リクエストURLのクエリ文字列を解析して `req.query` に入れる


### CookieParser() : HTTPクッキーを解析する

__基本的な使い方__

```javascript
var connect = require('connect');
var cookieParser = require('cookie-parser');
var app = connect()
  .use(cookieParser('tobi is a cool ferret'))
  .use(function(req, res) {
    console.log(req.cookies);
    console.log(req.signedCookies);
    res.end('Hello \n');
  }).listen(3000);
```

__通常のクッキー__

```sh
$ curl http://localhost:3000/
{}
$ curl http://localhost:3000/ -H "Cookie: foo=bar, bar=baz"
# { foo: 'bar', bar: 'baz' }
# {}
```

__署名付きクッキー__

```bash
$ curl http://localhost:3000/ -H "Cookie:name=luna.PQLM0wNvqOQEObZXUkWbs5m6Wlg"
# {}
# { name: 'luna' }
GET / 200 4ms
```

__JSONクッキー__

```bash
$ curl http://localhost:3000/ -H 'Cookie: foo=bar,
bar=j:{"foo": "bar"}'

# { foo: 'bar', bar: { foo: 'bar' } }
# {}

# 署名付き
$ curl http://localhost:3000/ -H "Cookie:cart=j:{item:[1]}.sD5p6xFFBO/4ketA19p43bcjS3Y"
# {}
# { curt: { items: [ 1 ] } }
```

__発信クッキーの設定__

```javascript
var connect = require('connect');
var app = connect()
  .use(function(req, res) {
    res.setHeader('Set-Cookie', 'foo=bar');
    res.setHeader('Set-Cookie', 'tobi=ferret;Expires=Tue, 08 Jun 2021 10:18:14 GMT');
    res.end();
  }).listen(3000);
```

### bodyPerser() : リクエスト本体を解析する

- ユーザー入力の受付
- json(), urlencoded(), multipart()
- JSON, x-www-form-urlencoded, multipart/form-data の解析
- [body-parser](https://www.npmjs.com/package/body-parser)

```javascript
var bodyParser = require('body-parser');
var app = connect()
  .use(bodyParser())
  .use(function(req, res) {
    console.log(req.body);
    console.log(req.files);
    res.end('Thanks!');
  }).listen(3000);
// body-parser() 部分でエラー
// 情報が古い??
```

### limit(): リクエスト本体のサイズを制限する

- リクエスト本体を解析できるだけでは不十分
- リクエストを正しく分類し必要なら制限を課す
- [raw-body](https://www.npmjs.com/package/raw-body)

__なぜlimit()が必要なのか__

```javascript
var app = connect()
  .use(limit('32kb'))
  .use(bodyParser())
  .use(hello)
```

__limit() をラップして柔軟性を高める__

```javascript
// fn は、ここでは limit() 関数のインスタンス
function type(type, fn) {
  return function(req, res, next) {
    var ct = req.headers['content-type'] || '';
    // ミドルウェアは、最初に content-type をチェック
    if (0 != ct.indexOf(type)) {
      return next();
    }
    // ミドルウェアに渡された limit() コンポーネントを呼び出す
    fn(req, res, next);
  }
}

var app = connect()
  .use(type('application/x-www-form-urlencoded', connect.limit('64kb')))
  .use(type('application/json', connect.limit('32kb')))
  .use(type('image', connect.limit('2mb')))
  .use(type('video', connect.limit('300mb')))
  .use(connect.bodyParser())
  .use(hello)
```

### query(): クエリ文字列パーサ

- クエリ文字列の解析
- [qs](https://www.npmjs.com/package/qs)

```javascript
var qs = require('qs');
var parse = require('url').parse;
var app = connect()
  .use(function(req, res, next) {
    if (!req.query) {
      req.query = ~req.url.indexOf('?')
        ? qs.parse(parse(req.url).query, {})
        : {};
    }
    next();
  })
  .use(function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(req.query));
  });
```


## Webアプリケーションのコア機能を実装するミドルウェア

- logger(): リクエストのロギングを提供すr
- favicon(): /favicon.ico リクエストの面倒を見てくれる
- methodOverride(): クライアントに能力がなくても、トランスペアレントに req.method を上書き
- vhost(): 1つのサーバーで複数のWebサイトをセットアップする仮想ホスト機能
- session(): セッションデータを管理する


### logger(): リクエストをロギングする
### favicon(): faviconの供給
### methodOverride(): HTTPメソッドがあるように見せかける
### vhost(): 仮想ホスト
### session(): セッション管理


## Webアプリケーションのセキュリティを扱うミドルウェア

### basicAuth(): HTTPのBasic認証

Basic認証は非常に単純なHTTP認証であり、注意して使わなければ危険である。
Basic認証のユーザー証明書は、HTTPS上で供給しない限り、攻撃者が容易に横取り（intercept）できる。
そうはいっても、小さなアプリケーションや個人的なアプリケーションに素早く認証をつけるには便利だろう。

### csrf(): CSRF対策

CSRFは、Webブラウザがサイト内で持つ信頼を利用した攻撃の一種である。
この攻撃は、あなたのアプリケーションで認証を受けているユーザーを先に攻撃者が作成あるいは攻略しておいた別のサイトに誘導し、そのユーザーの身代わりとしてリクエストを発行さえせるという手口である。

### errorHandler(): 開発エラーの処理

これは開発中につかうために作られているので、製品の構成に入れてはならない。


## 静的ファイルを供給するミドルウェア

- static(): ファイルシステムの、指定されたルートディレクトリから、ファイルを供給
- compress(): 応答を圧縮する。static() t併用するのが理想的。
- directory(): ディレクトリを要求されたとき、ディレクトリの見栄えの良いリストを供給

### static(): 静的ファイルの供給

Connectのstatic()ミドルウェアは、高性能で柔軟性が高く、HTTPキャッシュ機構や、Rangeリクエストなどの機能を完備した静的ファイルサーバーを実装している。
さらに重要なポイントとして、「パス名の悪用」(malicious paths)を防ぐセキュリティチェックを含み、（ドットで始まる） 隠しファイルへのアクセスをデフォルトで許可せず「危険なNULLバイト」(poison null byte)が攻撃に使われるのを防ぐ。

__基本的な使い方__

```javascript
// @2.x.x
var connect = require('connect');
var app = connect().use(connect.static('public')).listen(3000);

// @3.x.x
var connect = require('connect');
var serveStatic = require('serve-static');
var app = connect()
  .use(serveStatic('public'))
  .listen(3000);
```

```bash
# test /public/foo.js
$ curl http://localhost:3000/foo.js -i
```

__static()をマウントとしてつかう

```javascript
app.use('/app/files', connect.static('public'));
```

```bash
// Failed
$ curl http://localhost:3000/foo.js -i

// Success
$ curl http://localhost:3000/app/files/foo.js -i
```

__ディレクトリの絶対パスと相対パス__

```javascript
// 絶対パスを使いたい場合
app.use('/app/files', connect.static(__dirname + '/public'));
```

__ディレクトリを要求されたたらindex.htmlを供給する__

ディレクトリが要求されたとき、そのディレクトリにindex.htmlがあれば、そのファイルが供給される。


### compress(): 静的ファイルを圧縮する

zlibモジュールによって、gzipとdeflateによるデータの圧縮と伸張が提供される。

__基本的な使い方__

```javascript
// @2.x.x
var connect = require('connect');
var app = connect()
  .use(connect.compress())
  .use(connect.static('source'))
  .listen(3000);

// @3.x.x
var connect = require('connect');
var compression = require('compression');
var serveStatic = require('serve-static');
var app = connect()
  .use(compression())
  .use(serveStatic('source'))
  .listen(3000);
```

```bash
# Accept-Encoding なし
$ curl http://localhost:3000/foo.js -i

# Accept-Encoding あり
$ curl http://localhost:3000/foo.js -i -H 'Accept-Encoding: gzip'
# テストではうまくいかなかった
```

__filter関数をカスタマイズ__

```javascript
// 圧縮をサポートするMIMEタイプ
exports.filter = function(req, res) {
  var type = res.getHeader('Content-Type');
  return type.match(/json|text|javascript/);
}

// この振る舞いを変更するには
function filter(req) {
  var type = req.getHeader('Content-Type');
  return 0 == type.indexOf('text/plain');
}

connect()
  .use(connect.compress({filter: filter}));
```

__圧縮とメモリのレベルを指定する__

例) level:3 圧縮度を低く設定し、より高速に
例) memLevel: 8 メモリを多く設定し、圧縮の高速化を図る
```javascript
connect()
  .use(connect.compress({ level: 3, memLevel: 8 }));
```


### directory(): ディレクトリのリストを作る

__基本的な使い方__

```javascript
// @2.x.x
var connect = require('connect');
var app = connect()
  .use(connect.directory('public'))
  .use(connect.static('public'))
  .listen(3000);

// @3.x.x
var connect = require('connect');
var serveStatic = require('serve-static');
var serveIndex = require('serve-index');
var app = connect()
  .use(serveIndex('public'))
  .use(serveStatic('public'))
  .listen(3000);
```


__directory()をマウントして使う__

```javascript
var app = connect()
  .use('/files', connect.directory('public', { icons: true, hidden: true }))
  .use('/files', connect.static('public', { hidden: true }))
  .listen(3000);
// icons オプションを使って、アイコンの表示を有効に
// hidden オプションを有効にして、隠しファイルのディレクトリ表示と供給を可能に
```


## まとめ

- Connectの本当の威力は、それにバインドされている再利用可能なミドルウェアの一群によってもたらされる
- Connectは、より高いレベルのフレームワークを構築するための部品として使われるのが典型的
- Connectには、ルーティングやテンプレーティングのためのヘルパーは含まれていない
