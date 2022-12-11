# [State](https://designpatternsgame.com/patterns/state)

## 定義
オブジェクトの内部状態が変化したときに、その振る舞いを変更できるようにする。オブジェクトはそのクラスを変更するように見える。

## 使用目的...
...オブジェクトの動作はその状態に依存し、実行時の動作はその状態に依存して変化する。

## 実装例
### ES6
```js
class OrderStatus {
  constructor (name, nextStatus) {
    this.name = name
    this.nextStatus = nextStatus
  }
  
  next () {
    return new this.nextStatus()
  }
}

class WaitingForPayment extends OrderStatus {
  constructor () {
    super('waitingForPayment', Shipping)
  }
}

class Shipping extends OrderStatus {
  constructor () {
    super('shipping', Deliverd)
  }
}

class Deliverd extends OrderStatus {
  constructor (){
    super('deliverd', Deliverd)
  }
}

class Order {
  constructor () {
    this.pattern = new WaitingForPayment()
  }
  
  nextPattern () {
    this.pattern = this.pattern.next()
  }
}

export default Order
```

### ES5
```js
function Order () {
  this.pattern = new WaitingForPayment();
  
  this.nextPattern = function () {
    this.pattern = this.pattern.next();
  };
}

function WaitingForPayment () {
  this.name = 'waitingForPayment';
  this.next = function () {
    return new Shipping();
  };
}

function Shipping () {
  this.name = 'shipping';
  this.next = function () {
    return new Delivered();
  };
}

function Delivered () {
  this.name = 'delivered';
  this.next = function () {
    return this;
  };
}

module.exports = Order;
```
