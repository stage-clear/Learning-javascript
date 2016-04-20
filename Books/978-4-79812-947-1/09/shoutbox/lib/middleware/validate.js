// 妥当性検証ミドルウェア

// entry[name] という記法を構文解析
function parseField(field) {
  return field
    .split(/\[|\]/)
    .filter(function(s) {
      return s;
    });
}

// parseFiled() の結果をもとにプロパティを参照
function getField(req, field) {
  var val = req.body;
  field.forEach(function(prop) {
    val = val[prop];
  });

  return val;
}


// ここでフィールドを解析
exports.required = function(field) {
  field = parseField(field);
  return function(req, res, next) {
    if (getField(req, field)) {
      // 各リクエストについてフィールドに値があるかチェック
      next();
    } else {
      res.error(field.join(' ') + ' is required');
      // 値がなければエラーを表示
      res.redirect('back');
    }
  };
};


// フィールド長のチェック
exports.lengthAbove = function(field, len) {
  field = parseField(field);
  return function(req, res, next) {
    if (getField(req, field).length > len) {
      next();
    } else {
      res.error(field.join(' ') + ' must have more that ' + len + ' characters');
      res.redirect('back');
    }
  };
};