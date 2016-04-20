SQLite3
=======

__インストール__

```bash
$ npm install sqlite3
```

__メソッド__


|Method|Summary|
|:--|:--|
|serialize||
|run|SQL分を実行|
|prepare|プリペアードステートメントを利用する|
|finalize||
|each|SQLを実行した結果、抽出したデータを得る。コールバックでレコードを1件ずつ取り出して処理|
|close|データベースを閉じる|


使い方
------

__基本形__  

```javascript
// セッティング
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('test.sqlite');

db.serialize(() => {
  // SQLを実行してテーブルを作成
  db.run('CREATE TABLE IF NOT EXISTS items(name, value)');
  
  // 書き込み
  // プリペアドステートメント
  let stmt = db.prepare('INSERT INTO items VALUES(?, ?)');
  stmt.run(['name1', 'value1']);
  stmt.run(['name2', 'value2']);
  stmt.run(['name3', 'value3']);
  stmt.finalize();
  
  // 読み出し
  db.each('SELECT * FROM items', (err, row) => {
    console.log(`${row.name} : ${row.value}`);
  });
  
});

// データベースを閉じる
db.close();
```


リンク
------

- [npm/sqlite3](https://www.npmjs.com/package/sqlite3)
- [mapbox/node-sqlite3](https://github.com/mapbox/node-sqlite3)
- [Document](https://github.com/mapbox/node-sqlite3/wiki)
