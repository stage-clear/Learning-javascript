var http = require('http');
var server = http.createServer();

server.on('request', function(req, res) {
  // ステータスコード 200 で HTTP レスポンスヘッダを出力する
  res.writeHead(200);

  // リクエストURLを出力する
  res.write('URL: ' + req.url + '\n');

  // HTTPメソッドを出力する
  res.write('Method: ' + req.method + '\n');

  // HTTPヘッダーを出力する
  Object.keys(req.headers).forEach(function(key) {
    res.write(key + ': ' + req.headers[key] + '\n');
  });

  res.end();
});
server.listen(8000, '127.0.0.1');