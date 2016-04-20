'use strict';
// YouTube を検索する

let Youtube = require('youtube-node');
let youtube = new Youtube();

// set api key
youtube.setKey('AIzaSyDhe458EzkswC38HwHKDrtIGXrvmmkmE5A');

// search
let keyword = 'cat';
let limit = 5;

// set options
youtube.addParam('order', 'rating');
youtube.addParam('type', 'video');
youtube.addParam('videoLicense', 'creativeCommon');

youtube.search(keyword, limit, (err, result) => {
  if (err) {
    console.log(err);
    return ;
  }

  let items = result['items'];

  for (let i in items) {
    let it = items[i];
    let title = it['snippet']['title'];
    let video_id = it['id']['videoId'];
    let url = 'https://www.youtube.com/watch?v=' + video_id;
    console.log('+ ' + title);
    console.log('| ' + url);
    console.log('------------------');
  }
})