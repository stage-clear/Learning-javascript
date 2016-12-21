# Interfaces
- [Interfaces - TypeScript](https://www.typescriptlang.org/docs/handbook/interfaces.html)

## Introduction

## Our First Interface

```typescript
function printLabel(labelledObj: { label: string }) {
  console.log(labelledObj.label)
}

let myObj = { size: 10, label: 'Size 10 Object' }
printLabel(myObj) // > "Size 10 Object"
```

```typescript
interface LabelledValue {
  label: string
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label)
}

let myObj = { size: 10, label: 'Size 10 Object' }
printLabel( myObj )
```

## Optional Properties

```typescript
interface SquareConfig {
  color?: string,
  width?: number
}

function createSquare(config: SquareConfig): { color: string, area: number } {
  let newSquare = { color: 'white', area: 100 }
  if (config.color) {
    newSquare.color = config.color
  }
  if (config.width) {
    newSquare.area = config.width * config.width
  }
  return newSquare
}

let mySquare  = createSquare({ color: 'black' })
```

```typescript
interface SquareConfig {
  color?: string
  width?: number
}

function createSquare(config: SquareConfig): { color: string, area: number} {
  let newSquare = { color: 'white', area: 100 }
  if (config.color) {
    newSquare.color = config.color
  }
  if (config.with) {
    newSquare.area = config.width * config.width
  }
  return newSquare
}

let mySquare = createSquare({ color: 'black' })
```

### Readonly properties

```typescript
// putting `readonly` before the name of property
interface Point {
  readonly x: number
  readonly y: number
}
```

```typescript
let p1: Point = { x: 10, y: 20 }
p1.x = 5 // Error!
```

```typescript
// `ReadonlyArray<T>`
let a: number[] = [1, 2, 3, 4]
let ro: ReadonlyArray<number> = a
ro[0] = 12 // Error!
ro.push(5) // Error!
ro.length = 100 // Error!
a = ro // Error!
// On the last line of the snippet you can see that even assingning the entire ReadonlyArray back to normal array is illegal.
```

```typescript
// You can still override it with a type assertion, though:
a = ro as number[]
```

#### `readonly` VS `const`
変数の場合は `const` を使い、プロパティの場合は `readonly` を使う

### Excess Property Checks
<sup>_過剰なプロパティ検査_</sup>

```typescript
interface SquareConfig {
  color?: string
  width?: number
}

function createSquare(config: SquareConfig): { color: string, area: number } {
  // ...
}

// Error: 'colour' not expected in type 'SquareConfig'
let mySquare - createSquare({ colour: 'red', width: 100 })
```

```typescript
// Type assertion を利用することで、これらの検査を避けられます
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConifg) <-
```

```typescript
interface SquareConfig {
  color?: string
  width?: number
  [propName: string]: any
}
```

```typescript
let squareOptions = { colour: 'red', width: 100 }
let mySquare = createSquare(squareOptions)
```

### Function Types

```typescript
interface SearchFunc {
  (source: string, subString: string): boolean
}
```

```typescript
let mySearch: SearchFunc
mySearch = function(source: string, subString: string) {
  let result = source.search(subString)
  if (result == -1) {
    return false
  } else {
    return true
  }
}
```

```typescript
// 引数名は、インターフェイスとマッチしている必要はありません
let mySearch: SearchFunc
mySearch = function(src: string, sub: string):boolean {
  let result = src.search(sub)
  if (result == -1) {
    return false
  } else {
    return true
  }
}
```

```typescript
// 
let mySearch: SearchFunc
mySearch = function(src, sub) {
  let result = src.search(sub)
  if (result == -1) {
    return false
  } else {
    return true
  }
}
```

### Indexable Types

```typescript
interface StringArray {
  [index: number]: string
}

let myArray: StringArray
myArray = ['Bob', 'Fred']

let myStr: string = myArray[0]
```

```typescript
class Animal {
  name: string
}

class Dog extends Animal {
  breed: string
}

// Error: indexing with a 'string' will sometimes get you a Dog!
interface NotOkay {
  [x: number]: Animal
  [x: string]: Dog
}
```

```typescript
interface NumberDictionary {
  [index: string]: number
  length: number // Ok, length is number
  name: string // error, the type of 'name' is not a subtype of the indexer
}
```

```typescript
// readonly
interface ReadonlyStringArray {
  readonly [index: number]: string
}

let myArray: ReadonlyStringArray = ['Alice', 'Bob']
myArray[2] = 'Mallory' // Error!
```

### Class Types
### Implementing an interface
```typescript
interface ClockInterface {
  currentTime: Date
}

class Clock implemnts ClockInterface {
  currentTime: Date
  constructor(h: number, m: number) { }
}
```

```typescript
interface ClockInterface {
  currentTime: Date
  setTime(d: Date)
}

class Clock implements ClockInterface {
  currentTime: Date
  setTime(d: Date) {
    this.currentTime = d
  }
  constructor(h: number, m: number) { }
}
```

#### Difference between the static and instance sides of classes
```typescript
// get an error
interface ClockConstructor {
  new (hour: number, minutes: number)
}

class Clock implements ClockConstructor {
  currentTime: Date
  constructor(h: number, m: number) { }
}
```

```typescript
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface
}

interface ClockInterface {
  tick()
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
  return new ctor(hour, minute)
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) { }
  tick() {
    console.log('beep beep')
  }
}

class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) { }
  tick() {
    console.log('tick tock)
  }
}

let digital = createClock(DigitalClock, 12, 17)
let analog = createClock(AnalogClock, 7, 32)
```

### Extending Interface

```typescript
interface Shape {
  color: string
}

interface Square extends Shape { // <-
  sideLength: number
}

let square = <Square>{}
square.color = 'blue'
square.sideLength = 10
```

```typescript
interface Shape {
  color: string
}

interface PenStroke {
  penWidth: number
}

interface Square extends Shape, PenStroke { // <-
  sideLength: number
}

let square = <Square>{}
square.color = 'blue'
square.sideLength = 10
square.penWidth = 5.0
```

### Hybrid Types

```typescript
interface Counter {
  (start: number): string
  interval: number
  reset(): void
}

function getCounter(): Counter {
  let counter = <Counter>function(start: number) {}
  counter.interval = 123
  counter.reset = function() { }
  return counter
}

let c = getCounter()
c(10)
c.reset()
c.interval = 5.0
```

### Interfaces Extending Classes

```typescript
class Control {
  private state: any
}

interface SelectableControl extends Control {
  select(): void
}

class Button extends Control {
  select() { }
}

class TextBox extends Conrol {
  select() { }
}

class Image {
  select() { }
}

class Location {
  select() { }
}
```
