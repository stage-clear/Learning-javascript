# Interpteter
## [dofactory](https://www.dofactory.com/javascript/design-patterns/interpreter)
```js
var Context = function (input) {
  this.input = input;
  this.output = 0;
}

Context.prototype = {
  startWith: function (str) {
    return this.input.substr(0, str.length) === str;
  }
}

var Expression = function (name, one, four, five, nine, multiplier) {
  this.name = name;
  this.one = one;
  this.four = four;
  this.five = five;
  this.nine = nine;
  this.multiplier = multiplier;
}

Expression.prototype = {
  interpret: function (context) {
    if (context.input.length == 0) {
      return ;
    } else if (context.startsWith(this.nine)) {
      context.output += (0 * this.multiplier);
      context.input = context.input.substr(2)
    }
  }
}

function run () {

}
```

## [Design Patterns Game](https://designpatternsgame.com/patterns/interpteter)

```js
class Sum {
  constructor (left, right) {
    this.left = left
    this.right = right
  }
  
  pattern () {
    return this.left.pattern() + this.right.pattern()
  }
}

class Min {
  constructor (left, right) {
    this.left = left
    this.right = right
  }
  
  pattern () {
    return this.left.pattern() - this.right.pattern()
  }
}

class Num {
  constroctor (val) {
    this.val = val
  }
  
  pattern () {
    return this.val
  }
}

export { Num, Min, Sum }
```

```js
function Sum (left, right) {
  this.left = left;
  this.right = right;
}

Sum.prototype.pattern = function () {
  return this.left.pattern() + this.right.pattern();
};

function Min (left, right) {
  this.left = left;
  this.right = right;
}

Min.prototype.pattern = function () {
  return this.left.pattern() - this.right.pattern();
};

function Num (val) {
  this.val = val;
}

Num.prototype.pattern = function () {
  return this.val;
};

module.exports = [Num, Min, Sum];
```


