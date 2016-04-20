'use strict';
// Amazon の書籍情報を調べる

let OperationHelper = require('apac').OperationHelper;

// アカウント
let opHelper = new OperationHelper({
  awsId: 'AKIAJBLFGPWS3SV6CRVA',
  awsSecret: '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',
  assocId: 'kesuiket-22',
  endPoint: 'ecs.amazonaws.jp'
});

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

  // 結果を表示
  let Items = results.ItemSearchResponse.Items;
  console.log(Items);
});