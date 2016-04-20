'use strict';
// 単語の出現頻度を調べる（２）

let Mecab = require('./mecab-mod.js');
let mecab = Mecab();
let fs = require('fs');

// 引数を読む
if (process.argv.length < 3) {
  console.log('No files');
  process.exit();
}

let filename = process.argv[2];
// ファイルを読み込む
let text = fs.readFileSync(filename, 'utf-8');
// 形態素解析を行う
mecab.parse(text, (err, items) => {
  checkHindo2(items)
});

// 出現頻度を調べる
function checkHindo2(items) {
  // 語句をオブジェクトに格納し頻度を調べる
  let words = {};

  for (let i in items) {
    let it = items[i];
    let w = it[0];
    let h = it[1];

    // 意味のない語句を除外する
    if (h != '名詞' && h != '動詞' && h != '形容詞') {
      continue;
    }

    if (words[w] == undefined) {
      words[w] = 1;
    } else {
      words[w]++;
    }
  }

  // 語句を出現頻度にソートするため配列にコピー
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
  })

  // 頻度上位の語句を画面に出力する
  for (let i = 0; i < 15; i++) {
    let it = list[i];
    console.log((i + 1) + ':' + it.word + '(' + it.nums + ')');
  }
}