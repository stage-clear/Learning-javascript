# クラスとインターフェース
TypeScriptはC#から多くのものを借用しており、アクセス修飾子、プロパティ初期化子、ポリモーフィズム、デコレーター、インターフェースといったものをサポートしています。

## 5.1 クラスと継承
ここでは、チェスのエンジンを作成します。

```ts
// チェスのゲームを表します
class Game {}

// チェスの駒
class Piede {}

// 駒の位置（座標）
class Position {}
```
チェスには6種類の駒があります。

```ts
// ...
class King extends Piece {}     // キング
class Queen extends Piece {}    // クイーン
class Bishop extends Piece {}   // ビショップ
class Knight extends Piece {}   // ナイト
class Rook extends Piece {}    // ルーク
class Pawn extends Piece {}     // ポーン
```

駒を表すPieceクラスに、色と位置を追加しましょう。

```ts
type Color = 'Black' | 'White'
type File = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'
type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 // 1

class Position {
  constructor(
    private file: File, // 2
    private rank: Rank
  ) {}
}

class Piece {
  protected position: Position  // 3
  
  constructor(
    private readonly color: Color,  // 4
    file: File,
    rank: Rank
  ) {
    this.position = new Position(file, rank)
  }
}
```

|TSCフラグ|説明|
|:-|:-|
|`strictNullChecks` `strictPropertyInitialization`|クラスのインスタンス変数に関する明確な割り当てのチェックを選択する|

|アクセス修飾子|説明|
|:-|:-|
|`public`|どこからでもアクセス可能。これがデフォルトのアクセスレベルです。|
|`protected`|このクラスとサブクラスのインスタンスからアクセス可能。|
|`private`|このクラスのインスタンスからのみアクセス可能。|

私たちは`Piece`クラスを定義しましたが、ユーザーには新しい`Piece`を直接インスタンス化してほしくはありません。
つまり、`Piece`を拡張して`Queen`や`Bishop`などを作成し、それをインスタンス化してほしいのです。
`abstract`キーワードを使うと、型システムによって、私たちの代わりにそれを強制することができます。

```ts
// ...
abstract class Piece {
  constructor (
    //...
  )
}
```
`abstract`が指定されたクラスは、<b>抽象クラス</b>(abstract class)と呼ばれます。
抽象クラスである`Piece`を直接インスタンス化しようとすると、TypeScriptはエラーを出します。

```ts
new Piece('White', 'E', 1)    // エラー
```

`abstract`キーワードは、そのクラスを直接インスタンス化できないことを意味しますが、そのクラスにメソッドを定義できないということではありません。
```ts
// ...
abstract class Piece {
  // ...
  moveTo(position: Position) {
    this.position = position
  }
  
  abstract canMoveTo(position: Position): boolean
}
```

```ts
// ...
class Position {
  // ...
  distanceFrom (position: Position) {
    return {
      rank: Math.abs(position.rank - this.rank),
      file: Math.abs(position.file.charCodeAt(0) - this.file.charCodeAt(0))
    }
  }
}

class King extends Piece {
  canMoveTo (position: Position) {
    let distance = this.position.distanceFrom(position)
    return distance.rank < 2 && distance.file < 2
  }
}
```

新しいゲームを始めるときに、チェス盤と駒を自動的に作成します
```ts
// ...
class Game {
  private piece = Game.makePieces()
  
  private static makePieces() {
    return [
      // キング
      new King('White', 'E', 1),
      new King('Black', 'E', 8),
      
      // クイーン
      new Queen('White', 'D', 1),
      new Queen('Black', 'D', 8),
      
      // ビショップ
      new Bishop('White', 'C', 1),
      new Bishop('Black', 'F', 1),
      new Bishop('White', 'C', 8),
      new Bishop('Black', 'F', 8),
      
      // ...
    ]
  }
}
```

- `class`キーワードを使ってクラスを宣言します。`extends`キーワードを使ってそれらを拡張します。
- クラスは、抽象クラスか具象クラスかのどちらかになれます。抽象クラスは、抽象メソッドや抽象プロパティを持つことができます。
- メソッドには、`private` `protexted` `public`のいずれかを指定できます。デフォルトは`public`です。メソッドは、インスタンスに属するインスタンスメソッドか、クラスの属する静的メソッド（`static`メソッド)のいずれかになります。
- クラスはインスタンスプロパティを持つことができます。これにも、`private` `protected` または、デフォルトの`public`を指定できます。それらは、コンストラクターのパラメーターの中で、またはプロパティ初期化子として宣言することができます。
- インスタンスプロパティを宣言するときに、それらを`readonly`と指定することができます。

## 5.2 super
`super`呼び出しには2つの種類があります。
- メソッド呼び出し。たとえば、`super.take()`。
- コンストラクター呼び出し。これは`super()`という特別な形式を持ち、コンストラクター関数からのみ呼び出せます。子クラスにコンストラクター関数がある場合は、クラスを正しく設定するために、子クラスのコンストラクターから`super()`を呼び出す必要があります（心配要りません。もし忘れても、TypeScriptが警告してくれます）。

`super`を使ってアクセスできるのは親クラスのメソッドだけであり、プロパティにはアクセスできないことに注意してください。

## 5.3 戻り値の型としてthisを使用する

ES6のデータ構造`Set`の簡略版を作ってみましょう
```ts
let set = new Set()
set.add(1).add(2).add(3)
set.has(2)  // true
set.has(4)  // false
```

```ts
class Set {
  has(value: number): boolean {
    // ...
  }
  add (value: number): Set {
    // ...
  }
}
```

Setのサブクラスを作ろうとすると何が起こるでしょうか
```ts
class Mutable extends Set {
  delete (value: number): boolean {
    // ....
  }
}
```
当然ですが、`Set`の`add`メソッドは`Set`を返してきます。サブクラスの`MutableSet`では、これをオーバーライドする必要があります。
```ts
class MutableSet extends Set {
  delete (value: number): boolean {
    // ...
  }
  add (value: number): MutableSet {
    // ...
  }
}
```

```ts
class Set {
  has (value: number): boolean {
    // ...
  }
  add (value: number): this {
    // ...
  }
}

class MutableSet extends Set {
  delete (value: number): boolean {
    // ...
  }
}
```

## 5.4 インターフェース

```ts
type Sushi = {
  calories: number
  salty: boolean
  tasty: boolean
}
```
これをインターフェースとして書き直すのは簡単です。
```ts
interface Sushi {
  calories: number
  salty: boolean,
  tasty: boolean
}
```
型を組み合わせると、話はさらに興味深くなります。
```ts
type Cake = {
  calories: number
  sweet: boolean
  tasty: boolean
}
```

```ts
type Food = {
  calories: number
  tasty: boolean
}

type Sushi = {
  salty: boolean
}

type Cake = {
  sweet: boolean
}
```
ほぼ同じことをインターフェースを使っても実現できます。
```ts
interface food {
  calories: number
  tasty: boolean
}

interface Sushi extends Food {
  salty: boolean
}

interface Cake extends Food {
  sweet: boolean
}
```

型とインターフェースの違いは何でしょうか？<br>
第一の違いは、型エイリアスのほうが、右辺に任意の型を指定できるという点で、より汎用的であることです。<br>
次のような型エイリアスをインターフェースとして書き直す方法はありません。

```ts
type A = number
type B = A | string
```
第二の違いは、インターフェースを拡張する場合に、TypeScriptは、拡張元のインターフェースが拡張先のインターフェースに割り当て可能かどうかを確認することです。
```ts
interface A {
  good(x: number): string
  bad(x: number): string
}

interface B extends A {
  good:(x: number | number): string
  bad(x: string): string // エラー: BはAを正しく拡張していません
}
```

第三の違いは、同じスコープ内に同じ名前のインターフェースが複数存在する場合、それらは自動的にマージされることです。これは<b>宣言マージ</b>と呼ばれる機能です。
同じスコープ内に同じ名前の型エイリアスが存在すると、コンパイル時エラーになります。

### 5.4.1 宣言のマージ
たとえば、`User`というまったく同じ名前を持つ2つのインターフェースを宣言した場合、TypeScriptは、あなたの代わりに自動的にそれらを結合し、1つのインターフェースにまとめます。

```ts
// Userは1つのフィールド、nameを持ちます。
interface User {
  name: string
}

// この時点でUserは2つのフィールド、nameとageを持ちます
interface User {
  age: number
}

let a: User = {
  name: 'Ashley',
  age: 30
}
```

これを型エイリアスを使って書き直すとエラーになります。
```ts
type User = {     // エラー
  name: string
}

type User = {     // エラー
  age: number
}
```

2つのインターフェースは矛盾してはいけないことに注意してください。
```ts
interface User {
  age: string
}

interface User {
  age: number       // エラー
}
```

```ts
interface User<Age extends number> {    // エラー: Userのすべての宣言には、同一の型パラメータがある必要があります
  age: Age
}

interface User<Age extends string> {
  age: Age
}
```

### 5.4.2 実装
クラスを宣言するときに`implements`キーワードを使うと、そのクラスが特定のインターフェースを満たしていることを表現できます。

```ts
interface Animal {
  eat(food: string): void
  sleep(hours: number): void
}

class Cat implements Animal {
  eat(food: string) {
    console.info('Ate some', food, '. Mmm!')
  }
  sleep(hours: number) {
    console.info('Slept for', hours, 'hours')
  }
}
```

インターフェースはインスタンスプロパティを宣言することができますが、アクセス修飾子（`private` `protected` `public`）を宣言することはできず、`static`キーワードを使うこともできません。
また、オブジェクト型に対して行ったように、インスタンスプロパティを`readonly`と指定することができます。

```ts
interface Animal {
  readonly name: string
  eat(food: string): void
  sleep(hours: number): void
}
```

クラスが実装できるのは、1つのインターフェースだけに限りません。
```ts
interface Animal {
  readonly name: string
  eat(food: string): void
  sleep(hours: number): void
}

interface Feline {
  meow(): void
}

class Cat implements Animal, Feline {
  name = 'Whiskers'
  eat (food: string) {
    console.info('Ate some', food, '. Mmm!')
  }
  sleep (hours: number) {
    console.info('Slept for', hours, 'hours')
  }
  meow () {
    console.info('Meow')
  }
}
```

### 5.4.3 「インターフェースの実装」対「抽象クラスの拡張」
インターフェースを実装することと抽象クラスを拡張することは、よく似ています。
違いは、インターフェースのほうがより汎用的で、軽量であり、抽象クラスはより目的に特化していて、機能が豊富であることです。

インターフェースは、形状をモデル化するための方法です。
値レベルでは、それはオブジェクト、配列、関数、クラス、クラスインスタンスを意味します。インターフェースはJavaScriptコードを発行せず、コンパイル時のみ存在します。

抽象クラスがモデル化できるのは、クラスだけです。抽象クラスは、ランタイムコードを発行します。
お察しのとおり、これはJavaScriptのクラスです。抽象クラスはコンストラクターを持つことができ、デフォルトの実装を提供することができ、プロパティやメソッドにアクセス修飾子を設定できます。
インターフェースではこれらのことはできません。
どちらを使用するかは、ケースによって異なります。複数のクラスの間で実装を共有する場合は、抽象クラスを使います。「このクラスはTである」と表現するための軽量な方法が必要な場合は、インターフェースを使います。

## 5.5 クラスは構造的に型付けされる
他の全ての型と同様に、TypeScriptはクラスを、その名前によってではなく、その構造によって比較します。
たとえば、次のような`Zebra`を取る関数があり、それに対して`Poodle`を渡したとしても、TypeScriptは気にしません。
```ts
class Zebra {
  trot () {
    // ...
  }
}

class Poodle {
  trot () {
    //...
  }
}

function ambleAround(animal: Zebra) {
  animal.trot()
}

let zebra = new Zebra
let poodle = new Poodle

ambleAround(zebra)    // OK
ambleAround(poodle)   // OK
```
このルールの例外は、`private`や`protected`のフィールドを持つクラスです。
```ts
class A {
  private x = 1
}

class B extends A {}

function f(a: A) {}

f(new A)      // OK
f(new B)      // OK
f({x: 1})     // エラー
```

## 5.6 クラスは値と型の両方を宣言する
TypeScriptで表現できることの多くは、値か型の「どちらか」です。

```ts
// 値
let a = 1999
function b () {}

// 型
type a = number
interface b {
  (): void
}
```

```ts
// ...
if (a + 1 > 3) // ... // a を値として使っていることを、TypeScriptは文脈から推論します
let x: a = 3          // a を型として使っていることを、TypeScriptは文脈から推論します
```

クラスと列挙型は特別です。それらが独特なのは、型の名前空間の中に型を、値の名前空間の中に値を、両方とも生成するからです。

```ts
class C {}

let c: C    // 1
  = new C   // 2

enum E {F, G}
let e: E    // 3
  = E.F     // 4
```

1. この文脈では、`C`は、`C`クラスのインスタンス型を指しています。
2. この文脈では、`C`は、値である`C`を指しています。
3. この文脈では、`E`は、列挙型`E`の型を指しています。
4. この文脈では、`E`は、値である`E`を指しています。

```ts
type State = {
  [key: string]: string
}

class StringDatabase {
  state: State = {}
  get (key: string): string | null {
    return key in this.state ? this.state[key] : null
  }
  set (key: string, value: string): void {
    this.state[key] = value
  }
  static from (state: State) {
    let db = new StringDatebase
    for (let key in state) {
      db.set(key, state[key])
    }
    return db
  }
}
```

```ts
interface StringDatabase {
  state: State
  get(key: string): string | null
  set(key: string, value: string): void
}

interface StringDatabaseConstructor {
  new(): StringDatabase
  from (state: State): StringDatabase
}
```

引数をとるコンストラクターも宣言することができます。
```ts
class StringDatabase {
  constructor (public state: State = {}) {}
  // ...
```

StringDatabaseのコンストラクターシグネチャは、次のように型付けすることができます。
```ts
interface StringDatabaseConstructor {
  new(state?: State): StringDatabase
  from(state: State): StringDatabase
}
```

## 5.7 ポリモーフィズム
関数や型と同様に、クラスとインターフェースは、（デフォルト型や制限を含めて）ジェネリック型パラメーターを十分にサポートしています。
```ts
class MyMap<K, V> { // 1
  constructor(initialKey: K, initialValue: V) { // 2
    // ...
  }
  get(key: K): V { // 3
    // ...
  }
  set (Key: K, value: V): void {
    // ...
  }
  merge<K1, V1>(map: MyMap<K1, V1>): MyMap<K | K1, V | V1> {  // 4
    // ...
  }
  static of<k: K, v: V>: MyMap<k, V> {  // 5
    //...
  }
}
```

1. `class`を宣言するときに、クラススコープのジェネリック型をバインドします。この例の`K`と`V`は、`MyMap`のすべてのインスタンスメソッドとインスタンスプロパティで利用できます。
2. `constructor`の中ではジェネリック型を宣言できないことに注意してください。代わりに、その宣言を`class`の宣言まで引き上げます。
3. クラススコープのジェネリック型は、クラス内のどこでも使うことができます。
4. インスタンスメソッドはクラスレベルのジェネリックにアクセスすることができ、そのほかに独自のジェネリックを宣言することができます。`.merge`はクラスレベルのジェネリックと、`K`と`V`を使用し、そのほかに2つの独自のジェネリック、`K1`と`V1`を宣言します。
5. 静的メソッドは、値レベルではクラスのインスタンス変数にアクセスできませんが、それと同様に、クラスのジェネリックにはアクセスできません。`of`は、1で宣言された`K`と`V`にはアクセスできないので、代わりに、独自のジェネリックの`K`と`V`を宣言します。

インターフェースにもジェネリックをバインドすることができます。
```ts
interface MyMap<K, V> {
  get(key: K): V
  set(key: K, value: V): void
}
```
関数の場合と同様に、具体的な型をジェネリックに明示的にバインドしたり、あなたの代わりにTypeScriptに推論させたりすることができます。
```ts
let a = new MyMap<string, number>('k', 1) // MyMap<string, number>
let b = new MyMap('K', true) // MyMap<string, boolean>

a.get('k')
b.set('k', false)
```

## 5.8 ミックスイン
ミックスインの実装を作成してみましょう。

- 状態（すなわち、インスタンスプロパティ）を持つことができます。
- 具象メソッド（抽象メソッドでないもの）だけを提供できます。
- コンストラクターを持つことができます。コンストラクターは、クラスがミックスされた順序と同じ順序で呼び出されます。

```ts
class User {
  //...
}

User.debug()  // 'User({"id: 3, "name": "Emma Gluzman" })
```

```ts
type ClassConstructor = new(...args: any[]) => {}   // 1

function withEZDebug<C extends ClassConstructor>(Class: C) {  // 2
  return class extends Class {  // 3
    constructor(...args: any[]) { // 4
      super(...args)  // 5
    }
  }
}
```

1. まず、`ClassConstructor`という型を宣言します。これは、任意のコンストラクターを表します。TypeScriptは完全に構造によって型付けされるので、コンストラクターとは`new`できるものであると表現しています。コンストラクターがどのようなパラメーターの型を持つのかわからないので、任意の肩の任意の数の引数を取ると表現しています。
2. 1つの型パラメーター`C`を使って、`withEZDebug`ミックスインを宣言します。`C`は、少なくともクラスコンストラクターでなければなりません。このことを、`extends`節を使って強制しています。`withEZDebug`の戻り値の型をTypeScriptに推論させます。この戻り値の型は、`C`と新しい無名クラス（匿名クラス）との交差（`&`）になります。
3. ミックスインは、コンストラクターを取り、コンストラクターを返す関数なので、無名クラスのコンストラクターを返します。
4. そのクラスコンストラクターは、少なくとも渡されるクラスが取る引数を取る必要があります。しかし、思い出してください。どのようなクラスが渡されるかは事前にわからないので、できるだけ汎用的にする必要があります。つまり、`ClassConstructor`と同様に、任意の型の任意の数のパラメーターにするということです。
5. この無名クラスは別のクラスを拡張するので、すべてのものを正しく設定するために、`Class`のコンストラクターも忘れずに呼び出します。

```ts
type ClassConstructor = new(...args: any[]) => {}

function withEZDebug<C extends ClassConstructor>(Class: C) {
  return class extends Class {
    dubeg () {
      let Name = super.constructor.name
      let value = this.getDebugValue()
      return Name + '(' + JSON.stringify(value) + ')'
    }
  }
}
```
ジェネリック型を使って、`withEZDebug`に渡されるクラスが`.getDebugValue`メソッドを定義していることを強制します。

```ts
type ClassConstructor<T> = new(...args: any[]) => T // 1

function withEZDebug<C extends ClassConstructor<{
  getDebugValue(): object
}>>(Class: C) {
  //...
}
```
1. `ClassConstructor`にジェネリック型パラメーターを追加します。
2. ある形状の型を`ClassConstructor`、`C`にバインドし、`withEZDebug`に渡されるコンストラクターが少なくとも`.getDebugValue`メソッドを定義していることを強制します。

```ts
class HardToDebugUser {
  constructor(
    private id: number,
    private firstName: string,
    private lastName: string
  ) {}
  getDubegValue() {
    return {
      id: this.id,
      name: this.firstName + ' ' + this.lastName
    }
  }
}

let User = withEZDebug(HardToDebugUser)
let user = new Uesr(3, 'Emma', 'Gluzman')
user.debug() // 'HardToDebugUser({"id": 3, "name": "Emma Gluzman"})
```

## 5.9 デコレーター

|TSCフラグ|説明|
|:-|:-|
|`experimentalDecorators`|実験的な機能であるデコレーターを有効にする|

```ts
@serializable
class APIPayload {
  getValue(): Payload {
    // ...
  }
}
```
もしデコレーターがなければ、同じことを実装するために次のようにしていたでしょう。

```ts
let APIPayload = serializable(class APIPayload {
  getValue(): Payload {
    //...
  }
})
```

|何をデコレートしているか|期待される型シグネチャ|
|:-|:-|
|クラス|`(Constructor: {new(...any[]) => any})`|
|メソッド|`(classPrototype: {}, methodName: string, descriptor: PropertyDescriptor) => any`|
|静的メソッド|`(Constructor: {new(...any[]) => any}, methodName: string, descriptor: PropertyDescriptor) => any`|
|メソッドパラメーター|`(classPrototype: {}, paramName: string, index: number) => void`|
|静的メソッドパラメーター|`(Constructor: {new(...any[]) => any}, paramName: string, index: number) => void`|
|プロパティ|`(classPrototype: {}, propertyName: string) => any`|
|静的プロパティ|`(Constructor: {new(...any[]) => any}, propertyName: string) => any`|
|プロパティのゲッター/セッター|`(classPrototype: {}, propertyName: string, descriptor: PropertyDescriptor) => any`|
|静的プロパティのゲッター/セッター|`(Constructor: {new(...any[]) => any}, propertyName: string, descriptor: PropertyDescriptor) => any`|

```ts
type ClassConstroctor<T> = new(...args: any[]) => T // 1

function serializable<
  T extends ClassConstructor<{
    getValue(): Payload // 2
  }>
>(Constructor: T) { // 3
  return class extends Constructor {  // 4
    serialize () {
      return this.getValue().toString()
    }
  }
}
```

1. `new()`は、TypeScriptでクラスコンストラクターを構造的に型付けする方法であることを思い出してください。また（`extends`を使って）拡張が可能なクラスコンストラクターについては、TypeScriptは、`any`のスプレッド、`new(...any[])`を使って引数を型付けすることを要求します。
2. `@serializable`は、`Payload`を返す`.getValue`メソッドを実装するインスタンスを持つ任意のクラスをデコレートすることができます。
3. クラスデコレーターは、1つの引数 -- クラス -- を取る関数です。（この例のように）デコレーター関数がクラスを返す場合は、（デコレーターが）デコレートしているクラスを実行時に置き換えます。そうでない場合は、元のクラスのままになります。
4. クラスをデコレートするために、そのクラスを拡張するクラスを作成し、`.serialize`メソッドを追加して返します。

```ts
let payload = new APIPayload
let serialized = payload.serialize()  // エラー
```

#5.10 finalクラスをシミュレートする
`final`とは、クラスを拡張不可と指定したり、メソッドをオーバーライド不可と指定したりするために、いくつかの言語で使われるキーワードです。<br>
`final`クラスをTypeScriptでシミュレートするには、プライベートコンストラクターを利用します。

```ts
class MessageQueue {
  private constructor(private messages: string[]) {}
}
```
`constructor`が`private`と指定されていると、そのクラスを拡張したり、`new`したりすることができません。

```ts
class BadQueue extends MessageQueue {} // エラー

new MessageQueue([])  // エラー
```

`final`クラスに対して私たちが望むのは、それを拡張できなくすることだけで、インスタンス化の機能は残しておく必要があります。
```ts
class MessageQueue {
  private constructor(private message: string[]) {}
  static create(message: string[]) {
    return new MessageQueue(messages)
  }
}
```

```ts
class BadQueue extends MessageQueue {}  // エラー

MessageQueue.create([]) // MessageQueue
```

## 5.11 デザインパターン
### 5.11.1 ファクトリーパターン
靴のファクトリーを作ってみましょう
```ts
type Shoe = {
  purpose: string
}

class BalletFlat implements Shoe {
  purpose ='dancing'
}

class Boot implements Shoe {
  purpose = 'woodcutting'
}

class Sneaker implements Shoe {
  porpose = 'walking'
}
```
`interface`を使うこともできます。

```ts
let Shoe = {
  create(type: 'balletFlat' | 'boot' | 'sneaker'): Shoe { // 1
    switch (type) {  // 2
      case 'balletFlat': return new BalletFlat
      case 'boot': return new Boot
      case 'sneaker': return new Sneaker
    }
  }
}

Shoe.create('boot') // Shoe
```

1. `type`に対して合併型を使うことは、`.create`をできるだけ型安全にすることに役立ち、コンパイル時に利用者が無効な`type`を渡してしまうのを防ぎます。
2. `type`について`switch`で分岐すると、私たちが`Shoe`のすべての型を処理し終えたかどうかを、TypeScriptが容易に確認できます。

同じ名前を持つ、`Shoe`という型と`Shoe`という値を宣言しています。<br>
これは、その型を操作するためのメソッドをその値が提供することを示すための方法です。

### 5.11.2 ビルダーパターン
ビルダーパターンは、オブジェクトの構築と、そのオブジェクトを実際に実装する方法とを分離するためのものです。

```ts
new RequestBuilders()
  .setURL('/Users')
  .setMethod('get')
  .setData({ firstName: 'Anna' })
  .send()
```

```ts
class RequestBuilder() {}
```

```ts
class RequestBuilder() {
  private url: string | null = null
  
  setURL (url: string): this {
    this.url = url
    return this
  }
}
```

```ts
class RequestBuilder {
  private date: object | null = null
  private method: 'get' | 'post' | null = null
  private url: string | null = null
  
  setMethod(method: 'get' | 'post'): this {
    this.method = method
    return this
  }
  
  setData(data: object): this {
    this.data = data
    return this
  }
  
  setURL(url: string): this {
    this.url = url
    return this
  }
  
  send() {
    // ...
  }
}
```

## 5.12 まとめ

## 5.13 練習問題












