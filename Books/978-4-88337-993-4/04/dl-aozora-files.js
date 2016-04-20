'use strict';
// 青空文庫の人気作品30をダウンロードする

let URL_RANKING = 'http://www.aozora.gr.jp/access_ranking/2014_xhtml.html';
let MAX_RANK = 30; // 30位までを取得する
let SAVE_DIR = __dirname + '/aozora';

// import
let client = require('cheerio-httpcli');
let fs = require('fs');
let URL = require('url');

// 作品一覧データ保存用
let cardlist = [];

// 作品データ保存用のディレクトリを作る
if (!fs.existsSync(SAVE_DIR)) fs.mkdirSync(SAVE_DIR);

// ランキングページをダウンロード
client.fetch(URL_RANKING, function(err, $, res) {
  if (err) {
    console.log('DL error');
    return ;
  }

  var tr = $('table.list tr')
  if (!tr) {
    console.log('ページ形式のエラー');
    return ;
  }

  // テーブルの各行を反復
  for (let i = 0; i < tr.length; i++) {
    // 必要な要素を調べる
    var cells = tr.eq(i).children();
    var rank = parseInt(cells.eq(0).text());
    var link = cells.eq(1);
    var href = link.children('a').attr('href');
    var name = link.text().replace(/(^\s+|\s+$)/, '');
    console.log(rank, name, href);
    if (isNaN(rank) || rank > MAX_RANK) continue;
    // 相対パスを絶対パスに変換
    href = URL.resolve(URL_RANKING, href);
    cardlist.push([rank, name, href]);
  }
  downloadNextFile();
});

// 各作品をダウンロード
function downloadNextFile() {
  if (cardlist.length == 0) {
    console.log('処理完了');
    return ;
  }

  // 遅延実行
  setTimeout(function() {
    var card = cardlist.shift();
    downloadCard(card);
  }, 1000);
}

// カードをダウンロードする
function downloadCard(card) {
  var index = card[0], name = card[1], link = card[2];
  console.log('図書カード' + index + ':' + name);
  client.fetch(link, function(err, $, res) {
    if (err) {
      console.log('ERROR');
      return ;
    }
    var xhtml_link = '';
    $('a').each(function(idx) {
      var text = $(this).text();
      var href = $(this).attr('href');
      if (text.indexOf('XHTML版で読む') >= 0) {
        //相対パスを絶対パスを変換
        href = URL.resolve(link, href);
        xhtml_link = href;
        return false; // これ以降 each しない
      }
    });

    if (xhtml_link === '') {
      console.log('作品リンクがみつかりません');
    }

    // 作品をダウンロードする
    var path = SAVE_DIR + '/' + index + '.html';
    console.log('ダウンロード開始:' + name);
    // 作品のダウンロード時 user-agent の明示が必要
    client.setBrowser('chrome');
    client.fetch(xhtml_link, (err, $, res, body) => {
      body = body.replace(/Shift_JIS/ig, 'UTF-8');
      fs.writeFileSync(path, body, 'utf-8');
      console.log('完了:' + name);
      downloadNextFile();
    });
  });
}


