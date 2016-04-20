シンプルな Web アプリケーションを作る
===

HTTP サーバーを実装した http.Server クラス
---

- Web アプリケーションを作成する場合、http.Server クラスを利用するのが一般的

### http.Server クラスのインスタンス作成と待受け

```javascript
// http.Server クラスのインスタンスの作成
http.createServer([requestListener]);
// 待ち受け
server.listen(port, [hostname], [backlog], [callback]);
```
* backlog キュー
  リクエストは受信したが、まだ接続自体は完了していない接続を管理するためのキュー。このキューが降るになると、新規リクエストは受け付けなくなる。デフォルトの値は 511


```javascript
var http = require('http');
var server = http.createServer(function(req, res) {
  // ここにリクエストに対する処理を記述する
});
server.listen(80, '127.0.0.1');

// 待ち受けを終了するには
// server.close();
```

### http.Server クラスで発生するイベント

| Name | arguments | summary
|:--|:--|:--|
| request       | (reqest, response)      | HTTPリクエストを受け付けた時に発生 |
| connection    | (socket)                | TCP接続が確立されたときに発生 |
| close         | -                       | 接続が閉じたときに発生|
| checkContinue | (request, response)     | クライアントからの「Expect: 100-continue」ヘッダーを受信したときに発生 |
| connect       | (request, socket, head) | クライアントからHTTPのCONNECTメソッドによるリクエストを受信したときに発生 |
| upgrade       | (request, socket, head) | クライアントからのHTTP/1.1のUpgrade リクエストを受信したときに発生 |
| clientError   | (exception)             | クライアント側がエラーが起こったときに発生 |


### request イベントの処理

__受け取ったリクエストの内容をテキスト形式で出力する__

[サンプルコード](sample-server.js)


### http.Server クラスで発生するそのほかのイベント

- 一般的なアプリケーションにおいては利用する機会は少ない


HTTP リクエストの処理
---

__http.ServerRequest クラスのプロパティ__

| Property | Summary |
|:--|:--|
| method | GET や POST といったリクエストメソッド |
| url | リクエストされたパス |
| headers | リクエストのHTTPヘッダー |
| trailers | リクエストのトレイラー情報|
| httpVersion | リクエストのHTTPプロトコルバージョン |
| httpVersionMajor | HTTPプロトコルバージョンの整数部分 |
| httpVersionMinor | HTTPプロトコルバージョンの小数点以下 |
| connection | リクエストで使用されている net.Socket オブジェクト |


__reqeust.url プロパティによる分岐処理__

```javascript
var http = require('http');
var server = http.createServer();

server.on('request', function(req, res) {
  if (req.url === '/') {
    // リクエストされたパスが "/" の場合

  } else if (req.url === '/foo') {
    // リクエストされたパスが　"/foo/" の場合

  } else {
    // それ以外
  }
});
```

__request.method プロパティによる分岐__

```javascript
if (req.method == 'POST') {
  // POSTリクエストの場合

} else if (req.method == 'GET') {
  // GETリクエストの場合

} else {
  // そのたのリクエストんの場合

}
```

### URLに付加されたパラメーターを解決する --- url.parse()

```javascript
// url.parse(urlStr, [parseQueryString], [slashesDenotHost])

url.parse('/foo/bar/hoge?q=value');

// parseQueryString を true にするとクエリ文字列がオブジェクトで返される
url.parse('/foo/bar/hoge?q=value&a=answer#hash');

// プロトコルが省略された場合、ホスト名が省略されたもののように解析する
// それは slashesDenotHost を true にすると正しく解析できる
url.parse('//example.com/foo/bar/hoge');

var server = http.createServer(function(req, res) {
  // リクエストURLをパースする
  var urlElements = url.parse(req.url, true);
  // query オブジェクトにクエリ情報を格納する
  var query = urlElements.query;
});

server.on('request');
```

### POST リクエストで送信されたデータを取得する --- http.ServerRequest クラスの data イベント

| Name | Arguments | Summary |
|:--|:--:|:--|
| data  | chunk | リクエストボディデータを受信したときに発生する |
| end   | -     | データ受信が完了した時に発生する |
| close | -     | 接続が切断されるときに発生する |


```javascript
var http = require('http');
var server = http.createServer(function(req, res) {
  if (req.method === 'POST') {
    var data = '';
    req.on('data', function(chunk) {
      data += chunk;
    });

    req.on('end', function() {
      // データが受信が完了したときに実行する処理をここに記述する
      // data 変換に送信されたデータが格納されている
    });
  }
});
```

### application/x-www-form-urlencoded 形式で送信された情報を取得する --- querystring.parse()

- POST で送信されたクエリの解析
- querystring.parse()

```javascript
var http = require('http');
var server = http.createServer(function(req, res) {

  if (req.method === 'POST') {
    var data = '';
    req.on('data', function(chunk) {
      data += chunk;
    });

    req.on('end', sendResponse);

    function sendResponse() {
      // query オブジェクトにフォームの内容を格納する
      var query = querystring.parse(data);
    }
  }
});
```

### multipart/form-data 形式で送信された情報を取得する --- formidable モジュール

- multipart/form-data
- [node-formidable](https://github.com/felixge/node-formidable)


```bash
$ npm install formidable
```

```javascript
form.parse(req, callback);
```

__Formidabble.File クラスのプロパティ__

| Name | Summary |
|:--|:--|
| size | ファイルサイズ |
| path | アップロードされたファイルの保存先 |
| name | アップロードされたファイルの元の名前 |
| type | アップロードされたファイルの MIME タイプ |
| lastModifiedDate | アップロードされたファイルの最終更新日 |
| hash | ファイルのMD5もしくはSHA1ハッシュ値 |

Formidable.File.path のデフォルト設定

1. TMP あるいは TMPDIR、TEMP 環境変数で指定されたディレクトリ
2. 1 の環境変数が指定されていない場合、/tmp ディレクトリ
3. 1 と 2 のディレクトリがすべて利用できない場合、プログラムを実行しているカレントディレクトリ

という優先順位で保存先のディレクトリが確定するが、form.uploadDir プロパティの値を変更することで任意のディレクトリを指定できる

```javascript
var http = require('http');
var formidable = require('formidable');
var server = http.createServer(function(req, res) {
  if (req.method == 'POST') {
    // formidable のフォームオブジェクトの作成
    var form = new formidable.IncomingForm();
    // POST されたデータを取得してパースする
    form.parse(req, function(err, fields, files) {
      // fileds オブジェクトにフォームの値が、
      // files オブジェクトにはアップロードされた情報が格納されている
    });
  }
});
```


クライアントにレスポンスを返す
---

- http.ServerResponse

__http.ServerResponse クラスで用意されているメソッド__

| Name | Summary |
|:--|:--|
| writeContinue()          | HTTP/1.1の「100 Continue」メッセージを送信する |
| writeHead(statusCode, [reasonPhrase], [headers]) | ステータスコードやHTTPヘッダーを送信する |
| setHeader(name, value)   | HTTPヘッダーを設定する |
| getHeader(name)          | 設定されているHTTPヘッダーを取得する |
| removeHeader(name)       | 設定されているHTTPヘッダーを削除する |
| write(chunk, [encoding]) | 指定したデータを送信する |
| addTrailers(headers)     | HTTP trailingヘッダーを送信する |
| end([data], [encoding])  | データの送信を終了する |


```javascript
response.writeHead(statusCode, [reasonPhrase], [headers])
```

__クライアントにレスポンスを返す処理__

```javascript
var http = require('http');
var server = http.createServer(function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain; charset=UTF-8',
    'Last-Modified': 'Fri, 1 Jun 2012 12:34:56 GMT'
  });
  res.write('<html><body>Hello, world</body></html>');
  res.end();
});
```