'use strict';
// Amazon の書籍情報を調べる

// module
let OperationHelper = require('apac').OperationHelper;
let cheerio = require('cheerio');

// account
let opHelper = new OperationHelper({
  awsId: 'AKIAJBLFGPWS3SV6CRVA',
  awsSecret: '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',
  assocId: 'kesuiket-22',
  endPoint: 'ecs.amazonaws.jp'
});

// search books
opHelper.execute('ItemSearch', {
  'SearchIndex': 'Books',
  'BrowseNode': 465610,
  'Keywords': '宮沢賢治',
  'ResponseGroup': 'Small,OfferSummary',
  'Sort': 'salesrank',
  'MinimumPrice': 10,
  'MaximumPrice': 8000
}, (err, results, xml) => {
  if (err) {
    console.log('error');
    return ;
  }

  // xml を解析
  let $ = cheerio.load(xml);
  // 商品情報を抽出
  $('Items > Item').each(function(idx, item) {
    var ASIN = $(item).children('ASIN').text();
    var author = $(item).find('Author').text();
    var title = $(item).find('Title').text();
    console.log(title + ' - ' + author + ' - ' + ASIN);
  });
});