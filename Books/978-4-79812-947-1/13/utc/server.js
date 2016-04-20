// 通常の HTTP サーバーから
var app = require('http').createServer(handler);
// Socket.IOサーバーにアップグレード
var io = require('socket.io').listen(app);

var fs = require('fs');
var html = fs.readFileSync('index.html', 'utf8');

// HTTPサーバーのコードは常に index.html ファイルを供給する
function handler(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(html, 'utf8'));
  res.end(html);
}


function tick() {
  // 現在時刻のUTC表現を取得して
  var now = new Date().toUTCString();
  // 接続している全部のクライアントに送信
  io.sockets.send(now);
}

// tick を 1秒ごとに実行する
setInterval(tick, 1000);

app.listen(3000);