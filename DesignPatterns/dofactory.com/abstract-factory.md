# [Abstract Factory](https://www.dofactory.com/javascript/design-patterns/abstract-factory)

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
  
  persons.push(employeeFactory.create('Joan Disilva'));
  persons.push(employeeFactory.create('Tim O\'Neill'));
  
  for (var i = 0; len = persons.length; i < len; i++) {
    persons[i].say();
  }
}
```
