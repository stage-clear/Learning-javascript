# Chain of responsibility

## [dofactory](https://www.dofactory.com/javascript/design-patterns/chain-of-responsibility)
```js
var Request = function (amount) {
  this.amount = amount;
  console.log('Requested: $' + amount + '\n');
}

Request.prototype = {
  get: function (bill) {
    var count = Math.floor(this.amount / bill);
    this.amount -= count * bill;
    console.log('Dispense ' + count + ' $' + bill + ' bills');
    return this;
  }
}
```

```js
function run () {
  var request = new Request(378);
  
  request.get(100).get(50).get(10).get(5).get(1);
}
```

## [Design Patterns Game](https://designpatternsgame.com/patterns/chain_of_responsibility)

```js
class ShoppingCard {
  cunstructor () {
    this.products = []
  }
  
  addProduct (p) {
    this.products.push(p)
  }
}

class Discount {
  calc (products) {
    let ndiscount = new NumberDiscount()
    let pdiscount = new PriceDiscount()
    let none = new NoneDiscount()
    
    ndiscount.setNext(pdiscount)
    pdiscount.setNext(none)
    
    return ndiscount.exec(products)
  }
 }
 
 class NumberDiscount {
  constructor () {
    this.next = null
  }
  
  setNext (fn) {
    this.next = fn
  }
  
  exec (products) {
    let result = 0
    if ( products.length > 3) result = 0.05
    return result + this.next.exec(products)
  }
}

class PriceDiscount {
  constructor () {
    this.next = null
  }
  
  setNext (fn) {
    this.next = fn
  }
  
  exec (products) {
    let result = 0
    let total = products.reduce((a, b) => a + b)
    
    if (total >= 500) result = 0.1
    
    return result + this.next.exec(products)
  }
}

class NoneDiscount {
  exec () {
    return 0
  }
}

export { ShoppingCart, Discount }
```

```js
function ShoppingCart () {
  this.products = [];
  
  this.addProducts = function (p) {
    this.products.push(p);
  };
}

function Discount () {
  this.calc = function (products) {
    var ndiscount = new NumberDiscount();
    var pdiscount = new PriceDiscount();
    var none = new NoneDiscount();
    
    ndiscount.setNext(pdiscount);
    pdiscount.setNext(none);
    
    return ndiscount.exec(products);
  };
}

function NumberDiscount () {
  this.next = null;
  this.setNext = function (fn) {
    this.next = fn;
  };
  
  this.exec = function (products) {
    var result = 0;
    if (products.length > 3) result = 0.05;
    
    return result + this.next.exec(products);
  };
}

function priceDiscount () {
  this.next = null;
  this.setNext = function (fn) {
    this.next = fn;
  };
  this.exec = function (products) {
    var result = 0;
    var total = products.reduce(function (a, b) {
      return a + b;
    });
    
    if (total >= 500) result = 0.1;
    
    return result + this.next.exec(products);
  };
}

function NoneDiscount () {
  this.exec = function () {
    return 0;
  };
}

module.exports = [ShoppingCart, Discount];
```
