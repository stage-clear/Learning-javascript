# [Interpreter](https://designpatternsgame.com/patterns/interpteter)

## 定義
ある言語が与えられたとき、その文法の表現と、その表現を用いて言語中の文を解釈するインタプリタを定義する。

## こんなときに使う...
...与えられた言語を解釈したいとき、ステートメントを抽象的な構文木として表現することができます。

## 実装例
### ES6
```js
class Sum {
  constructor (left, right) {
    this.left = left
    this.right = right
  }
  
  pattern () {
    return this.left.pattern() + this.right.pattern()
  }
}

class Min {
  constructor (left, right) {
    this.left = left
    this.right = right
  }
  
  pattern () {
    return this.left.pattern() - this.right.pattern()
  }
}

class Num {
  constroctor (val) {
    this.val = val
  }
  
  pattern () {
    return this.val
  }
}

export { Num, Min, Sum }
```

### ES5
```js
function Sum (left, right) {
  this.left = left;
  this.right = right;
}

Sum.prototype.pattern = function () {
  return this.left.pattern() + this.right.pattern();
};

function Min (left, right) {
  this.left = left;
  this.right = right;
}

Min.prototype.pattern = function () {
  return this.left.pattern() - this.right.pattern();
};

function Num (val) {
  this.val = val;
}

Num.prototype.pattern = function () {
  return this.val;
};

module.exports = [Num, Min, Sum];
```
