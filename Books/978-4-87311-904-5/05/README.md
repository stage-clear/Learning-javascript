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















