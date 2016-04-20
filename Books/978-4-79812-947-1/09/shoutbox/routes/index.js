exports.notfound = function(req, res) {

  res.status(404).format({ // メソッドコールの連鎖
    html: function() {
      res.render('404');
    },
    json: function() {
      res.send({message: 'Resource not found'});
    },
    xml: function() {
      res.write('<error>\n');
      res.write(' <message>Resource not found</message>\n');
      res.write('</error>\n');
    },
    text: function() {
      res.send('Resource not found\n');
    }
  });
};

// エラーハンドラは、必ず4つの引数を受け取らなければならない
exports.error = function(err, req, res, next) {
  console.error(err.stack);// エラーを stderr ストリームにロギングする
  var msg;

  switch(err.type) { // 特定のエラーを扱う例
    case 'database':
      msg = 'Server Unavailable';
      res.statusCode = 503;
      break;
    default:
      msg = 'Internet Server Error';
      res.statusCode = 500;
  }

  res.format({
    html: function() {
      // HTML が受け取られるときには、テンプレートのレンダリングを行う
      res.render('5xx', { msg: msg, status: res.statusCode });
    },
    json: function() {
      // 受け入れられるときは JSON で応答
      res.send({ error: msg });
    },
    text: function() {
      // プレーンテキストで応答
      res.send(msg + '\n');
    }
  });
};