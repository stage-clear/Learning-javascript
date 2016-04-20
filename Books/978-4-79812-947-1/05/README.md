# アプリケーションのデータをストアする

## サーバーレスデータストレージ

DBMSを持たないサーバーレスデータストレージは, ユーザーが自分のハードウェアで実行するNodeアプリケーションに最適である(たとえばWebアプリケーションや、その他のTCP/IPアプリケーション)。また, CLI(command-line interface) にも適している


### メモリ内ストレージ

メモリ内ストレージでは、データを変数にストアする。
メモリ内データの読み書きは高速だが、サーバーとアプリケーションが再起動される間に、データが失われてしまう。
メモリ内ストレージの理想的な用途は、頻繁にアクセスされる少量のデータである。

```javascript
// ポート8888番でWebサーバーを起動してリクエストを受けた回数をカウントする
var http = require('http');
var counter = 0;

var server = http.createServer(function(req, res) {
  counter++;
  res.write('I have been accessed ' + counter + ' times.');
  res.end();
}).listen(8888);
```

### ファイルベースのストレージ

ファイルベースのストレージ(file-based storage)では、ファイルシステムにデータをストアする
開発では、コンフィギュレーション情報を保存するのに、このタイプのストレージを使う機会が多いが、アプリケーションとサーバーの再起動に耐えるよう、その他のデータを永続化するための手段としても使える。



## リレーショナルデータベース管理システム

RDBMS(Relational database management system) を使えば、複雑な情報を保存し、
容易に問い合わせることができる。RDBMSは伝統的に、コンテンツ管理、顧客管理、ショッピングカートなど
どちらかと言えばハイエンド寄りのアプリケーションで使われてきた。

### MySQL

Node で MySQL とのやりとりを行えるように、人気の高い node-mysql モジュールを使う。

```bash
$ npm install mysql
```

__MySQLのインストール__

```bash
$ brew install mysql
```

- [MySQLコマンド](http://qiita.com/ToruFukui/items/2c75bd4a11a7817e6c9e)
- [MySQLクライアント](http://www-jp.mysql.com/products/workbench/)
- [MySQL 5.6 リファレンスマニュアル](http://dev.mysql.com/doc/refman/5.6/ja/index.html)


__node-sqlを使った操作__

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


### PostgreSQL

PostgreSQL API モジュールで、最も成熟度が高く、盛んに開発が進められているのは
node-postres である。

```bash
$ npm install pg
```

__PostgreSQLのインストール__

```bash
$ brew install postgresql
```

- [PostgreSQLコマンド](http://qiita.com/mm36/items/1801573a478cb2865242)
- [pgAdmin](http://www.pgadmin.org/)
- [PostgreSQL 9.4.0文書](http://www.postgresql.jp/document/9.4/html/)


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



## NoSQLデータベース

- ノンリレーショナルDBMS。
- スケーラビリティと単純さ。
- 性能を再優先
- リアルタイム解析やメッセージングなどに適している
- Redis, MongoDB


### Redis

__サポートするデータ構造__

- ハッシュテーブル
- リスト


Redis Apiモジュールのなかで、最も成熟度が高く、アクティブに開発されているのは、 node_redis モジュールである。

```bash
$ npm install redis
```

```javascript
var redis = require('redis');
var client = redis.createClient(6379);
// 接続エラー処理
client.on('error', function(err) {
  console.log('Error ' + err);
});
```

__Redisでのデータ操作__

```javascript
// Set
client.set('color', 'red', redis.print);

// Get
client.get('color', function(err, value) {
  if (err) throw err;
  console.log('Got: ' + value);
});
```

__ハッシュ値を使って値の保存と取得を行う__

```javascript
// 保存 (例: campingに要素を2つ設定)
client.hmset('camping', {
  'shelter': '2-person tent',
  'cooking': 'campstove'
}, redis.print);

// 取得 (例: cookingの値を取得)
client.hget('camping', 'cooking', function(err, value) {
  if (err) throw err;
  console.log('Will be cooking with: ' + value);
});

// ハッシュテーブルにあるキーのリストを取得
client.hkeys('camping', function(err, keys) {
  if (err) throw err;
  keys.forEach(function(err, key) {
    console.log(' ' + key);
  });
});
```

__リストを使って値の保存と取得を行う__

```javascript
// lpush  - 1つの値をリストに追加する
client.lpush('tasks', 'Paint the bikeshed red', redis.print);
client.lpush('tasks', 'Paint the bikeshed green', redis.print);
// lrange - 範囲の始まりと終わりを示す2つの引数を使って
//          その範囲のリスト項目と取得する
client.lrange('tasks', 0, -1, function(err, items) {
  if (err) throw err;
  items.forEach(function(item, i) {
    console.log(' ' + item);
  });
});
```

__セットを使って値の保存と取得を行う__

```javascript
// sadd     - 1つの値をセットに追加しようとする
client.sadd('ip_addresses', '204.10.37.96', redis.print);
client.sadd('ip_addresses', '204.10.37.96', redis.print); // 同じ値は無視される
client.sadd('ip_addresses', '72.32.231.8', redis.print);
// smembers - ストアされている値をの集合を返す
client.smembers('ip_addresses', function(err, members) {
  if (err) throw err;
  console.log(members);
});
```

__チャンネルデータを届ける__

Redisが、伝統的なデートストアの役割を果たすだけでなく、復数の「チャンネル」を提供しているのは
特筆すべきことだ。チャンネルは、「発行と灯籠」の機能を提供するデータ配送機構であり、チャットや
ゲームなどのアプリケーションに便利だ。

- [Redisのpub/subでチャット機能](example/redis_pubsub_chat.js)


__node_redis の性能を最大にする__

hiredis-node はhiredisの公式Cライブラリを利用しているので、性能が大幅にスピードアップする

```
$ npm install hiredis

# Node.jsのアップグレードに伴って, hiredisを再コンパイルする必要が生じるかもしれない
$ npm rebuild hiredis
```


__関連リンク__

- [Redisクイックスタート](http://redis.shibu.jp/quickstart.html)
- [Homebrewでインストール](http://qiita.com/checkpoint/items/58b9b0193c0c46400eeb)
- [コマンド](http://redis.io/commands)
- [node_redis](https://github.com/NodeRedis/node_redis)


### MongoDB

MongoDB は、汎用的な非リレーショナル・データベースである。

Mongo APIモジュールで、最も成熟し、アクティブに管理されているのは node-mongodb-native である。

```bash
$npm install mongodb
```

__MongoDBに接続する__

```javascript
var mongodb = require('mongodb');
var server = new mongodb.Server('127.0.0.1', 27017, {});
var client = new mongodb.Db('mydatabase', server, {w: 1});
```

__MongoDBコレクションにアクセスする__

```javascript
client.open(function(err) {
  if (err) throw err;
  client.collection('test_insert', function(err, collection) {
    if (err) throw err;

    /*

    ここにMongoDBのクエリコードを入れる

    */
    console.log('We are now able to perform queries');
  });
});
// データベースの操作が完了した後、MongoDB接続を閉じるには,
// いつでも client.close() を実行すればよい
```

__ドキュメントをコレクションに挿入する__

```javascript
collection.insert(
  {
    'title': 'I like cake',
    'body': 'It is quite good.'
  },
  { safe: true },
  // safeモードはコールバックが実行される前にデータベース操作を
  // 完了させるように指示する
  function(err, documents) {
    if (err) throw err;
    console.log('Document ID is: ' + document.ops[0]._id);
  }
);
```

__ドキュメントIDを使ってデータを更新する__

MongoDBから得られるドキュメントIDは、BSON(binary JSON)でエンコードされている。

```javascript
var _id = new client.bson_serializer.ObjectID('55d298ae2dece62604240891');
// ! TypeError: Cannot read property 'ObjectID' of undefined
collection.update(
  {_id: _id},
  {$set: {"title": "I ate too much cake."}},
  {safe: true},
  function(err) {
    if (err) throw err;
  }
);
```

__ドキュメントを探す方法__

```javascript
collection.find({"title": "I like cake"}).toArray(
  function(err, results) {
    if (err) throw err;
    console.log(results);
  }
);
```

__ドキュメントを削除する方法__

```javascript
var _id = new client.bson_serializer.ObjectID('55d298ae2dece62604240891');
collection.remove(
  {_id: _id},
  {safe: true},
  function(err) {
    if (err) throw err;
  }
);
```

- [MongoDBのインストールと基本操作](http://codezine.jp/article/detail/6982)
- [Homebrewでインストール](http://qiita.com/hajimeni/items/3c93fd981e92f66a20ce)


### Mongoose

```bash
$ npm install mongoose
```

__接続のオープンとクローズ__

```javascript
var mongoose = require('mongoose');
// オープン
mongoose.connect('mongodb://localhost/tasks');
// クローズ
mongoose.disconnect();
```

__スキーマの登録__

```javascript
var Schema = mongoose.Schema;
var Tasks = new Schema({
  title: String,
  description: String
});
mongoose.model('Task', Tasks);
```

__タスクの追加/Insert__

```javascrtipt
var Task = mongoose.mode('Task');
var task = new Task();
task.title = 'Title1';
task.description = 'This is description.';
task.save(function(err) {
  if (err) throw err;
  console.log('Saved.');
});
```

__ドキュメントの検索__

```javascript
var Task = mongoose.model('Task');
Task.find({
  'title': 'Title1'
}, function(err, tasks) {
  console.log('ID: ' + tasks[i]._id);
  console.log(tasks[i].description);
});
```

__ドキュメントの更新__

```javascript
var Task = mongoose.model('Task');
Task.update(
  {_id: '55d2b48b4c2215ad079075e9'}, // 内部IDを使って更新する
  {description: 'That is description.'},
  {multi: false},
  function(err, rows_updated) {
    if (err) throw err;
    console.log('Updated.');
  }
);
```

__ドキュメントの削除__

```javascript
var Task = mongoose.model('Task');
Task.findById('55d2b48b4c2215ad079075e9', function(err, task) {
  if (err) throw err;
  task.remove();
});
```



- [Mongoose](http://mongoosejs.com/)
