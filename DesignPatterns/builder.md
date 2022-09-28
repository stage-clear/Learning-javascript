# ビルダー

## JavaScript Design Pattern
```js
function Shop () {
  this.construct = function (builder) {
    builder.step1();
    builder.step2();
    return builder.get();
  }
}

function CarBuilder () {
  this.car = null;
  
  this.step1 = function () {
    this.car = new Car();
  };
  
  this.step2 = function () {
    this.car.addParts();
  };
  
  this.get = function () {
    return this.car;
  }
}

function TruckBuilder () {
  this.truck = null;
  
  this.step1 = function () {
    this.truck = new Truck();
  };
  
  this.step2 = function () {
    this.truck.addParts();
  };
  
  this.get = function () {
    return this.truck;
  };
}

function Car () {
  this.doors = 0;
  
  this.addParts = function () {
    this.door = 4;
  };
  
  this.say = function () {
    console.log('I am a ' + this.doors + '-door truck');
  };
}

function run () {
  var shop = new Shop();
  var carBuilder = new CarBuilder();
  var truckBuilder = new TruckBuilder();
  var car = shop.construct(carBuilder);
  var truck = shop.construct(truckBuilder);
  
  car.say();
  truck.say();
```

## Design Patterns Game

```js
class Request {
  constructor () {
    this.url = ''
    this.method = ''
    this.payload = {}
  }
}

class Request Pattern {
  constructor () {
    this.request = new Request()
  }
  
  forUrl (url) {
    this.request.url = url
    return this
  }
  
  useMethod (method) {
    this.request.method = method
    return this
  }
  
  payload (payload) {
    this.request.payload = payload
    return this
  }
  
  build () {
    return this.request
  }
}

export default RequestPattern
```

```
function Request () {
  this.url = '';
  this.method = '';
  this.payload = '';
}

function RequestPattern () {
  this.request = new Request();
  
  this.forUrl = function (url) {
    this.url = url;
    return this;
  };
  
  this.useMethod = function (method) {
    this.method = method;
    return this;
  };
  
  this.payload = function (payload) {
    this.payload = payload
    return this;
  };
  
  this.build = function () {
    return this.request;
  };
}

module.exports = RequestPattern;
```
