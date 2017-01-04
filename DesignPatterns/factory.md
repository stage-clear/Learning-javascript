# Factory
> ファクトリの目的はオブジェクトを作ることです。 通常はクラスあるいはクラスの静的メソッドで実装されます。 以下の目的があります

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


## Links
