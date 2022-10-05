# 5. Function Prototype
## 1. Instantiation and Prototypes
### 1.1 Instantiation

```js
function Ninja () {}

Ninja.prototype.swingSword = function () {
  return true;
};

var ninja1 = Ninja();
// -> undefined

var ninja2 = new Ninja();
ninja2.swingSword();
// -> true
```

### 1.2 Object Type
```js
function Ninja () {}

var ninja = new Ninja();
```

```js
var ninja = new Ninja();
var ninja2 = new ninja.constructor();
console.log(ninja2 instanceof ninja); //-> true
```

### 1.4 HTML Prototypes
```js
HTMLElement.prototype.remove = function () {
  if (this.parentNode) {
    this.parentNode.removeChild(this);
  }
};

// Old way
var a = document.getElementById('a');
a.parentNode.removeChild(a);

// New way
document.getElementById('b').remove();

var elem = new HTMLElement();
```

## 2. Gotchas
```js
Object.prototype.keys = function () {
  var keys = [];
  for (var i in this) {
    keys.push(i);
  }
  return keys;
};

var obj = { a: 1, b: 2, c: 3 };

console.log(obj.keys());
```

### 2.2 Extending Number
```js
Number.prototype.add = function () {
  return this + num;
};

var n = 5;
console.log(n.add(3) === 8); //-> true
console.log((5).add(3) === 8); //-> true
console.log(5.add(3)) //-> ERROR!
```

### 2.3 Sub-classing Native Objects
**Inheriting functionaly from the Array object**
```js
function MyArray () {
  MyArray.prototype = new Array();
}

var mine = new MyArray();
mine.push(1, 2, 3);
```

** Simulation Array functionality but without the true sub-classing**
```js
function MyArray () {}
MyArray.prototype.length = 0;

(function () {
  var methods = ['push', 'pop', 'shift', 'unshift', 'slice', 'splice', 'join'];
  
  for (var i = 0; i < methods.length; i++) (function () {
    MyArray.prototype[name] = function () {
      return Array.prototype[name].apply(this, arguments);
    };
  })(methods[i]);
})();

var mine = new MyArray();
mine.push(1, 2, 3);
```

### 2.4 Instantiation

```js
function User (first, last) {
  if (!(this instanceof arguments.callee)) {
    return new User(first, last);
  }
  
  this.name = first + '' + last;
}
```

**Determining if we're inside of an instantiated function, or not**
```js
function test () {
  return this instanceof arguments.callee;
}
```

## 3. Class-like Code
**An example of classical-style inheritance, using the code**
```js
var Person = Object.subClass({
  init: function (isDancing) {
    this.dancing = isDancing;
  },
  dance: function () {
    return this.dancing;
  }
});

var Ninja = Person.subClass({
  init: function () {
    this._super(false);
  },
  dance: function () {
    return this._super();
  },
  swingSword: function () {
    return true;
  }
});

var p = new Person(true);
console.log(p.dance()); // OK

var n = new Ninja();
console.log(n.swingSword()) // OK
console.log(n.dance()); // ERROR!
```

