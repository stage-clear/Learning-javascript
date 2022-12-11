# [Iterator](https://designpatternsgame.com/patterns/iterator)

## 定義
集約オブジェクトの要素に順次アクセスする方法を、その基礎となる表現を公開せずに提供する。

## こんなときに使う
...オブジェクトが内部的にどのように表現されているかを知ることなく、 その内容にアクセスしたい場合。

## 実装例
### ES6
```js
class Pattern {
  constructor (el) {
    this.index = 0
    this.elements = el
  }
  
  next () {
    return this.elements[this.index++]
  }
  
  hasNext () {
    return this.index < this.elements.length
  }
}

export default Pattern
```

### ES5
```js
function Pattern (el) {
  this.index = 0;
  this.elements = el;
}

Pattern.prototype = {
  next: function () {
    return this.elements[this.index++];
  },
  hasNext: function () {
    return this.index < this.elements.length;
  }
};

module.exports = Pattern;
```
