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

