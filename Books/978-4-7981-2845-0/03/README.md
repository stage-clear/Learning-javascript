# Closures
## 3. Partially Applying Functions

```js
String.prototype.csv = String.prototype.split.partial(/,\s*/);

var resuls = ('John, Resing, Boston').csv();
```

```js
Function.prototype.curry = function () {
  var fn = this, args = Array.prototype.slice.call(arguments);
  return function () {
    return fn.apply(this, args.concat(
      Array.prototype.slice.call(arguments)));
  };
};
```

```js
Function.prototype.partial = function () {
  var fn = this, args = Array.prototype.slice.call(arguments);
  return function () {
    var arg = 0;
    for (var i = 0; i < args.length; && arg < arguments.length; i++) {
      if (args[i] === undefined) {
        args[i] = arguments[arg++];
      }
      return fn.apply(this, args);
    }
  };
};
```

```js
var delay = setTimeout.partial(undefined, 10);

delay(function () {
  // ...
));
```

```js
var bindClick = document.body.addEventListener.partial('click', undefined, false);

bindClick(function () {
  //
});
```

## 4. Overriding Function Behavior
### 4.1 Memoization

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

### 4.2 Function Wrapping

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
  
## 5. (function() {})()

### 5.1 Temporary Scope and Private Variables
```js
(function () {
  var numClicks = 0;
  
  document.addEventListener('click', function () {
    alert(++numClicks);
  }, false);
})();
```

```js
document.addEventListener('click', (function () {
  var numClicks = 0;
  
  return function () {
    alert(++numClicks);
  }
})(), false);
```

```js
(function () {
  Object.extend(v, {
    href: v._getAttr,
    src: v._getAttr,
    type: v._getAttr,
    action: v._getAttrNode,
    disabled: v._flag,
    checked: v._flag,
    readonly: v._flag,
    multiple: v._flag,
    onload: v._getEv,
    onunload: v._getEv,
    onclick: v._getEv,
    ...
  });
})(Element._attributeTranslations.read.values);
```

### 5.2 Loops
```js
var div = document.getElementsByTagName('div');

for (var i = 0; i < div.length; i++) {
  div[i].addEventListener('click', function () {
    alert('div #' + i + ' was clicked');
  });
}
```

```js
var div = document.getElementsByTagName('div');
for (var i = 0; i < div.length; i++) (function () {
  div[i].addEventListener('click', function () {
    alert('div #' + i + 'was clicked');
  }, false);
})(i);
```

### 5.3 Library Wrapping
```js
(function () {
  var jQuery = window.jQuery = function () {
    // initiali
  };
  
  // ...
})();
```

```js
var jQuery = (function () {
  function jQuery () {
    // initialize
  }
  
  //...
  return jQuery
})();
```
