'use strict';
// Facebook を使う

let FB = require('fb');
FB.setAccessToken('access_token');

// 自分の投稿を取得して表示
FB.api('me/feed', 'get', {}, (feed) => {
  if (!feed) {
    console.log('error');
    return;
  }

  let data = feed.data;

  for (let i in data) {
    let row = data[i];
    console.log(row);
    console.log('-----------------');
  }
});