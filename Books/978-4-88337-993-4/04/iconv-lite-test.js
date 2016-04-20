'use strict';

let iconv = require('iconv-lite');
let fs = require('fs');

// テキストを Shift_JIS で書き込む
let str = '拙者は忍者だ、ニンニン!!';
let fname = 'iconv-lite-test-sjis.txt';

// Shift_JIS に変換
let buf = iconv.encode(str, 'SHIFT_JIS');
// 保存
fs.writeFileSync(fname, buf, 'binary');

// Shift_JIS のテキストを読みだして表示
let bin = fs.readFileSync(fname, 'binary');
// Shift_JIS のテキストを UTF-8 に変換
let txt = iconv.decode(bin, 'SHIFT_JIS');
console.log(txt);