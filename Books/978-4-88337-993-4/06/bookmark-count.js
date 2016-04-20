'use strict';
// はてなブックマーク数を取得

// 取得対象 URL の指定
let targetURL = 'http://www.hatena.ne.jp/';
let COUNT_API = 'http://api.b.st-hatena.com/entry.count?url=';

// modules
let request = require('request');

// api
let url = COUNT_API + escape(targetURL);

console.log('URL: ', url);

request(url, (err, res, body) => {
  console.log('Bookmark count: ' + body);
});