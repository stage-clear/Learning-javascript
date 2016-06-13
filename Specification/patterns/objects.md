# オブジェクト
## リテラル

```js
var object = {
  method() { /* do something */ }
};
```

## コンストラクタ
```js
// 関数式
const A = function(name) {
  this.name = name;
};

// 関数宣言
function A(name) {
  this.name = name;
}

// 即時関数の中で関数宣言
const A = (function() {
  function A(name) {
    this.name = name;
  }
  A.prototype.method = function() {};
  return A;
})();

let a = new A('John');
```

__アロー関数は、コンストラクターを持たない__

```js
// [x] Bad: "Allow function" does not have "constructor".
const A () => {};
let a = new A();
// "Uncaught TypeError: A is not a constructor"
```

### `prototype`

__`prototype` にメソッドを追記する__

```js
// Prototype method
A.prototype.methodA = function() {
  // do something...
};
A.prototype.methodB = function() {
  // do something
}
```

__プロトタイプを使って継承する__

```js
let a = new A();
console.log('`a` is instance of `A`" = ' + (a instanceof A)); // -> true

// A を継承して B を作る
function B() {}
B.prototype = new A();
let b = new B();
console.log('`b` is instance of `B` = ' + (b instanceof B)); // -> true

A.prototype = {};
let d = new A();
console.log('> `A.prototype` is emptied.');
console.log('`a` is instance of `C` = ' + (a instanceof A)); // -> false
console.log('`d` is instance of `C` = ' + (d instanceof A)); // -> true
```

## 即時関数
- [Immediately-invoked function expression](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression)

```js
let a = (function iffe() {
  /* do something */
  
  // returns to "a"
  return {
    method() { /* do something */ }
  }
})();
```

__その他の即時関数の書き方__

```js
!function () { /* … */ }();
~function () { /* … */ }();
-function () { /* … */ }();
+function () { /* … */ }();
```

## プライベートメンバ
### コンストラクタとプライバシー

```js
function MyObj() {
  // Private member
  let name = 'my, oh my';
  this.getName = () => name;
}
```

### リテラルとプライバシー

```js
var myObj = {};
(function() {
  // プライベートメンバ
  let name = 'my, oh my';
  myObj.getName = () => name;
})();
```

### 即時関数とプライバシー

```js
let myObj = (function() {
  // Private member
  let name = 'my, oh my';

  return {
    getName() { return name; }
  }
})();
```

### プロトタイプとプライバシー

```js
function MyObj() {}
MyObj.prototype = (function() {
  // プライベート
  let name = 'my, oh my';

  return {
    getName() {　return name; }
  }
})();
```

## その他
- __特権メソッド__ - プライベートメンバにアクセスできるパブリックメソッド
