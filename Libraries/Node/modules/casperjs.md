CasperJS
=========

- Phantom.js を簡単に使うライブラリ
- !ES6

__インストール__ 

```bash
$ sudo npm install -g casperjs
```

__メソッド__  

|Method|Format|Summary|
|:--|:--|:--|
| start | `start([url, Function])` |処理を開始|
| open | `open([url])` |urlを開く|
| then | `then([Function])` |処理を行う|
| thenOpen | `thenOpen([url])` |URLを開く|
| run | `run()` |処理を実行|
| fill | `fill([selector, param, post?])` |フォームの設定|
| evaluate | `evaluate([Function (,args...)])` |ページ内でJavaScriptを実行|
| echo | `echo([String])` |コンソールに出力|
| each | `each([Array, function])` |配列を順に処理|
| exists | `exists([selector])` |特定のDOM要素があるかどうか|
| mouseEvent | `mouseEvent([eventName, selector])` |ターゲットのDOMでマウスイベントを発生させる|
| capture | `capture(file[.format])` |画面のキャプチャを指定したフォーマットで保存|


__基本的な処理の流れ__

```javascript
// CasperJS のオブジェクトを作成
var casper = require('casper').create();

// 開始
casper.start();

// URLを開く
casper.open(URL);

// URL に対して何らかの処理を行う
casper.then(function() {
  // do something..
})

casper.then(function() {
  // do something 2...
});

// 実行
casper.run();
```

使い方
------

__例) タイトルを取得してコンソールに表示__

```javascript
// getTitle.js

var casper = require('casper').create();
var url = 'https://google.com';
casper.start(url, function() {
  // タイトルを表示
  this.echo(casper.getTitle());
});
casper.run();
```
```bash
$ casperjs getTitle.js
```

__例) スクリーンショットを撮る__ 

```javascript
// screenshot.js

var casper = require('casper').create();
casper.start();
casper.open('https://google.co.jp');
casper.then(function() {
  // スクリーンショットを撮影
  casper.capture('screenshot.png');
});
casper.run();
```
```bash
$ casperjs screenshot.js
```

__例) Flickr の検索結果をキャプチャする__

```javascript
// flicker-shot.js

var casper = require('casper').create();
casper.start();
casper.viewport(1400, 800);
// UserAgent を指定
casper.userAgent('User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36');
var text = encodeURIComponent('ネコ'); //検索ワード
casper.open('https://www.flickr.com/search/?text=' + text);
casper.then(function() {
  this.capture('flickr-shot.png', {
    top: 0, left: 0, width: 1400, height: 800
  });
});
casper.run();
```
```bash
$ casperjs flickrshot.js
```

__例) コマンドライン・スクリーンショット撮影ツールを作る__ 

```javascript
var casper = require('casper').create();
var utils = require('utils');

var args = casper.cli.args;
if (args < 1) {
  // help
  casper.echo('USES:');
  casper.echo('shot-tool URL [savepath]');
  casper.exit();
}
var savepath = 'screenshot.png';
var url = args[0];
if (args.length > 1) {
  savepath = args[1];
}

casper.start();
casper.viewport(1024, 768);
casper.open(url);
casper.then(function() {
  this.capture(savepath, {
    top: 0, left: 0, width: 1024, height: 768
  });
});
casper.run();
```
手軽に呼び出せるようにシェルスクリプトを作る
```bash
#!bin/sh
SCRIPT_DIR=`dirname $0`
/usr/local/bin/casperjs $SCRIPT_DIR/shot-tool.js $*
```

__例) フォームの値を設定する__

```javascript
/*
 * @param {String} (CSS) Selector
 * @param {Object} key-value
 * @param {Boolean} post
 */
casper.fill(Selector, {
  name: value
}, post);
```

```html
<form action="/post" id="post-form">
  <input type="text" name="title">
  <textarea name="body"></textarea>
  <input type="radio" name="ftype" value="book"> Book
  <input type="radio" name="ftype" value="question"> Question
  <input type="radio" name="ftype" value="comment"> Comment
  <input type="file" name="attachment">
  <input type="checkbox" name="agreement"> Agree
  <input type="submit" value="Post!">
</form>
```

```javascript
casper.fill('form#post-form', {
  title: 'this is title.',
  body: 'this is body.',
  ftype: 'Comment',
  attachment: '/path/to/photo.jpg',
  agreement: true
}, true);
```

__ログインしてお気に入りボタンをクリックさせる__

```javascript
var USER = 'username';
var PASS = 'password';

// お気に入りの対象となるページのユーザ
var DEFAULT_TARGET_ID = 0;
var target_user_id = DEFAULT_TARGET_ID;

var casper = require('casper').create();
var utils = require('utils');

var args = casper.cli.args;
if (args.length >= 1) {
  target_user_id = parseInt(args[0]);
  if (target_user_id === 0) {
    target_usre_id = DEFAULT_TARGET_ID;
  }
}

casper.echo('target_user_id=' + target_user_id);
casper.start();

// ログインする
casper.open('http://example.com/login/page');
casper.then(function() {
  this.fill('form', {
    username: USER,
    password: PASS
  }, true);
});

casper.thenOpen('http://example/user/' + target_user_id);

casper.then(function() {
  var getList = function() {
    var links = [];
    var list = document.querySelectorAll('ul#mmlist a');
    for (var i=0; i<list.length; i++) {
      var a = list[i];
      if (a.href.indexOf('post.php') > 0) {
        links.push(a.href);
      }
    }
    return links;
  };
  
  var links = this.evaluate(getList);
  utils.dump(links);
  
  casper.each(links, function(self, link) {
    self.thenOpen(link, function() {
      if (this.exists('#fav_add_btn')) {
        this.mouseEvent('click', '#fav_add_btn');
        this.echo('- click: ' + link);
      } else {
        this.echo('- already: ' + link);
      }
    });
  });
});

casper.then(function() {
  this.echo('completed');
});

casper.run();
```

__PDFで保存__

```javascript
let casper = require('casper').create();

casper.start();
casper.page.paperSize = {
  width: '8.5in',
  height: '11in',
  orientation: 'portrait',
  margin: '1cm'
};

casper.thenOpen(url, () => {
  casper.capture('test.pdf');
  casper.echo('pdf created.');
})

```

リンク
------

- [CasperJS](http://casperjs.org/)
- [CasperJS/API Documentaion](http://casperjs.readthedocs.org/en/latest/modules/)
- [npm/casperjs](https://www.npmjs.com/package/casperjs)

