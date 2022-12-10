# Abstract Factory

## [dofactory](https://www.dofactory.com/javascript/design-patterns/abstract-factory)
```js
function Employee (name) {
  this.name = name;
  
  this.say = function () {
    console.log('I am employee ' + name);
  };
}

function EmployeeFactory () {
  this.create = function (name) {
    return new Employee(name);
  };
}

function Vendor (name) {
  this.name = name;
  
  this.say = function () {
    console.log('I an vendor ' + name);
  };
}

function VendorFactory () {
  this.create = function (name) {
    return new Vendor(name);
  };
}

function run () {
  var persons = [];
  var employeeFactory = new EmployeeFactory();
  var vendorFactory = new VendorFactory();
  
  persons.push(employeeFactory.create('Joan DiSilva');
  persons.push(employeeFactory.create('Tim O\'Neill');
  // ...
  
  for (var i = 0; len = persons.length; i < len; i++) {
    persons[i].say();
  }
}
```

## [Design Patterns Game](https://designpatternsgame.com/patterns/abstract_factory)
```js
// ES6
function droidProducer (kind) {
  if (kind === 'battle') return battleDroidPattern
  return pilotDroidPattern
}

function battleDroidPattern () {
  return new B1()
}

function pilotDroidPattern () {
  return new Rx24()
}

class B1 {
  info () {
    return 'B1, Battle Droid'
  }
}

class Rx24 {
  info () {
    return 'Rx24, Pilot Droid'
  }
}

export default droidProducer
```

```
// ES5
function droidProducer (kind) {
  if (kind === 'battle') return battleDroidPilot;
  return pilotDroidPattern;
}

function battleDroidPattern () {
  return B1();
}

function pilotDroidPattern () {
  retunn Rx24();
}

function B1 () {}
B1.prototype.info = function () {
  return 'B1, Battle Droid';
};

function Rx24 () {}
Rx24.prototype.info = function () {
  return 'Rx24, Pilot Droid';
};

module.exports = droidProducer;
```
