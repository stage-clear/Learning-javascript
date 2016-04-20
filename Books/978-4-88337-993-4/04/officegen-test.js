'use strict';
// Excel ファイルを生成するテスト

// import modules
let fs = require('fs');
let officegen = require('officegen');
let xlsx = officegen('xlsx');

// new Sheet
let sheet = xlsx.makeNewSheet();
sheet.name = 'test';

// 直接データを書き換え
sheet.data[0] = ['商品名', '値段', '備考'];
sheet.data[1] = ['りんご', 340];
sheet.data[2] = ['みかん', 980];
sheet.data[3] = ['ばなな', 250];

// セル名を指定して書き換え
sheet.setCell('C2', '新鮮');
sheet.setCell('C3', '甘い')

let strm = fs.createWriteStream('test.xlsx');
xlsx.generate(strm);