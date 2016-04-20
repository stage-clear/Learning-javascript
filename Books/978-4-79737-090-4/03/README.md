node コマンドと Node.js のイベントシステム
===

Node.js の対話環境を利用する
---

### REPL を起動する node コマンド

```bash
$ node
>
> foo = 'bar';
'bar'

> var hoge;
undefined
# 戻り値が定義されていない場合は undefined が表示される

# 関数の呼び出しを含む任意の式を実行できる
> Math.random();
0.3371283793821931
> foo = 'abc';
'abc'
> bar = '012';
'012'
> foo + bar;
'abc012'

# function キーワード使って関数を定義することもできる
> function add(a, b) {
... return a + b;
... }
undefined

# 途中で入力を取り消すときは、[ctrl] + [c]を入力する
> function foo() {
... #[ctrl] + [c]
>

# REPL 環境内で定義した関数は、組み込み関数と同様に利用できる
> add(foo, bar)
'abc012'

> console.log('Hello, world');
Hello, world
undefined
> console.log(Math.PI);
3.141592653589793
undefined

# REPL 環境を終了する
# [Ctrl] + [C] を2回入力する
# REPL を終了すると以前の関数定義は失われる
```

Node.js での Webアプリケーション実行モデル
---

__シンプルな Webアプリケーションとして動作するコード__

```javascript
var http = require('http');
var server = http.createServer();

server.on('request', function(req, res) {
  console.log(req.url);
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('hello ' + req.url);
});
server.listen(3000, 'localhost');
```

さまざまな機能が実装された「モジュール」を使う
---

###  モジュールを読み込む --- require 関数

```javascript
// require(moduleName);

var http = require('http');
```

REPL 内では require 関数を使用しなくても、モジュール名を入力するだけでロードできる

```bash
> http
```

### Node.js のコアモジュール

__Node.js 0.8系のコアモジュール__

| Name | purpose | stability |
|:--|:--|:--:|
| assert         | アサーション | 5 |
| buffer         | バイト列の格納及び操作 | 3 |
| child_process  | 子プロセスの生成や管理 | 3 |
| cluster        | 復数のプロセスを使った負荷分散 | 1 |
| console        | コンソールへのメッセージ出力 | 4 |
| crypto         | 暗号化/ハッシュ | 2 |
| dgram          | UDPを扱うソケット関連の処理 | 3 |
| dns            | DNS関連の処理 | 3 |
| domain         | 復数のI/O処理間の連携 | 1 |
| events         | イベント処理を実装するための基底クラス | 4 |
| fs             | ファイル及びファイルシステムの操作 | 3 |
| http           | HTTPサーバー/クライアント | 3 |
| https          | HTTPSサーバー/クライアント | 3 |
| net            | ソケット操作 | 3 |
| os             | OSに関連する情報の取得 | 4 |
| path           | パス文字列の処理 | 3 |
| punycode       | Punycode 文字列のエンコード/デコード | 2 |
| querystring    | HTTPで使われるクエリ文字列の処理 | 3 |
| readline       | 標準入出力を使用した対話的インターフェイス | 2 |
| repl           | REPL | - |
| stream         | ストリーム入出力処理が定義された基底クラス | 2 |
| string_decoder | バイナリ列から文字列へのデコード | 3 |
| tls            | OpenSSL を使った TLS/SSL通信 | 2 |
| tty            | TTY (キャラクター端末) の情報取得 | 2 |
| url            | URL文字列のパースやフォーマット | 3 |
| util           | 各種ユーティリティ関数 | 5 |
| vm             | JavaScript の実行エンジン(仮想マシン) | 2 |
| zlib           | zlib を使ったデータの圧縮/伸張 | 3 |

__安定度(Stability)のレベル__

| Level | Summary |
|:-----:|:--|
| 1 | Experimental (実験的実装) |
| 2 | Unstable (不安定) |
| 3 | Stable (安定) |
| 4 | API Frozen (今後のAPIの変更は行われない) |
| 5 | Locked (今後変更は行われない) |

__Node.js でグローバルに定義されているクラスや関数、オブジェクト__

| Name | Summary/Purpose |
|:--|:--|
| Buffer Class    | バイト列を扱うクラス |
| setTimeout()    | 指定時間後に指定した関数を実行する |
| clearTimeout()  | setTimeout で設定した関数の実行を取り消す |
| setInterval()   | 指定した間隔で指定した関数を実行する |
| clearInterval() | setInterval で指定した関数を取り消す |
| require()       | モジュールをロードする |
| module Object   | モジュール情報にアクセスするためのオブジェクト |
| process Object  | プロセス情報にアクセスするためのオブジェクト |


### Node.js のイベントループ --- EventEmitter クラス

- 非同期的なメソッドを持つクラスが利用する「イベント」

__EventEmitter クラスのメソッド__

| Name | Summary |
|:--|:--|
| addListener(event, listener)    | 指定したイベントにイベントハンドラーを登録 |
| on(event, listener)             | 指定したイベントにイベントハンドラーを登録 (addListener の別名) |
| once(event, listener)           | 指定したイベントに一度だけ実行されるイベントハンドラーを登録 |
| removeListener(event, listener) | 指定したイベントハンドラーを削除 |
| removeAllListeners([event])     | 指定したイベントのイベントハンドラーをすべて削除 |
| setMaxListeners(n)              | 登録できるイベントハンドラー数の上限を変更する |
| listeners(event)                | 指定したイベントに登録されているイベントハンドラーを取得する |
| emit(event, [arg1], [arg2])     | 指定したイベントを発生させる |


### イベントハンドラーを登録する --- emitter.on メソッド

```javascript
// 登録
emitter.on(event, listener);
// 上限を設定
emitter.setMaxListener(n);
// 登録されているイベントハンドラーを取得する
emitter.listeners(event)
// 1回だけ実行されるイベントハンドラーを登録
emitter.once(event, listener);
```

### イベントハンドラーを削除する --- emitter.removeListener メソッド

```javascript
emitter.removeListener(event, listener);
emitter.removeAllListener([event]);
```

### イベントを発生する --- emitter.emit メソッド

```javascript
emitter.emit(event, [arg1], [arg2], [...]);
```


Node.js スクリプトを作成/実行する
---

```javascript
// hello.js
console.log('Hello, world');
```
```bash
$ node hello.js
Hello, world
```

改行コードについては、CR、LF、CR + LF のいずれでも問題ない。

node コマンドのオプションと環境変数
---

```bash
# バージョンの確認
$ node -v
v0.12.4

# ワンライナーコードを実行する
$ node -e 'console.log(Math.PI)'
3.141592653589793
# -p オプションを渡すとコードの実行結果も表示される
$ node -e -p 'console.log(Math.PI)'
3.141592653589793
undefined

# 標準入力を利用する
$ node < hello2.js
hello, world
# -i オプションを付ければ、実行結果を逐次表示させられる
$ node -i < hello2.js
> console.log('hello world');
hello, world
undefined
> console.log('こんにちわ、世界');
こんにちわ、世界
undefined

# デバッグモードを利用する
$ node debug code/hello2.js

# JavaScript エンジンのオプションを指定する
$ node --v8--options
```
