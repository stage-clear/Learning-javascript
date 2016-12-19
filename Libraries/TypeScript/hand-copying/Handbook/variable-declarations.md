# Variable Declarations
- [Varaible Declarations - TypeScript](https://www.typescriptlang.org/docs/handbook/variable-declarations.html)

## `var` declarations

```typescript
var a = 10
```

```typescript
function f() {
  var message = 'Hello, world!'

  return message
}
```

```typescript
function f() {
  var a = 10
  return function() {
    var b = a + 1
    return b
  }
}

var g = f()
g() // returns '11'
```

```typescript
function f() {
  var a = 1
  
  a = 2
  var b = g()
  
  return b
  
  function g() {
    return a
  }
}

f() // returns '2'
```

### Scoping rules

```typescript
function f(shoudInitalize: boolean) {
  if (shoudInitialize) {
    var x = 10
  }
}

f(true) // returns '10'
f(false) // returns 'undefined'
```

```typescript
function sumMatrix(matrix: number[][]) {
  var sum = 0
  for (var i = 0; i < matrix.length; i++) {
    var currentRow = matrix[i]
    for (var i = 0; i < currentRow.length; i++) {
      sum += currentRow[i]
    }
  }
  return sum
}
```

### Variable capturing quirks

```typescript
for (var i = 0; i < 10; i++) {
  setTimeout(function() {
    console.log(i)
  }, 100 * i)
}

// A common work around is to use an IIFE
// to capture i at each iteration.
for (var i = 0; i < 10; i++) {
  (function(i) {
    setTimeout(function() {
      console.log(i)
    }, 100 * i)
  })(i)
}
```

## `let` declarations

```typescript
let hello = 'Hello!'
```

### Block-scoping 
```typescript
function f(input: boolean) {
  let a = 100
  
  if (input) {
    // Still OK to reference 'a'
    let b = a + 1
    return b
  }
}

f(true) // returns 101
f(false) // returns undefined
```

```typescript
try {
  throw 'oh no!'
} catch(e) {
  console.log('Oh well.')
}

// Error: 'e' doesn't exist here
console.log(e)
```

```typescript
a++ // illegal to use 'a' before it's declared
let a 
```

```typescript
function foo() {
  // okay to capture 'a'
  return a
}

// illegal call 'foo' before 'a' is declared
// runtimes should throw an error here
foo()

let a
```

### Re-declarations and Shadowing
```typescript
function f(x) {
  var x
  var x
  
  if (true) {
    var x
  }
}

f(10) // undefined
```
上記のサンプルでは、すべての宣言が同じ `x` を参照しています。これは完全に有効な書き方ですが、これらはよくバグの原因となります。  
ありがたいことに、 `let` での宣言ではそれを許しません

```typescript
let x = 10
let x = 20 // Error: can't re-declare 'x' in the same scope
```

```typescript
function f(x) {
  let x = 100 // Error: interferes with parameter declaration
}

function g() {
  let x = 100
  var x = 100 // Error: can't have both declarations of 'x'
}
```

```typescript
function f(condition, x) {
  if (confition) {
    let x = 100
    return x
  }
}

f(false, 0) // return '0'
f(true, 0) // return '100'
```

```typescript
function sumMatrix(matrix: number[][]) {
  let sum = 0
  for (let i = 0; i < matrix.length; i++) {
    var currentRow = matrix[i];
    for (let i = 0; i < currentRow.length; i++) {
      sum += currentRow[i]
    }
  }
  return sum
}
```

### Block-scoped variable capturing

```typescript
function theCityThatAlwaysSleeps() {
  let getCity
  
  if (true) {
    let city = 'Seattle' 
    getCity = function() {
      return city
    }
  }
  
  return getCity()
}
```

```typescript
for (let i = 0; i < 10; i++) {
  setTimeout(function() {
    console.log(i)
  }, 100 * i)
}

// > 0
// > 1
// > 2
// > 3
// > 4
// > 5
// > 6
// > 7
// > 8
// > 9
```

## `const` declarations

```typescript
const numLivesForCat = 9
```

```typescript
const numLivesForCat = 9
const kitty = {
  name: 'Aurora',
  numLives: numLivesForCat,
}

// Error
kitty = {
  name: 'Danielle',
  numLives: numLivesForCat
}

// all 'Okay'
kitty.name = 'Rory'
kitty.name = 'Kitty'
kitty.name = 'Cat'
kitty.numLives--
```

## `let` vs. `const`
### Destructuring

```typescript
let input = [1, 2]
let [first, second] = input
console.log(first) // return 1
console.log(second) // return 2
```

```typescript
first = input[0]
second = input[1]
```

```typescript
// swap variables
[first, second] = [second, first]
```

```typescript
function f([first, second]: [number, number]) {
  console.log(first)
  console.log(second)
}

f(input)
```

```typescript
let [first, ...rest] = [1, 2, 3, 4]
console.log(first) // returns 1
console.log(rest) // returns [2, 3, 4]
```

```typescript
let [first] = [1, 2, 3, 4]
console.log(first) // returns 1
```

```typescript
let [, second, , fourth] = [1, 2, 3, 4]
```

### Object destructuring
```typescript
let o = {
  a: 'foo',
  b: 12, 
  c: 'bar' 
}

let { a, b } = o

console.log(a) // > "foo"
console.log(b) // > 12
```

```typescript
({a, b} = {a: 'baz', b: 101})

console.log(a) // > "baz"
console.log(b) // > 101
```

```typescript
let { a, ...passthrough} = o
let total = passthrough.b + passthrough.c.length
```

```typescript
let { a: newName1, b: newName2 } = o

let newName1 = o.a
let newName2 = o.b
```

```typescript
let { a, b }: { a: string, b: number } = o
```

```typescript
function keepWholeObject(wholeObject: { a: string, b?: number }) {
  let { a, b = 1001} = wholeObject
}
```

### Function declarations
```typescript
type C = { a: string, b?: number }
function f({ a, b }: C): void {
  // ...
}

```

```typescript
function f({ a, b } = { a: '', b: 0}):void {
  // ...
}

f() // OK, default to { a: "", b: 0 }
```

```typescript
function f({a, b = 0} = {a: ''}): void {
  // ...
}

f({ a: 'yes' }) // OK, default b = 0
f() // OK, default to { a :'' }, which then defaults b = 0
f({}) // error, 'a' is required if you supply an argument
```

### Spread
```typescript
let first = [1, 2]
let second = [3, 4]
let bothPlus = [0, ...first, ...second, 5]
// > [0, 1, 2, 3, 4, 5]
```

```typescript
let defaults = { food: 'spicy', price: '$$', ambiance: 'noisy' }
let search = { ...defaults, food: 'rich' }
// > Now search is { food: 'rich', price: '$$', ambiance: 'noisy' }
```

```typescript
let defaults = { food: 'spicy', price: '$$', ambiance: 'noisy' }
let serach = { food: 'rich', ...defaults }
// > Now search is { food: 'spicy', price: '$$', ambiance: 'noisy' }
```

```typescript
class C {
  p = 12
  m() {
    
  }
}

let c = new C()
let clone = { ...C }
clone.p // OK
clone.m() // Error!
// オブジェクトのインスタンスをスプレッドするときはメソッドを失うことを意味します
```


