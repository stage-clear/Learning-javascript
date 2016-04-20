'use strict';
// Wikipedia のタイトルDBを作成する

// modules
let request = require('request');
let fs = require('fs');
let zlib = require('zlib');
let levelup = require('level');


// Wikipedia
let titleName = 'jawiki-latest-all-titles-in-ns0';
let titleUrl = 'http://dumps.wikimedia.org/jawiki/latest/' + titleName + '.gz';
let local_gz = __dirname + '/' + titleName + '.gz';
let local_txt = __dirname + '/' + titleName;

// Database
let db = levelup('./wikidata');

// test
//titleUrl = 'http://localhost/' + titleName + '.gz';

// download
request
  .get(titleUrl)
  .on('end', goGunzip)
  .pipe(fs.createWriteStream(local_gz));

console.log('download..');

// unzip file
function goGunzip() {
  console.log('[進捗] 解凍します');

  // read file
  let gz_data = fs.readFileSync(local_gz);
  // gunzip
  zlib.gunzip(gz_data, (err, bin) => {
    if (err) {
      console.log(err);
      return ;
    }

    // write file
    fs.writeFileSync(local_txt, bin);
    let txt = bin.toString('utf-8');
    insertDB(txt);
  });
}

function insertDB(txt) {
  console.log('[進捗] データベースに書き込みます');

  let lines = txt.split('\n');
  lines.shift();// 1行目は捨てる

  let t = db.batch();

  for (let i in lines) {
    let it = lines[i];
    if (it === '') continue;
    t.put(it, 1)
    if (i % 1000 == 0) {
      console.log(i + '件目:' + it);
    }
  }

  t.write(() => {
    console.log('書き込み完了しました: ' + lines.length);
  });
}