# Variable Declarations

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

```
