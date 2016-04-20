MongoDB
=======

- MongoDB は、汎用的な非リレーショナル・データベースである。
- Mongo APIモジュールで、最も成熟し、アクティブに管理されているのは `node-mongodb-native` である。

本体
-----

__インストール__

```bash
$ brew install mongodb
```

__起動__

```bash
$ mongod
# もしくは
$ mongod --dbpath /PATH/TO/DB
```

__リファレンス__

- [MongoDBのインストールと基本操作](http://codezine.jp/article/detail/6982)
- [Homebrewでインストール](http://qiita.com/hajimeni/items/3c93fd981e92f66a20ce)
- [CentOS7 MongoDBのインストール](http://qiita.com/daskepon/items/aa93f8955407da0cb896)

* * *


クライアント
--------------

__インストール__

```bash
$ npm install mongodb
```

### 使用法

__接続してデータを挿入__

```js
// 接続情報
let MONGO_DSN = 'mongodb://localhost://27017/db';
let mongo_db;// 接続オブジェクト

// モジュール
mongo_clint = require('mongodb').MongoClient; 
// 接続
mongo_client.connect(MONGO_DSN, (err, db) => {
  if (err) return;
  
  mongo_db = db;
  
  // コレクションを取得
  let collection = db.collection('keywords'); 

  collection.drop((err, reply) => {
    // do something
    collection.insert({
      // insert data
      key: value
    }, (err, result) => {
      if (done) {
        mongo_db.close();
      }
    });
  });
});
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


リンク
-------

- [npm/mongodb](https://www.npmjs.com/package/mongodb)
- [mongodb/node-mongodb-native](https://github.com/mongodb/node-mongodb-native)
- [MongoDB for GIANT Ideas | MongoDB](https://www.mongodb.org/?_ga=1.3231536.1007386808.1445325098)


関連
-----

- [Mongoose](./mongoose.md)


