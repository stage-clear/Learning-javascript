'use strict';

// 文字認識サーバー

// setting
const SERVER_PORT = 1337;
const FILE_CLIENT = __dirname + '/client-recognizer.html';
const FILE_MODEL = __dirname + '/train.model';
const SVM_PREDICT = '~/libsvm/svm-predict';// svm-predict のパスを指定
const DIR_TEMP = __dirname;

// modules
let http = require('http');
let URL = require('url');
let path = require('path');
let fs = require('fs');
let exec = require('child_process').exec;

// server on
let svr = http.createServer(checkRequest);
svr.listen(SERVER_PORT, () => {
  console.log('server started');
  console.log('http://localhost:' + SERVER_PORT);
});

// request
function checkRequest(req, res) {
  let uri = URL.parse(req.url, true);
  let pathname = uri.pathname;
  // pathname routing
  if (pathname == '/predict') {
    api_predict(req, res, uri);
  } else if (pathname == '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(fs.readFileSync(FILE_CLIENT, 'utf-8'));
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('File Not found');
  }
  console.log(pathname);
}


// api request
function api_predict(req, res, uri) {
  let p = uri.query.p;
  res.writeHead(200, {'Content-Type': 'text/plain'});
  let value = JSON.parse('[' + p + ']');
  let list = [];
  for (let i in value) {
    let v = value[i] / 255;
    if (v == 0) continue;
    list.push((parseInt(i) + 1) + ':' + v);
  }
  // テスト用のデータを作成
  let testdata = '0 ' + list.join(' ') + '\n';
  console.log(testdata);

  // 一時ファイルに保存する
  let r = Math.random();
  let t = (new Date()).getTime();
  let tmp_test = DIR_TEMP + '/test-' + t + '-' + r;
  let tmp_res = DIR_TEMP + '/res-' + t + '-' + r;
  fs.writeFileSync(tmp_test, testdata, 'utf-8');

  // コマンドを生成
  let cmd_a = [
    SVM_PREDICT,
    '"' + tmp_test + '"',
    '"' + FILE_MODEL + '"',
    '"' + tmp_res + '"'
  ];

  let cmd = cmd_a.join(' ');
  console.log('*** cmd ***', cmd, '***');

  // コマンドを実行
  exec(cmd, (err, stdin, stdout) => {
    if (err) {
      res.end('ERROR: exec command');
      return ;
    }

    // 結果ファイルを開く
    let a = fs.readFileSync(tmp_res, 'utf-8');
    console.log('predict>' + a);
    console.log(stdout);
    res.end('' + a);
    // 一時ファイルを削除
    fs.unlink(tmp_test);
    fs.unlink(tmp_res);
  });
}
