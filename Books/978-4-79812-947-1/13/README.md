# Webサーバーばかりが Node ではない

## [Socket.IO](http://socket.io/)

ブラウザがサーバーとの間に全二重接続を維持して、
両方の終端がデータを同時に送受信できるように、使用を定めようとしている。

```bash
$ npm install socket.io
```

### 最小限の Socket.IO アプリケーションを作る

__サーバーのUTCに基づいて、ブラウザをリアルタイムに更新し続けるWebアプリケーション__

```javascript
var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var html = fs.readFileSync('index.html', 'utf8');

function handler(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.bytelength(html, 'utf8'));
  res.end(html);
}

function tick() {
  var now = new Date().toUTCString();
  io.sockets.send(now);
}

setInterval(tick, 1000);
app.listen(3000);
```

```html
// index.html
<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io.connect();
  socket.on('message', function(time) {
    document.getElementById('time').innerHTML = time;
  });
</script>
<span id="time"></span>
```

### Socket.IO を使ってページとCSSのリロードをトリガする

- [ ] Step1: 多種多様なブラウザでWebページを開く
- [ ] Step2: そのページで調整が必要なスタイリングを探す
- [ ] Step3: スタイルシートに変更を加える
- [ ] Step4: すべての Webブラウザを手作業でリロードする
- [ ] Step5: Step2 に戻る


__fs.watchfile() と fs.watch()__

- fswatchFile() はリソースは多く消費するが、より信頼性が高く、クロスプラットフォームに動作する
- fs.watch() は、それぞれのプラットフォームで高度の最適かれているが、プラットフォームによっては振る舞いに違いがある


### Socket.IO: その他の用途

- アップロード進捗イベントをブラウザにフィードバックして、ユーザーにアップロードの進行を見せる中継処理に適しているだろう。

```javascript
form.on('progress', function(bytesReceived, bytesExpected) {
  var percent = Math.floor(bytesReceived / bytesExpected * 100);
  socket.emit('progress', { percent: percent });
});
```

- [socket.io and Express: Tying it all together](https://www.danielbaulig.de/socket-ioexpress/)


## TCP/IP ネットワーキング

Nodeは、TCPをベースとする各種ネットワーキングをサポートする。
Nodeは、たとえばメールサーバー、ファイルサーバー、プロキシサーバーなどを書くのに適したプラットフォームであり、これらのサービスのkライアンとにも使いことができる。
Nodeは、独自のBufferデータ型を実装している

### バッファとバイナリデータの扱いかた

```javascript
var b = new Buffer('121234869');
console.log(b.length);//=> 9
console.log(b);//=> <Buffer 31 32 31 32 33 34 38 39>
```

- writeUInt32LE() は、符号なしの整数値に使える
- writeInt32BE() は、ビッグエンディアンの値に使える

```javascript
var b = new Buffer(4);
b.writeInt32LE(121234869, 0);
console.log(b.length);//=> 4

console.log(b);//=> <Buffer b5 e5 39 07>
```

### TCPサーバーを作る

- TCPサーバーの作成で渡すコールバック関数は、ただ1つの引数を受け取る

__Socketクラス__

```javascript
// ごく簡単な net.Server の例
var net = require('net');
net.createServer(function(socket) {
  socket.write('Hello world\r\n');
  socket.end();
}).listen(1337);
console.log('Listening on port 1337');
```
アクセスする
```bash
$ netcat localhost 1337
# または
$ telnet localhost 1337
# telnet は会話モードで実行されるので、自分(telnet)のメッセージもプリントされる
```

__データの読み方__

- サーバーは「要求-応答」(request-response)のパラダイムに従うの一般的
- TCPソケットからデータを読むには、読み出し可能な Stream インターフェイスの原則従って、ソケットから読み出された入力データを含む data イベントを監視する

```javascript
socket.on('data', function(data) {
  console.log('got "data"', data);
});
```

endイベントを監視すれば、クライアントがソケットの終端をクローズするタイミングがわかる

```javascript
socket.on('end', function() {
  console.log('socket has ended');
});
```

指定されたSSHサーバーのバージョン文字列を参照するとしたら
```javascript
// client.js
var net = require('net');

var socket = net.connect({ host: process.argv[2], port: 22});
socket.setEncoding('utf8');

socket.once('data', function(chunk) {
  console.log('SSH server version: %j', chunk.trim());
  socket.end();
});
```

テスト
```bash
node client.js github.com
```

__2つのストリームを socket.pipe() で連結する__

```javascript
socket.pipe(socket);
```

__接続断のクリーンアップを行う__

- 接続を断ってソケットをきれいにクローズしないクライアントもあることを予期しなければならない
- ソケットの接続が断たれた後に行うクリーンアップ処理は end ではなく close を使う

```javascript
socket.on('close', function() {
  console.log('client disconnected.');
});
```

__全部まとめてTCPサーバーを作る__

- シンプルなエコーサーバーを作る
- さまざまなイベントが発生するたびにターミナルへのロギングを行う

[サンプル](echo-server.js)


### TCPクライアントを作る

- TCPサーバーに接続するには net.connect() を使う
- net.connect() は引数に host と port をとり、socketのインスタンスを返す

```javascript
var net = require('net');

var socket = net.connect({ port: 1337, host: localhost });
socket.on('connect', function() {
  // begin writting your "request"
  socket.write('Hello local.dmain.name\r\n');
  // ...
});
```

[サンプル: netcat コマンドの基本をNodeで複製する](netcat.js)


## OSとの相互作用を行うためのツール

### process グローバル: シングルトン

- Node プロセスは 1つのグローバル process オブジェクトを持つ
- すべてのモジュールが process へのアクセスを共有する
- EventEmitter のインスタンスである
- exit や uncaughtException などの特殊なイベントを発行する

```javascript
var debug;
if (process.env.DEBUG) {
  // process.env.DEBUG に基づいて debug 関数を設定
  debug = function(data) {
    // DEBUG 変数が設定されていたら、debug 関数は
    // 渡された引数を stderr にログとして出力する
    console.error(data);
  };
} else {
  // DEBUG 変数が設定されていなければ、debug 関数は空になり
  // 何もしない
  debug = function() {};
}

debug('this is a debug call');
console.log('Hello world');
debug('this another debug call');
```

テストする
```bash
$ node dubug-mode.js
Hello World

$ DEBUG=1 node dubug-mode.js
```

__プロセスが発行する特殊なイベント__

- exit : プロセス終了の直前に発行される
- uncaughtException : キャッチされないエラーが早出されたとき、いつでも発行される

```javascript
// exit: プロセス終了の直前に発行される
process.on('on', function(code) {
  console.log('Exiting...');
});

// uncaughtException: キャッチされないエラーが送出されたとき、いつでも発行される
process.on('uncaughtException', function(err) {
  console.error('got uncaught exception: ', err.message);
  process.exit(1);
  // uncaughtException を使うときは必ず process.exit を呼び出す
  // そうしなければアプリケーションは未定義の状態になってしまう
});
throw new Error('an uncaught exception');
```

__プロセスに送られたシグナルをキャッチする__

__SIGINT__ : [Ctrl] + [C] を押したときシェルによって送られるシグナル
__SIGUSR1__ : このシグナルを受信すると、Node は組み込みのデバッガに切り替わる
__SIGWINCH__ : ターミナルをリサイズしたとき、シェルによって送られるシグナル

```javascript
process.on('SIGINT', function() {
  console.log('Got Ctrl-C');
  server.close();
});
```

- [シグナルについて](http://linuxjm.osdn.jp/html/LDP_man-pages/man7/signal.7.html)


### fs モジュール

__Node.js の同期関数__

> 同期関数を使うのは、スタートアップ期間か、あなたのモジュールが最初にロードされるとき__だけ__にして、その後は__決して__使わないようにすべきだ

__ファイルを移動する__

[サンプルコード](copy.js)

```bash
$ node
> var move = require('./copy');
> move('copy.js', 'copy.js.bak', function(err) { if (err) throw err });
```

__ディレクトリやファイルの変更を監視する__

```javascript
var fs = require('fs');
fs.watchFile('/var/log/system.log', function(curr, prev) {
  if (curr.mtime.getTime() !== prev.mtime.getTime()) {
    console.log('"System.log" has been modified');
  }
});
```

__コミュニティモジュールを使う: fstream と filed__

- [fstream](https://github.com/npm/fstream)

```javascript
fstream
  .Reader('path/to/dir')
  .pipe(fstreamWriter({
    path: 'path/to/other/dir',
    filter: isValid
  }));

// これから書こうとしているファイルをチェックして
// コピーすべきかを示す値を返す(true ならコピー可)
function isValid() {
  // TextMate などのテキストエディタが作る一時ファイルを無視する
  return this.path[this.path.length - 1] !== '-';
}
```

- [filed](https://github.com/mikeal/filed)

```javascript
// filed によって通常のHTTPサーバーをたった1行で
// 完全な静的ファイルサーバーに変貌させるデモ
http.createServer(function(req, res) {
  req.pipe(filed('path/to/static/files')).pipe(res);
});
```


### 外部プロセスの生成

- cp.exec() : コールバックの中でコマンド群を作成し、その結果をバッファリングする、ハイレベルなAPI
- cp.spawn() : ChildPrecess オブジェクトに1つのコマンドを生成する、ローレベルなAPI
- cp.fork() : IPCチャネルが組み込まれた、もう1つのNode プロセスを生成する、特別な方法

[child_process について](http://nodejs.jp/nodejs.org_ja/api/child_process.html)

__cp.exec()を使ってコマンドの結果をバッファリングする__

[サンプル](irc.js)

IRCプロトコルを実装するモジュールなら、すでに良いものが、いくつか npm に登録されている。
だから、本当に IRC ボットを書きたいのなら、既存のモジュールを利用すべきだ。

- [irc](https://www.npmjs.com/package/irc)
- [irc-js](https://www.npmjs.com/package/irc-js)

```javascript
// コマンド出力をバッファリングする必要があるけれども、
// 引数のエスケープは、Node が自動的に行うのに任せたい、
// という場合は execFile() を使おう
cp.execFile('ls', ['-l', process.cwd()], function(err, stdout, stderr) {
  if (err) throw err;
  console.error(stderr);
});
```

__cp.spawn() を使って、Stream インターフェースを持つコマンドを生成する__

- ChildProcess オブジェクトを返す

```javascript
var child = cp.spawn('ls', ['-l']);

// stdout は通常の Stream インスタンスなので、
// data, end などのイベントを送出する
child.stdout.pipe(fs.createWriteStream('ls-result.txt'));

child.on('exit', function(code, signal) {
  // 子プロセスの終了時に送出されるイベント
});
```

__cp.fork() を使って負荷を分散する__

[サンプル](fib-server.js)


### コマンドラインツールを開発する

- ほとんどのコマンドラインプログラムには、プロセスに関する共通のニーズがある
- コマンドライン引数の解析、stdin からの読み出し、stdout および stderr への書き込みなど


__コマンドライン引数を解析する__

```javascript
var args = proces.argv.slice(2);
console.log(args);
```

```bash
$ node args.js
[]

$ node args.js hello world
['hello', 'world']

$ node args.js 'tobi is a ferret'
['tobi is a ferret']
```

[Array#forEach() と swtich() を使って process.argv を解析する](args.js)

### 標準入出力ストリーム(stdin と stdout)の使い方

- UNIX のプログラムは小さくまとまっていて、1つの仕事に専念するものが一般的
- プログラムを、パイプを使って組み合わせて、あるプロセスの結果を次のプロセスにフィードすることを、コマンドチェインの最後まで繰り返す

```bash
# Git リポジトリから著者名のユニークなリストを取り出す
# git log, sort, uniq の3つのコマンドを使う
$ git log --format='%aN' | sort | uniq
```

- __process.stdin__ : 入力データを読み出すための ReadStream
- __process.stdout__ : 出力データを書き込むための WriteStream


__process.stdout を使って出力データを書き込む__

- console.log() は、内部的に process.stdout.write を呼び出す
- 構造化されたデータを stdout に書き込む必要があるときは、 process.stdout.write() を直接呼び出すのがよい


```javascript
// たとえば、あなたのプログラムが HTTP の URL に接続し、
// その応答を stdout に各ミノだと仮定し、その場合は Stream#pipe() をうまく使える

var http = require('http');
var url = require('url');

var target = url.parse(process.argv[2]);
var req = hhttp.get(target, function(res) {
  res.pipe(process.stdout);
});
```


__process.stdin を使って入力データを読み込む__

- stdin からデータを読むためには、その前に process.stdin.resume() を呼び出して、あなたのスクリプトが stdin からのデータに関心があることを示す必要がある

[サンプル](age_ask.js)


### 出力の色分けを追加する

- スクリーンでの表示をわかりやすくすために、色分けされたテキストを使う

__ANSI エスケープコードの作成と書き込み__

- ターミナルのカラーは、ANSI のエスケープコード(escape codes)によって作られる
- ANSI (American National Standards Institute)

```javascript
console.log('\033[32mhello\033[39m');
```

__ansi.js を使って前景色を設定する__

- [ansi.js](https://github.com/TooTallNate/ansi.js)

```javascript
// "hello" というテキストを緑色でプリントアウトする
var ansi = require('ansi');
var cursor = ansi(process.stdout);

cursor
  .fg.green()
  .write('Hello')
  .fg.reset()
  .write('\n');
```

- cursor.fg.green() が、前景色(foreground color) を緑に設定する
- cursor.write('Hello') が、'Hello' というテキストを緑色でターミナルに書く
- cursor.fg.reset() が、前景色をデフォルトに戻す
- cursor.write('\n') が、改行を出力して終わる

__ansi.js を使って背景色を設定する__

- 前景色ではなく背景色を設定するには、呼び出しの fg の部分を bg に変える

```javascript
var ansi = require('ansi');
var cursor = ansi(process.stdout);

cursor
  .reset()
  .write('  ')
  .bold()
  .underline()
  .bg.white()
  .fg.black()
  .write('Node.js in Action')
  .fg.reset()
  .resetUnderline()
  .resetBold()
  .write(' \n')
  .fg.green()
  .write(' by:\n')
  .fg.cyan()
  .write(' Mike Cantelon\n')
  .fg.magenta()
  .write(' TJ Holowaychunk\n')
  .fg.yellow()
  .write(' Nathan Rajinch\n')
  .reset();
```
