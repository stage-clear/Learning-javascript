var Entry = require('../lib/entry');

exports.list = function(req, res, next) {
  var page = req.page;
  // エントリーを取り出す
  Entry.getRange(page.from, page.to, function(err, entries) {
    if (err) return next(err);

    // HTTP応答のレンダリング
    res.render('entries', {
      title: 'Entries',
      entries: entries
    });
  });
};

exports.form = function(req, res) {
  res.render('post', {
    title: 'Post'
  });
};

// 提出されたフォームデータを使ってエントリーを追加する
exports.submit = function(req, res, next) {
  var data = req.body.entry;
  var entry = new Entry({
    'username': res.locals.user.name,
    'title': data.title,
    'body': data.body
  });

  entry.save(function(err) {
    if (err) return next(err);

    if (req.remoteUser) {
      res.json({message: 'Entry added.'});
    } else {
      res.redirect('/');
    }
  });
};
