バイナリデータの操作とファイルの入出力
===

文字列と Buffer
---

### Buffer 型オブジェクトの作成 --- Buffer クラスのコンストラクタ

### 文字列とエンコーディング

### String クラスと Buffer クラスの挙動の違い

### Buffer 型と String 型の相互変換

- Buffer#toString()
- Buffer#write()
- StringDecoder クラス

### Buffer と数値と相互変換

- Buffer#read*()
- Buffer#write*()

### Buffer 型オブジェクトのコピー

- Buffer#copy()

### Buffer クラスのクラスメソッド

- Buffer#isBuffer()
- Buffer#byteLength()
- Buffer#concat()


ファイルやファイルシステムにアクセスする
---

### 同期処理と非同期処理

### ファイルからデータを読み出す

- fs.readFile(filename, [encoding], [callback])
- fs.readFileSync(filename, [encoding])

### ファイルにデータを書き込む

- fs.writeFile(filename, data, [encoding], [callback])
- fs.writeFileSync(filename, data, [encoding]);

* 指定されたファイルが存在しない場合は新規作成される


### ファイルにデータを追記する

- fs.appendFile(filename, data, [encoding], [callback])
- fs.appendFileSync(filename, data, [encoding]);

* 指定されたファイルが存在しない場合は新規作成される


より柔軟なファイル操作を行う
---

__ファイルの読み書きを行う関数__

| Name | Summary |
|:--|:--|
| fs.open | ファイルを開く |
| fs.openSync | 同上(同期的に) |
| fs.close | 開いたファイルを閉じる |
| fs.closeSync | 同上(同期的に) |
| fs.write | ファイルにデータを書き込む |
| fs.writeSync |  同上(同期的に)  |
| fs.read | ファイルからデータを読み出す |
| fs.readSync |  同上(同期的に) |


### ファイルを開く

- fs.open(path, flags, [mode], [callback])
- fs.openSync(path, flags, [mode])

* mode = (defalut) 0

```javascript
fs.open('hoge.txt', function(err, fd) {
  // fd : ファイルディスクリプター
  console.log('fd is ' + fd);
  console.log('typeof fd is ' + typeof fd);
});
```

### ファイルへのデータの読み書き

- fs.write(fd, buffer, offset, length, position, [callback])
- fs.read(fd, buffer, offset, length, position, [callback])
- fs.writeSync(fd, buffer, offset, length, position)
- fs.readSync(fd, buffer, offset, length, position)

```javascript
fs.open('hoge.txt', 'w', function(err, fd) {
  var buf = new Buffer('apple-orange-grape-peach');
  // 'apple-' という文字を書き込む
  fs.write(fd, buf, 0, 6, 0);
  // 'orange-' という文字列を書き込む
  fs.write(fd, buf, 6, 7, 6);
  // 'grape-' という文字列を書き込む
  fs.write(fd, buf, 13, 6, 13);
  // 'peach' という文字列を書き込む
  fs.write(fd, buf, 19, 5, 19, function(err, written, buffer) {
    fs.close(fd);
  });
});
```

### ファイルの大きさを変更する

- fs.truncate(fd, len, [callback])
- fs.truncateSync(fd, len)

fileSize >= len : len のサイズまでファイルが切り詰められる
fileSize <  len : len までファイルの末尾に 0 が追加される


### ファイルバッファをフラッシュする

- fs.fsync(fd, [callback])
- fsyncSync(fd)

ファイルの書き込みはメモリにキャッシュされ、一定量貯まった
ところでまとめて書き込みが実行されるが、これらの関数を使用することで
強制的に実行できる。

### ファイルの情報を取得する

- fs.stat(path, [callback])
- fs.statSync(path)
- fs.lstat(path, [callback])
- fs.lstatSync(path)
- fs.fstat(fd, [callback])
- fs.fstatSync(fd)

fs.Stats クラスのメソッド及びプロパティ(P124)

### ファイルの存在を調べる

- fs.exisits(path, [callback])
- fs.existsSync(path)


### ファイルの所有者を変更する

- fs.chown(path, uid, gid, [callback])
- fs.chownSync(path, uid, gid)
- fs.lchown(path, uid, gid, [callback])
- fs.lchownSync(path, uid, gid)
- fs.fchown(path, uid, gid, [callback])
- fs.fchownSync(path, uid, gid)


#### ファイルのパーミッションを変更する

- fs.chmod(path, mode, [callback])
- fs.chmodSync(path, mode)
- fs.fchmod(path, mode, [callback])
- fs.fchmodSync(path, mode)
- fs.lchmod(path, mode)
- fs.lchmodSync(path, mode)


### ファイルのタイムスタンプを変更する

- fs.utimes(path, atime, mtime, [callback])
- fs.utimesSync(path, atime, mtime)
- fs.futimes(fd, atime, mtime, [callback])
- fs.futimesSync(fd, atime, mtime)


### シンボリックリンクが参照しているファイルのパスを取得する

- fs.readlink(path, [callback])
- fs.readlinkSync(path)

### 正規化された絶対パスを取得する

- fs.realpath(path, [callback])
- fs.realpathSync(path)

```javascript
fs.realpathSync('./'); // カレントディレクトリ
fs.realpathSync('../'); // カレントディレクトリの親
fs.realpathSync('/var/') // var は OSX で /pricate/var へのシンボリックリンク
fs.realpathSync('/var/tmp/') // var/tmp の実体は
```

### ディクレトリの作成やファイルの削除、リネーム

表6-6(P128)

### ディレクトリ中のファイル一覧を取得

```javascript
fs.readdir(path, [callback])
fs.readdirSync(path)
```


### ファイルやディレクトリを監視する

- fs.watch(filename, [options], [listener])

```javascript
var watcher = fs.watch('hoge.txt', function(event, filename) {
  var name = filename || 'hoge.txt';
  if (event == 'change') {
    console.log(name + ' changed.');
  } else if (event == 'rename') {
    console.log(name + ' renamed.');
  }
});
```

* fs.watch はプラットフォームごとに異なる方法で実装されている
  そのため、挙動もそれぞれ異なるので注意が必要。
  change イベントハンドラーに与えられる filename は Linux/Windows でのみ有効それ以外では null が返る


ストリームを使ったファイルアクセス
---

- ストリームはさまざまな入出力を抽象化したもの
- イベント駆動型でデータを読み書きを実行するため、大量のデータに対して効率的に読み書きを実行できる
- ストリーム読み込み用の Readable Stream と、書き込み用の Writable Stream の2種類がある

### イベントドリブンで読み込みを行う Readable Stream

__Readble Stream が発生させるイベント__

| Name | Arguments | Summary |
|:--|:--|:--|
| data  | data      | データを読み込んだ時に発生する。data 引数には読み込んだデータが格納される |
| end   | -         | 全データの読み込みが完了したときに発生する |
| error | exception | エラーが発生したときに発生する。exception 引数にはエラーオブジェクトが格納される |
| close | -         | 読み込み対象がクローズされたときに発生する |

__Readable Stream のメソッドおよびプロパティ__

| Name | Summary |
|:--|:--|
| stream.readable                     | ストリームからデータを読み込んでいるときは true、エラーの発生時や読み込みが完了したときは false となる |
| stream.setEncoding([encoding])      | 文字列を読み込むときのエンコーディングを指定する |
| stream.pause()                      | 読み込みを一時停止する |
| stream.resume()                     | 一時停止した読み込みを再開する |
| stream.destroy()                    | ストリームに関連つけられたデータソースを閉じる |
| stream.pipe(destination, [option])  | 読み込みストリームと書き込みストリームを接続する |

- Readable Stream の場合、デフォルトでは Buffer 型でデータを渡す
- setEncoding でエンコードを指定することで文字列に変換できる


### イベントドリブンで書き込みを行う Writable Stream

- Writable Stream は、イベントを使用してデータの書き込みを実行する

| Name | Arguments | Summary |
|:--|:--|:--|
| drain | -         | データを書き込める状態になったときに発生する |
| error | exception | エラー発生時のイベント。exception 引数にはエラーオブジェクトが格納される |
| close | -         | 読み込み対象がクローズされたときに発生する |
| pipe  | src       | Readable Stream の pipe メソッドに引数として与えられたときに発生する |

```javascript
// 書き込む
stream.write(data, [encoding]);

// 書き込みの終了
stream.end();
stream.end(data, [encoding]);
```

__Writable Stream のメソッドおよびプロパティ__

| Name | Summary |
| stream.writable       | ストリームにデータを書き込めるときは true、エラー発生時や書き込み完了時などデータを書き込めないときは false となる |
| stream.destroy()      | ストリームに関連付けられた書き込み先をすぐにクローズする |
| stream.destroySoon()  | 書き込みキューに残されたデータを書き込んでからクローズする |


### ストリームを使ったファイルアクセス

```javascript
fs.createReadStream(path, [option])
```

__createReadStream 関数で指定できるオプション__

| Name | Default | Summary |
|:--|:--|:--|
| flags      | 'r'       | ファイルを開く際に与えるフラグ |
| encoding   | null      | ファイルのエンコーディング |
| fd         | null      | ストリームとしてアクセスするファイルのファイルディスクリプター |
| mode       | 0666      | ファイルを開く際のパーミッション |
| bufferSize | 64 * 1024 | 読み込みに使用するバッファサイズ |
| start      | undefined | 読み込みを開始する位置|
| end        | undefined | 読み込みを終了する |


__fs.ReadStreamクラスを使ったファイルの読み込み__

```javascript
function readFromFile() {
  stream = fs.createReadStream('test.txt', { encoding: 'utf8' });
  stream.on('data', function(data) {
    console.log(data);
  });
}

readFromFile();
//=>
```

fs.WriteStream クラスのインスタンスを作成する

```javascript
fs.createWriteStream(path, [option])
```

| Name | Default | Summary |
|:--|:--|:--|
| flags | 'w' | ファイルを開く際に与えるフラグ |
| encoding | null | ファイルのエンコーディング |
| mode | 0666 | ファイルを開く際のパーミッション |
| start | undefined | 書き込みを開始する位置 |

* flagsオプションで 'r+' などを指定して、既存のファイルに対して書き込みを行う場合、start オプションで書き込みの開始位置を指定できる

__fs.WriteStream クラスを使ってファイルへの書き込みを行う__

```javascript
var file = fs.createWriteStream('hoge.txt', { flags: 'w'});
file.write('abcde');
file.write('efghi');
file.end('xyz');
```
