# [Builder](https://designpatternsgame.com/patterns/builder)

## ES6
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

## ES5
```js
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
