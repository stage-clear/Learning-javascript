
// ページ付けミドルウェア
module.exports = function(fn, perpage) {
  perpage = perpage || 10; // デフォルトは1ページに10項目

  // ミドルウェア関数を返す
  return function(req, res, next) {
    var page = Math.max(
      // pageパラメータを、10を基数として取り出す
      parseInt(req.param('page') || '1', 10),
      1
    ) - 1;

    // 渡された関数を呼び出す
    fn(function(err, total) {
      if (err) return next(err);//エラーを移譲する
      req.page = res.locals.page = {
        number: page,
        from: page * perpage,
        to: page * perpage + perpage - 1,
        total: total,
        count: Math.ceil(total / perpage)
      };

      // 次のミドルウェアコンポーネントに制御を渡す
      next();
    });
  };
};