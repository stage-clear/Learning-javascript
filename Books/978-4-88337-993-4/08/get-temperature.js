'use strict';

// Yahoo!天気予報のRSSからJSONファイルを出力

// RSS
const RSS = 'http://rss.weather.yahoo.co.jp/rss/days/4410.xml';
const SAVE_PATH = 'temperature-data.js';

// modules
let client = require('cheerio-httpcli');
let fs = require('fs');

// download rss
client.fetch(RSS, {}, (err, $, res) => {
  if (err) {
    console.log('error');
    return ;
  }

  // 必要な項目を抽出して表示
  var res = [];
  $('item > title').each(function(idx) {
    var title = $(this).text();
    // 正規表現で日付、最高気温、最低気温を抽出
    var tm = title.match(/(\d+日).*?(\d+)℃\/(\d+)℃/);
    if (!tm) return ;
    var line = [tm[1], parseInt(tm[2]), parseInt(tm[3])];
    res.push(line);
    console.log(line);
  });

  // 保存
  res.unshift(['日付', '最高気温', '最低気温']);
  var src = 'var tempData = ' + JSON.stringify(res);
  fs.writeFileSync(SAVE_PATH, src, 'utf-8');
  console.log('OK!');
});
