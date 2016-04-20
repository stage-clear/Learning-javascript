jschardet
=========

- 文字コードの自動判定


__インストール__  

```bash
$ npm install jschardet
```

使い方
------

__例) 文字コードを調べる__

```javascript
let fs = require('fs');
let jschardet = require('jschardet');

// 文字コードがわからないファイルを読み込む
let buf = fs.readFileSync('unknown.txt');

// 文字コードを判定する
let det = jschardet.detect(buf);
console.log(det);
// { encoding: 'EUC-JP', confidence: 0.99 }

```


リンク
-------

- [npm/jschardet](https://www.npmjs.com/package/jschardet)
