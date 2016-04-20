var http = require('http');

function handleRequest(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}

http.createServer(function(req, res) {
  debugger; // break point
  handleRequest(req, res);
}).listen(1337);

console.log('Server running at http://localhost:1337');