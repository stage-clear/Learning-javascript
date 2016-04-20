'use strict';

// テキストファイルの指定
let FILE_DIC = 'bot-dic.dat';

// MongoDBの接続情報
let MONGO_DSN = 'mongodb://localhost:27017/bot';
let mongo_db; // 接続オブジェクト

// modules
let mongo_client = require('mongodb').MongoClient;
let fs = require('fs');

// MongoDB に接続
mongo_client.connect(MONGO_DSN, (err, db) => {
  // エラーチェック
  if (err) {
    console.log('DB error', err);
    return ;
  }

  mongo_db = db;

  // コレクションを取得
  let collection = db.collection('keywords');

  collection.drop((err, reply) => {
    // 初期化後に挿入
    insertKeywords(collection);
  });
});

// MongoDB に辞書データを挿入
function insertKeywords(collection) {
  let cnt = 0;
  let dataCount = 0;
  // テキストデータを読み込む
  let txt = fs.readFileSync(FILE_DIC, 'utf-8');
  // 各行を処理
  let lines = txt.split('\n');

  for (let i in lines) {
    let line = trim(lines[i]);
    if (line == '') continue;// 空行
    if (line.substr(0, 1) == ';') continue; // コメント
    let cells = line.split(',');
    let key = trim(cells[0]);
    let rank = parseInt(trim(cells[1]));
    let pat = trim(cells[2]);
    let msg = trim(cells[3])

    // insert
    collection.insert({
      'key': key,
      'rank': rank,
      'pattern': pat,
      'msg': msg
    }, (err, result) => {
      console.log(cnt + ':inserted:', result.ops);
      if (++cnt == dataCount) {
        console.log('done');
        mongo_db.close();
      }
    });
    dataCount++;
  }
}

function trim(s) {
  s = '' + s;
  return s.replace(/^\s+|\s+$/g, '');
}