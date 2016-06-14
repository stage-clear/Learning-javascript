# Decorator

> デコレーターパターンは、他の多くのパターンとはかなり異なります。デコレーターパターンを使用すれば、
> 機能の組み合わせごとにサブクラスを作成することなく、クラスへの機能の追加または変更という問題が解決されます。

## 例1) Adobe Developer Connection での実装
- [JavaScriptデザインパターン – 第2部：アダプター、デコレーター、ファクトリ](http://www.adobe.com/jp/devnet/html5/articles/javascript-design-patterns-pt2-adapter-decorator-factory.html)

```js
var Car = function() {
  console.log('Assemble: build frame, add core parts');
};

// The decorators will also need to implement this interface
// (デコレータには、実装のインターフェイスを必要となります)
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
// これは抽象化クラスとなるのでクラス自体はインスタンス化しませんが
// 本格的なデコレータを作成するためにサブクラス化する必要があります
var CarDecorator = function(car) {
  this.car = car;
};

// CarDecorator implements the same interface as Car
// (`CarDecorator` の実装インターフェイスは `Car` と同じ)
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

```js
// usage
var car = new Car();

// give the car some power windows
car = new PowerWindowsDecorator(car);

// now some power locks and A/C
car = new PowerLocksDecorator(car);
car = new AcDecorator(car);

car.start();
car.drive();
console.log( car.getPrice() );
```


## Links
- [Learning JavaScript: decorator](https://github.com/stage-clear/Learning-javascript/blob/master/Books/978-4-87311-618-1/02/14.md)
