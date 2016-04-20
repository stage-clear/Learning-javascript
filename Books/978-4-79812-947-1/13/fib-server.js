var http = require('http');
var cp = require('child_process');

var server = http.createServer(function(req, res) {
  console.log('[fib-server.js]',__filename);
  console.log('[fib-server.js]',__dirname + '/fib-calc.js');
  var child = cp.fork(__dirname + '/fib-calc.js', [req.url.substring(1)]);
  child.on('message', function(m) {
    res.end(m.result + '\n');
  });
});
server.listen(8000);