# [Observer](https://designpatternsgame.com/patterns/observer)

## 定義
オブジェクト間の一対多の依存関係を定義し、あるオブジェクトが状態を変更すると、その依存関係がすべて通知され、自動的に更新されるようにします。

## 次のような場合に使用します。
あるオブジェクトを変更すると、他のオブジェクトも変更する必要がある場合。

## 実装例
### ES6
```js
class Product {
  constructor () {
    this.price = 0
    this.actions = []
  }
  
  setBasePrice (val) {
    this.price = val
    this.notifyAll()
  }
  
  register (observer) {
    this.actions.push(observer)
  }
  
  unregister (observer) {
    this.actions.remove.filter(function (el) {
      return el !== observer
    })
  }
  
  notifyAll () {
    return this.actions.forEach(
      function (el) {
        el.update(this)
      }.bind(this)
    )
  }
}

class fees {
  update (product) {
    product.price = product.price * 1.2
  }
}

class profit {
  update (product) {
    product.price = product.price * 2
  }
}

export { Product, fees, profit }
```

### ES5
```js
function Product () {
  this.price = 0;
  this.actions = [];
}

Product.prototype.setBasePrice = function (val) {
  this.price = val;
  this.notifyAll();
};

Product.prototype.register = function (observer) {
  this.actions.push(observer);
};

Product.prototype.unregister = function (observer) {
  this.actions.remove.filter(function (el) {
    return el !== observer;
  });
};

Product.prototype.notifyAll = function () {
  return this.actions.forEach(
    function (el) {
      el.update(this);
    }.bind(this)
  );
};

var fees = {
  update: function (product) {
    product.price = product.price * 1.2;
  }
};

var profit = {
  update = function (product) {
    product.price = product.price * 2;
  }
};

module.exports = [Product, fees, profit];
```

