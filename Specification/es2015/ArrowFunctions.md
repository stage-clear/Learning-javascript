アロー関数
=========

1. 基本構文
1. 引数
1. 即時関数
1. 関数式
1. thisの補足
1. その他サンプル


基本構文
--------

```javascript
// ES6)
() => console.log('Hello, world');

// ES5)
function() {
  console.log('Hello, world');
}
```

引数
----
```javascript
// ES6) 引数なし
() => 7

// ES6) 1つの引数
n => n + 7;

// ES6) 復数の引数
// 復数の引数は丸括弧(())で囲む
(n, a) => n * a;
```


即時関数
--------

```javascript
// ES6)
() => {
  console.log('Hello, world');
}();

// ES5)
(function() {
  console.log('Hello, world');
})();

// あるいは
(() => console.log('Hello, world'))();
```

関数式
------

```javascript
// ES6)
var fun = () => {
  console.log('Hello, world');
};

// ES5)
var fun = function () {
  console.log('Hello, world');
};
```

this の補足
-----

```javascript
// ES6)
// アロー関数を定義したコンテキストでの this を補足する
function father() {
  this.age = 0;
  setTimeout(() => console.log(this.age++), 1000);
}

var f = new father();
```


その他サンプル
--------------

```javascript
// ES6) 1つの引数
[1,2,3,4].map(num => num * 2);
// ES5) 
[1,2,3,4].map(function(num) { return num * 2; });

// ES6) 復数の引数
//      復数の引数は丸括弧(())で囲む
[1,2,3,4].map((num, index) => num * 2 + index);

// ES6) 復数のステートメント + 1つの引数
//      - 復数のステートメントは, ブラケット({})で囲む
[1,2,3,4].map(num => {
  var multiplier = 2 + num;
  return num * multiplier;
});

// ES6) 復数のステートメント + 復数の引数
[1,2,3,4].map((num, index) => {
  var multiplier = 2 + index;
  return num * multiplier;
});

// ES6) thisの補足
function Timer() {
  this.seconds = 0;
  setInterval(() => this.seconds++, 1000);
}

var timer = new Timer();
setTimeout(() => console.log(timer.seconds), 3100);
```


* * * 

```js
// Arrow-bound: this
function foo() {
  setTimeout(function() {
    console.log('id:', this.id);
  }.bind(this), 100);
}
foo.call({id: 1});//=> 1


// Already Lexical: this
function foo() {
  return () => {
    return () => {
      return () => {
        console.log('id:', this.id);
      };
    };
  };
}
foo.call({id: 2})()()();//=> 2


// Not Just: this
function foo() {
  setTimeout(() => {
    console.log('args', Array.from(arguments));
  }, 100);
}
foo(2,4,6,8);//=> [2,4,6,8]


// Why this Matters?
function foo() {
  return () => {
    console.log('id:', this.id);
  };
}
let af = foo.call({id: 4});
setTimeout(af.bind({id: 5}), 100);//=> 4
```

- [Arrow this](http://blog.getify.com/arrow-this/)
