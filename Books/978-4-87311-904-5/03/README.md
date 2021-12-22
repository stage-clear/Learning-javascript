# 型について

> 型 (type)<br>
> 値と、それを使ってできる事柄の集まり

## 3.1 型についての議論

```js
function squareOf (n) {
  return n * n
}

squareOf(2) // 4と評価されます
squareOf('z') // NaNと評価されます
```

```ts
function squareOf (n: number) {
  return n * n
}

squareOf(2)
squareOf('z')
```

## 3.2 型の初歩
### 3.2.1 any
```ts
let a: any = 666          // any
let b: any = ['danger']   // any
let c = a + b             // any
```

|オプション|説明|
|:-|:-|
|`noImplicitAny`|暗黙の`any`についてTypeScriptにエラーを出させるには、有効にします。`strict`を有効にしている場合は、それでOKです。|

### 3.2.2 unknown
少ないケースかもしれませんが、前もって本当に型がわからない値がある場合には、`any`ではなく、代わりに`unknown`を使ってください。
`unknown`は、`any`と同様に任意の値を表しますが、それが何であるかをチェックすることでそれを絞り込むまで、TypeScriptは`unknown`型の値の使用を許可しません。


```ts
let a: unknown = 30 // unknown
let b = a === 123   // boolean
let c = a + 10      // エラー
if (typeof a === 'number') {
  let d = a + 10    // number
}
```

1. TypeScriptが何かを`unknown`と推論することはありません -- 明示的な型アノテーションが必要です。
2. `unknown`型の値と他の値を比較することができます。
3. しかし、`unknown`値が特定の型であることを想定した事柄は行えません。初めに、値が本当にその型であることをTypeScriptに示す必要があります。

### 3.2.3 boolean
```typescript
let a = true            // boolean
var b = false           // boolean
const c = true          // true
let d: boolean = true   // boolean
let e: true = true      // true
let f: true = false     // エラー
```

1. 値がbooleanであることをTypeScriptに推論させることができます。
2. 値が特定のbooleanであることをTypeScriptに推論させることができます。
3. 値がbooleanであることをTypeScriptに明示的に伝えることができます。
4. 値が特定のbooleanであることをTypeScriptに明示的に伝えることができます。

> リテラル型　(<b>literal type</b>)<br>
> ただ一つの値を表し、それ以外の値は受け入れない型

### 3.2.4 number
```ts
let a = 1234              // number
var b = Infinity * 0.10   // number
const c = 5678            // 5678
let d = a < b             // boolean
let e: number = 100       // number
let f: 26.217 = 26.218    // 26.218
let g: 26.218 = 10        // エラー
```

1. 値が`number`であることをTypeScriptに推論させることができます。
2. `const`を使って、値が特定の`number`であることをTypeScriptに推論させることができます。
3. 値が`number`であることをTypeScriptに明示的に伝えることができます。
4. 値が特定の`number`であることをTypeScriptに明示的に伝えることができます。

```ts
let oneMillion = 1_000_000 // 1000000と同じです
let twoMillion: 2_000_000 = 2_000_000
```
### 3.2.5 bigint
```ts
let a = 1234n         // bigint
const b = 5678n       // 5678n
var c = a + b         // bigint
let d = a < 1235      // boolean
let e = 88.5n         //エラー（bigintリテラルは整数でなければなりません）
let f: bigint = 100n  //bigint
let g: 100n = 100n    // 100n
let h: bigint = 100   // エラー
```

### 3.2.6 string
```ts
let a = 'hello'         // string
var b = 'billy'         // string
const c = '!'           // '!'
let d = a + ' ' + b + c // string
let e: string = 'zoom'  // string
let f: 'john' = 'john'  // 'john'
let g: 'john' = 'zoe'   // エラー
```

### symbol
```ts
let a = Symbol('a')         // symbol
let b: symbol = Symbol('b') // symbol
var c = a === b             // boolean
let d = a + 'x'             // エラー
```
シンボルはsymbol型と推論されますが、次のようにして、シンボルを`unique symbol`と明示的に型付けすることができます。
```ts
const e = symbol('e')                 // typeof e
const f: unique symbol = Symbol('f')  // typeof f
let g: unique symbol = Symbol('f')    // エラー（unique symbolの変数は const である必要があります）

let h = e === e // boolean
let i = e === f // エラー
```

### 3.2.8 オブジェクト
> 構造的型付け（<b>structual typing</b>）<br>
> プログラミングのスタイルの一種で、あるオブジェクトが特定のプロパティを持つことだけを重複し、その名前が何であるか（名前的型付け）は気にしない。
> 一部の言語では、<b>ダックタイピング</b>とも呼ばれている。

```ts
let a: object = {
  b: 'x'
}

a.b // エラー
```
実は`object`は、`any`よりは少し限定されているのですが、それほど多くは違わないのです。

明示的なアノテーションを取り除き、TypeScriptに好きなようにやらせたら、どうなるでしょうか？
```ts
let a = {
  b: 'x'
}           // {b: string}
a.b         // string

let b = {
  c: {
    d: 'f'
  }
}           // {c: {d: string}}
```

```ts
let a: {b: number} = {
  b: 12
}           // {b: number}
```

```ts
let c: {
  firstName: string,
  lastName: string
} = {
  firstName: 'john',
  lastName: 'barrowman'
}

class Person {
  constructor (
    public firstName: string,   // publicは「this.firstName = firstName」の省略表現です
    public lastName: string
  ){}
}

c = new Person('matt', 'smith') // OK
```

```ts
let a: {b: number}
a = {}  // エラー

a = {
  b: 1,
  c: 2  // エラー
}
```

```ts
let a: {
  b: number // ❶
  c?: string // ❷
  [key: number]: boolean // ❸
}
```
1. aは、`number`であるプロパティbを持っています
2. aは、`string`であるプロパティcを持つ可能性があります。cを設定する場合、cは`undefined`でも構いません。
3. aは、`boolean`である数値プロパティを任意の数だけ持つことができます。

```ts
a = { b: 1} 
a = { b: 1, c: undefined }
a = { b: 1, c: 'd' }
a = { b: 1, 10: true }
a = { b: 1, 10: true, 20: false }
a = { 10: true }                  // エラー
a = { b: 1, 33: 'red' }           //　エラー
```

> インデックスシグネチャ<br>
> `[key: T]: U`という構文は、インデックスシグネチャ（index sigunature）と呼ばれます。

```ts
let airplaneSeatingAssignments: {
  [seatNumber: string]: string
} = {
  '340': 'Boris Cherny',
  '34E': 'Bill Gates'
}
```

```ts
let user: {
  readonly firstName: string
} = {
  firstName: 'abby'
}

user.firstName // string
user.firstName = 'abbey with an e'  // エラー
```

オブジェクトリテラル表記には特別なケースが１つあります。空のオブジェクト型です（`{}`）。

```ts
let danger: {}
danger = {}
danger = {x: 1}
danger = []
danger = 2
```
あるものをオブジェクトとして型付けするための最後の方法について触れておきます。それは`Object`です。
これは`{}`を使用するのとほぼ同じであり、できれば避けたほうがよいでしょう。

1. オブジェクトリテラル表記（たとえば、`{a: string}`）。「形状」とも呼ばれます。これは、オブジェクトがどのようなフィールドを持つかがわかっている場合や、オブジェクトのすべての値が同じ型を持つ場合に使います。
2. 空のオブジェクトリタれる表記（`{}`）。これはできるだけ避けてください。
3. `object`型。これは、単にオブジェクトが必要で、それがどのようなフィールドを持つか重視しない場合に使います。
4. `Object`型。これはできるだけ避けてください。

|値|{}|object|Object|
|:-|:-|:-|:-|
|`{}`|はい|はい|はい|
|`['a']`|はい|はい|はい|
|`function () {}`|はい|はい|はい|
|`new String('a')`|はい|はい|はい|
|`'a'`|はい|いいえ|はい|
|`1`|はい|いいえ|はい|
|`Symbol('a')`|はい|いいえ|はい|
|`null`|いいえ|いいえ|いいえ|
|`undefined`|いいえ|いいえ|いいえ|

### 3.2.9 型エイリアス、合併、交差
#### 3.2.9.1 型エイリアス

```ts
type Age = number

type Person = {
  name: string,
  age: Age
}
```

```ts
let age: Age = 55

let driver: Person = {
  name: 'James May',
  age: age
}
```

```ts
let age = 55

let driver: Person = {
  name: 'James May',
  age: age
}
```

JavaScriptの`let`や`const`による変数宣言と同様に、同じ型を2回宣言することはできません。
```ts
type Color = 'red'
type Color = 'blue' // エラー
```
`let`や`const`と同様に、型エイリアスはブロックスコープです。

```ts
type Color = 'red'

let x = Math.random() < .5

if (x) {
  type Color = 'blue' // これは上で宣言された Color を覆い隠します
  let b: Color = 'blue'
} else {
  let c: Color = 'red'
}
```

#### 3.2.9.2 合併型と交差型

```ts
type Cat = { name: string, purrs: boolean }
type Dog = { name: string, barks: boolean, wags: boolean }
type CatOrDogOrBoth = Cat | Dog
type CatAndDog = Cat & Dog
```

```ts
let a: CatOrDogOrBoth = {
  name: 'Bonkers',
  purrs: true,   // のどを鳴らす
}

// Dog
a = {
  name: 'Domino',
  barks: true,　   // 吠える
  wags: true     // 尻尾を振る
}

// 両方
a = {
  name: 'Donkers',
  barks: true,
  purrs: true,
  wags: true
}
```

```ts
let b: CatAndDot = {
  name: 'Domino',
  barks: true,
  purrs: true,
  wags: true
}
```

```ts
function trueOrNull (isTrue: boolean) {
  if (isTrue) {
    return 'true'
  }
  return null
}
```

```ts
type Returns = string | null
```

```ts
function (a: string, b: number) {
  return a || b
}
```

### 3.2.10 配列
```ts
let a = [1, 2, 3]       // number[]
var b = ['a', 'b']      // string[]
let c: string[] = ['a'] // string[]
let d = [1, 'a']        // (string | number)[]
const e = [2, 'b']      // (string | number)[]

let f = ['red']
f.push('blue')
f.push(true)            // エラー

let g = []              // any[]
g.push(1)               // number[]
g.push('red')           // (string | number)[]

let h: number[] = []    // number[]
h.push(1)               // number[]
h.push('red')           // エラー
```

```ts
let d = [1, 'a']

d.map(_ => {
  if (typeof _ === 'number') {
    return _ * 3
  }
  return _.toUpperCase()
})
```

```ts
function buildArray () {
  let a = []    // any[]
  a.push(1)     // number[]
  a.push('x')   // (string | number)[]
  return a
}

let myArray = buildArray()  // (string | number)[]
myArray.push(true)          // エラー
```

### 3.2.11 タプル
他の多くの型と違って、タプルを宣言するときには、明示的に型付けする必要があります。
```ts
let a: [number] = [1]

// [名前, 名字, 生まれ年]のタプル
let b: [string, string, number] = ['malcolm', 'gladwell', 1963]

b = ['queen', 'elizabeth', 'ii', 1926] // エラー
```
タプルは省略可能な要素もサポートしています。

// 鉄道運賃の配列。方向によって異なる場合があります。
```ts
let trainFares: [number, number?][] = [
  [3.75],
  [8.25, 7.70],
  [10.50]
]

// これは次のものと同等です
let moreTrainFares: ([number] | [number, number])[] = [
  // ...
]
```

タプルは可変長の要素もサポートしています（最小限の長さ）。

```ts
// 少なくとも1つの要素（とそれに続く可変長の要素）を持つ、文字列のリスト
let friends: [string, ...string[]] = ['Sara', 'Tali', 'Chloe', 'Claire']

// 不均一なリスト
let list: [number, boolean, ...string[]] = [1, false, 'a', 'b', 'c']
```
#### 3.2.11.1 読み取り専用の配列とタプル

```ts
let as: readonly number[] = [1, 2, 3]     // readonly number[]
let bs: readonly number[] = as.concat(4)  // readonly number[]
let three = bs[2]                         // number

as[4] = 5   // エラー
as.push(6)  // エラー
```

```ts
type A = readonly string[]          // readonly string[]
type B = ReadonlyArray(string)      // readonly string[]
type C = Readonly<string[]>         // readonly string[]

type D = readonly [number, string]  // readonly [number, string]
type E = Readonly<[number, string]> // readonly [number, string]
```

### 3.2.12 null, undefined, void, never
```ts
// (a) numberまたはnullを返す関数
function a (x: number) {
  if (x < 10) {
    return x
  }
  return null
}

// (b) undefined を返す関数
function b () {
  return undefined
}

// (c) voidを返す関数
function c () {
  let a = 2 + 2
  let b = a * a
}

// (d) neverを返す関数
function d () {
  throw TypeError('I always error')
}

// (e) neverを返すもうひとつの関数
function e () {
  while (true) {
    doSomething()
  }
}
```

|型|説明|
|:-|:-|
|`null`|値の欠如|
|`undefined`|値がまだ割り当てられていない変数|
|`void`|return文を持たない関数の戻り値|
|`never`|決して戻ることのない関数の戻り値|

### 3.2.13 列挙型
列挙型（enum）は、ある型について取り得る値を列挙する（enumerate）方法です。
列挙型は、コンパイル時にキーが固定されているオブジェクトのようなものと考えてください。

```ts
enum Language {
  English,
  Spanish,
  Russian
}
```

> 慣例により、列挙型の名前は、大文字で始まる単数系です。列挙型のキーも大文字で始めます。

TypeScriptは、enumの各メンバーの値として数値を自動的に推論しますが、明示的に値を設定することもできます。
```ts
enum Language {
  English = 0,
  Spanish = 1,
  Russian = 2
}

let myFirstLanguage = Language.Russian      // Language
let mySecondLanguage = Language['English']  // Language
```

enumを複数の宣言にまたがって分割することができ、TypeScriptはそれらを自動的にマージします。
ただし、実際にenumを分割する場合、TypeScriptはそれらの宣言のうちの1つについてしか値を推論できないので、enumの各メンバーに明示的に値を割あてるとよいでしょう。
```ts
enum Language {
  English = 0,
  Spanish = 1
}

enum Language {
  Russian = 2
}
```
計算される値を使うこともできますし、そのすべてを定義する必要もありません。
```ts
enum Language {
  English = 100,
  Spanish = 200 + 300,
  Russian             // TypeScriptは501と推論します。
}
```

enumには文字列を使うこともできますし、文字列値と数値を混ぜることもできます。
```ts
enum Color {
  Red = '#c10000',
  Blue = '#007ac1',
  Pink = 0xc10050,    // 16進リテラル
  White = 255         // 10進リテラル
}

let red = Color.Red   // Color
let pink = Color.pink // Color
```
TypeScriptでは、利便性を考慮して、値とキーどちらを使ってもenumにアクセスできますが、これにより、たちまち危険に陥る可能性があります。
```ts
let a = Color.Red     // Color
let b = Color.Green   // エラー（Greenは存在しません）
let c = Color[255]    // string
let d = Color[6]      // string(!!!)
```

const enumを使って、enumの振る舞いをより安全なサブセットに制限することで、この種の危険なアクセスを防ぐようにTypeScriptに要求できます。
```ts
const enum Language {
  English,
  Spanish,
  Russian
}

// 有効なenumキーにアクセスします
let a = Language.English    // Language

// 無効なenumキーにアクセスします
let b = Language.Tagalog    // エラー

// 有効なenum値にアクセスします
let c = Language[0]         // エラー（const 列挙型メンバーは文字列リテラルを使用してのみアクセスできます）

// 無効なenum値にアクセスします
let d = Launguage[6]        // エラー
```

`const enum`の使い方

```ts
const enum Flippable {
  Burger,
  Chair,
  Cup,
  Skateboard,
  Table
}

function flip (f: Flippable) {
  return 'flipped it'
}

flip(Flippable.Chair)   // 'flipped it'
flip(Flippable.Cup)     // 'flipped it'
flip(12)                // 'flipped it' (!!!)
```

```ts
const enum Flippable {
  Burger = 'Burger',
  Chair = 'Chair',
  Cup = 'Cup',
  Skateboard = 'Skateboard',
  Table = 'Table'
}

function flip (f: Flippable) {
  return 'flipped it'
}

flip(Flippable.Chair)   // 'flipped it'
flip(Flippable.Cup)     // 'flipped it'
flip(12)                // エラー
flip('Hat')             // エラー
```

> 列挙型の安全な使用には落とし穴が伴うため、列挙型の使用は控えることをお勧めします。
> TypeScriptには、ほかにもよい表現方法がたくさんあります。

## 3.3 まとめ
|型|サブタイプ|
|:-|:-|
|`boolean`|真偽値リテラル|
|`bigint`|BigIntリテラル|
|`number`|数値リテラル|
|`string`|文字列リテラル|
|`symbol`|`unique symbol`|
|`object`|オブジェクトリテラル|
|配列|タプル|
|`enum`|`const enum`|

## 3.4 練習問題
