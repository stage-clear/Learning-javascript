# [Facade](https://designpatternsgame.com/patterns/facade)

## 定義
サブシステム内の一連のインタフェースに対して統一的なインタフェースを提供する。Facadeは、サブシステムを使いやすくするための上位インタフェースを定義する。

## こんなときに使う
複雑なサブシステムに簡単なインタフェースを提供したい場合。

## 実装例
### ES6
```js
class ShopPattern {
  constructor () {
    this.discount = new Discount()
    this.shipping = new Shipping()
    this.fees = new Fees()
  }
  
  calc (price) {
    price = this.discount.calc(price)
    price = this.fees.calc(price)
    price += this.shipping.calc()

    return price
  }
}

class Discount {
  calc (value) {
    return value * 0.9
  }
}

class Shipping {
  calc () {
    return 5
  }
}

class Fees {
  calc (value) {
    return value * 1.05
  }
}

export default ShopPattern
```

### ES5
```js
var shopPattern = {
  calc: function (price) {
    price = discount(price);
    price = fees(price);
    price += shipping();
    
    return price;
  }
};

function discount (value) {
  return value * 0.9;
}

function shipping () {
  return 5;
}

function fees (value) {
  return value * 1.05;
}

module.exports = shopPattern;
```
