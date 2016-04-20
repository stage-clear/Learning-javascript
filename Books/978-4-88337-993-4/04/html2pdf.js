'use strict';
// HTML を PDF として出力

// 宮沢賢治 - やまなし
var url = 'http://www.aozora.gr.jp/cards/000081/files/46605_31178.html';
var savepath = 'test2.pdf';

// CasperJS のオブジェクトを作成
var casper = require('casper').create();
casper.start();

// ページの設定
casper.page.paperSize = {
  width: '8.5in',
  height: '11in',
  orientation: 'portrait',
  margin: '1cm'
};

casper.open(url);

casper.then(function() {
  casper.evaluate(function() {
    var els = document.querySelectorAll('h4');
    for (var i = 0; i<els.length; i++) {
      var e = els[i];
      e.style.backgroundColor = 'red';
      e.style.color = 'white';
    }
  });
});

casper.then(function() {
  casper.capture('test1.pdf');
  casper.echo('completed');
});

casper.run();