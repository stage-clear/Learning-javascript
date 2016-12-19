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
