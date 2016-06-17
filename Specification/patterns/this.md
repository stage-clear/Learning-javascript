# this
## Function invocation
### `this` in function invocation
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

### `this` in function invocation, `strict mode`
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

## Method invocation
Method invocation is:
```js
let myObject = {
  helloFunction() {
    return 'Hello World!';
  }
};
let message = myObject.helloFunction();
```

```js
['Hello', 'World'].join(','); // method invocation
({ ten () { reutn 10;} }).ten(); // method invocation

let obj = {};
obj.myFunction = () => new Date().toString();
obj.myFunction(); // method invocation

let otherFunction = obj.myFunction;
otherFUnction(); // function invocation
parseFloat('16.50'); // function invocation
isNaN(0); // function invocation
```

### `this` in method invocation
> `this` is the __object that owns the method__ in a method invocation

__Object literal__

```js
let calc = {
  num: 0,
  increment() {
    console.log(this === calc); //=> true
    this.num += 1;
    return this.num;
  }
};
// method invocation. this is calc
calc.increment();//=> 1
calc.increment();//=> 2
```

__`Object.create()`__

```js
let myDog = Object.create({
  sayName() {
    console.log(this === myDog);
    return this.name;
  }
});
myDob.name = 'Milo';
// method invocation. this myDog
myDog.SayName();//=> "Milo"
```

__Class__

```js
class Planet {
  constructor(name) {
    this.name = name;
  }
  getName() {
    console.log(this === earth);//=> true
    return this.name;
  }
}

let earth = new Planet('Earth');
earth.getName();
```

### Pitfall: separating method from its object

```js
function Animal(type, legs) {
  this.type = type;
  this.legs = legs;
  this.logInfo = function() {
    console.log(this === myCat);//=> false
    console.log(`The ${this.type} has ${this.legs} legs`);
  }
}
let myCat = new Animal('Cat', 4);
setTimeout(myCat.logInfo, 1000);
```

__Solutions:__  
- use `bind()` `setTimeout(myCat.logInfo.bind(myCat), 1000)`
- use Arrow function. `this.logInfo = () => { /*...*/ }`

## Constructor invocation

```js
function Country(name, traveled) {
  this.name = this.name ? this.name : 'United Kingdom';
  this.traveled = Boolean(traveled); // transform to a boolean
}
Country.prototype.travel = () => {
  this.traveled = true;
};
// Constructor invocation
let france = new Country('France', false);
// Constructor invocation
let unitedKingdom = new Country;

france.travel(); // "Travel to France"
```

__using `class` keyword:__
```js
class City {
  constructor(name, traveled) {
    this.name = name;
    this.traveled = false;
  }
  travel() {
    this.traveled = true;
  }
}
// Constructor invocation
let paris = new City('Paris', false);
paris.travel();
```

### `this` in constructor invocation
> `this` is the __newly created object__ in a constructor invocation

```js
function Foo() {
  console.log(this instanceof Foo);//=> true
  this.property = 'Default Value';
}
// Constructor invocation
let fooInstance = new Foo();
fooInstance.property; //=> "Default Value"
```

```js
class Bar {
  constructor() {
    console.log(this instanceof Bar); //=> true
    this.property = 'Default Value';
  }
}
// Constructor invocation
let barInstance = new Bar();
barInstance.property;//=> "Default Value"
```

### Pitfall: forgetting about `new`

__!) `new` keyword missing:__

```js
function Vehicle(type, wheels) {
  this.type = type;
  this.wheels = wheels;
  return this;
}
// Function invocation
// is not using `new`
let car = Vehicle('Car', 4);
car.type;//=> "Car"
car.wheels;//=> 4
car === window;//=> true
windwo.tye;//=> "Car"
```

Make sure to use `new` operator in cases when a constructor call is expected:

```js
function Vehicle (type, wheels) {
  if (!(this instanceof Vehicle)) {
    throw Error('Error: Incorrect invocation');
    // return new Vehicle(type, wheels);
  }
  this.type = type;
  this.wheels = wheels;
  return this;
}
```

## Indirect invocation
> __Indirect invocation__ is performed when a function is called using `.call()` or `.apply()` methods.

```js
function increment(number) {
  return ++number;
}
increment.call(undefined, 10);//=> 11
increment.apply(undefined, [10]);//=> 11
```

### `this` in indirect invocation
> `this` is the __first argument__ of `.call()` or `.apply()` in an indirect invocation

```js
let rabbit = { name: 'White Rabbit' };
function concatName(string) {
  console.log(this === rabit);//=> true
  return string + this.name;
}
// Indirect invocation
concatName.call(rabbit, 'Hello');//=> "Hello White Rabbit"
concatName.apply(rabbit, ['Bye']);//=> "Bye White Rabbit"
```

```js
function Runner(name) {
  console.log(this instanceof Rabbi);//=> true
  this.name = name;
}
function Rabbit(name, legs) {
  console.log(this instanceof Rabbi);//=> true
  // Indirect invocation. Call parent constructor.
  Runner.call(this, name);
  this.legs = legs;
}

let myRabbit = new Rabbit('White Rabbit', 4);
myRabbit;//=> { name: "White Rabbit", legs: 4 }
```

## Bound function
__A bound function__ is a function bind with an object.
Usually it is created from the original function using `.bind()` method.

```js
function multiply(number) {
  'use strict';
  return this * number;
}
// create a bound function with context
let double = multiply.bind(2);
// invoke the bound founction
double(2);//=> 6
double(10);//=> 20
```

### `this` in bound function
> `this` is the __first argument__ of `.bind()` when invoking a bound function

```js
let numbers = {
  array: [3, 5, 10],
  getNumbers() {
    return this.array;
  }
};
// Create a bound function
let boundGetNumbers = numbers.getNumbers.bind(numbers);
boundGetNumbers();//=> [3, 5, 10]
// Extract method from object
let simpleGetNumbers = numbers.getNumbers;
simpleGetNumbers();//=> undefined or throws an error in strict mode
```

`.bind()` makes a permanent context link and will always keep it.
A bound function cannot change its linked context when using `.call()` or `.apply()` with a different context,
or even a rebound doesn't have any effect.

```js
function getThis() {
  'use strict';
  return this;
}
let one = getThis.bind(1);
// Bound function invocation
one();//=> 1
// Use bound function with `.apply()` and `.call()`
one.call(2);//=> 1
one.apply(2);//=> 1
// Bind again
one.bind(2)();//=> 1;
```

## Arrow function
__Arrow function__ is designed to declare the function in a shorter from and lexically bind the context.

```js
let hello = (name) => {
  return 'Hello' + name;
};
hello('World');//=> "Hello World"
[1,2,5,6].filter(item => item % 2 === 0);//=> [2, 6]
```

```js
let sumArguments = (...args) => {
  console.log(typeof arguments);//=> "undefined" (Using Chrome is "Object")
  return args.reduce((result, item) => result + item);
};
sumArguments.name;//=> '' (Using Chrome is "sumArguments");
sumArguments(5, 5, 6);
```

### `this` in arrow funcions
> `this` is the __enclosing context__ where the arrow function is defined.
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
