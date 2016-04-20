iconv-lite
===========

- 文字コードを変換する
- JavaScript で実装されている
- Iconv ほど多くの文字コードには対応していない
- Iconv との互換性はない

__インストール__  

```bash
$ npm install iconv-lite
```

使い方
-------

```javascript
let iconv = require('iconv-lite');
let fs = require('fs');

// テスト用のテキストファイルを Shift_JISで 保存
let str = 'Shift_jisの文字列。';
let fname = 'sjis.txt';
let buf = iconv.encode(str, 'SHIFT_JIS'); // => Shift_JIS に変換
// 保存
fs.writeFileSync(fname, buf, 'binary');

// Shift_JIS のテキストを読み出して表示
let bin = fs.readFileSync(fname, 'binary');
// Shift_JIS のテキストを UTF-8 に変換
let txt = iconv.decode(bin, 'SHIFT_JIS');
console.log(txt);
```


リンク
------

- [npm/iconv-lite](https://www.npmjs.com/package/iconv-lite)
