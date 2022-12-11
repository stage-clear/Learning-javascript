# [Strategy](https://designpatternsgame.com/patterns/strategy)
## 定義
アルゴリズムのファミリーを定義し、それぞれをカプセル化し、交換可能にする。ストラテジーにより、アルゴリズムはそれを使用するクライアントから独立して変化する。

## こんなときに使います。
...動作が異なる多くのクラスがあります。ストラテジーを使うと、多くのビヘイビアーから1つを選んでクラスを設定することができます。

## 実装例
### ES6
```js
class ShoppingCard {
  constructor (discount) {
    this.discount = discount
    this.amount = 0
  }
  
  checkout () {
    return this.discount(this.amount)
  }
  
  setAmount (amount) {
    this.amount = amount
  }
}

function guestPattern (amount) {
  return amount
}

function regularPattern (amount) {
  return amount * 0.9
}

function premiumPattern (amount) {
  return amount * 0.8
}

export { ShoppingCart, guestPattern, regularPattern, premiumPattern }
```

### ES5
```js
function ShoppingCart (discount) {
  this.discount = discount;
  this.amount = 0;
}

ShoppingCart.prototype.setAmount = function (amount) {
  this.amount = amount;
};

ShoppingCart.prototype.checkout = function () {
  return this.discount(this.amount);
};

function guestPattern (amount) {
  return amount;
}

function regularPattern (amount) {
  return amount * 0.9;
}

function premiumPattern (amount) {
  return amount * 0.8;
}

module.exports [ShoppingCart, guestPattern, regularPattern, premiumPattern];
```

