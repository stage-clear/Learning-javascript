'use strict';
// 百人一首を Excel に書き出す

// http://api.aoikujira.com/hyakunin/
// http://api.aoikujira.com/hyakunin/get.php?fmt=json

// API
let API = 'http://api.aoikujira.com/hyakunin/get.php?fmt=json';

// import modules
let fs = require('fs');
let officegen = require('officegen');
let xlsx = officegen('xlsx');
let request = require('request');

// 百人一首をダウンロード
request(API, (err, res, body) => {
  if (err) throw err;
  let list = JSON.parse(body);
  exportToExcel(list);
  console.log(list);
});

function exportToExcel(list) {
  // 新規シートを作詞絵
  let sheet = xlsx.makeNewSheet();
  sheet.name = '百人一首';

  // 直接データを書き換え
  sheet.data[0] = [
    '番号', '上の句', '下の句'
  ];

  for (let i = 0; i < list.length; i++) {
    let r = list[i];
    sheet.data[i + 1] = [r.no, r.kami, r.simo];
  }

  // ファイルを書き出す
  let strm = fs.createWriteStream('hyakunin.xlsx');
  xlsx.generate(strm);
  console.log('ok');

}
