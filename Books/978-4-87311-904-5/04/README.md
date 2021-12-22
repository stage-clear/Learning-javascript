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

1. 関数名の前のアスタリスク（\*）によって、その関数はジェネレーター関数になります。ジェネレーター関数を呼び出すと、ジェネレーターが返されます。
2. このジェネレーターは、値を無限に生成することができます。
3. ジェネレーターが返す値は、yieldキーワードによって生成されます。利用者がジェネレータの次の値を要求すると、yieldは利用者に結果を送り返し、利用者が次の値を要求するまでは実行を休止します。
4. 次のフィボナッチ数を計算するために、1つのステップで、aにbを、bにa+bをそれぞれ再割り当てします。

ジェネレーターを明示的にあのテートすることもできます。
```ts
function* createNumbers(): Generator<number> {
  let n = 0
  while (1) {
    yield n++
  }
}

let numbers = createNumbers()
numbers.next()    // { value: 0, done: false }
numbers.next()    // { value: 1, done: false }
numbers.next()    // { value: 2, done: false }
```

### 4.1.6 イテレーター
> <b>反復可能オブジェクト(Iterable)</b><br>
> `Symbol.iterator`と呼ばれるプロパティを含んでいるオブジェクト。このプロパティの値は、イテレーターを返す関数。

> <b>イテレーター(Iterator)</b><br>
> `next`と呼ばれるメソッドを定義しているオブジェクト。この`next`メソッドは、`value`および`done`というプロパティを持つオブジェクトを返す。

`Sumbol.iterator'や`next`を実装するオブジェクト（またはクラス）を作成することで、反復可能オブジェクトやイテレーターを手動で定義することができます。
```ts
let numbers = {
  *[Symbol.iterator]() {
    for (let n = 1; n <= 10; n++) {
      yield n
    }
  }
}

// for-of を使って反復可能オブジェクトを反復する
for (let a of numbers) {
  // 1, 2, 3など
}

// 反復可能オブジェクトを展開する
let allNumbers = [...numbers] // number[]

// 反復可能オブジェクトを分割割り当てする
let [one, two, ...rest] = numbers // [number, number, number[]]
```

|オプション|説明|
|:-|:-|
|`downlevelIteration`|ES2015より古いバージョンのJavaScriptにコンパイルしている場合は`downlevelIteration`フラグを使って`for-of`などの反復可能オブジェクトを扱うための構文を有効にできます。（Symbol.iteratorのポリフィルも別に必要）|

### 4.1.7 呼び出しシグネチャ

```ts
function add (a: number, b: number): number {
  return a + b
}
```

TypeScriptでは型を次のように表現することができます。
```ts
(a: number, b: number) => number
```
呼び出しシグネチャは、<b>型レベル</b>のコードだけ--型のみで、値はなし--を含みます。
したがって、関数の呼び出しシグネチャは、パラメータの型、thisの型、戻り値の型、レストパラメーター、オプションパラメーターを表現することはできますが、デフォルト値は表現できません。

```ts
// function greet(name: string)
type Greet = (name: string) => string

// function log (message: string, userId?: string)
type Log = (message: string, userId?: string) => void

// function sumVariadicSafe (...numbers: number[]): number
type SumVariadicSafe = (...numbers: number[]) => number
```

```ts
type Log = (message: string, userId?: string) => void

let log: Log = ( // 1
  message,  // 2
  userId = 'Notsigned in' // 3
) => { // 4
  let time = new Date().toISOString()
  console.log(time, message, userId)
}
```

### 4.1.8 文脈的型付け
TypeScriptは、messageの型がstringでなければならないことを文脈から推論できます。
これは、<b>文脈的型付け</b>（contextual typing）と呼ばれる、TypeScriptの型推論の強力な機能です。
```ts
function times (
  f: (index: number) => void,
  n: number
) {
  for (let i = 0; i < n; i++) {
    f(i)
  }
}
```

```ts
times(n => console.log(n), 4)
```
もし`f`をインラインで宣言していなければ、TypeScriptはその型を推論できなかったことに注意してください。

```ts
function f (n) { // エラー（型は暗黙的にanyになります）
  console.log(n)
}

times(f, 4)
```

### 4.1.9 オーバーロードされた関数の型
```ts
// 呼び出しシグネチャの省略記法
type Log = (message: string, userId?: string) => void

// 完全な呼び出しシグネチャ
type Log = {
  (message: string, userId?: string): void
}
```

> <b>オーバーロードされた関数</b><br>
> 複数の呼び出しシグネチャを持つ関数

たとえば、旅行を予約するAPIを設計してみましょう。
```ts
type Reserve = {
  (from: Date, to: Date, destination: string): Reservation
}

let reserve: Reserve = (from, to, destination) => {
  // ...
}
```
日帰り旅行もサポートできるように、このAPIを作り変えましょう。
```ts
type Reserve = {
  (from: Date, to: Date, destination: string): Reservation
  (from: Date, destination: string): Reservation
}
```

```ts
type Reserve = {
  (from: Date, to: Date, destination: string): Reservation
  (from: Date, destination: string): Reservation
} // 1

let reserve: Reserve = (
  from: Date,
  toOrDestination: Date | string,
  destination?: string
) => { // 2
  // ...
}
```

1. オーバーロードされた関数の2つのシグネチャを宣言します。
2. 実装シグネチャは、2つのオーバーロードシグネチャを手動で結合した結果です。

```ts
type Reserve = {
  (from: Date, to: Date, destination: string): Reservation
  (from: Date, destination: string): Reservation
}

// 誤り!
type Reserve = {
  (from: Date, to: Date, destination: string): Reservation
  (from: Date, destination: string): Reservation
  (from: Date, toOrDestination: Date | string, destination?:string): Reservation
}
```
`reserve`は2つの方法のうちのどちらかで呼び出されるので、`reserve`を実装するときには、それがどのように呼び出されたかをチェック済みであることをTypeScriptに示す必要があります。

```ts
let reserve: Reserve = (
  from: Date,
  toOrDestination: Date | string,
  destination?: string
) => {
  if (toOrDestination instanceof Date && destination !== undefined) {
    // 宿泊旅行を予約する
  } else if (typeof toOrDestination === 'string') {
    // 日帰り旅行を予約する
  }
}
```

ブラウザーのDOM APIの表現には、オーバーロードがよく使われます。
```ts
type CreateElement = {
  (tag: 'a'): HTMLAnchorElement
  (tag: 'canvas'): HTMLCanvasElement
  (tag: 'table'): HTMLTableElement
  (tag: string): HTMLElement
}

let createElement: CreateElement = (tag: string): HTMLElement => {
  // ...
}
```

関数宣言で
```ts
function createElement(tag: 'a'): HTMLAnchorElement
function createElement(tag: 'canvas'): HTMLCanvasElement
function createElement(tag: 'table'): HTMLTableElement
function createElement(tag: string): HTMLElement {
  // ...
}
```


```ts
function warnUser (warning: string) {
  if (warnUser.wasCalled) {
    return 
  }
  warnUser.wasCalled = true
  alert(warning)
}

warnUser.wasCalled = false
```

```ts
type WarnUser = {
  (warning: string): void
  wasCalled: boolean
}
```

## 4.2 ポリモーフィズム
```ts
function filter (array, f) {
  let result = []
  for (let i = 0; i < array.length; i++) {
    let item = array[i]
    if (f(item)) {
      result.push(item)
    }
  }
  return result
}

filter([1,2,3,4], _ => _ < 3)
```
`filter`の完全な型シグネチャを抜き出し、肩にはプレースホルダーとして`unknown`を追加します。
```ts
type Filter = {
  (array: unknown[], f: unknown): unknown[]
}
```
次に、その型を、たとえば`number`で埋めてみましょう。
```ts
type Filter = {
  (array: number[], f: (item: number) => boolean): number[]
}
```
オーバーロードを使ってこれを拡張し、文字列の配列についても機能するようにしましょう。
```ts
type Filter = {
  (array: number[], f: (item: number) => boolean): number[]
  (array: string[], f: (item: string) => boolean): string[]
}
```
オブジェクトの配列についてはどうでしょうか
```ts
type Filter = {
  (array: number[], f: (item: number) => boolean): number[]
  (array: string[], f: (item: string) => boolean): string[]
  (array: object[], f: (item: object) => boolean): object[]
}

let names = [
  { firstName: 'beth' },
  { firstName: 'caitlyn' },
  { firstName: 'xin' }
]

let result = filter(
  names,
  _ => _.firstName.startWith('d')
) // エラー
```

> <b>ジェネリック型パラメーター</b><br>
> 複数の場所で型レベルの制約するために使われるプレースホルダーの型。<b>多相型パラメーター</b>とも呼ばれる

```ts
type Filter = {
  <T>(array: T[], f: (item: T) => boolean): T[]
}
```

```ts
type Filter = {
  <T>(array: T[], f: (item: T) => boolean): T[]
}

let filter: Filter = (array, f) => // ...

// (a) Tはnumberにバインドされます
filter([1, 2, 3], _ => _ > 2)

// (b） Tはstringにバインドされます
filter(['a', 'b'], _=> _ !== 'b')

// (c) Tは{firstName: string}にバインドされます
let names = [
  { firstName: 'beth' },
  { firstName: 'caitlyn' },
  { firstName: 'xin' }
]
filter(names, _ => _.firstName.startsWith('b'))
```

### 4.2.1 ジェネリックはいつバインドされるか？

```ts
type Filter = {
  <T>(array: T[], f: (item: T) => boolean): T[]
}

let filter: Filter = (array, f) =>
  // ...
```

```ts
type Filter<T> = {
  (array: T[], f: (item: T) => boolean): T[]
}

let filter: Filter = (array, f) =>  // エラー
  // ...

type OtherFilter = Filter           // エラー

let filter: FIlter<number> = (array, f) =>
  // ...

type StringFilter = Filter<string>
let stringFilter: StringFilter = (array, f) =>
  // ...
```

### 4.2.2 ジェネリックはどこで宣言できるか？
```ts
type Filter = { // 1
  <T>(array: T[], f: (item: T) => boolean) => T[]
}
let filter: Filter = // ...

type Filter<T> = { // 2
  (array: T[], f: (item: T) => boolean): T[]
}
let filter = Filter<number> = // ...

type Filter = <T>(array: T[], f: (item, T) => boolean) => T[] // 3
let filter: Filter = // ....

type Filter<T> = (array: T[], f: (item: T) => boolean) => T[] // 4
let filter: Filter<string> = // ...

function filter<T>(array: T[], f: (item: T) => boolean): T[] {
  // ...
} 
```
1. Tのスコープが個々のシグネチャに限られる。完全な呼び出しシグネチャ。Tのスコープは1つのシグネチャに限られるので、Filter型の関数を呼び出すときに、TypeScriptはこのシグネチャ内のTを具体的な型にバインドします。filterを呼び出すたびにTに対してそれぞれバインドが行われます。
2. Tのスコープがシグネチャ全体に及ぶ、完全な呼び出しシグネチャ。Tは（特定のシグネチャの型の一部としてではなく）Filterの型の一部として宣言されているので、Filter型の関数を宣言するときに、TypeScriptはTをバインドします。
3. 1と同様ですが、完全な呼び出しシグネチャの代わりに、省略記法の呼び出しシグネチャを使っています。
4. 2と同様ですが、完全な呼び出しシグネチャの代わりに、省略記法の呼び出しシグネチャを使っています。
5. 名前付き関数の呼び出しシグネチャ。Tのスコープはそのシグネチャに限られます。filterを呼び出すときに、TypeScriptは具体的な型をTにバインドします。また、filterを呼び出すたびに、Tに対してそれぞれバインドが行われます。

map関数を書いてみましょう
```ts
function map (array: unknown[], f: (item: unknown) => unknown): unknown[] {
  let result = []
  for (let i = 0; i < array.length; i++) {
    result[i] = f(array[i])
  }
}
```

```ts
function map<T, U> (array: T[], f: (item: T) => U): U[] {
  let result = []
  for (let i = 0; i < array.length; i++) {
    result[i] = f(array[i])
  }
  return result
}
```
### 4.2.3 ジェネリックの型推論

TypeScriptは、Tがstringであり、Uがbooleanであると推論します
```ts
function map<T> (array: T[], f: (item: T) => U): U[] {
  // ...
}

map(
  ['a', 'b', 'c'],  // Tの配列
  _ => _ === 'a'    // Uを返す関数
)
```

ジェネリックを明示的にアノテートすることもできます。ジェネリックについての明示的なアノテーションは、「すべてか無か」です。
```ts
map <string, boolean>(
  ['a', 'b', 'c'],
  _ => _ === 'a'
)

map<string> ( // エラー: 2個の型引数が必要ですが、1個が指定されました
  ['a', 'b', 'c'],
  _ => _ === 'a'
)
```

```ts
// booleanは boolean | string に割り当て可能なので、OK
map<string, boolean | string>(
  ['a', 'b', 'c'],
  _ => _ === 'a'
)

map<string, number>(
  ['a', 'b', 'c'],
  _ => _ === 'a'        // エラー
)
```


```ts
let promise = new Promise(resolve => 
  resolve(45)
)
promise.then(result =>  // unknown と推論されます
  result * 4            // エラー: オブジェクト型はunknownです
)
```

```ts
let promise = new Promise<number>(resolve =>
  resolve(45)
)

promise.then(result =>  // number
  result * 4
)
```

### 4.2.4 ジェネリック型エイリアス
clickやmousedownといったDOMイベントを表す、MyEventという型を定義してみましょう。
```ts
type MyEvent<T> = {
  target: T
  type: string
}
```
これが、型エイリアスの中でジェネリック型を宣言する唯一の有効な場所であることに注意してください。

```ts
type ButtonEvent = MyEvent<HTMLButtonElement>
```
MyEventのようなジェネリック型を使用する場合は、その型を使うときに、型パラメータを明示的にバインドする必要があります。
それらは推論されません。
``` ts
let myEvent: MyEvent<HTMLButtonElement | null> = {
  target: document.querySelector('#myButton'),
  type: 'click'
}
```

MyEventを使って別の型を作成することもできます。TimedEventのジェネリックTがバインドされるときに、TypeScriptはそれをMyEventにもバインドします。
```ts
type TimedEvent<T> = {
  event: MyEvent<T>
  from: Date
  to: Date
}
```

ジェネリック型エイリアスは、関数のシグネチャの中でも使うことができます。TypeScriptはある型をTにバインドするときに、それをMyEventにもバインドします。
```ts
function triggerEvent<T>(event: MyEvent<T>): void {
  // ...
}

triggerEvent({ // Tは Element | null
  target: document.querySelector('#myButton'),
  type: 'mouseover'
})
```

### 4.2.5 制限付きポリモーフィズム
「これらの型は何らかのジェネリックTであり、あれの型も同じ型Tでなければならない」というだけでは不十分な場合があります。
また、「型Uは<b>少なくとも</b>型Tでなければならない」と言いたい場合があります。これを、「Uに上限をつける」と言います。

1. 通常のTreeNode
2. 子ノードを持たないTreeNodeである、LeafNode
3. 子ノードを持つTreeNodeである、InnerNode

```ts
type TreeNode = {
  value: string
}

type LeafNode = TreeNode & {
  isLeaf: true
}

type InnerNode = TreeNode & {
  children: [TreeNode] | [TreeNode, TreeNode]
}
```

```ts
let a: TreeNode = { value: 'a' }
let b: LeafNode = { value: 'b', isLeaf: true }
let c: InnerNode = { value: 'c', children: [b] }

let a1 = mapNode(a, _ => _.toUpperCase()) // TreeNode
let b1 = mapNode(b, _ => _.toUpperCase()) // LeafNode
let c2 = mapNode(c, _ => _.toUpperCase()) // InnerNode
```

```ts
function mapNode<T extends TreeNode>(
  node: T,
  f: (value: string) => string
): T {
  return {
    ...node,
    value: f(node.value)
  }
}
 ```
