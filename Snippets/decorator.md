# Decorator

> デコレーターパターンは、他の多くのパターンとはかなり異なります。デコレーターパターンを使用すれば、
> 機能の組み合わせごとにサブクラスを作成することなく、クラスへの機能の追加または変更という問題が解決されます。

## 例1) Adobe Developer Connection での実装

```js
var Car = function() {
  console.log('Assemble: build frame, add core parts');
};

// The decorators will also need to implement this interface
Car.prototype = {
  start: function() {
    console.log('The engine starts with roar!');
  },
  drive: function() {
    console.log('Away we go!');
  },
  getPrice: function() {
    return 11000.00;
  }
};
```

```js
var CarDecorator = function(car) {
  this.car = car;
};

// CarDecorator implements the same interface as Car
CarDecorator.prototype = {
  start: function() {
    this.car.start();
  },
  drive: function() {
    this.car.drive();
  },
  getPrice: function() {
    return this.car.getPrice();
  }
};
```

```js
var PowerLockDecorator = function(car) {
  // Call Parent Constructor
  CarDecorator.call(this, car);
  console.log('Assemble: add power locks');
};
PowerLocksDecorator.prototype = new CarDecorator();
PowerLocksDecorator.prototype.drive = function() {
  // You can either do this
  this.car.drive();
  // or you can call the parent's drive function:
  // CarDecorator.prototype.drive.call(this);
  console.log('The doors automatically lock');
};

var PowerWindowsDecorator = function(car) {
  CarDecorator.call(this, car);
  console.log('Assemble: add poser windows');
};
PowerWindowsDecorator.prototype = new CarDecorator();
PowerWindowsDecorator.prototype.getPrice = function() {
  return this.car.getPrice() + 200;
};

var AcDecorator = function(car) {
  CarDecorator.call(this, car);
  console.log('Assemble: add A/C unit');
};
AcDecorator.prototype = new CarDecorator();
AcDecorator.prototype.start = function() {
  this.car.start();
  console.log('The cool air starts blowing');
};
AcDecorator.prototype.getPrice = function() {
  return this.car.getPrice() + 600;
};
```
