var tobi = require('tobi');
// ブラウザを作成
var browser = tobi.createBrowser(3000, '127.0.0.1');

// To-do フォームを取得
browser.get('/', function(res, $) {
  $('form')
    .fill({ description: 'Floss the cat' })// フォームに記入して
    .submit(function(res, $) {// データを提出
      $('td:nth-child(3)').text().should.equal('Float the cat');
    });
});

