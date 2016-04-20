'use strict';
// 複数URLのブックマーク数を取得する

// 取得対象URL
let url_list = [
  'http://www.hatena.ne.jp/',
  'https://twitter.com',
  'http://www.amazon.co.jp/'
];

let COUNTS_API = 'http://api.b.st-hatena.com/entry.counts';

let request = require('request');

// リクエスト用URLの作成
let params = [];

for (let i in url_list) {
  params.push('url=' + escape(url_list[i]));
}

let url = COUNTS_API + '?' + params.join('&');

// APIから結果を取得
request(url, (err, res, body) => {
  let obj = JSON.parse(body);
  for (let key in obj) {
    console.log(key + 'のブックマーク数: ' + obj[key]);
  }
});