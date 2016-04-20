
var parse = require('url').parse;

module.exports = function(obj) {
  return function(req, res, next) {
    // req.method が定義されていることを確認
    if (!obj[req.method]) {
      // もし定義されていなければ next() をコールして終了
      return next();
    }

    // req.method 用の参照パス群
    var routes = obj[req.method];
    // パス名と照合するために URLを解析
    var url = parse(req.url);
    // req.method ようのパス群を配列に保存
    var paths = Object.keys(routes);

    // paths のループ処理
    for (var i = 0; i < paths.length; i++) {
      var path = paths[i];
      var fn = routes[path];
      path = path
        .replace(/\//g, '\\/')
        .replace(/:(\w+)/g, '([^\\/]+)');
      // 正規表現を構築する
      var re = new RegExp('^' + path + '$');
      var captures = url.pathname.match(re);
      if (captures) {
        // パス名とマッチする結果がキャプチャされたら
        // まとめて引数として渡す
        var args = [req, res].concat(captures.slice(1));
        // マッチしたら、次の next() コールを行わないように、
        // 即時リターンする
        return fn.apply(null, args);
      }
    }
    return next();
  };
};