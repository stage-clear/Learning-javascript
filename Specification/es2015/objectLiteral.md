オブジェクトリテラル
====================

1. プロパティ省略記法
1. コンピューテッドプロパティ
1. メソッド定義

__プロパティ省略記法__

プロパティのキーと値の変数名が等しい場合、省略記法を使える

```javascript
var foo = 0;
var bar = 1;

// ES6)
var obj = {foo, bar};
// -> {"foo":0,"bar":1}
```

__コンピューテッドプロパティ__

変数名をブラケットで囲むことで、オブジェクトリテラルのキーの指定できる。

```javascript
var key = 'foo';

// ES6)
var obj = {
  [key]: 0,
  [key + '_bar']: 1
};
// -> {"foo":1,"foo_bar":0}
```

__メソッド定義__

オブジェクトのメソッドを funtion を使わずに短く定義できる

```javascript 
var counter = {
  count: 0,
  increment() {
    this.count++;
  }
};
// * ここでアロー関数を使うとメソッド内の this が counter オブジェクトではなくなってしまうことに注意。
```
