'use strict';
// 対円の為替情報を取得

// module
let client = require('cheerio-httpcli');

// 基本通過の指定
let baseCode = 'JPY';
let codeList = [
  'JPY', 'USD', 'EUR', 'AUD', 'GBP' ,
  'MZD', 'CAD', 'CHF', 'ZAR', 'CNH'
];

// url
let baseUrl = 'http://info.finance.yahoo.co.jp/fx/detail/';

// get all
for (let i in codeList) {
  let a = codeList[i];
  if (a == baseCode) {
    continue;
  }
  let code = a + baseCode;
  getFx(code);
}

function getFx(code) {
  client.fetch(baseUrl, {'code': code}, (err, $, res) => {
    if (err) {
      console.log(err);
      return ;
    }

    let bid = $('#' + code + '_detail_bid').text();
    let ask = $('#' + code + '_detail_ask').text();

    // show result
    console.log('+ ' + code);
    console.log('| Bid = ' + bid);
    console.log('| Ask = ' + ask);
    console.log('------');
  });
}