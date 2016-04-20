'use strict';
// 単語の出現頻度を調べる

let Mecab = require('./mecab-mod.js');
let mecab = Mecab();
let fs = require('fs');

// 引数をチェック
let args = process.argv;
args.shift();// 除去 'node'
args.shift();// 除去 スクリプトのパス

if (args.length <= 0) {
  console.log('node hindo.js textfile');
  process.exit();
}

let filename = args.shift();

// ファイルを読み込む
let text = fs.readFileSync(filename, 'utf-8');

// 形態素解析を行う
mecab.parse(text, (err, items) => {
  checkHindo(items);
});

// 出現頻度を調べる
function checkHindo(items) {
  // 語句をオブジェクトに格納し頻度を調べる
  let words = {};

  for (let i in items) {
    let it = items[i];
    let w = it[0];

    if (words[w] == undefined) {
      words[w] = 1;
    } else {
      words[w]++;
    }
  }

  // 語句を出現頻度にそーとするため配列にコピー
  let list = [];
  for (let key in words) {
    list.push({
      'word': key,
      'nums': words[key]
    });
  }

  // ソートする
  list.sort((a, b) => {
    return b.nums - a.nums;
  });

  // 画面に出力する
  for (let i = 0; i < list.length; i++) {
    let it = list[i];
    console.log((i + 1) + ':' + it.word + '(' + it.nums +')');
  }
}