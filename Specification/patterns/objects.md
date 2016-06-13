# オブジェクト
## リテラル

```js
var object = {
  method() { /* do something */ }
};
```

## コンストラクタ
```js
let A = function(name) {
  this.name = name;
};
// or
function A(name) {
  this.name = name;
}
```

__アロー関数は、コンストラクターを持たない__

```js
// [x] Bad: "Allow function" does not have "constructor".
let A () => {};
let a = new A();
// "Uncaught TypeError: A is not a constructor"
```

```js
// Prototype method
A.prototype.methodName = function() {
  // do something...
};

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

__関数式の中でコンストラクターを定義する__

```js
let Constructor = function() {
  function Constructor() {}
  // prototype method
  Constructor.prototype.method = function() {
    // do something...
  };
  
  return Constructor;
};

let obj = new Constructor();
```

### 即時関数

```js
let iffe = (function() {
  return {
    method() { /* do something */ }
  }
})();
```

### プライベートメンバ
#### コンストラクタとプライバシー

```js
function MyObj() {
  // Private member
  let name = 'my, oh my';
  this.getName = () => name;
}
```

#### リテラルとプライバシー

```js
var myObj = {};
(function() {
  // プライベートメンバ
  let name = 'my, oh my';
  myObj.getName = () => name;
})();
```

#### 即時関数とプライバシー

```js
let myObj = (function() {
  // Private member
  let name = 'my, oh my';

  return {
    getName() { return name; }
  }
})();
```

#### プロトタイプとプライバシー

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
