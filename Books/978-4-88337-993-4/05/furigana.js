'use strict';

// ふりがなをふる
// import modules
let fs = require('fs');
let Mecab = require('./mecab-mod.js');
let mecab = Mecab();

// コマンドラインを調べる
let args = process.argv;
args.shift(); // node を除去
args.shift(); // スクリプト名を除去

// 引数がなければプログラムの使い方を表示する
if (args.length <= 0) {
  console.log('[USAGE] furigana.js 入力テキスト');
  process.exit();
}

// 入力ファイルを読み込む
let inputfile = args.shift();
let txt = fs.readFileSync(inputfile, 'utf-8');

// 形態素解析する
mecab.parse(txt, (err, items) => {
  let res = '';
  for (let i in items) {
    let k =items[i];
    let word = k[0];
    let kana = k[8];
    if (k == 'EOS') {
      continue;
    }

    // ふりがなが必要なときを判定
    if (word == kana || isHiragana(word)) {
      res += word
    } else {
      res += word + '('+ kana +')'
    }
  }
  console.log(res);
});


// ひらがな判定
function isHiragana(s) {
  return (s.match(/^[あ-ん]+$/));
}
