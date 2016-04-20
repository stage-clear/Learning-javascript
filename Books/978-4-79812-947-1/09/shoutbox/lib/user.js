var redis = require('redis');
var bcrypt = require('bcrypt');
var db = redis.createClient();
// 長期的な Redis 接続を作成

module.exports = User;
// このモジュールから、User関数をエクスポートする

function User(obj) {
  // 渡されたオブジェクトないのkey を反復処理して
  // 値をマージする
  for (var key in obj) {
    this[key] = obj[key];
  }
}
// new User({ name: 'Tobi' });

User.prototype.save = function(fn) {
  if (this.id) {
    // このユーザーはすでに存在する
    this.update(fn);
  } else {
    var user = this;
    db.incr('user:ids', function(err, id) {
      // ユニークなIDを生成
      if (err) return fn(err);
      user.id = id;
      // 保存のためにIDをセットし、
      user.hashPassword(function(err) {
        // パスワードにハッシュをかけて、
        if (err) return fn(err);
        user.update(fn);
        // ユーザーのプロパティを保存する
      });
    });
  }
};

User.prototype.update = function(fn) {
  var user = this;
  var id = user.id;

  db.set('user:id:' + user.name, id, function(err) {
    // 名前でユーザーIDをインデックス参照
    if (err) return fn(err);

    db.hmset('user:' + id, user, function(err) {
      // Redis のハッシュにデータを保存する
      fn(err);
    });
  });
};

User.prototype.hashPassword = function(fn) {
  var user = this;
  bcrypt.genSalt(12, function(err, salt) {
    // 12文字の「お塩」を生成
    if (err) return fn(err);
    user.salt = salt;
    // 保存用に「お塩」をセットする
    bcrypt.hash(user.pass, salt, function(err, hash) {
      // ハッシュを生成
      if (err) return fn(err);
      user.pass = hash;
      // 保存用にハッシュをセットする
      fn();
    });
  });
};

/*
var tobi = new User({
  name: 'Tobi',
  pass: 'im a ferret',
  age: 2
});

tobi.save(function(err) {
  if (err) throw err;
  console.log('user id %d', tobi.id);
});
*/


// ユーザーの情報を取り出す
// ユーザー情報を Redis から取り出す
User.getByName = function(name, fn) {
  // ユーザーIDをnameによって検索する
  User.getId(name, function(err, id) {
    if (err) return fn(err);
    // IDを指定してユーザー情報を取得する
    User.get(id, fn);
  });
};


User.getId = function(name, fn){
  db.get('user:id:' + name, fn);
};


User.get = function(id, fn) {
  // name をインデックスとするID取得する
  db.hgetall('user:'  + id, function(err, user) {
    // オブジェクトのハッシュを取得
    if (err) return fn(err);
    fn(null, new User(user));
    // 取得したオブジェクトを new User オブジェクトに変換する
  });
};


// ユーザーのログイン認証を行う
// ユーザーの名前とパスワードを認証する
User.authenticate = function(name, pass, fn) {
  User.getByName(name, function(err, user) {
    // ユーザーを名前でルックアップ
    if (err) return fn(err);
    if (!user.id) return fn(); // ユーザーが存在しない

    bcrypt.hash(pass, user.salt, function(err, hash) {
      // 所与のパスワードでハッシュ
      if (err) return fn(err);
      if (hash == user.pass) return fn(null, user); // マッチが見つかった
      fn(); // 無効なパスワード
    });
  });
};

User.prototype.toJSON = function() {
  return {
    id: this.id,
    name: this.name
  };
};

