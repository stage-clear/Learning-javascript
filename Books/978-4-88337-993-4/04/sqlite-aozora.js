'use strict';

// ダウンロードしたファイルをSQLiteに流し込む

// set path
let FILES_DIR = __dirname + '/aozora';
let DB_PATH = __dirname + '/aozora.sqlite';

// import modules
let sqlite3 = require('sqlite3').verbose();
let cheerio = require('cheerio');
let fs = require('fs');

// DBに入れるファイル一覧を取得
let files = fs.readdirSync(FILES_DIR);
// HTMLファイルだけ残す
files = files.filter((s) => {
  return s.match(/\.html$/);
});

// データベースを開く
let db = new sqlite3.Database(DB_PATH);

// データを登録
db.serialize(() => {
  // SQL を実行してテーブルを作成
  db.run('CREATE TABLE IF NOT EXISTS items(' +
    'item_id INTEGER PRIMARY KEY,' +
    'author TEXT, title TEXT, body TEXT)');

  let ins_stmt = db.prepare(
    'INSERT INTO items(author, title, body)' +
    'VALUES(?, ?, ?)');

  // 各HTMLファイルを処理
  files.forEach((file, i, ar) => {
    let html = fs.readFileSync(FILES_DIR + '/' + file);
    // HTMLファイルから情報を得る
    let $ = cheerio.load(html);
    let title = $('.title').text();
    let author = $('.author').text();
    let body = $('body').text();
    // DBに挿入
    ins_stmt.run(author, title, body);
    console.log('+ ' + title + ' を登録');
  });
  ins_stmt.finalize();
});

console.log('集計結果:');
db.each('SELECT author, COUNT(author) as cnt ' +
  'FROM items GROUP BY author ' +
  'ORDER BY cnt DESC', (err, row) => {
    console.log(row.cnt + '回:' + row.author);
  });