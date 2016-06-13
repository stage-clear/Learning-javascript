# オブジェクト
## リテラル

```js
let object = {
  name: 'John',
  method() { /* do something */ }
};
```
__即時関数でリテラルオブジェクトを返す__

```js
let a = (function() {
  // local scope
  // do something

  return {
    name: 'John',
    method() { /* do something */ }
  }
})();
```

## コンストラクタ
```js
// a. 関数式
const A = function(name) {
  this.name = name;
};

// b. 関数宣言
function A(name) {
  this.name = name;
}

// c. 即時関数の中で関数宣言
const A = (function() {
  function A(name) {
    this.name = name;
  }
  A.prototype.method = function() {};
  return A;
})();

let a = new A('John');
```

__注意) アロー関数は、コンストラクターを持たない__

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
let myObj = {};
(function() {
  // "name" is private.
  let name = 'my, oh my';

  myObj.getName = () => name;
})();
```

### 即時関数とプライバシー
```js
let myObj = (function() {
  // "name" is private.
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
  // "name" is private.
  let name = 'my, oh my';

  return {
    getName() {　return name; }
  }
})();
```

## その他
- __特権メソッド__ - プライベートメンバにアクセスできるパブリックメソッド
