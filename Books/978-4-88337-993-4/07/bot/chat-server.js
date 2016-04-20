'use strict';
// chat server

let SERVER_PORT = 1337;
let FILE_CLIENT = 'chat-client.html';

// modules
let http = require('http');
let URL = require('url');
let path = require('path');
let fs = require('fs');
let bot = require('./chat-server-bot.js');

// on server
let svr = http.createServer(checkRequest);
svr.listen(SERVER_PORT, () => {
  console.log('server started');
  console.log('http://localhost:' + SERVER_PORT);
});

// Request
function checkRequest(req, res) {
  let uri = URL.parse(req.url, true);
  let pathname = uri.pathname;

  if (pathname == '/api') {
    apiRequest(req, res, uri);
  } else if (pathname == '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(fs.readFileSync(FILE_CLIENT, 'utf-8'));
  } else {
    res.writeHead(404, { 'Content-type': 'text/plain'});
    res.end('File not found');
  }
  console.log(pathname);
}

// api
function apiRequest(req, res, uri) {
  let msg = uri.query['msg'];

  bot.getResponse(msg, (bot_msg) => {
    let body = JSON.stringify({'msg': bot_msg});
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(body);
  });
}



