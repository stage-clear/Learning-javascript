var soda = require('soda');
var assert = require('assert');

var browser = soda.creatClient({
  host: '127.0.0.1',
  port: 4444,
  url: 'http://www.reddit.com',
  browser: 'firefox'
});

browser.on('command', function(cmd, args) {
  console.log(cmd, args.join(', '));
});

browser
  .chain  // メソッドチェインを有効にする
  .session()  // Selenium セッションを開始
  .open('/') // URLを開く
  .type('user', 'mcantelon') // フォームフィールドにテキストを入力
  .type('passwd', 'mahsecret')
  .clickAndWait('//button[@type="submit"]') // ボタンをクリックして待つ
  .assertTextPresent('logout') // テキストが存在することを確認
  .testComplete() // テスト完了のマークをつける
  .end(function(err) { // Seleniumセッションを終了する
    if (err) throw err;
    console.log('Done!');
  });

