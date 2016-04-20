var User = require('../lib/user');

exports.form = function(req, res) {
  res.render('register', {title: 'Register'});
};

exports.submit = function(req, res, next) {
  var data = req.body.user;

  // ユーザー名がユニークかを確認
  User.getByName(data.name, function(err, user) {
    // データベース接続エラーおよび、その他のエラーは移譲
    if (err) return next(err);
    // redis がデフォルトで処理

    if (user.id) {
      // ユーザー名がすでに使われている
      res.error('Username already taken!');
      res.redirect('back');
    } else {
      user = new User({
        // POSTされたデータを使って新規ユーザを作成する
        name: data.name,
        pass: data.pass
      });

      // 新規ユーザーを保存する
      user.save(function(err) {
        if (err) return next(err);
        req.session.uid = user.id; // 認証用に uid をストアして
        res.redirect('/'); // エントリーリストのページにリダイレクト
      });
    }
  });
};