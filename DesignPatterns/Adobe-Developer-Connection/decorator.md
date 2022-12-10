# [JavaScript Design Patterns: Decorator](https://www.joezimjs.com/javascript/javascript-design-patterns-decorator/)

```js
var Car = function () {
  console.log('Assemble: build frame, add core parts');
};

Car.prototype = {
  start: function () {
    console.log('The engine starts with roar!');
  },
  drive: function () {
    console.log('Away we go!');
  },
  getPrice: function () {
    return 11000.00;
  }
};
```

```js
var CarDecorator = function (car) {
  this.car = car;
};

CarDecorator.prototype = {
  start: function () {
    this.car.start();
  },
  drive: function () {
    this.car.drive();
  },
  getPrice: function () {
    return this.car.getPrice();
  }
};
```

```js
var PowerLocksDecorator = function (car) {
  CarDecorator.call(this, car);
  console.log('Assemble: add power locks');
};
PowerLocksDecorator.prototype = new CarDecorator();
PowerLocksDecorator.prototype.drive = function () {
  this.car.drive();
  console.log('The doors automatically lock');
};
PowerLocksDecorator.prototype.getPrice = function () {
  return this.car.getPrice() + 100;
};

var PowerWindowDecorator = function () {
  CarDecorator.call(this, car);
  console.log('Assemble: add power windows');
};
PowerWindowDecorator.prototype = new CarDecorator();
PowerWindowDecorator.prototype.getPrice = function () {
  return this.car.getPrice() + 200;
};

var AcDecorator = function (car) {
  CarDecorator.call(this, car);
  console.log('Assemble: add A/C unit');
};
AcDecorator.prototype = new CarDecorator();
AcDecorator.prototype.start = function () {
  this.car.start();
  console.log('The cool air starts blowing.');
};
AcDecorator.prototype.getPrice = function () {
  return this.car.getPrice() + 600;
};
```

```js
var car = new Car();

car = new PowerWindowDecorator(car);

car = new PowerLocksDecorator(car);
car = new AcDecorator(car);

car.start();
car.drive();
```
