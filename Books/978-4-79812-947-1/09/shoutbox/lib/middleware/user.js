var User = require('../user');

module.exports = function(req, res, next) {
  if (req.remoteUser) {
    res.locals.user = req.remoteUser;
  }


  var uid = req.session.uid; // ログインしたユーザーのIDをセッションから取得
  if (!uid) return next();

  // そのユーザーの情報を Redis から取り出す
  User.get(uid, function(err, user) {
    if (err) return next(err);
    // ユーザー情報をレスポンスオブジェクトに提示
    req.user = res.locals.user = user;
    next();
  });
};