'use strict';
// Flickr で写真を検索

// api
let keys = {
  api_key: 'bcfa4dbebed7187722136e935f4b5efc'
};

// Flickr オブジェクトを作成
let Flickr = require('node-flickr');
let flickr = new Flickr(keys);

// search images
flickr.get('photos.search', {
  'text': 'dog',
  'sort': 'interestingness-desc',
  'per_page': 5
}, (err, result) => {
  // details
  if (!result) {
    console.log('error');
    return;
  }

  let page = result.photos.page;
  let pages = result.photos.pages;
  let perpage = result.photos.perpage;
  let total = result.photos.total;
  console.log('total:', total);

  // detail
  let photo_list = result.photos.photo;
  for (let i in photo_list) {
    let p = photo_list[i];
    // url を生成
    let url = 'https://farm' + p.farm + '.staticflickr.com/' + p.server + '/' + p.id + '_' + p.secret + '.jpg';
    console.log(p);
    console.log('URL: ' + url);
  }
});

// 画像のURL
// https://farm{farm}.staticflickr.com/{server}/{id}_{secret}.jpn

