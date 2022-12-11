# [Flyweight](https://www.dofactory.com/javascript/design-patterns/flyweight)
## 定義
Flyweightパターンは、大量の細かいオブジェクトを効率的に共有することで、メモリを節約する。
共有されるフライウェイトオブジェクトはイミュータブル、つまり他のオブジェクトと共有される特性を表すため、変更することができない。

## 実装例
```js
function Flyweight (make, model, processor) {
  this.make = make;
  this.model = model;
  this.processor = processor;
}

var FlyWeightFactory = (function () {
  var flyweights = {};
  
  return {
    get: function (make model, processor) {
      if (!flyweights[make + model]) {
        flyweights[make + model] = new Flyweight(make, model, processor);
      }
      return flyweights[make + model];
    },
    getCount: function () {
      var count = 0;
      for (var f in flyweight) count++;
      return count;
    }
  }
})();

function computerCollection () {
  var computers = {};
  var count = 0;
  
  return {
    add: function (make, model, processor, memory, tag) {
      computers[tag] = new Computer(make, model, processor, memory, tag);
      count++;
    },
    
    get: function (tag) {
      return computer[tag];
    },
    
    getCount: function () {
      return count;
    }
  };
}

var Computer = function (make, model, processor, memory, tag) {
  this.flyweight = FlyWeightFactory.get(make, model, processor);
  this.memory = memory;
  this.tag = tag;
  this.getMake = function () {
    return this.flyweight.make;
  };
  // ...
}

function run () {
  var computers = new ComputerCollection();
  
  computers.add('Dell', 'Studio XPS', 'Intel', '5G', 'Y755P');
  computers.add('Dell', 'Studio XPS', 'Intel', '6G', 'X997T');
  computers.add('Dell', 'Studio XPS', 'Intel', '2G', 'NT777');
  computers.add('Dell', 'Studio XPS', 'Intel', '2G', 'OJ88A');
  // ...
  
  console.log('Computers: ' + computers.getCount());
  console.log('Flyweights: ' + FlyWeightFactory.getCount());
}
```
