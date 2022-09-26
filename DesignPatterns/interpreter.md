# インタープリタ

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
