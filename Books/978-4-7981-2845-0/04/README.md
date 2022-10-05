# 4 Overriding Function Behavior
## 4.1 Memoization

```js
Function.prototype.memoized = function (key) {
  this._values = this._values || {};
  return this._values[key] !== undefined ?
    this._values[key] :
    this._values[key] = this.apply(this, arguments);
};

function isPrime(num) {
  var prime = num != 1;
  for (var i = 2; i < num; i++) {
    if (num % i == 0) {
      prime = false;
      break;
    }
  }
  return prime;
}
```

```js
Function.prototype.memoize = function () {
  var fn = this;
  return function () {
    return fn.memoized.apply(fn, arguments);
  };
};

var isPrime = (function(num) {
  var prime = num != 1;
  for (var i = 2; i < num; i++) {
    if (num % i == 0) {
      prime = false;
      break;
    }
  }
  return prime;
}).memoize();
```

## 4.2 Function Wrapping

```js
function wrap (object, method, wrapper) {
  var fn = object[method];
  return object[method] = function () {
    return wrapper.apply(this, [fn.bind(this].concat(
      Array.prototype.slice.call(arguments)));
  };
}

if (Prototype.Browser.Opera) {
  wrap(Element.Methods, 'readAttribute', function (original, elem, attr) {
    return attr === 'title' ?
      elem.title :
      original(elem, attr);
    });
  }
  ```
  
