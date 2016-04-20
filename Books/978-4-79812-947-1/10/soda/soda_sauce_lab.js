var soda = require('soda');
var assert = require('assert');

var browser = soda.createSauceClient({
  'url': 'http://www.reddit.com/',
  'username': 'yourusername', // Sauce Labs のユーザー名
  'access-key': 'youaccecckey', // Sauce Labs の APIキー
  'os': 'Windows 2003', // テストで使いたい OS
  'browser': 'firefox', // 使いたいブラウザ
  'browser-version': '3.6', // 使いたいブラウザのバージョン
  'name': 'This is an example test',
  'max-duration': 300 // 時間がかかりすぎたらテストを失敗する
});

browser.on('command', function(cmd, args) {
  console.log(cmd, args.join(', '));
});

browser
  .chain
  .session()
  .open('/')
  .type('user', 'mcantelon')
  .type('passwd', 'mahsecret')
  .clickAndWait('//button[@type="submit"]')
  .assertTextPresent('logout')
  .testComplete()
  .end(function(err) {
    if (err) throw err;
    console.log('Done!');
  })