var fs = require('fs');
var url = require('url');
var http = require('http');
var path = require('path');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var root = __dirname;

// static ミドルウェアが返すファイルの監視を開始するミドルウェア
app.use(function(req, res, next) {
  console.log('[app.use]', url.parse(req.url).pathname);

  var file = url.parse(req.url).pathname;
  var mode = 'stylesheet';
  if (file[file.length - 1] == '/') {
    file += 'index.html';
    mode = 'reload';
  }
  createWatcher(file, mode);
  next();
});


// サーバーを、基本的な静的ファイルサーバーとして設定する
app.use(express.static(root));
console.log('[root]', root);

// 監視対象ファイルのリスト
var watchers = {};

function createWatcher(file, event) {
  var absolute = path.join(root, file);

  // 監視中のファイル
  if (watchers[absolute]) {
    return;
  }


  // ファイル変更の監視を始める
  fs.watchFile(absolute, function(curr, prev) {
    // mtime(最終変更時) が変化したら
    if (curr.mtime !== prev.mtime) {
      // Socket.IO イベントを発火する
      io.sockets.emit(event, file);
    }
  });

  // ファイルに監視中のマークを付ける
  watchers[absolute]  = true;
}

server.listen(3000);