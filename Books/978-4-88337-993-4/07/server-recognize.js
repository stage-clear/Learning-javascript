'use strict';
// 文字認識サーバー

// setting
const SERVER_PORT = 1337;     // サーバーポート
const FILE_CLIENT = __dirname + '/client-recognizer.html';
const FILE_MODEL = __dirname + '/train-mini.model'

// modules
let http = require('http');
let URL = require('url');
let path = require('path');
let fs = require('fs');
let svm = require('node-svm');

// 学習モデルの読み込み
let model_json = fs.readFileSync(FILE_MODEL, 'utf-8');
let model_obj;
model_obj = JSON.parse(model_json, model_obj);
let clf = new svm.SVM({}, model_obj);

// on server
let svr = http.createServer(checkRequest);
svr.listen(SERVER_PORT, () => {
  console.log('サーバー起動しました');
  console.log('http://localhost:' + SERVER_PORT);
});


// サーバーにリクエストがあったときの処理
function checkRequest(req, res) {
  let uri = URL.parse(req.url, true);
  let pathname = uri.pathname;
  //　パス名で処理を分岐
  if (pathname == '/predict') {
    api_predict(req, res, uri);
  } else if (pathname == '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(fs.readFileSync(FILE_CLIENT, 'utf-8'));
  } else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end('File not found');
  }
  console.log(pathname);
}


// APIへのリクエストを処理
function api_predict(req, res, uri) {
  let p = uri.query.p;
  res.writeHead(200, {'Content-Type': 'text/plain'});
  let value = JSON.parse('['+ p +']');
  for (let i in value) {
    value[i] = value[i] / 255;
  }
  console.log('value.length = ' + value.length + '/' + 28 * 28);
  clf.predict(value).then(predicted => {
    console.log(predicted);
    res.end('' + predicted);
  });
}
