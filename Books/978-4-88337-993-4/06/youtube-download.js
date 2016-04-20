'use strict';
// 動画を検索してダウンロード
// AIzaSyDhe458EzkswC38HwHKDrtIGXrvmmkmE5A

let exec = require('child_process').exec;
let Youtube = require('youtube-node');
let youtube = new Youtube();

// set api key
youtube.setKey('AIzaSyDhe458EzkswC38HwHKDrtIGXrvmmkmE5A');

let keyword = 'ネコ';
let limit = 2;

// set options
youtube.addParam('order', 'viewCount');// ダウンロード順に
youtube.addParam('type', 'video');
youtube.addParam('videoLicense', 'creativeCommon');
youtube.addParam('videoDuration', 'short');

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
    console.log(title, video_id);

    // download
    downloadVideo(video_id);
  }
});


function downloadVideo(video_id) {
  let url = 'https://www.youtube.com/watch?v=' + video_id;
  console.log('[url]', url);
  exec('youtube-dl ' + url, (err, stdout ,stderr) => {
    if (err) {
      console.log(err);
      return ;
    }
    if (stdout) console.log(stdout);
    if (stderr) console.log(stderr);
  });
}