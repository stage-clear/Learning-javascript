# 関数
- TypeScriptでの関数の宣言方法と呼び出し方法
- シグネチャのオーバーロード
- 関数についてのポリモーフィズム
- 型エイリアスについてのポリモーフィズム

## 4.1 関数の宣言と呼び出し

```ts
function add (a: number, b: number) {
  return a + b
}
```
TypeScriptは多くの場合、パラメーターについては型を推論しません。

```ts
function add (a: number, b:number): number {
  return a + b
}
```

TypeScriptが私たちの代わりに推論してくれるので、その作業を繰り返す必要はないでしょう。

JavaScriptとTypeScriptには、関数を宣言するための方法が少なくとも5つあります。
```ts
// 名前付き関数
function greet (name: string) {
  return 'hello ' + name
}

// 関数式
let greet2 = function (name: string) {
  return 'hello ' + name
}

// アロー関数式
let greet3 = (name: string) =>
  'hello ' + name

// アロー関数式の省略記法
let greet4 = (name: string) =>
  'hello ' + name

// 関数コンストラクター
let greet5 = new Function('name', 'return "hello " + name')
```

パラメータは、通常は型アノテーションが必須で、戻り値の型は、型アノテーションが省略可能に従います。

- <b>パラメータ</b>（parameter）は、関数が実行されるために必要とするデータであり、関数宣言の一部として宣言されます。<b>仮パラメーター</b>（formal parameter）とも呼ばれます。
- <b>引数</b>（argument）は、関数を呼び出すときに（関数に）渡すデータです。<b>実パラメーター</b>（actual parameter）とも呼ばれます。

### 4.1.1 オプションパラメーターとデフォルトパラメーター

```ts
function log (message: string, userId?: string) {
  let time = new Date().toLocaleTimeString()
  console.log(time, message, userId || 'Not signed in')
}

log('Page loaded')
log('User signed in', 'da763be')
```

```ts
function log (message: string, userId = 'Not signed in') {
  let time = new Date().toISOString()
  console.log(time, message, userId)
}

log('User clicked on a button', 'da763be')
log('User signed out')
```

```ts
type Context = {
  appId?: string,
  userId?: string
}

function log (message: string, context: Context = {}) {
  let time = new Date().toISOString()
  console.log(time, message, context.userId)
}
```

### 4.1.2 レストパラメーター

```ts
function sum (numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0)
}

sum([1,2,3]) // 6と評価されます
```
ときには、決まった数の引数を取る固定アリティ関数（fixed-arity function）の代わりに、可変長引数関数（variadic function）を望む場合もあるでしょう。

```ts
function sumVariadic(): number {
  retun Array
    .from(arguments)
    .reduce((total, n) => total + n, 0)
}

sumVariadic(1, 2, 3) // 6と評価されます
```

レストパラメーターを使う
```ts
function sumVariadicSafe (...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0)
}

sumVariadicSafe(1, 2, 3) // 6
```

console.logの組み込み宣言を見てみましょう
```ts
interface Console {
  log(message?: any, ...optionalParams: any[]): void
}
```

### 4.1.3 call、apply、bind

```ts
function add (a: number, b: number): number {
  return a + b
}

add(10, 20)                 // 30
add.apply(null, [10, 20])   // 30
add.call(null, 10, 20)      // 30
add.bind(null, 10, 20)()    // 30
```

|オプション|説明|
|:-|:-|
|`strictBindCallApply`|`.call` `.apply` `.bind`を安全に使うには有効にしてください。（すでに`strict`を有効にしている場合は、自動的に有効になります）|

### 4.1.4 thisの型付け

```ts
let x = {
  a () {
    return this
  }
}

x.a()   // 本体内では this はオブジェクトです

let a = x.a

a()     // この場合、a() の本体内では this は undefined です
```

関数でthisを使用する場合は、期待するthisの型を、関数の最初のパラメーターとして宣言してください。
```ts
function fancyDate (this: Date) {
  return `${this.getMonth() + 1}/${this.getDate()}/${this.getFullYear()}`
}

fancyDate.call(new Date)
fancyDate() // エラー
```

|オプション|説明|
|:-|:-|
|`noImplictThis`|関数においてthisの型を常に明示的にあのテートすることを強制する|

### 4.1.5 ジェネレーター

```ts
function* createFibonacciGenerator () {
  let a = 0
  let b = 1
  while (true) {
    yield a;
    [a, b] = [b, a + b]
  }
}

let fibonacciGenerator = createFibonacciGenerator() // Generator<number>
fibonacciGenerator.next() // { value: 0, done: false }
fibonacciGenerator.next() // { value: 1, done: false }
fibonacciGenerator.next() // { value: 1, done: false }
fibonacciGenerator.next() // { value: 2, done: false }
fibonacciGenerator.next() // { value: 3, done: false }
fibonacciGenerator.next() // { value: 5, done: false }
```

1. 関数名の
