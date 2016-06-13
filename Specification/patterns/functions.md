# 関数
## 関数宣言

```js
function name() {
  // do something
}
```

## 関数式（無名関数）

```js
var add = function(a, b) {
  return a + b;
};
```

## 名前付き関数式

```js
var add = function add(a, b) {
  return a + b;
}
```

## 即時関数（自己呼び出し関数、自己実行関数）

```js
(function() {
  // local scope
})();

(function() {
  // local scope
}());
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
var scareMe = function() {
  var index = 0;
  alert('Boo! ' + index);

  scareMe = function() {
    alert('Double Boo! ' + (++index));
  };
};
scareMe(); // Boo! 0
scareMe(); // Double Boo! 1
scareMe(); // Double Boo! 2
```

## さまざまな使い方

### コールバック関数

```js
var foo = function(callback) {
  console.log('foo!');
  callback();
};

foo(function() {
  console.log('bar! I am callback');
});
```

### 高階関数（合成関数）
### 部分適用

```js
var add = function (x) {
  return function(y) {
    return x + y;
  };
};

// 部分適用
var add5 = add.apply(null, 5); // function
```

### カリー化
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

### 代理関数
