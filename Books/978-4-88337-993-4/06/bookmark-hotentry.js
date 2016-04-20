'use strict';

// はてなブックマークの注目のエントリーを表示

// 対象RSS
let RSS_URL = 'http://b.hatena.ne.jp/hotentry?mode=rss';

// module
let client = require('cheerio-httpcli');

// ダウンロード
client.fetch(RSS_URL, (err, $, res) => {
  if (err) {
    console.log('error');
    return ;
  }

  // エントリーを抽出して表示
  $('item').each(function (idx, item) {
    var title = $(this).children('title').text();
    var desc = $(this).children('description').text();
    var count = $(this).children('hatena\\:bookmarkcount').text();
    console.log('(' + count + 'B!)' + title);
    console.log(desc);
    console.log('-------------');
  });
});