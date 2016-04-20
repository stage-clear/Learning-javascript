MySQL
======

- RDBMS
- Node で MySQL とのやりとりを行えるように、人気の高い `node-mysql` モジュールを使う。

本体
-----

__インストール__

```bash
$ brew install mysql
```

__起動__ 

```bash
$ mysql.server start
```

__リファレンス__

- [brewコマンドでmysqlをインストール](http://qiita.com/ktarow/items/6beeea3d44d152e3a1f1)
- [MySQLコマンド](http://qiita.com/ToruFukui/items/2c75bd4a11a7817e6c9e)
- [MySQLクライアント](http://www-jp.mysql.com/products/workbench/)
- [MySQL 5.6 リファレンスマニュアル](http://dev.mysql.com/doc/refman/5.6/ja/index.html)


* * *

クライアント
-------------

__インストール__

```bash
$ npm install mysql
```

### 使用法

```javascript
// 設定/接続
var mysql = require('mysql');
var db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'MYDATABASE'
});

// テーブルの作成
db.query(
  'CREATE TABLE IF NOT EXISTS table (' +
  'id INT(10) NOT NULL AUTO_INCREMENT, ' +
  'hours DECIMAL(5,2) DEFAULT 0, ' +
  'date DATE, ' +
  'description LONGTEXT, ' +
  'PRIMARY KEY(id))',
  function(err) {
    if (err) throw err;
    server.listen(3000);
  }
);

// Insert
db.query(
  'INSERT INTO work (hours, date, desctiption) ' +
  'VALUES (?, ?, ?)',
  [hours, date, description],
  function(err) {
    if (err) throw err;
  }
);

// Delete
db.query(
  'DELETE FROM work WHERE id=?',
  [id],
  function(err) {
    if (err) throw err;
  }
);

// Update
db.query(
  'UPDATE work SET archived=1 WHERE id=?',
  [id],
  function(err) {
    if (err) throw err;
  }
);

// Select
var query = 'SELECT * FROM work WHERE archived=? ORDER BY date DESC';
var value = 1;

db.query(
  query,
  [value],
  function(err, rows) {
    if (err) throw err;
    console.log(rows);
  }
);

```

リンク
------

- [npm/mysql](https://www.npmjs.com/package/mysql)
- [felixge/node-mysql](https://github.com/felixge/node-mysql)

