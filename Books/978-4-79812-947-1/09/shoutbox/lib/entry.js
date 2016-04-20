var redis = require('redis');
var db = redis.createClient();

module.exports = Entry;

function Entry(obj) {
  // 渡されたオブジェクトのキーを反復処理して
  for (var key in obj) {
    // キーの値をマージ
    this[key] = obj[key];
  }
}

Entry.prototype.save = function(fn) {
  // 保存するエントリーデータをJSON文字列に変換
  var entryJSON = JSON.stringify(this);
console.log('[entry.js]', entryJSON);
  // JSON文字列を Redis のリストに保存
  db.lpush(
    'entries',
    entryJSON,
    function(err) {
      if (err) return fn(err);
      fn();
    }
  );
};

// 指定範囲のエントリーを取り出すロジック
Entry.getRange = function(from, to, fn) {
  // Redis の lrange 関数を使ってエントリーを取り出す
  db.lrange('entries', from, to, function(err, items) {
    if (err) return fn(err);

    var entries = [];

    // JSON として保存されていたエントリーをデコード
    items.forEach(function(item) {
      entries.push(JSON.parse(item));
    });

    fn(null, entries);
  });
};


Entry.count = function(fn) {
  db.llen('entries', fn);
};