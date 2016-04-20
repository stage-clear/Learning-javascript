'use strict';
// YouTube を検索するプログラム

let Youtube = require('youtube-node');
let youtube = new Youtube();

// set API key
youtube.setKey('AIzaSyDhe458EzkswC38HwHKDrtIGXrvmmkmE5A');

// search
let keyword = 'ネコ';
let limit = 3;
youtube.search(keyword, limit, (err, result) => {
  if (err) {
    console.log(err);
    return ;
  }

  // result
  console.log(JSON.stringify(result, null, 2));
});