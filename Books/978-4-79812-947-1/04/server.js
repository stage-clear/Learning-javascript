var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var cache = {};


/*
 * Server
 * HTTPサーバーを作る
 *
 * .
 * ├── lib
 * ├── public
 * │   └── index.html
 * └── server.js
 */
var server = http.createServer(function(req, res) {
  var filePath = false;

  if (req.url == '/') {
    // デフォルトで供給するHTMLファイルの定義
    filePath = 'public/index.html';
  } else {
    // URLパスをファイルの相対パスに変換
    filePath = 'public' + req.url;
  }

  var absPath = './' + filePath;
  // 応答として静的ファイルを提供する
  serveStatic(res, cache, absPath);
});

server.listen(3000, function() {
  console.log('Server Listening on port 3000');
});


/*
 * 404 Error
 */
function send404(res) {
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.write('Error 404: resource not found.');
  res.end();
}


/*
 * Send File
 * ファイルデータを送信する
 */
function sendFile(res, filePath, contents) {
  res.writeHead(200, {
    'Content-Type': mime.lookup(path.basename(filePath))
  });
  res.end(contents);
}


/*
 * Serve Static
 * 静的ファイルの供給
 */
function serveStatic(res, cache, absPath) {
  if (cache[absPath]) {
    // ファイルがメモリにキャッシュされている場合
    // メモリからファイルを供給
    sendFile(res, absPath, cache[absPath]);
  } else {
    fs.exist(absPath, function(exists) {
      if (exists) {
        // ディスクからファイルを読み出す
        fs.readFile(absPath, function(err, data) {
          if (err) {
            // 404 Error
            return send404(res);
          } else {
            cache[absPath] = data;
            // ディスクから読んだファイルを供給
            return sendFile(res, absPath, data);
          }
        });
      } else {
        // 404 Error
        return send404(res);
      }
    })
  }
}