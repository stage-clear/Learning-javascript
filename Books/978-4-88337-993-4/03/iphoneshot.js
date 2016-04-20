// iPhoneのふりをしてキャプチャ

var TAEGET_URL = 'https://dribbble.com/shots';

var casper = require('casper').create();
casper.start();

// iPhone のふり
casper.userAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53');

// 画面サイズを指定
casper.viewport(750, 1334);

casper.open(TAEGET_URL);

casper.then(function() {
  this.capture('screenshot-iphone.png');
});


casper.run();