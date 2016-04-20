'use strict';
// PDFKit でグラフを描く

// import modules
let PDFDocument = require('pdfkit');
let fs = require('fs');

// 描画するデータ
let data = [
  { label: '国語', value: 76 },
  { label: '数学', value: 48 },
  { label: '理科', value: 89 },
  { label: '社会', value: 68 },
  { label: '音楽', value: 55 },
  { label: '技術', value: 73 },
  { label: '芸術', value: 92 },
  { label: '英語', value: 58 },
  { label: '選択', value: 79 }
];

// create a document
let doc = new PDFDocument();
let page_w = doc.page.width;
let page_h = doc.page.height;

// set a output file
doc.pipe(fs.createWriteStream('output-graph.pdf'));

// font
doc.font('kochi-gothic-subst.ttf');

// display title
doc.fontSize(30)
  .text('成績グラフ', 20, 20);

// グラフを描画
let margin = 20;
let g_w = page_w - margin * 2 -50;
let g_x = margin + 50;
let y = 80;
let wpx = g_w / 100;

for (let i = 0; i < data.length; i++) {
  let value = data[i].value;
  let label = data[i].label;

  doc.save()
    .rect(g_x, y, wpx * value, 20)
    .fill( (i % 2) ? 'blue' : 'red');
  doc.fontSize(10)
    .fillColor('black')
    .text(label, 30, y + 5)
    .text(value, g_x + 5, y + 5);

  y += 20 + 5;
}

// 終了
doc.end();