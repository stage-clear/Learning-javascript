'use strict';

let fs = require('fs');
let CSV = require('comma-separated-values');
let Iconv = require('iconv').Iconv;



let iconv = new Iconv('SHIFT_JIS', 'UTF-8');

// Shift_JIS に変換
let buf = fs.readFileSync('test.csv');
let txt = iconv.convert(buf).toString('utf-8');

//CSVをパース
let csv = new CSV(txt, {header: false});
let records = csv.parse();

// 一行目はヘッダなので捨てる
records.shift();

// 結果を出力する
for (let i = 0; i < records.length; i++) {
  let fs = records[i];
  let name = fs[0];
  let price = fs[1];
  let memo = fs[2];
  console.log(name, price, memo);
}

