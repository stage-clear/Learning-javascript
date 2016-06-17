# this
## `this` in function invocation
> `this` is the __global object__ in function invocation.

```js
function sum(a, b) {
  console.log(this === window); //=> true
  this.myNumber = 20; // add `myNumber` property to global object
  return a + b;
}
// `sum()` is invoked as a function
// this in `sum()` is a global object(window);
sum(15, 16);//=> 31
window.myNumber; //=> 20
```

```js
console.log(this === window); //=> true
this.myString = 'Hello world!';
console.log(window.myString); //=> "Hello world!"
```

```html
<!-- in an html file -->
<script type="text/javascript">
  console.log(this === window);//=> true
</script>
```

## `this` in function invocation, `strict mode`
> `this` is `undefined` in a function invocation in strict mode.

```js
function multiply(a, b) {
  'use strict'; // enabled this strict mode
  console.log(this === undefined);//=> true
  return a * b;
}
// `multiply()` function invocation with strict mode enabled
// `this` in `multiply()` in undefined.
multiply(2, 5);
```
> The `strict mode` is active not only in the current scope, but also in the inner scopes.
> (for all function declared inside):

```js
function execute() {
  'use strict'; // activate the strict mode
  
  function concat(str1, str2) {
    // strict mode is enabled too
    console.log(this === undefined); //=> true
    return str1 + str2;
  }
  
  concat('Hello', 'World!');//=> "HelloWorld!"
}
execute();
```

### Pitfall: `this` in an inner function

```js
let numbers = {
  numberA: 5,
  numberB: 10,
  sum() {
    console.log(this === numbers);//=> true
    
    function calc() {
      console.log(this === numbers);//=> false
      return this.numberA + numberB;
    }

    return calc();//=> Error: NaN
  }
};
```

This case's solution is `return calc.call(this)`.



## `this` in arrow funcions
- [When 'not' to use arrow functions](http://rainsoft.io/when-not-to-use-arrow-functions-in-javascript/)

### Object literal

```js
let a = {
  name: 'a',
  run: () => {
    console.log(`[${a.name}]`, '`this` is `window` = ', this === window);
  }
};
a.run();
```

```js
let b = {
  name: 'b',
  run() {
    console.log(`[${this.name}]`, '`this` is `b` = ', this === b);
  }
};
b.run();
```

## Object prototype

```js
function C(name) {
  this.name = name;
}
C.prototype.run = () => {
  console.log(`[${c.name}]`, '`this` is `window` = ', this === window);
}
let c = new C('c');
c.run();
```

```js
function D(name) {
  this.name = name;
}
D.prototype.run = function() {
  console.log(`[${this.name}]`, '`this` is `d` = ', this === d);
}
let d = new D('d');
d.run();
```

### Callback functions
```html
<button id="button1">button1</button>
<button id="button2">button2</button>
```
```js
let button1 = document.getElementById('button1');
button1.addEventListener('click', () => {
  console.log(`[${button1.id}]`, '`this` is `window`', this === window);
});
button1.click();
```

```js
let button2 = document.getElementById('button2');
button2.addEventListener('click', function() {
  console.log(`[${this.id}]`, '`this` is `button2`', this === button2);
});
button2.click();
```

## Links
- [Gentle explanation of 'this' keyword in JavaScript](http://rainsoft.io/gentle-explanation-of-this-in-javascript/)
- [じゃあ this の抜き打ちテストやるぞー](http://qiita.com/KDKTN/items/0b468a07410d757ac609)
- [globalオブジェクトを取得する](http://qiita.com/Hiraku/items/d249a2f2f13532748324)
