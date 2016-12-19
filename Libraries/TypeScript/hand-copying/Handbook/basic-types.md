# Basic Types
- [Basic Types - TypeScript](https://www.typescriptlang.org/docs/handbook/basic-types.html)

## Introduction

## Boolean
<sup>_ブーリアン型_</sup>

```typescript
let isDone: boolean = false
```

## Number
<sup>_数値型_</sup>

```typescript
let decimal: number = 6
let hex = number = 0xf00d
let binary: number = 0b1010
let octal: number = 0o744
```

## String
<sup>_文字列型_</sup>

```typescript
let color: string = 'blue'
color = 'red'
```

__template strings__

```typescript
let fullName: string = `Bob Bobbington`
let age: number = 37
let sentence: string = `Hello, my name is ${fullName}.

I'll be ${age + 1} years old next month.`
```

## Array
<sup>_配列型_</sup>

```typescript
let list: number[] = [1, 2, 3]
```

```typescript
let list: Array<numbr> = [1, 2, 3]
```

## Tuple
<sup>_複数の要素の組み_</sup>

```typescript
// 宣言
let x: [string, number]
// 正常な初期値
x = ['Hello', 10] // OK
// 不正な初期値
x = [10, 'Hello'] // Error 
```

```typescript
console.log(x[0].substr(1)) // OK > "ello"
console.log(x[1].substr(1)) // Error, 'number' does not have 'substr'
```

```typescript
x[3] = 'world' // OK
console.log(x[5].toString()) // OK, 'string' and 'number' both have 'toString'

x[6] = true // Error, 'boolean' isn't 'string | number'
```

## Enum
```typescript
enum Color { Red, Green, Blue }
let c: Color = Color.green
// > 1
```

```typescript
enum Color { Red = 1, Green, Blue }
let c: Color = Color.Green
// > 2
```

```typescript
enum Color { Red = 1, Green = 2, Blue = 4 }
let c: Color = Color.green
// > 2
```

```typescript
enum Color { Red = 1, Green, Blue }
let colorName: string = Color[2]
alert(colorName)
// > "Green"
```

## Any
```typescript
let notSure: any = 4
notSure = 'maybe a string instead'
notSure = false
```

```typescript
let notSure: any = 4
notSure.ifItExists() // OK, ifItExists might exist at runtime
notSure.toFixed() // OK, toFixed exists (but the compiler doesn't check)

let prettySure: Object = 4
prettySure.toFixed() // Error, Property 'toFixed' doesn't exist on type 'Object'.
```

```typescript
letj list: any[] = [1, true, 'free']
list[1] = 100
```

## Void 

```typescript
function warnUser(): void {
  alert('This is my warning message')
}
```

```typescript
let unusable: void = undefined
```

## Null and Undefined

```typescript
let u: undefined = undefined
let n: null = null
```

## Never

```typescript
// Function returning never must have unreachable end point
function error(message: string): never {
  throw new Error(message)
}

// Inferred retur type is never
function fail() {
  return error('Something failed')
}

// Function returning never must have unreachable end point
function infiniteLoop(): never {
  while(true) {
  }
}
```

## Type assertions
```typescript
let someValue: any = 'this is a string'
let strlength: number = (<string>someValue).length
// > 16
```

```typescript
let someValue: any = 'this is a string' 
let strLength: number = (someValue as string).length
// > 16
```
