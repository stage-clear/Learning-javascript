var net = require('net');
net.createServer(function(socket) {
  socket.write('Hello, world˜\r\n');
  socket.end();
}).listen(1337);
console.log('Listening on port 1337');