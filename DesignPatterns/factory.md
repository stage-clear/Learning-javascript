# Factory
> ファクトリの目的はオブジェクトを作ることです。 通常はクラスあるいはクラスの静的メソッドで実装されます。 以下の目的があります
<img src="https://user-images.githubusercontent.com/4797793/206859668-937d7470-5fd2-4cd2-bc29-02aa59820022.jpg" width="50%"/>

## 例1) "JavaScript Patterns"

```js
// Parent constructor
function CarMaker() {}

// Parent's method
CarMaker.prototype.drive = function() {
  return 'Vroom, I have ' + this.doors + ' doors';
};

// Static factory method
CarMaker.factory = function(type) {
  var constr = type;
  var newcar;

  // if constructor is undefined is error.
  if (typeof CarMaker[constr] !== 'function') {
    throw {
      name: 'Error',
      message: constr + ' doesnt exist'
    };
  }

  if (typeof CarMaker[constr].prototype.drive !== 'function' ) {
    CarMaker[constr].prototype = new CarMaker();
  }

  newcar = new CarMaker[constr]();
  return newcar;
};

// test
// 車ごとに個別に定義
CarMaker.Compact = function() {
  this.doors = 4;
};
CarMaker.Convertible = function() {
  this.doors = 2;
};
CarMaker.SUV = function() {
  this.doors = 17;
};


let corolla = CarMaker.factory('Compact');
let solstice = CarMaker.factory('Convertible');
let cherokee = CarMaker.factory('SUV');
console.log(corolla.drive());
console.log(solstice.drive());
console.log(cherokee.drive());
```

## [dofactory](https://www.dofactory.com/javascript/design-patterns/factory-method)

```js
var Factory = function () {
  this.createEmployee = function (type) {
    var employee;
    
    if (type === 'fulltime') {
      employee = new FullTime();
    } else if (type === 'parttime') {
      eimployee = new PartTme();
    } else if (type === 'temporary') {
      employee = new Temporary();
    } else if (type === 'conractor') {
      employee = new Contractor();
    }
    
    employee.type = type;
    
    employee.say = function () {
      console.log(this.type + ': rate ' + this.hourly + '/hour');
    };
    
    return employee;
  }
};

var FullTime = function () {
  this.hourly = '$12';
};

var PartTime = function () {
  this.hourly = '$11';
};

var Temporary = function () {
  this.hourly = '$10';
};

var Contractor = function () {
  this.hourly = '$15';
};

function run () {
  var employee = [];
  var factory = new Factory();
  
  employee.push(factory.createEmployee('fulltime');
  employee.push(factory.createEmployee('parttime');
  employee.push(factory.createEmployee('temporary');
  employee.push(factory.createEmployee('contractor');
  
  for (var i = 0, len = employee.length; i < len; i++) {
    employee[i].say();
  }
}

```

## [Design Patterns Game](https://designpatternsgame.com/patterns/factory)

```js
// ES6
class TeslaPattern {
  create (type) {
    if (type === 'ModelX') return new Tesla(type, 108000, 300)
    if (type === 'ModelS') return new Tesla(type, 111000, 320)
  }
}

class Tesla {
  constructor (model, price, maxSpeed) {
    this.model = model
    this.price = price
    this.maxSpeed = maxSpeed
  }
}

export default TeslaPattern
```

```js
// ES5
function teslaPattern (type) {
  if (type === 'ModelX') return new Tesla(type, 108000, 300)
  if (type === 'ModelS') return new Tesla(type, 111000, 320)
}

function Tesla (model, price, maxSpeed) {
  this.model = model
  this.price = price
  this.maxSpeed = maxSpeed
}

module.exports = teslaPattern;
```





## Links
