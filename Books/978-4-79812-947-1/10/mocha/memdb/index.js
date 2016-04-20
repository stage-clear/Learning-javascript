var db = [];

// データベース配列に doc を追加
exports.save = function(doc, cb) {
  db.push(doc);
  if (cb) {
    setTimeout(function() {
      cb();
    }, 1000);
  }
};

exports.first = function(obj) {
  // obj の全プロパティと一致する doc のみを選択
  return db.filter(function(doc) {
    for (var key in obj) {
      // 一致しなければ、false を返し doc のみを選択
      if (doc[key] != obj[key]) {
        return false;
      }
    }
    return true;
  }).shift();
  // 最初の doc だけ（なければ null）を選択
};


exports.clear = function() {
  db = [];
};