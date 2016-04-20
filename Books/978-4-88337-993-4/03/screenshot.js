// screenshot.js

// CasperJSでスクリーンショットをとる

// Casper オブジェクトを作成
var casper = require('casper').create();

// 開始
casper.start();

// ページを開く
casper.open('http://google.co.jp');

// スクリーンショットを撮影
casper.then(function() {
  casper.capture('screenshot.png');
});

// 実行
casper.run();
