'use strict';

// import modules
let sqlite3 = require('sqlite3').verbose();
// open Local DB
let db = new sqlite3.Database('test.sqlite');

db.serialize(() => {
  // SQL を実行してテーブルを作成
  db.run('CREATE TABLE IF NOT EXISTS items(name, value)');

  // プリペアドステートメントでデータを挿入
  var stmt = db.prepare('INSERT INTO items VALUES(?,?)');
  stmt.run(['Banana', 300]);
  stmt.run(['Apple', 150]);
  stmt.run(['Mango', 250]);
  stmt.finalize();

  // データを取り出す
  db.each('SELECT * FROM items', (err, row) => {
    console.log(row.name + ' : ' + row.value);
  });
});

db.close();