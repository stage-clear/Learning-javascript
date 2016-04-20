'use strict';
// PDFKitを利用して出力する

// import modules
let PDFDocument = require('pdfkit');
let fs = require('fs');

// create a document
let doc = new PDFDocument();

// set a output file
doc.pipe(fs.createWriteStream('output.pdf'));

// font
doc.font('kochi-gothic-subst.ttf');

// display
doc.fontSize(30)
  .text('今日の格言', 90, 100);
doc.fontSize(20)
  .text('さがしつづけなさい。\n\n たたきつづけなさい', 100, 180);

// graphic
doc.save()
  .moveTo(80, 80)
  .lineTo(250, 80)
  .lineTo(250, 150)
  .lineTo(80, 150)
  .lineTo(80, 80)
  .stroke('#0000ff');

// 改ページ
doc.addPage();

// graphic
doc.save()
  .moveTo(100, 150)
  .lineTo(100, 250)
  .lineTo(200, 250)
  .fill('#ff0000');

// 描画を終了
doc.end();