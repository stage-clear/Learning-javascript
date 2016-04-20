'use strict';
// ダウンロードしたファイルをLevelDBに流し込む

let FILES_DIR = __dirname + '/aozora';
let DB_DIR = __dirname + '/leveldb-aozora';

let levelup = require('level');
let cheerio = require('cheerio');
let fs = require('fs');

// データベースを開く
let db = levelup(DB_DIR);

// DBに入れるファイル一覧を取得
let files = fs.readdirSync(FILES_DIR);
// HTMLファイルだけ残す
files = files.filter((s) => {
  return s.match(/\.html$/);
});

// 各ファイルのデータをDBに入れる
let count = 0;
files.forEach((file, i, ar) => {
  let html = fs.readFileSync(FILES_DIR + '/' + file);
  let $ = cheerio.load(html);
  let title = $('.title').text();
  let author = $('.author').text();
  let body = $('body').text();

  // データベースに入れる
  // 「作者:作品名」で書き込む
  let key = author + ':' + title;
  db.put(key, body, () => {
    count++;
  });

  // 作品名で検索できるように配慮
  let key2 = 'idx-title:' + title + ':' + author;
  db.put(key2, key);
  console.log(key);
});

// 処理完了を待つ
let wait_proc = () => {
  if (files.length == count) {
    testSearch();
    return;
  }
  setTimeout(wait_proc, 100);
};

wait_proc();

// 作者から作品一覧を検索
function testSearch() {
  console.log('\n夏目漱石の作品一覧:');
  let opt = {
    start: '夏目漱石',
    end: '夏目漱石\uFFFF'
  };

  db.createReadStream(opt)
    .on('data', (data) => {
      console.log(` -  ${data.key}`);
    })
    .on('end', testSearch2);
}

// 作品名で検索する
function testSearch2() {
  let title = '注文の多い料理店';
  console.log(`\n作品名[${title}]で検索:`);

  let opt = {
    gte: 'idx-title:' + title,
    lte: 'idx-title:' + title + '\uFFFF'
  };

  db.createReadStream(opt)
    .on('data', (data) => {
      console.log(` - ${data.value}`);
    })
    .on('end', testSearch3);
}

// 正規表現で作品を検索
function testSearch3() {
  console.log(`\nひらがなの作品を検索:`);
  let opt = {
    gte: 'idx-title',
    lte: 'idx-title:\uFFFF'
  };

  let hiragana_re = /^[ぁ-ん]+$/;
  db.createReadStream(opt)
    .on('data', (data) => {
      let params = data.key.split(':');
      let title = params[1];
      if (!hiragana_re.test(title)) {
        return ;
      }
      console.log(` - ${data.value}`);
    });
}
