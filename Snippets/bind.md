# Bind
オブジェクトと関数を受け取り、オブジェクトを `this` コンテキストとして関数に束縛します。

```js
/**
 * bind
 * @param {Object} context
 * @param {Function} fn
 * 
 */
function bind(context, fn) {
  return function() {
    return fn.apply(context, [].slice.call(arguments));
  }
}

// test
let a = {
  name: 'a object',
  say(greet) {
    return greet + ', ' + this.name;
  }
};

let b = {
  name: 'b object'
};

a.say('Hello');
b.say = bind(b, a.say);
console.log( a.say('Hello') ); //-> Hello, a object
console.log( b.say('Hi') ); //-> Hi, b object
```


## ES5 `Function.prototype.bind()`

```js
let c = {
  name: 'c object'
};
c.say = a.say.bind(c);
console.log( c.say('Hey') ); //-> Hey, c object
```

ポリフィル

```js
if (typeof Function.prototype.bind === 'undefined') {
  Function.prototype.bind = function(thisArg) {
    var fn = this;
    var slice = Array.prototype.slice;
    var args = slice.call(arguments, 1);
    return function() {
      return fn.apply(thisArg, arg.concat(slice.call(arguments)));
    }
  };
}
```
