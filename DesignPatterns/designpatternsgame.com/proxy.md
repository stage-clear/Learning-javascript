# [Proxy](https://designpatternsgame.com/patterns/proxy)
## 実装
他のオブジェクトのサロゲートまたはプレースホルダーを提供し、そのオブジェクトへのアクセスを制御する。

## 実装例

### ES6
```js
class Car {
  drive () {
    return 'driving'
  }
}

class CarPattern {
  constructor (driver) {
    this.driver = driver
  }
 
  drive () {
    return this.driver.age < 18 ? 'too young to drive' : new Car().drive()
  }
}

class Driver {
  constructor (age) {
    this.age = age
  }
}

export { Car, CarPattern, Driver }
```

### ES5
```js
function Car () {
  this.drive = function () {
    return 'driving';
  };
}

function CarPattern (driver) {
  this.driver = driver;
  this.drive = function () {
    if (driver.age < 18) return 'too young to drive';
    
    return new Car().drive();
  };
}

function Driver (age) {
  this.age = age;
}

module.exports = [Car, CarPattern, Driver];
```





