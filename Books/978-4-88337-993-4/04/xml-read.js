'use strict';

let fs = require('fs');
let cheerio = require('cheerio');

// XML ファイルを読み込む
let xml = fs.readFileSync('shelter.xml', 'utf-8');

// XMLファイルをパースする
let $ = cheerio.load(xml);

// 書く防災拠点を順にチェック
$('Shelter').each(function (i, el) {
  // 名前と地区を画面に表示
  var name = $(this).children('Name').text();
  var ward = $(this).children('Ward').text();
  console.log(ward, name);
});