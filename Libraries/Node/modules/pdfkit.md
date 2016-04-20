PDFKit
======

__インストール__  

```bash
$ npm install pdfkit
```

__基本__  

```javascript
let PDFDocument = require('pdfkit');
let doc = new PDFDocument();

// 出力ファイルを設定
doc.pipe(fs.createWriteStream('output.pdf'));

// 改ページ
doc.addPage();

// 終了
doc.end();
```

__操作メソッド__  

|Method|Summary|
|:--|:--|
|pipe|出力ファイルを指定|
|save||
|addPage|改ページ|
|end|終了|

__描画メソッド__  

|Method||Summary|
|:--|:--|:--|
| font | `font(path)` |フォントの指定|
| fontSize | `fontSize(100)` |フォントサイズの指定|
| text | `text(string)` |表示する文字|
| stroke | `stroke()` |線|
| fill | `fill(color)` |塗りつぶし|
| rect | `rect(x, y, width, height)` |長方形|
| roundRect | `roundRect(x, y, width, height, conerRadius)` |角丸長方形|
| ellipse | `elipse(cx, cy, radiusX, radiusY)` |楕円形|
| circle | `circle(cx, cy, radius)` |正円|
| polygon | `polygon([x, y]...)` |多角形|
| path | `path(pathData)` |SVG|


使い方
------




リンク
-----

- [pdfkit.org](http://pdfkit.org/)
- [pdfkit/pdfkit](https://github.com/devongovett/pdfkit)
- [npm/pdfkit](https://www.npmjs.com/package/pdfkit)
