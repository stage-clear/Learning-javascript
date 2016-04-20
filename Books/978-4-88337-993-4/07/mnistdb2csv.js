'use strict';
// MNIST 手書きデータをCSVに変換する

// ファイル名を指定
let DIR_IMAGE = __dirname + '/image';

// モジュール
let fs = require('fs');

// 変換処理
convertToCsv('train');
convertToCsv('t10k');

function convertToCsv(basename) {
  console.log('convert: ' + basename);

  // 各種ファイル名を決定
  let file_images = basename + '-images-idx3-ubyte';
  let file_labels = basename + '-labels-idx1-ubyte';
  let file_csv = basename + '.csv';

  // ファイルを開く
  let f_img = fs.openSync(file_images, 'r');
  let f_lbl = fs.openSync(file_labels, 'r');
  let f_out = fs.openSync(file_csv, 'w+');

  if (!fs.existsSync(DIR_IMAGE)) {
    fs.mkdir(DIR_IMAGE);
  }

  // ヘッダを読む
  let buf_i = new Buffer(16);
  fs.readSync(f_img, buf_i, 0, buf_i.length);
  let buf_l = new Buffer(8);
  fs.readSync(f_lbl, buf_l, 0, buf_l.length);

  // ヘッダをチェック
  let magic       = buf_i.readUInt32BE(0);
  let num_images  = buf_i.readUInt32BE(4);
  let num_rows    = buf_i.readUInt32BE(8);
  let num_cols    = buf_i.readUInt32BE(12);
  let num_size    = num_rows * num_cols;

  if (magic != 0x803) {
    console.error('[ERROR] broken file=', maginc.toString(16));
    process.exit();
  }

  console.log('num_of_images=' + num_images);
  console.log('num_of_rows=' + num_rows);
  console.log('num_of_cols=' + num_cols);
  console.log('num_of_pixel_size=' + num_size);

  // 画像を取り出す
  let buf_img = new Buffer(num_size);
  let buf_lbl = new Buffer(1);
  let mini_csv = '';
  for (let i = 0; i < num_images; i++) {
    // 経過を表示
    if (i % 1000 == 0) {
      console.log(i + '/' + num_images);
    }

    // 画像を読む
    let pos_i = i * num_size + 16;
    fs.readSync(f_img, buf_img, 0, num_size, pos_i);

    // ラベルを読む
    let pos_l = i * 1 + 8;
    fs.readSync(f_lbl, buf_lbl, 0, 1, pos_l);
    let no = buf_lbl[0];

    // PGM形式として保存
    if (i < 30) {
      let s = 'P2 28 28 255\n';
      for (let j = 0; j < 28 * 28; j++) {
        s += buf_img[j] + ' ';
        s += (j % 28 == 27) ? '\n' : '';
      }
      let img_file =
        DIR_IMAGE + '/' + basename +
        '-' + i + '-' + no + '.pgm';
      fs.writeFileSync(img_file, s, 'utf-8');
    }

    // CSVとして保存
    let cells = [];
    for (let j = 0; j < 28 * 28; j++) {
      cells.push(buf_img[j]);
    }
    let s = no + ',' + cells.join(',') + '\n';
    fs.writeSync(f_out, s, null, 'utf-8');

    // テスト用のミニサイズCSVを作成
    if (i < 1000) {
      mini_csv += s;
      if (i == 999) {
        fs.writeFileSync(
          basename + '-mini.csv', mini_csv, 'utf-8'
        );
      }
    }
  }
  console.log('OK:' + basename);
}