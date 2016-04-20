'use strict';

// ファイルの読み書き
let fs = require('fs');

// UTF-8のファイルを読み込む
let txt = fs.readFileSync('sample-utf8.txt');
console.log(txt);

// ファイルをutf-8 で書き込む
fs.writeFileSync('test.txt', txt);


