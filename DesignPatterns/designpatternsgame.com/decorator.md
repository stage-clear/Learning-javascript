# [Decorator](https://designpatternsgame.com/patterns/decorator)
## 定義
オブジェクトに動的に追加責任を持たせる。デコレータは、機能を拡張するためにサブクラス化に代わる柔軟な手段を提供します。

## こんなときに使う
...他のオブジェクトに影響を与えることなく、実行時にオブジェクトに拡張機能を追加したい場合。

## 実装例
### ES6
```js
class Pasta {
  constructor () {
    this.price = 0
  }
  
  getPrice () {
    return this.price
  }
}

class Penne extends Pasta {
  constructor () {
    super()
    this.price = 8
  }
}

class PastaPattern extends Pasta {
  constructor (pasta) {
    super()
    this.pasta = pasta
  }
  
  getPrice () {
    return this.pasta.getPrice()
  }
}

class SaucePattern extends PastaPattern {
  constructor (pasta) {
    super(pasta)
  }
  
  getPrice () {
    return super.getPrice() + 5
  }
}

class CheesePattern extends PastaPattern {
  constructor (pasta) {
    super(pasta)
  }
  
  getPrice () {
    return super.getPrice() + 3
  }
}

export { Penne, SaucePattern, CheesePattern }
```

### ES5

```js
function Pasta () {
  this.price = 0;
}

Pasta.prototype.getPrice = function () {
  return this.price;
};

function Penne () {
  this.price = 8;
}

Penne.prototype = Object.create(Pasta.prototype);

function SaucePattern (pasta) {
  return this.pasta.getPrice() + 5;
}

SaucePattern.prototype.getPrice = function () {
  return this.pasta.getPrice() + 5;
};

function CheesePattern (pasta) {
  this.pasta = pasta;
}

CheesePattern.prototype.getPrice = function () {
  return this.pasta.getPrice() + 3;
};

module.exports = [Panne, SaucePattern, CheesePattern];
```
