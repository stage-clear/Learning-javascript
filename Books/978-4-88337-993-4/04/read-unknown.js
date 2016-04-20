'use strict';
// 文字コードがわからない場合

let fs = require('fs');
let Iconv = require('iconv').Iconv;
let jschardet = require('jschardet');

// 文字コードがわからないファイルを読み込む
let buf = fs.readFileSync('sample-unknown.txt');

// 文字コード判定を行う
let det = jschardet.detect(buf);
console.log(det);

// Iconv で utf-8 に変換するオブジェクトを作成
let iconv = new Iconv(det.encoding, 'utf-8');
let buf2 = iconv.convert(buf); // => utf-8 に変換
let txt = buf2.toString('utf-8'); // => バッファを文字列に変換

console.log(txt);

let det2 = jschardet.detect(buf2);
console.log(det2);
