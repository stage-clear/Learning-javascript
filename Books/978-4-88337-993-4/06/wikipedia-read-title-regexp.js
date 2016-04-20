'use strict';
// 正規表現でデータベースを検索

// modules
let levelup = require('level');

// Database
let db = levelup('./wikidata');

// 正規表現で項目を検索する
let search_re = /.{4,}の女$/;

// すべての項目を検索する
let cnt = 0;
let result = [];

db.createReadStream()
  .on('data', (data) => {
    // 検索経過の表示
    if (cnt % 50000 == 49999) {
      console.log(cnt + '件を検索: ' + data.key);
    }

    // 正規表現マッチ
    if (search_re.test(data.key)) {
      result.push(data.key);
      console.log('[found]:' + data.key);
    }
    cnt++;
  })
  .on('end', () => {
    console.log('----------------\n');
    console.log('[found:]\n' + result.join('\n'));
    console.log('OK.');
  });