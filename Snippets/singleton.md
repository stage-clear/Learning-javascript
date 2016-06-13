# Singleton

> 同じコンストラクタを使って `new` でオブジェクトを作るとき、シングルトンの実装でやることは、
> まったく同じオブジェクトを指す新しいポインタを取得することだけです。

__静的プロパティにインスタンスをキャッシュする__

```js
function Universe() {
  // 既存のインスタンスがあるか?
  if (typeof Universe.instance === 'object') {
    return Universe.instance;
  }

  this.start_time = 0;
  this.bang = 'big';

  // cache
  Universe.instance = this;

  // return this
}

// test
var uni1 = new Universe();
var uni2 = new Universe();

uni1 === uni2 // true
```

__クロージャにインスタンスをキャッシュする__

```js
function Universe() {
  var instance = this;

  this.start_time = 0;
  this.bang = 'big';

  Universe = function() {
    return instance;
  };

  return this;
}

// test
var uni1 = new Universe();
var uni2 = new Universe();

uni1 === uni2 // true
```

クロージャを使った場合、`uni.constructor === Universe` は失敗します。   ちょっとした調整で、プロトタイプとコンストラクタのポインタを期待通りにすることができます。

```js
function Universe() {
  // chaced instance
  var instance = this;

  // rewrite the constructor
  Universe = function() {
    return instance;
  };

  // extend prototype
  Universe.prototype = this;

  // instance
  instance = new Universe();

  // reset the pointer of constructor
  instance.constructor = Universe;

  instance.start_time = 0;
  instance.bang = 'big';

  return instance;
}
```

もうひとつの解決方法として、コンストラクタとプロトタイプを即時関数で包むやり方もあります。

```js
var Universe;

(function() {
  var instance;

  Universe = function Universe() {
    if (instance) {
      return instance;
    }

    instance = this;

    this.start_time = 0;
    this.bang = 'big';
  }
})();
```
