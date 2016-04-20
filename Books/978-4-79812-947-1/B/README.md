# Node をデバッグする

## JSHint でコードを分析する

__JSHint をグローバルにインストールする__

```bash
$ npm install -g jshint
```
カスタマイズしたコンフィギュレーションに `.jshintrc` という名前を付けて、アプリケーションディレクトリか、その親ディレクトリに入れれば、jsHint はそのファイルを自動的に見つけて、使ってくれる。

- [コンフィギュレーションファイル](https://github.com/jshint/jshint/blob/master/examples/.jshintrc)
- [jsHint.com](http://jshint.com/docs/)
- [.jshintrc の日本語の説明](http://qiita.com/HieroglypH/items/3cb16ecff43b8e5f62e1)

__チェックする__

```sh
$ jshint my_app.js

# config フラグを使って、コンフィギュレーションファイルを指定してチェックする
$ jshint my_app.js --config /home/mike/jshint.json
```

## デバッグ情報を出力する

### console モジュールでデバッグする

__アプリケーションの状態を示す情報を出力する__

```javascript
// 標準出力にプリントする
console.log('Counter: %d', counter);
// console.info() という別名もある

// 警告やエラー
console.warn('Warning!');
console.error('Error');
// log との相違点は、標準出力でなく標準エラーにプリントされること
// 警告やエラーをログファイルにリダイレクトすることができる
// $ node server.js 2> error.log


// オブジェクトの内容を出力する
console.dir(obj);
```

__タイミングを出力する__

```javascript
console.time('myComponent');
// do something
console.timeEnd('myComponent');
```

__スタックトレースを出力する__

```javascript
console.trace();
```


## Node の組み込みデバッガ

```bash
$ node debug server.js
```

### デバッガの実行制御

- デバッガは、プロンプトからアプリケーションの実行を制御できる
- プロンプトに next (または n) を入力すれば、次の行が実行される

```javascript
// debug_test.js
var http = require('http');

function handleRequest(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}

http.createServer(function(req, res) {
  debugger; // コードにブレークポイントを追加
  handlerRequest(req, res);
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337');
```

```bash
$ node debug debug_test.js
> n
```

ブレークポイントは、ソースコードだけでなく、デバッガの操作からも設定できる

```sh
# 現在の行にブレークポイントを設定
> setBreakpoint()
# または sb()

# 特定の行(line)にブレークポイントを設定する
> sb(line)

# 特定の関数
> sb('fn()')

# ファイルと行を指定
> sb('server.js', 10)

# ブレークポイントを解除する
# setBreakpoint() と同じ引数を取る
> clearBreakpoint()
# または cb()
```


### デバッガで状態を調査/操作する

- アプリケーションの中で、特定の値に注目したいときは「ウォッチャー」(watcher)を追加できる
- watch("req.headers['user-agent']"), unwatch("header['user-agent']")


## Node Inspector

Node Inspector をグローバルにインストール

```bash
$ npm install -g node-inspector
```

```bash
$ node --debug-brk server.js
# --debug-brk を使うと、アプリケーションの最初の行にブレークポイントを挿入した状態でデバッグ開始できる
# 必要がなければ、--debug を使うこともできる
```

アプリケーションを実行したあとで

```bash
> node-inspector
```

Node Inspector の実行を開始したあと、Webkit ブラウザで `http://127.0.0.1:8080/debug?port=5858` を訪問すれば Node inspector が現れる

### Node Inspector の実行制御

- [node-inspector/node-inspector](https://github.com/node-inspector/node-inspector)

__怪しいときはリフレッシュ__

Node Inspector を使っているとき、おかしな振る舞いに遭遇したら、ブラウザをリフレッシュすると治るかもしれない。
それでもだめなら、Node アプリケーションと Node Inspector の両方を再起動してみよう。
