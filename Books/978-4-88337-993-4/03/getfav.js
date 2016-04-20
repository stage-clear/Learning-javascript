
var USER = 'JS-TESTER';
var PASS = 'ipCU12ySxI';

var casper = require('casper').create();

casper.start();
//casper.open('http://uta.pw/sakusibbs/');
casper.open('http://uta.pw/sakusibbs/users.php?action=login');

// ログインする
casper.then(function() {
  // フォームにユーザー名とパスワードを設定
  casper.fill('form', {
    username_mmlbbs6: USER,
    password_mmlbbs6: PASS
  }, true);
});

// マイページを開く
casper.then(function() {
  var getLink = function() {
    var q = document.querySelector('#header_menu_linkbar a');
    console.log('[q]', q.href);
    return q.href;
  };

  // ページ内で評価
  var mypage_url = this.evaluate(getLink);
  this.echo('mypage url='+ mypage_url);
  this.open(mypage_url);
});


// マイページのお気に入りを抽出する
casper.then(function() {
  // お気に入りの作品を取得する関数を定義
  var pickupFav = function() {
    var res = [];
    var q = document.querySelectorAll('#favlist li > a');
    for (var i=0; i<q.length; i++) {
      var text = q[i].textContent;
      var href = q[i].href;
      res.push(text);
    }
    return res;
  };

  // ページ内で評価
  var res = this.evaluate(pickupFav);
  // 結果を出力する
  this.echo('---- favlist ----');
  for (var i=0; i<res.length; i++) {
    this.echo('- ' + res[i]);
  }
});

casper.run();

