iconv
======

- 文字コードの変換


__インストール__

```bash
$ npm install iconv
```

使い方
-----

__例) Shift_JISからUTF-8に変換する__  

```javascript
let Iconv = require('iconv').Iconv;
// Shift_JIS から utf-8 へ変換するオブジェクトを作成
let sjis_utf8 = new Iconv('SHIFT_JIS', 'utf-8');

let buf1 = fs.readFileSync('sjis.txt'); // 変換元のファイル
let buf2 = sjis_utf8.convert(buf1); // => 変換処理
let txt = buf2.toString('utf-8'); // => バッファから文字列に変換
console.log(txt);

// utf-8 で保存
fs.writeFileSync('utf8.txt', txt, 'utf-8');
```


リンク
-------

- [npm/iconv](https://www.npmjs.com/package/iconv)
