var net = require('net');
var host = process.argv[2];// cl 引数を解析して host と port を取得
var port = Number(process.argv[3]);
var socket = net.connect(port, host);

// サーバーと接続したときの connect イベントを処理
socket.on('connect', function() {
  // プロセスの stdin を socket につなぐパイプ
  process.stdin.pipe(socket);

  // ソケットからのデータをプロセスの stdout につなぐパイプ
  socket.pipe(process.stdout);

  // stdin の resume() を呼び出してデータの読み出しを開始
  process.stdin.resume();
});

socket.on('end', function() {
  // end イベントが発生したら stdin を中断する
  process.stdin.pause();
});

// test command
// $ node netcat.js towel.blinkenlights.nl 23