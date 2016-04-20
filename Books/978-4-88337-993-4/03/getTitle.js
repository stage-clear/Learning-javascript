// webサイトからタイトルを表示する
var TARGET_URL = 'http://kujirahand.com';

// casperjsのオブジェクトを作成
var casper = require('casper').create();

// 指定のWebサイトを開く
casper.start(TARGET_URL, function() {
  // タイトルを表示する
  this.echo(casper.getTitle());
});

// 処理を実行する
casper.run();