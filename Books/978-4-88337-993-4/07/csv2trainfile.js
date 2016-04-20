'use strict';

// CSVを元に、SVM 学習データ(SVM)を生成

let fs = require('fs');

// 二種類のデータを処理
csv2svm('train-mini.csv');
csv2svm('train.csv');
csv2svm('t10k-mini.csv');
csv2svm('t10k.csv');

console.log('ok');

// CSVファイルからSVMファイルを作成
function csv2svm(file_csv) {
  // ファイル名を決定
  let file_svm = file_csv.replace(/\.csv$/, '') + '.svm';
  console.log('[I N]' + file_csv);
  console.log('[OUT]' + file_svm);
  console.log(file_svm);

  // 保存用ファイルを開く
  let f_svm = fs.openSync(file_svm, 'w');

  // 読込み
  let csv = fs.readFileSync(file_csv, 'utf-8');
  let lines = csv.split('\n');

  // データを作成
  for (let i in lines) {
    // 経過報告
    if (i % 1000 == 0) console.log(i + '/' + lines.length);

    // 一行を処理
    let line = lines[i];
    let cells = line.split(',');
    let no = cells.shift();
    let vals = [];
    for (let j = 0; j < cells.length; j++) {
      let index = j + 1;
      let v = cells[j];
      if (v == 0) continue;
      let value = v / 255;
      vals.push(index + ':' + value);
    }
    if (vals.length == 0) continue;
    let v_str = no + ' ' + vals.join(' ');
    let dat = v_str + '\n';
    // 書き込み
    fs.writeSync(f_svm, dat, null, 'utf-8');
  }
  console.log('saved = ' + file_svm);
}
