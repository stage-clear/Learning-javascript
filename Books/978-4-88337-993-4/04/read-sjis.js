'use strict';
// Shift_JIS を読んで UTF-8 で保存する

let fs = require('fs');
let Iconv = require('iconv').Iconv;

// Shift_JIS から UTF-8 へ変換するオブジェクト
let sjis_utf8 = new Iconv('SHIFT_JIS', 'utf-8');

// Shift_JIS のファイルを読み込む
let buf = fs.readFileSync('sample-sjis.txt');

let buf2 = sjis_utf8.convert(buf); // Shift_JIS を UTF-8 に変換
let txt = buf2.toString('utf-8'); // バッファを文字列に変換
console.log(txt);

// UTF-8 でファイルに保存
fs.writeFileSync('sample-sjis2utf8.txt', txt, 'utf-8');
