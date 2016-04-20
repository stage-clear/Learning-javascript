'use strict';
// 株価を取得するプログラム

// modules
let client = require('cheerio-httpcli');

// download html
let code = '8411';
let url = 'http://stocks.finance.yahoo.co.jp/stocks/detail/';

client.fetch(url, {'code': code}, (err, $, res) => {
  if (err) {
    console.log(err);
    return ;
  }

  // get value
  let price = $('td.stoksPrice').text().replace(/\s/g, '');
  let name = $('th.symbol > h1').text();

  // show result
  console.log('+ code  = ' + code);
  console.log('| name  = ' + name);
  console.log('| price = ' + price);
});
