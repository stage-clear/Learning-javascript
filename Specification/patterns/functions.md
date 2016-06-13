# 関数
## 関数宣言
```js
function name() {
  // do something
}
```

## 関数式
### 名前付き関数式
```js
let add = function add(a, b) {
  return a + b;
}
```

### 名前なし関数式
いわゆる無名関数

```js
let add = function(a, b) {
  return a + b;
};
```

## 関数を返す
```js
const setup = function() {
  let count = 0;
  console.log('[setup1]: ' + (count));

  return function() {
    console.log('[setup2]: ' + (++count));
  }
};
let next = setup(); //-> 0
next(); //-> 1
next(); //-> 2
```

## 即時関数
自己呼び出し関数、自己実行関数などとも呼ぶ

- [Immediately-invoked function expression](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression)

```js
(function() {
  // local scope
})();

(function() {
  // local scope
}());

!function () { /* … */ }();
~function () { /* … */ }();
-function () { /* … */ }();
+function () { /* … */ }();
```

### 即時オブジェクト初期化
```js
({
  maxwidth: 600,
  maxheight: 400,
  gimmeMax() {
    return this.maxwidth + 'x' + this.maxheight
  },
  init() {
    console.log(this.gimmeMax());
    // return this;
  }
}).init();
```

## 自己定義関数
- 初期化による準備作業があり、その準備作業の実行1回きりにする必要があるとき

```js
let step = function() {
  let index = 0;
  console.log('[One step]: ' + index);

  step = function() {
    console.log('[Two step]: ' + (++index));
  };
};
step(); //-> "[One step]: 0"
step(); //-> "[Two step]: 1"
step(); //-> "[Two step]: 2"
```

## 高階関数
### コールバック関数

```js
let foo = function(callback) {
  console.log('foo!');
  callback();
};

let bar = function() {
  console.log('bar I am callback.');
};

foo(bar);
```

### 部分適用
> 複数の引数を取る関数に対して、一部の引数に値を束縛した関数を返すこと。 
([出典](http://qiita.com/f81@github/items/e8bfab96b4be9e404840))

```js
let add = function (x) {
  return function(y) {
    return x + y;
  };
};

// 部分適用
let add5 = add(5); // return "function"
add5.apply(null, [10]); //-> 15
```

### カリー化
> 複数の引数を取る関数を、1つの引数を取る関数のチェーンに変換すること。
([出典](http://qiita.com/f81@github/items/e8bfab96b4be9e404840))

```js
// add() をカリー化
var add = function(x, y) {
  if (typeof y === 'undefined') { // 部分適用
    return function(y) {
      return x + y;
    }
  }

  return x + y;　// 完全適用
};
console.log(typeof add(4)); // function
console.log(add(4)(5)); // 9
```

```js
function curry(func) {
  return function(a) {
    return function(b)  {
      return func(a, b);
    }
  }
}

var add = curry(function(a, b) {
  return a + b;
});
var add10 = add(10);
var add10(1); // -> 11
```

- [カリー化 != 部分適用](http://kmizu.hatenablog.com/entry/20091216/1260969166)
- [カリー化と部分適用（JavaScriptとHaskell）](http://qiita.com/7shi/items/a0143daac77a205e7962)
- [部分適用された関数とカリー化された関数は何が違うのか？](http://qiita.com/t-mochizuki/items/4a5b1bd5c8dd7ccd6a92)


### 代理関数
```js
function wrap(fn, wrapper, context) {
  return (...args) => {
  	args = [fn.bind(context)].concat(args);
    return wrapper.apply(context, args);
  };
}

function a(x) {
  return x + 10;
}

// 代理関数関数 `wrap` で `a` をラッピングする
let b = wrap(a, (origin, value, done) => {
  value = origin(value) * 10;
  done(value);
})

b(100, (value) => {
  console.log(value);
});
```

### 合成関数

```js
function compose(a, b) {
  return function(x) {
    return b.call(null, a(x));
  }
}

// 架空の関数 `reverse` と `even` を合成
let f = compose(reverse, even);
f([9,5,3,2,6,3,4,1]) // [2, 6, 4]
```
