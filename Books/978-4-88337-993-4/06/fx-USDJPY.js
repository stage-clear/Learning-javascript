'use strict';
// 為替情報を取得

// module
let client = require('cheerio-httpcli');

// download HTML
let code = 'USDJPY';// 通過の指定
let url = 'http://info.finance.yahoo.co.jp/fx/detail/';

// get page
client.fetch(url, {'code': code}, (err, $, res) => {
  if (err) {
    console.log(err);
    return ;
  }

  // get value
  let bid = $('#USDJPY_detail_bid').text();
  let ask = $('#USDJPY_detail_ask').text();

  // show result
  console.log('Bid = ' + bid);
  console.log('Ask = ' + ask);
});
