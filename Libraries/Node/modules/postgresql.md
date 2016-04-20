PostgreSQL
===========

- RDBMS- PostgreSQL API モジュールで、最も成熟度が高く、盛んに開発が進められているのは `node-postres` である。


本体
-----

__インストール__

```bash
$ brew install postgresql
```

__起動__

```bash
$ postgres -D /usr/local/var/postgres
```

__リファレンス__

- [PostgreSQLコマンド](http://qiita.com/mm36/items/1801573a478cb2865242)
- [pgAdmin](http://www.pgadmin.org/)
- [PostgreSQL 9.4.0文書](http://www.postgresql.jp/document/9.4/html/)

* * *


クライアント
-------------

__インストール__

```bash
$ npm install pg
```

### 使用法

__node-postgresを使った操作__

```javascript
// 設定/接続
var pg = require('pg');
var conString = 'tcp://myuser:mypassword@localhost:5432.mydatabase';
var client = new pg.Client(conString);
client.connect();

// Insert
client.query(
  'INSERT INTO users ' +
  '(name, age) VALUES ($1, $2) ',
  'RETURNING id',
  ['Make', 39],
  function(err, res) {
    if (err) throw err;
    console.log('Insert ID is ' + res.rows[0].id);
  }
);

// Select
var query = client.query(
  'SELECT * FROM users WHERE age > $1',
  [40]
);

query.on('row', function(row) {
  console.log(row.name);
});

query.on('end', function() {
  client.end();
});
```


リンク
------

- [npm/pg](https://www.npmjs.com/package/pg)
- [brianc/node-postgres](https://github.com/brianc/node-postgres)

