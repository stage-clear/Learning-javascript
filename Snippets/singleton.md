# Singleton

> 同じコンストラクタを使って `new` でオブジェクトを作るとき、シングルトンの実装でやることは、
> まったく同じオブジェクトを指す新しいポインタを取得することだけです。

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
