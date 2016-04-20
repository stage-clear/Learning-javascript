# Webデータの収集

## Web ページのダウンロード

### Node.js でダウンロードしてみよう

```javascript
// download-node.js

// url にあるファイルを savepath にダウンロードする
// ダウンロード元URLの指定
var url = 'http://kujirahand.com';
// 保存先のパスを指定
var savepath = 'test.html';

// 利用モジュールの取り込み
var http = require('http');
var fs = require('fs');

// 出力先を指定
var outfile = fs.createWriteStream(savepath);

// 非同期でURLからファイルをダウンロード
http.get(url, function(res) {
  res.pipe(outfile);
  res.on('end', function() {
    outfile.close();
    console.log('OK');
  });
});
```

__プログラムをブラッシュアップする__

```javascript
// download-node-func.js
download(
  'http://www.aozora.gr.jp/index_pages/person81.html',
  'miyazawakenji.html',
  function() {
    console.log('ok, kenji.');
  }
);

download(
  'http://www.aozora.gr.jp/index_pages/person148.html',
  'natumesoseki.html',
  function() {
    console.log('ok, soseki');
  }
);

function download(url, savepath, callback) {
  var http = require('http');
  var fs = require('fs');
  var outfile = fs.createWriteStream(savepath);
  var req = http.get(url, function(res) {
    res.pipe(outfile);
    res.on('end', function() {
      outfile.close();
      callback();
    });
  });
}
```

## HTMLの解析 (リンクと画像の抽出)

### スクレイピングしよう

Webの世界でいう「スクレイピング」とは、Webサイトから WebページのHTMLデータを収集して、特定のデータを抽出、整形し直すことです。

### HTMLファイルをダウンロードする

```javascript
// getpage.js

// モジュールの読み込み
var client = require('cheerio-httpcli');

// ダウンロード
var url = 'http://www.aozora.gr.jp/index_pages/person81.html';
var param = {};
client.fetch(url, param, function(err, $, res) {
  // エラーがないかチェック
  if (err) {
    console.log('Error:', err);
    return;
  }

  var body = $.html();
  console.log(body);
});
```

### HTMLファイルのリンクを抽出する

```javascript
// showlink.js
// モジュールの読み込み
var client = require('cheerio-httpcli');

// ダウンロード
var url = 'http://www.aozora.gr.jp/index_pages/person81.html';
var param = {};
client.fetch(url, param, function(err, $, res) {
  if (err) {
    console.log(err);
    return;
  }

  // リンクを抽出して表示
  $('a').each(function(idx) {
    var text = $(this).text();
    var href = $(this).attr('href');
    console.log(text + ':' + href);
  });
});
```

### 相対URLを絶対URLに変換する

```javascript
// url-test.js

// urlモジュールを読み込む
var URL = require('url');

// 相対パスを絶対パスに変換
var base = 'http://kujirahand.com/url/test/index.html';
var u1 = URL.resolve(base, 'a.html');
console.log('u1 = ', u1);
var u2 = URL.resolve(base, '../b.html');
console.log('u2 = ', u2);
var u3 = URL.resolve(base, '/c.html');
console.log('u3 = ', u3);
var res = URL.resolve();
```

```javascript
// showlink-path.js

var client = require('cheerio-httpcli');
var URL = require('url');

// URLとパラメーター
var url = 'http://www.aozora.gr.jp/index_pages/person81.html';
var param = {};

// ダウンロード
client.fetch(url, param, function(err, $, res) {
  if (err) {
    console.log(err);
    return;
  }

  $('a').each(function(idx) {
    var text = $(this).text();
    var href = $(this).attr('href');
    if (!href) return;
    // 相対パスを絶対パスに直す
    var href2 = URL.resolve(url, href);
    // 結果を表示
    console.log(text + ': ', href);
    console.log(' => ', href2 + '\n');
  });
});
```
