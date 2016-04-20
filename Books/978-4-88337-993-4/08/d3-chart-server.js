'use strict';
// create HTTP server

// setting
const SERVER_PORT = 1337;
const FILE_DEFAULT = '/d3-line.html';

// modules
let http = require('http');
let URL = require('url');
let path = require('path');
let fs = require('fs');

let chalk = require('chalk');

console.log('[aaaa]', chalk.green('Hello world'));

let mime = {
  ".html": "text/html",
  ".css":  "text/css",
  ".js":   "application/javascript",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".gif":  "image/gif",
  ".txt":  "text/plain"
};

// サーバー起動
let svr = http.createServer(checkRequest);
svr.listen(SERVER_PORT, () => {
  console.log('server started.');
  console.log('http://localhost:' + SERVER_PORT);
});


// request
function checkRequest(req, res) {
  let uri = URL.parse(req.url, true);
  let pathname = uri.pathname;

  if (pathname == '/') {
    pathname = FILE_DEFAULT
  }

  console.log(pathname);

  // ファイルの存在確認
  let filename = path.join(__dirname, pathname);
  let mimeType = mime[path.extname(filename)];


  if (!fs.existsSync(filename)) {
    res.writeHead(404, {'Content-Type': 'text/html'})
    res.end('404 file not found');
    return ;
  }

  // ディレクトリであればエラーにする
  let stat = fs.statSync(filename);
  if (stat && stat.isDirectory()) {
    res.writeHead(403, {'Content-Type': 'text/html'});
    res.end('403');
    return ;
  }

  // ファイルを送出
  res.writeHead(200, {'Content-Type': mimeType});
  res.end(fs.readFileSync(filename), 'utf-8');
}
