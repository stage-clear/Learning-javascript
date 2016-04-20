var connect = require('connect');
var router = require('./router');

// 経路はオブジェクトとして保存される
var routes = {
  GET: {
    '/users': function(req, res) {
      res.end('tobi, loki, ferret');
    },
    '/user/:id': function(req, res, id) {
      res.end('user ' + id + '\n');
    }
  },
  DELETE: {
    '/user/:id': function(req, res, id) {
      res.end('deleted user ' + id);
    }
  }
};

connect()
  // routesオブジェクトを, セットアップ関数の router に渡す
  .use(router(routes))
  .listen(3000);