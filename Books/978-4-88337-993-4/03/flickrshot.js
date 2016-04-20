// Flickr で検索しスクリーンショットを撮る

var casper = require('casper').create();

// 開始
casper.start();

// 画面サイズを設定
casper.viewport(1400, 800);

// UserAgent の指定
casper.userAgent('User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36');

// ページを開く
var text = encodeURIComponent('猫');
casper.open('https://www.flickr.com/search/?text=' + text);

// 画面をキャプチャ
casper.then(function() {
  this.capture('flickr-shot.png', {
    top: 0, left: 0, width: 1400, height: 800
  });
});

// 実行
casper.run();
