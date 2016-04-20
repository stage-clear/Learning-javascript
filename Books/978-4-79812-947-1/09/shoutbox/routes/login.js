var User = require('../lib/user');

exports.form = function(req, res) {
  res.render('login', {title: 'Login'});
};

exports.submit = function(req, res, next) {
  var data = req.body.user;

  // 身元証明をチェック
  User.authenticate(data.name, data.pass, function(err, user) {
    if (err) return next(err); // エラーを移譲
    if (user) {
      // 有効な証明を持つユーザーの処理
      req.session.uid = user.id; // 認証のために uid をストアする
      res.redirect('/'); // エントリーリストのページにリダイレクト
    } else {
      res.error('Sorry! invalid credentials'); // エラーメッセージを提示して
      res.redirect('back'); // 再びログインフォームにリダイレクト
    }
  });
};

exports.logout = function(req, res) {
  req.session.destroy(function(err) {
    if (err) throw err;
    res.redirect('/');
  });
};