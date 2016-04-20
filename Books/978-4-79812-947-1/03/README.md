# Node プログラミングの基礎知識

## 非同期ロジックをシークエンスする

シリアルフローとパラレルフロー

### 3.3.1 シリアルフロー制御をどんなときに使うか

復数の非同期タスクを順番に実行するためには、コールバックを使うこともできるが、タスクの数が
多くなると、それらを組織化(organize)する必要がある。

__nimble を使ったシリアルフロー制御__

```javascript
var nimble = require('nimble');

// Nimbleが順番に実行できるように関数の配列を提供する
nimble.series([
  function(callback) {
    setTimeout(function() {
      console.log('I execute first.');
      return callback();
    }, 1000);
  },
  function(callback) {
    setTimeout(function() {
      console.log('I execute next.');
      return callback();
    }, 500);
  },
  function(callback) {
    setTimeout(function() {
      console.log('I execute last.');
      return callback();
    }, 100);
  }
]);
```

### 3.3.2 シリアルフロー制御を実装する

```javascript

var fs = require('fs');
var request = require('request');
var htmlparser = require('htmlparser');
var configFilename = './rss_feeds.txt';


// タスク1: RSSフィードのURLリストを含むファイルが存在することを確認
function checkForRSSFile() {
  fs.exists(configFilename, function(exists) {
    if (!exists) {
      // エラーがあれば早期にリターン
      return next(new Error('Missing RSS file: ' + configFilename));
    }

    next(null, configFilename);
  });
}


// タスク2: フィードURLを含むファイルを読んで解析
function readRSSFile(configFilename) {
  fs.readFile(configFilename, function(err, feedList) {
    if (err) return next(err);
    // フィードURLのリストを文字列に変換してから、フィードURLの配列に入れる
    feedList = feedList.toString().replace(/^\s+|\s+$/g, '').split('\n');

    // フィードURLの配列からURLをランダムに選択
    var random = Math.floor(Math.random() * feedList.length);
    next(null, feedList[random]);
  });
}


// タスク3: HTTP要求を出して、選択したフィードのデータを取得する
function downloadRSSFeed(feedUrl) {
  request({uri: feedUrl}, function(err, res, body) {
    if (err) return next(err);
    if (res.statusCode != 200) {
      return next(new Error('Abnormal response status code'));
    }

    next(null, body);
  });
}


// タスク4: RSSデータを解析してアイテム配列に入れる
function parseRSSFeed(rss) {
  var handler = new htmlparser.RssHandler();
  var parser = new htmlparser.Parser(handler);
  parser.parseComplete(rss);

  // アイテムが見つからなければエラー
  if (!handler.dom.items.length) {
    return next(new Error('No RSS items found'));
  }

  var item = handler.dom.items.shift();
  console.log(item.title);
  console.log(item.link);
}

// 個々のタスクを実行したい順番で配列に追加
var tasks = [
  checkForRSSFile,
  readRSSFile,
  downloadRSSFeed,
  parseRSSFeed
];


// このnext関数を呼び出すと, 次のタスクが実行される
function next(err, result) {
  if (err) throw err;

  // タスクの配列から次のタスクを取り出す
  var currentTask = tasks.shift();

  if (currentTask) {
    currentTask(result);
  }
}

next();
```

### 3.3.3 パラレルフロー制御を実装する

```javascript

var fs = require('fs');
var completedTasks = 0;
var tasks = [];
var wordCounts = {};
var filesDir = './text';


function checkIfComplete() {
  completedTasks++;
  if (completedTasks == tasks.length) {
    // すべてのタスクが完了したら、それらのファイルで使われた個々のワードと
    // それぞれ何回使われたかを示すリストを作る
    for (var index in wordCounts) {
      console.log(index + ': ' +  wordCounts[index]);
    }
  }
}


function countWordsInText(text) {
  var words = text
    .toString()
    .toLowerCase()
    .split(/\W+/)
    .sort();

  // テキストでのワードの使用回数を数える
  for (var index in words) {
    var word = words[index];
    if (word) {
      wordCounts[word] = (wordCounts[word]) ? wordCounts[word] + 1 : 1;
    }
  }
}


// text ディレクトリ内のファイルのリストに作成
fs.readdir(filesDir, function(err, files) {
  if (err) throw err;
  for (var index in files) {
    // 個々のファイルを処理するタスクを定義。個々のタスクには、
    // ファイルを非同期に読み出してから、そのファイルにおける
    // ワード使用頻度を数える関数の呼び出しが含まれる
    var task = (function(file) {
      return function() {
        fs.readFile(file, function(err, text) {
          if (err) throw err;
          countWordsInText(text);
          checkIfComplete();
        });
      };
    })(filesDir + '/' + files[index]);

    tasks.push(task);
  }

  // すべてのタスクの実行をパラレルに開始
  for (var task in tasks) {
    tasks[task]();
  }
});
```

### 3.3.4 フロー制御ツールを利用する

多くのフロー制御ツールが、便利なコミュニティ製アドオンとして提供されている。
なかでも人気のあるものに、Nimble、Step、Seq などがある。


```javascript
// Nimbleを使って、復数のタスクをシーケンス化する例
// パラレルフロー制御を使って、2つのファイルを同時にダウンロードし
// ダウンロードの完了をシリアルフロー制御を使って確認し、アーカイブ化の処理を行う
var flow = require('nimble');
var exec = require('child_process').exec;


// 指定されたバージョンのNodeソースコードをダウンロード
function downloadNodeVersion(version, destination, callback) {
  var url = 'http://nodejs.org/dist/node-v' + version + '.tar.gz';
  var filepath = destination + '/' + version + '.tgz';

  exec('curl ' + url + ' >' + filepath, callback);
}


// 一連のタスクをシリアルに実行する
flow.series([
  function (callback) {
    // ダウンロードをパラレルに実行する
    flow.parallel([
      function(callback) {
        console.log('Downloading Node v0.4.6');
        downloadNodeVersion('0.4.6', './tmp', callback);
      },
      function(callback) {
        console.log('Downloading node v0.4.7');
        downloadNodeVersion('0.4.7', './tmp', callback);
      }
    ], callback);
  },
  function (callback) {
    console.log('Creating archive of downloaded files...');
    // アーカイブファイルを作る
    exec(
      'tar cvf node.distros.tar /tmp/0.4.6.tgz /tmp/0.4.7.tgz',
      function (error, stdout, stderr) {
        console.log('All done');
        callback();
      }
    );
  }
]);
```


### 受信したHTTPリクエストをNode 開発者が受け取る方法

__サンプル__

```javascript
var http = require('http');
var server = http.createServer(function(req, res) {
  // リクエストを処理する
  res.end('Hello World');

  // ↑ は ↓ と同等
  // res.write('Hello World');
  // res.end();
});

// 最後に行うべきことは, ポートへのバインドである
// これによって, リクエストの着信をリスン(監視)する
// * 開発中は, 例えば3000番などの「非特権ポート」にバインドするのが典型的
server.listen(3000);
```

### リクエストヘッダを読んでレスポンスヘッダを設定する

__サンプル__

```javascript
var http = require('http');
var server = http.createServer(function(req, res) {

  var body = 'Hello World';
  // Content-Length を設定
  res.setHeader('Content-Length', body.length);
  // Content-Type を設定
  res.setHeader('Content-Type', 'text/plain');
  res.end(body);
});
```
* ヘッダは, どういう順序で追加・削除してもよいが、それが可能なのは、最初に `res.write()` または、`res.end()` を呼び出す前 に限られる.


### HTTPレスポンスにステータスコードを設定する

__方法__

ステータスコードを設定するには `res.statusCode` プロパティをセットする

__記述の位置__

`res.write()` または `res.end()` の最初の呼び出しを行う前

__サンプル__

```javascript
var http = require('http');
var server = http.createServer(function(req, res) {
  var url = 'http://google.com';
  var body = '<p>Redirecting to <a href="'+ url +'">'+url+'</a></p>';

  res.setHeader('Location', url);
  res.setHeader('Content-Length', body.length);
  res.setHeader('Content-Type', 'text/html');
  res.statusCode = 302;
  // res.setHeader() 呼び出しの上にあっても、下にあってもよい
  res.end(body);
});

server.listen(3000);
```


## RESTful Webサービスの構築

4つの動詞(GET, POST, PUT, DELETE)は、URLで指定された
リソースの取得(retrieving)、作成(creating)、更新(updating)、削除(removing)
にマップされる


### POSTリクエストでリソースを作成

__チャンク__

data イベントの引数にデータのチャンク(かたまり)が含まれれている.

```javascript
var http = require('http');
var server = http.createServer(function(req, res) {

  // dataイベントは, データの新しいチャンクが読み出されたとき, その都度発火される
  req.on('data', function(chunk) {
    console.log('parsed', chunk);
  });

  // end イベントは, すべてのデータを読み終わったときに発火される
  req.on('end', function(chunk) {

  });
});
```

__チャンクの型__

```javascript
req.setEncoding('utf8');
```
* dataイベントがデフォルトで提供する Buffer オブジェクトは「バイト配列」(byte array)


__POSTリクエスト本体の文字列をバッファリングする__

```javascript
var http = require('http');
var url = require('url');
var items = [];// このデータストアは, メモリ内の通常の配列

var server = http.createServer(function(req, res) {
  switch(req.method) {
    case 'POST':
      var item = ''; // 受信する項目用に文字列バッファを初期化
      req.setEncoding('utf8');

      req.on('data', function(chunk) {
        item += chunk; // データチャンクを文字列バッファに連結
      });

      req.on('end', function() {
        items.push(item);
        res.end('OK\n');
      });
      break;
  }
});
```

### GETリクエストでリソースをフェッチする

```javascript
case 'GET':
  items.forEach(function(item, i) {
    res.write(i + ') ' + item + '\n');
  });
```

__Content-Length__

応答速度をあげるために, 可能なときはレスポンスの Content-length フィールドを設定すべき。

```javascript
var body = item.map(function() {
  return i + ') ' + item;
}).join('\n');
res.setHeader('Content-Length', Buffer.byteLength(body));
res.setHeader('Content-Type', 'text/plain; charset="utf-8"');
res.end(body);
```
* Content-Length の値が表現するのは, 文字数ではなくバイト長である。
  文字列にマルチバイト文字が入っていたらこの2つの値は異なる。
  この問題を避けるため `Buffer.byteLength()` メソッドを使う


### DELETE リクエストでリソースを削除する

```javascript
case 'DELETE':
  var path = url.parse().pathname;
  var i = parseInt(path.slice(1), 10);

  // IDが数値として有効かをチェック
  if (isNaN(i)) {
    res.statusCode = 400;
    res.end('Invalid item id');

  } else if (!item[i]) {
    // リクエストされたインデックスが存在することをチェック
    res.statusCode = 404;
    res.end('Item not found');
  } else {

    // リクエストされた項目を削除
    items.splice(i, 1);
    res.end('OK\n');
  }
break;
```


## 静的ファイルの供給

### 静的ファイルサーバーを作る

```javascript
var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');

var root = __dirname;

var server = http.createServer(function(req, res) {
  // URLの解析
  var url = parse(req.url);
  var path = join(root, url.pathname);

});

server.listen(3000);
```

* これは単純化された例である. もし製品用として実行したいのなら, もっと徹底的に
  入力を検証し, ユーザーが「ディレクトリトラバーサル攻撃」をかけてファイルシステムの
  アクセスしてほしくない部分アクセスしようとするのを防止すべきだ.


これでパスが判明し, 次はファイルの内容を転送する必要がある.
これを行うには, Node の Stream クラス群の1つである fs.ReadStream によって,
ハイレベルのストリーミングディスクアクセスを使うことができる

```javascript
var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');

var root = __dirname;

var server = http.createServer(function(req, res) {
  // URLの解析
  var url = parse(req.url);
  var path = join(root, url.pathname);

  // fs>ReadStream の作成
  var stream = fs.createReadStream(path);
  // ファイルデータをレスポンスに書く
  steram.on('data', function(chunk) {
    res.write(chunk);
  });

  // ファイルが完了したらレスポンスを終了
  stream.on('end', function() {
    res.end();
  });
});
```

__データ転送を `Stream#pipe()` で最適化する__

```javascript
var server = http.createServer(function(req, res) {
  var url = parse(req.url);
  var path = join(root, url.pathname);
  var stream = fs.createReadStream(path);
  stream.pipe(res); // res.end() は pipe() の中で呼ばれる
});
```


### サーバーエラーを処理する

```javascript
stream.pipe(res);
stream.on('error', function() {
  res.statusCode = 500;
  res.end('Internal Server Error');
});
```

### fs.stat による先生的なエラー処理

```javascript
fs.stat(path, function(err, stat) {
  if (err) {
    if ('ENOENT' == err.code) {
      res.statusCode = 404;
      res.end('Not Found');
    } else {
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  } else {
    res.setHeader('Content-Length', stat.size);

    var stream = fs.createReadStream(path);
    stream.pipe(res);
    stream.on('error', function() {
      res.statusCode = 500;
      res.end('Internal Server Error');
    });
  }
});
```


## ユーザ入力をフォームから受け取る

Webアプリケーションは, ユーザー入力を「フォーム提出」(form submission)の形式で集める


### 提出されたフォームのフィールド群を処理する

フォーム提出のリクエストでは, 次の2種類の Content-Type 値が典型的に見られる.

`application/x-www-form-urlencoded` : HTMLフォームのデフォルト値
`mutippart/form-data` : フォームがフィアうろを含むか, バイナリデータを含む場合に使われる

[サンプル](example/to-do.js)


### アップロードされたファイルを formidable で処理する

[サンプル](example/file-upload.js)

```html
<form method="post" action="/" enctype="multipart/form-data">
<p><input type="text" name="name"></p>
<p><input type="file" name="file"></p>
<p><input type="submit" value="upload"></p>
</form>
```

__formidable のAPIを使う__

```javascript
var form = new formidable.IncomingForm();

form.on('field', function(filed, value) {
  console.log(field);
  console.log(value);
});

form.on('file', function(name, file) {
  console.log(name);
  console.log(file);
});

form.on('end', function() {
  res.end('upload complete!');
});

form.parse(req, function(err, fields, files) {
  console.log(fields);
  console.log(files);
  res.end('upload complete!');
});
```

__アップロードの進捗を計算する__

```javascript
form.on('progress', function(bytesReceived, bytesExpected) {
  var percent = Math.floor(bytesReceived / bytesExpected * 100);
  console.log(percent);
});
```

## HTTPS でアプリケーションのセキュリティを確保

HTTPSは, HTTPにトランスポート層のTLS/SSLを組み合わせたもの

自作NodeアプリケーションでHTTPSの利点を活用したいのなら, 最初のステップは, 秘密鍵と証明書(certificate)を取得することだ
秘密鍵(private key)とは, 基本的にはサーバーとクライアントとの間で送信されるデータの暗号化に必要な「秘密のタネ」である
この秘密鍵はサーバ上に保存されるが, 信頼出来ないユーザが容易にアクセスできない場所に置かれる
