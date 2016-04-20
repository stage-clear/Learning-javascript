'use strict';
// カレントディレクトリのGZファイルを一気に解凍

let fs = require('fs');
let exec = require('child_process').exec;

// ファイル一覧を得る
fs.readdir('.', (err, files) => {
  files.forEach(file => {
    // .gz 以外は無視
    if (!/\.gz$/.test(file)) return ;

    // 解凍
    console.log('file=' + file);
    let fn = file.replace(/\.gz$/, '');
    let cmd = [
      'gzip', '-dc',
      '"' + file + '"',
      '>"' + fn + '"'
    ].join(' ');

    exec(cmd, (err, stdout, stderr) => {
      if (err) throw err;
      console.log(stdout, stderr);
    });
  });
});