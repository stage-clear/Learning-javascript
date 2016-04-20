Nimble
=======

- 関数ライブラリ

__インストール__

```bash
$ npm install nimble
```

使い方
------

__nimble を使ったシリアルフロー制御__

```javascript
var nimble = require('nimble');

// Nimbleが順番に実行できるように関数の配列を提供する
nimble.series([
  function(callback) {
    setTimeout(function() {
      console.log('I execute first.');
      return callback();
    }, 1000);
  },
  function(callback) {
    setTimeout(function() {
      console.log('I execute next.');
      return callback();
    }, 500);
  },
  function(callback) {
    setTimeout(function() {
      console.log('I execute last.');
      return callback();
    }, 100);
  }
]);
```

リンク
------

- [npm/nimble](https://www.npmjs.com/package/nimble)
- [caolan/nimble](https://github.com/caolan/nimble)
