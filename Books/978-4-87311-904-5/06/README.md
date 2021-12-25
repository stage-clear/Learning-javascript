# 高度な型

## 6.1 型の間の関係

### 6.1.1 サブタイプとスーパータイプ
> <b>サブタイプ(subtype)</b><br>
> A、Bという2つの型があり、BがAのサブタイプ（派生型）である場合、Aが要求されるところではどこでも、Bを安全に使うことができます。

> <b>スーパータイプ(supertype)</b><br>
> A、Bという2つの型があり、BがAのスーパータイプ（上位型）である場合、Bが要求されるところではどこでも、Aを安全に使うことができます。

### 6.1.2 変性
- 「A <: B」は、「Aが型Bのサブタイプであるか、またはBと同じ型である」ことを表します。
- 「A >: B」は、「Aが型Bのスーパータイプであるか、またはBと同じ型である」ことを表します。

#### 6.1.2.1 形状と配列の特性
- <b>不変性（invariance）</b>: Tそのものを必要とする
- <b>共変性（covariance）></b>: <:Tであるものを必要とする
- <b>反変性（contravariance）</b>: >:Tであるものを必要とする
- <b>双変性（bivariance）</b>: <:Tまたは>:TであればOK

#### 6.1.2.2 関数の変性

```ts
class Animal {}
class Bird extends Animal {
  chirp() {}
}

class Crow extends Bird {
  caw() {}
}
```

```ts
function chirp(bird: Bird): Bird {
  bird.cirp()
  return bird
}
```

```ts
chirp(new Animal) // エラー
chirp(new Bird)
chirp(new Crow)
```
```ts
function clone (f: (b: Bird) => Bird): void {
  // ...
}
```

```ts
function birdToBird (b: Bird): Bird {
  // ...
}
clone(birdToBird) // OK
```

```ts
function birdToCrow (d: Bird): Crow {
  // ...
}
clone(birdToCrow) // OK

function birdToAnimal (d: Bird): Animal {
  // ...
}
clone(birdToAnimal) // エラー
```

```ts
function clone (f: (b: Bird) => Bird): void {
  let parent = new Bird
  let babyBird = f(parent)
  babyBird.chirp()
}
```

```ts
function animalToBird (a: Animal): Bird {
  // ...
}
clone(animalToBird) // OK

function crowToBird (c: Crow): Bird {
  // ...
}
clone(crowToBird) // エラー
```

|TSCフラグ|説明|
|:-|:-|
|`strictFunctionTypes`|より安全な<b>反変</b>な振る舞いを選択する|

### 6.1.3 割り当て可能性
1. A <: B である
2. Aが`any`である

`enum`または`const enum`のキーワードを使って作成する列挙型については、次のいずれかが真であれば、型Aは列挙型Bに割り当て可能です。
1. Aが列挙型Bのメンバーである
2. Bが、`number`であるメンバーを少なくとも1つ持っており、Aが`number`である

### 6.1.4 型の拡大
ある変数を、後で変更することを許可する方法で（たとえば、`let`や`var`を使って）宣言する場合、
その変数の型は、そのリテラル値から、そのリテラルが属するベースの型へと拡大されます。
```ts
let a = 'x'         // string
let b = 3           // number
var c = true        // boolean
const d = [ x: 3 }  // { x: number }

enum E {X, Y, Z }
let e = E.X         // E
```
イミュータブル（変更不可能）な宣言については、そうではありません。
```ts
const a = 'x'       // 'x'
const b = 3         // 3
const c = true      // true

enum E {X, Y, Z}
const e = E.X       // E.X
```
明示的な型アノテーションを使うと、型が拡大されるのを防ぐことができます。
```ts
let a: 'x' = 'x'      // 'x'
let b: 3 = 3          // 3
var c: true = true    // true
const d: {x: 3} = {x: 3} // {x: 3}
```
拡大されない型を、`let`や`var`を使って再割り当てすると、TypeScriptはそれを拡大します。
その型を狭く保つようにTypeScriptに指示するには、元の宣言に明示的な型アノテーションを追加します。
```ts
const a = 'x'     // 'x'
let b = a         // string

const c: 'x' = 'x'  // 'x'
let d = c           // 'x'
```

`null`または`undefeind`に初期化された変数は`any`に拡大されます。
```ts
let a = null      // any
a = 3             // any
a = 'b'           // any
```

しかし、`null`または`undefined`に初期化された変数が、それが宣言されたスコープを離れると、TypeSciriptは明確な型をそれに割り当てます。
```ts
function x () {
  let a = null      // any
  a = 3             // any
  a = 'b'           // any
  return a
}

x()                 // string
```

##### 6.1.4.1 constアサーション

```ts
let a = {x: 3}            // {x: number}
let b: {x: 3}             // {x: 3}
let c = {x: 3} as const   // {readonly: x: 3}
```

```ts
let d = [1, {x: 2}]     // (number | { x: number})[]
let e = [1, {x: 2}] as const // readonly [1, {readonly x: 2}]
```

#### 6.1.4.2 過剰プロパティチェック
```ts
type Options = {
  baseURL: string,
  cacheSize?: number
  tier?: 'prod' | 'dev'
}

class API {
  constructor(private options: Options) {}
}

new API({
  baseURL: 'https://ap.mysite.com',
  tier: 'prod'
})
```

ここで、もしスペルミスをしたら、何がおこるでしょうか？
```ts
new API({
  baseURL: 'https://api.mysite.com',
  tierr: 'prod'                       // エラー
})
```

```ts
type Options = {
  baseURL: string
  cacheSize?: number
  tier?: 'prod' | 'dev'
}

class API {
  constructor(private options: Options) {}
}

new API({
  baseURL: 'https://api.mysite.com',
  tier: 'prod'
})

new API({
  baseURL: 'https://api.mysite.com',
  badTier: 'prod'
})

new API({
  baseURL: 'https://api.mysite.com',
  badTier: 'prod'
} as Options)

let badOptions = {
  baseURL: 'https://api.mysite.com',
  badTier: 'prod'
}

new API(badOptions)

let optiosn: Options = {
  baseURL: 'https://api.mysite.com',
  badTier: 'prod'
}
new API(options)
```

### 6.1.5 型の絞り込み
例を見てみましょう。私たちは、CSSルールをTypeScriptで定義するためのAPIを作成済みであり、同僚がそれを使ってHTML要素の`width`を仮定します。
```ts
// 文字列リテラルの合併型を使って、CSSの単位が取り得る値を表現します。
type Unit = 'cm' | 'px' | '%'

// 単位を列挙します
let units = Unit[] = ['cm', 'px', '%']

// 各単位をチェックし、一致するものがなければnullを返します
function parsUnit (value: string): Unit | null {
  for (let i = 0; i < units.length; i++ {
    if (value.endWith(units[i]) {
      return units[i]
    }
  }
  return null
}
```

```ts
type Width = {
  unit: Units
  value: number
}

function parseWidth (width: number | string | null | undefined): Width | null {
  // widthがnullまたはundefinedであれば、すぐに戻ります
  if (width == null) {
    return null
  }
  
  // widthがnumberであれば、ピクセルをデフォルトの単位とします
  if (typeof width === 'number') {
    return { unit: 'px': value: width }
  }
  
  // widthから単位を解析します
  let unit = parseUnit(width)
  if (unit) {
    return {unit, value: parseFloat(width)}
  }
  
  // どれでもなければ、nullを返します
  return null
}
```

#### 6.1.5.1 タグ付き合併型

```ts
type UserTextEvent = { value: string }
type UserMouseEvent = { value: [number, number] }

type UserEvent = UserTextEvent | UserMouseEvent

function handle (event: UserEvent) {
  if (typeof event.value === 'string') {
    event.value // string
    // ...
    return
  }
  event.value // [number, number]
}

```

```ts
type UserTextEvent = { value: string, target: HTMLInputElement }
type UserMouseEvent = { value: [number, number], target: HTMLElement }

type UserEvent = UserTextEvent | UserMouseEvent

function handle (event: UserEvent) {
  if (typeof event.value === 'string') {
    event.value // string
    event.target // HTMLInputElement | HTMLElement (!!!)
    // ...
    return 
  }
  event.value // [number, number]
  event.target  // HTMLInputElement | HTMLElement (!!!)
}
```

よいタグとは次のようなものです。
- 合併型のそれぞれのケースにおいて同じ場所に存在すること。これは、オブジェクト型の合併の場合はオブジェクトフィールドを意味し、タプル型の合併の場合は同じインデックスを意味します。実際には、タグ付けされる合併型は、たいていオブジェクト型を使います。
- リテラル型として型付けされていること（リテラルの文字列、数値、booleanなど）。さまざまな型のリテラルを混ぜて、それに一致させることもできますが、１つの型（通常は文字列リテラル型）だけを使うのがよいでしょう。
- ジェネリックでないこと。タグは、ジェネリック型の引数を取るべきではありません。
- 互いに排他的であること（すなわち、合併型の中で一意であること）

```ts
type UserTextEvent = { type: 'TextEvent', value: string, target: HTMLInputElement }
type UserMouseEvent = { type: 'MouseEvent', value: [number, number], target: HTMLElement }

type UserEvent = UserTextEvent | UserMouseEvent

function handle (event: UserEvent) {
  if (event.type === 'TextEvent') {
    event.value // string
    event.target // HTMLInputElement
    // ...
    return
  }
  event.value   // [number, number]
  event.target  // HTMLElement
}
```

## 6.2 完全性

```ts
type Weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'
type Day = Weekday | 'Sat' | 'Sun'

function getNextDay (w: Weekday): Day {
  switch (w) {
    case 'Mon': return 'Tue'
  }
}
```

```ts
function isBig (n: number) {
  if (n >= 100) {
    return true
  }
}
```

|TSCフラグ|説明|
|:-|:-|
|`noImplicitReturns`|関数のすべてのコードパス（コードの経路）が値を返すことをチェックする|

## 6.3 高度なオブジェクト型

### 6.3.1 オブジェクト型についての型演算子
#### 6.3.1.1 ルックアップ型

```ts
type APIResponse = {
  user: {
    userId: string
    friendList: {
      const: number
      friends: {
        firstName: string
        lastName: string
      }[]
    }
  }
}
```

```ts
function getAPIResponse(): Promise<APIResponse> {
  // ...
}

function renderFriendList(friendList: unknown) {
  // ...
}
```

```ts
type FriendList = {
  cont: number
  friends: {
    firstName: string
    lastName: string
  }[]
}

function renderFriendList (friendList: FriendList) {
  // ..
}
```


```ts
type APIResponse = {
  user: {
    userId: string
    friendList: FriendList
  }
}

type FriendList = APIResponse['user']['friendList']

function renderFriendList(friendList: FriendList) {
  // ...
}
```

```ts
type Friend = FriendList['friends'][number]
```

#### keyof演算子
`keyof`を使うと、オブジェクトのすべてのキーを、文字列リテラル型の合併として取得できます。

```ts
type ResponseKeys = keyof APIResponse // 'user'
type UserKeys = keyof APIResponse['user'] // 'userId' | 'friendList'
type FriendListKeys =
  keyof APIResponse['user']['friendList'] // 'count' | 'friends'
```

ルックアップ型と`keyof`演算子と組み合わせると、型安全なゲッター関数を実装することができ、オブジェクト内の指定されたキーの値を取得することができます。
```ts
function get<
  O extends object,
  K extends keyof O
>(
  o: O,
  k: K
): O[K] {
  return o[k]
}
```

```ts
type ActivityLog = {
  lastEvent: Date
  events: {
    id: string
    timestamp: Date
    type: 'Read' | 'Write'
  }
}

let activityLog: ActivityLog = // ...
let lastEvent = get(activeityLog, 'lastEvent')  // Date
```

最大で3つのキーまで受け付けるように、`get`をオーバーロードしてみましょう
```ts
type Get = {
  <
    O extends object,
    K1 extends keyof O
  >(o: O, k1: K1): O[K1:
  <
    O extends object,
    K1 extends keyof O,
    K2 extends keyof O[K1]
  >(o: O, k1: K1, k2: K2): O[K1][K2]
  <
    O extends object,
    K1 extends keyof O,
    K2 extends keyof O[K1],
    K3 extends keyof O[K1][K2]
  >(o: O, k1: K1, k2: K2, k3: K3): O[K1][K2][K3]
}

let get: Get = (object: any, ...keys: string[]) => {
  let result = object
  keys.forEach(k => result = result[k])
  return result
}

get(activityLog, 'events', 0, 'type')  // 'Read' | 'Write'

get(activityLog, 'bad')
```

|TSCフラグ|説明|
|:-|:-|
|`keyofStringsOnly`|キーは文字列でなければならない|

### 6.3.2 レコード型

```ts
type Weekday = 'Mon' | 'Tue' | 'Wed' | ' Thu' | 'Fri'
type Day = Weekday | 'Sat' | 'Sun'

let nextDay: Record<Weekday, Day> {
  Mon: 'Tue'
}
```

## 6.3.3 マップ型

```ts
let nextDay: {[K in Weekday]: Day} = {
  Mon: 'Tue'
}
```

```ts
type MyMappedType = {
  [key in UnionType]: ValueType
}
```

```ts
type Record<K extends keyof any, T> {
  [P in K]: T
}
```

```ts
type Account = {
  id: number
  isEmployee: boolean
  notes: string[]
}

// 全てのフィールドを省略可能にします
type OptionalAccount = {
  [K in keyof Account]?: Account[K]
}

// すべてのフィールドをnull許容にします
type NullableAccount = {
  [K in keyof Account]: Account[K] | null
}

// すべてのフィールドを右読み取り専用にします
type ReadonlyAccount = {
  readonly [K in keyof Account]: Account[K]
}

// すべてのフィールドを再び書き込み可能にします（Accountど同等）
type Account2 = {
  -readonly [K in keyof ReadonlyAccount]: Account[K]
}

// すべてのフィールドを再び必須にします
type Account3 = {
  [K in keyof OptionalAccount]-?: Account[K]
}
```

#### 6.3.3.1 組み込みのマップ型

- `Record<Keys, Values>`: Keys型のキーとValues型の値を持つオブジェクト
- `Partial<Object>`: Object内のすべてのフィールドを省略可能と指定します
- `Rquired<Object>`: Object内のすべてのフィールドを必須（省略不可）と指定します。
- `Readonly<Object>`: Object内のすべてのフィールドを読み取り専用と指定します
- `Pick<Object, Keys>`: 指定されたKeysだけを持つ、Objectのサブタイプを返します。


### 6.3.4 コンパニオンオブジェクトパターン

```ts
type Unit = 'EUR' | 'GBP' | 'JPY' | 'USD'

export type Currency = {
  unit: Unit
  value: number
}

export let Currency = {
  from (value: number, unit: Unit): Currency {
    return {
      unit: unit,
      value
    }
  }
}
```

```ts
import {Currency} from './Currency'

let amountDue: Currency = {
  unit: 'JPY',
  value: 83733.10
}

let otherAmountDue = Currency.from(330, 'EUR')
```

## 6.4 関数にまつわる高度な型

### 6.4.1 タプルについての型推論の改善

``` ts
let a = [1, true] // (number | boolean)[]
```

```ts
function tuple<
  T extends unknown[]
>(
  ...ts: T
): T {
  return ts
}

let a = tuple(1, true)  // [number, boolean]
```

### 6.4.2 ユーザー定義型ガード

```ts
function isString(a: unknown): boolean {
  return typeof a === 'string'
}

isString('a') // true
isString([7]) // false
```

```ts
function parseInput(input: string | number) {
  let formattedInput: string
  if (isString(input)) {
    formattedInput = input.toUpperCase()  // ラー
  }
}
```


```ts
// ユーザー定義型ガード
function isString(a: unknown): a is string {
  return typeof a === 'string'
}
```

```ts
type LegacyDialog = // ...
type Dialog = // ...

function isLegacyDialog (
  dialog: LegacyDialog | Dialog
): dialog is LegacyDialog {
  // ...
}
```







