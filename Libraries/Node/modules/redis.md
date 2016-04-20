Redis
======

- NoSQL
- Redis Api モジュールのなかで、最も成熟度が高く、アクティブに開発されているのは、 `node_redis` モジュールである。


__サポートするデータ構造__

- ハッシュテーブル
- リスト


本体
----

__インストール__

```bash
$ brew install redis
```

__起動__

```bash
$ redis-server /usr/local/etc/redis.conf
```

__リファレンス__

- [Redisクイックスタート](http://redis.shibu.jp/quickstart.html)
- [Homebrewでインストール](http://qiita.com/checkpoint/items/58b9b0193c0c46400eeb)
- [Command reference – Redis](http://redis.io/commands)


* * *


クライアント
------------

__インストール__

```bash
$ npm install redis
```

### 使用法

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



__リンク__

- [npm/redis](https://www.npmjs.com/package/redis)
- [NodeRedis/node_redis](https://github.com/NodeRedis/node_redis)

