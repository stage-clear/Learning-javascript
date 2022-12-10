# [JavaScript Design Patterns: Factory](https://www.joezimjs.com/javascript/javascript-design-patterns-factory/)

```js
var CarFactory = {
  makeCar: function (features) {
    var car = new Car();
    
    if (features && features.length) {
      var i = 0;
      var l = features.length;
      
      for (; i < l; i++) {
        var feature = features[i];
        
        switch (feature) {
          case 'powerwindows':
            car = new PowerWindowsDecorator(car);
            break;
          case 'powerLocks':
            car = new PowerLocksDecorator(car);
            break;
          case 'ac':
            car = new AcDecorator(car);
            break;
        }
      }
    }
    
    return car;
  };
}

var myCar = CarFactory.makeCar(['powerwindows', 'powerlocks', 'ac']);
```

## 標準のファクトリ
```js
var CarShop = function () {};
CarShop.prototype = {
  sellCar: function (type, features) {
    var car = this.manufactureCar(type, features);

    getMoney();
    
    return car;
  },
  decorateCar: function (car, features) {
  
  },
  manufactureCar: function (type, features) {
    throw new Error('manufactureCar must be implemented bu a subclass');
  }
};
```

```js
var JoeCarShop = function () {};

JoeCarShop.prototype = new CarShop();
JoeCarShop.prototype.manufactureCar = function (type, features) {
  var car;
  
  switch (type) {
    case 'sedan':
      car = new JoeSedanCar();
      break;
    case ' hatchback':
      car = new JoeHatchbackCar();
      break;
    case 'coupe':
    default:
      car = new JoeCoupeCar();
  }
  return this.decorateCar(car, features);
};
```

```js
var ZimCarShop = function () {};
ZimCarShop.prototype = new CarShop();
ZimCarShop.prototype.manufactureCar = function (type, features) {
  var car;
  
  switch (type) {
    case 'sedan':
      car = new ZimSedanCar();
      break;
    case 'hatchback':
      car = new ZimHatchbackCar();
      break;
    case 'coupe':
    default:
      car = new ZimCoupeCar();
  }

  return this.decorateCar(car, features);
};
```
