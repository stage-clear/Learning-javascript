# Decorator

```js
function vehicle(vehicleType) {
  this.vehicleType = vehicleType || 'car';
  this.model = 'default';
  this.license = '0000-000';
}

// デコレートしない vehicle の確認
let testInstance = new vehicle('car');
console.log(testInstance);

// デコレートする vehicle を用意する 
let truck = new vehicle('truck');
// vehcle をデコレートする新機能
truck.setModel = function(modelName) {
  this.model = modelName;
};
truck.setColor = function(color) {
  this.color = color;
};

truck.setModel('CAT');
truck.setColor('blue');
console.log(truck);

// 元の vehicle は変更されない
let secondInstance = new vehicle('car');
console.log(secondInstance);
```

```js
// Implementation: Concrete class
function MacBook() {
  this.cost = function() { return 997; }
  this.screenSize = function() { return 11.6; }
}

// Implementation: Decorators class
// Decorator 1
function Memory(macbook) {
  let v = macbook.cost();
  macbook.cost = function() {
    return v + 75;
  };
}

// Decorator 2
function Engraving(macbook) {
  let v = macbook.cost();
  macbook.cost = function() {
    return v + 200;
  };
}

// Decorator 3
function Insurance(macbook) {
  let v = macbook.cost();
  macbook.cost = function() {
    return v + 250;
  };
}

// Usage:
let mb = new MacBook();
Memory(mb);
Engraving(mb);
Insurance(mb);

// 
console.log(mb.cost());
console.log(mb.screenSize());
```
