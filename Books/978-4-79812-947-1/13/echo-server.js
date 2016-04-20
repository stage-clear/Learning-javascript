var net = require('net');

net.createServer(function(socket) {
  console.log('socket connected!');

  // dataイベントは何度も発生する場合がある
  socket.on('data', function(data) {
    console.log('"data" event', data);
  });

  // endイベントはソケットで1度しか発生しない
  socket.on('end', function() {
    console.log('"end" event');
  });

  // close イベントもソケットで1度しか発生しない
  socket.on('close', function() {
    console.log('"data" event');
  });

  //　予期せぬ例外も細くするエラーハンドラ
  socket.on('error', function(e) {
    console.log('"error" event');
  });

  socket.pipe(socket);
}).listen(1337);