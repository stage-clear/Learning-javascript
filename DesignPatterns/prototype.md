# Prototype
プロトタイプパターンとは既存オブジェクトのコピーであるテンプレートをもとにオブジェクト生成を行うこと

## JavaScript Design Patten
```js
var beget = (function () {
  function F() {}
  
  return function (proto) {
    F.prototype = proto;
    return new F();
  }  ;
})();
```

## [dofactory](https://www.dofactory.com/javascript/design-patterns/prototype)
```js
function CustomPrototype (proto) {
  this.proto = proto
  
  this.clone = function () {
    var customer = new Customer();
    
    customer.first = proto.first;
    customer.last = proto.last;
    customer.status = proto.status;
    
    return customer;
  };
}

function Customer (first, last, status) {
  this.first = first;
  this.last = last;
  this.status = status;
  
  this.say = function () {
    console.log('name: ' + this.first + ' ' + this.last + ', status: ' + this.status);
  };
}

function run () {
  var proto = new Customer('n/a', 'n/a', 'pending');
  var prototype = new CustomerPrototype(proto);
  
  var customer = prototype.clone();
  customer.say();
}
```

## [Design Patterns Game](https://designpatternsgame.com/patterns/prototype)

```js
class Sheep {
  constructor (name, weight) {
    this.name = name
    this.weight = weight
  }
  
  clone () {
    return new Sheep(this.name, this.weight)
  }
}

export default Sheep
```

```js
function Sheep(name, weight) {
  this.name = name;
  this.weight = weight;
}

Sheep.prototype.clone = function () {
  return new Sheep(this.name, this.weight);
};

module.exports = Sheep;
```
