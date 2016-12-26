# Generics
> ジェネリックは簡単に言えば、型引数を使用して、実際に利用されるまで型が確定しないクラスや関数を実現するためのものだ。  
> <sup>[TypeScriptの目玉機能「ジェネリック（Generics）」はこうなっている](http://www.buildinsider.net/language/tsgeneric/01)</sup>

> シグネチャ・・・関数の名前と引数の数や型、返り値の型などをひとまとめにした呼び方  
> <sup>[【TypeScript】シグネチャをインターフェイス化して型注釈をするクイズを作って..](http://qiita.com/M-ISO/items/ebfda5c825e11efbe89b)</sup>

## Introduction
## Hello World Generics

```typescript
function identity(arg: number): number {
  return arg
}
```

```typescript
function identity(arg: any): any {
  return arg
}
```

```typescript
function identity<T>(arg: T): T {
  return arg
}
```

```typescript
let output = identity<string>('myString') // type of output will be 'string'
```

```typescript
let output = identity('myString') // type of output will be 'string'
```

## Working with Generic Type Variables

```typescript
function identity<T>(arg: T): T {
  return arg
}
```

```typescript
function loggingIdentity<T>(arg: T): T {
  console.log(arg.length) // Error! "T doesn't have .length"
  return arg
}
```

```typescript
function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length) // Array has a .length, so no more error
  return arg
}
```

## Generic Types _ジェネリック型_
前回のセクションで、型の範囲を越えて動作する、値を返すだけの関数を作りました。  
このセクションでは、関数自身の型とジェネリックなインタフェースの作り方を探求します。

ジェネリック関数の型は、ジェネリックでない関数のように、最初に型パラメータを並べます。関数定義と同様に。

```typescript
function identity<T>(arg: T): T {
  return arg
}

let myIdeintity: <T>(arg: T) => T = identity
```

また、ジェネリックな型パラメータで異なった名前を使うことができます。[

```typescript
function identity<T>(arg: T): T {
  return arg
}

let myIdentity: <U>(arg: U) => U = identity
```

また、オブジェクトリテラル型のシグネチャを呼ぶように、ジェネリックな型を書くことができます。

```typescript
function identity<T>(arg: T): T {
  return arg
}

let myIdentity: { <T>(arg: T): T } = identity
```

はじめてのジェネリックなインターフェイスを書くことにつながります。
前回のサンプルのオブジェクトリテラルをインターフェイスに書き換えてみましょう。

```typescript
interface GenericIdentityFn {
  <T>(arg: T): T
}

function identity<T>(arg: T): T {
  return arg
}

let myIdentity: GenericIdentityFn = identity

// example
myIdentity(<number>1000) // Ok
myIdentity(<number>'sample') // Error!
myIdentity(<string>'sample') // Ok
```

同様のサンプルでは、ジェネリック引数をインターフェース全体の引数として書き換えたくなるかもしれません。  
何の型を越えたのかを見せてくれます（例えば、`Dictionary<string>` ではなくむしろ　`Dictionary` ）。  
見える型引数を、すべてのインターフェイスのその他のメンバーとします。

```typescript
interface GenericIdentity<T> { // <-
  (arg: T): T
}

function identity<T>(arg: T): T {
  return arg
}

let myIdentity: GenericIdentityFn<number> = identity // <-

// example
myIdentity(1000) // Ok
myIdentity('sample') // Error!
```

このサンプルは少しずつ変更を加えてきました。
ジェネリック関数を記述する代わりに、私たちが今持っている（ジェネリックでない）コールシグネチャは、ジェネリック型の一部です。
`GenericIdentityFn` を使用するとき、該当する型引数(ここでは `number`)が必要となります。
根本的な構文呼び出しの中で効果的な固定することができます。
コールシグネチャに型引数を直接を書き、インターフェイス自身にも書くことを理解することは、ジェネリックな型の何か側面を記述する中で役立ちます。

ジェネリック・インターフェイスに加えて、さらにジェネリック・クラス作成することができます。
それは、ジェネリックは列挙型や名前空間を作ることはできません。

## Generic Classes _ジェネリック・クラス_
ジェネリック・クラスは、ジェネリック・インターフェイスと同様の形状を持ちます。
ジェネリック・クラスは、`<>` アングルブラケットで囲まれたジェネリック型引数のリストをクラス名の次に記述します。

```typescript
class GenericNumber<T> {
  zeroValue: T
  add: (x: T, y: T) => T
}

let myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 0
myGenericNumber.add = function(x, y) { return x + y }
```

これは、かなりリテラルな `GenericNumber` クラスを使用です。
しかし、あなたは気づいているかもしれませんが、`number` 型だけを使うことに何も制限していません。（クラス内で）
私たちは、代わりに `string` やさらに複雑なオブジェクトを使用することができます。[

```typescript
let stringNumeric = new GenericNumber<string>()
stringNumeric.zeroValue = ''
stringNumeric.add = function(x, y) { return x + y }

alert(stringNumeric.add(stringNumeric.zeroValue, 'test'))
```

インターフェイスと同じような、クラス自身に引数型を書くことは、クラスのすべての属性が同じ型で動作していることを確認させる。

クラスのセクションでも言及したように、クラスの型は、静的とインスタンスの2つの側面を持ちます。
ジェネリック・クラスは、ジェネリックなインスタンスよりもむしろ静的だけです。
そして、クラスが動作しているとき、静的なメンバーはクラスの引数型を使用できません。

## Generic Constraints
もしあなたが前のサンプルを覚えているなら、あなたは、ときどき型の組の上でジェネリック関数書きたいかもしれません。
あなたがいくつかの互換性についての知見のある場所は型の組が持ちます。
`loggingIdentity` のサンプルでは、`arg` のプロパティ `.length` にアクセスしようと試みますが、
コンパイラーはすべての型が `.length` プロパティを持つことを提供できません。
そして、想定外であることを私たちに警告します。[

```typescript
function loggingIdentity<T>(arg: T): T {
  console.log(arg.length) // Error T doesn't have .length
  return arg
}
```

`any` やすべての型で動作する代わりに、この関数が `any` やすべての型やさらに `.length` を持って動作するよう強制したい。
長い型はこのメンバーを持っており、私たちはそれを許可します。しかし、そのメンバーをすくなくとも必須とされています。
そうするために、Tが何に成りうるかの制限する要件を記録しなければなりません。

そのために、制約を説明するインターフェイスを作成します。
ここに、単独の `.length` プロパティを持つインターフェイスを作成します。
それから、このインターフェイスと `extends` キーワード用いて制約を明示することを使用します。[

```typescript
interface Lengthwise {
  length: number
}

function logginIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length) 
  // Now we know it has a .length property, so no more error
  // 今や .length プロパティを持っているため、エラーはでません
  return arg
}
```

ジェネリック関数は今や強制されたため、もはや any やすべての型で動作します

```typescript
loggingIdentity(3) 
// Error, number doesn't have a .length property
// エラー、number型は .length プロパティを持っていません
```

代わりに TypeScript では、型がすべての必須プロパティを持つ値で通す必要があります。

```typescript
loggingIdentity({ length: 10, value: 3 })
```

### Using Type Parameters in Generic Constraints _型パラメータの制約を使う_

あなたは、他のパラメータで制約された型パラメータを宣言することができます。
たとえば、これは、2つのオブジェクト取り、一方のからプロパティをコピーしようとし、
間違って書いた余分なプロパティを確保しようと試みます。
そして、2つの型の間の制約を配置します。

```typescript
// (! This example is not working)
function copyFields<T extends U, U>(target: T, source: U): T {
  for (let id in source) {
    target[id] = source[id]
  }
  return target
}

let x = { a: 1, b: 2, c: 3, d: 4 }

copyFields(x, { b: 10, d: 20 }) // okay
copyFields(x, { Q: 90 }) // error: property 'Q' isn't declared in 'x'
```

### Using Class Types in Generics _ジェネリックでクラス型を使う_

TypeScript でジェネリックを使ってファクトリーを作成するときに、コンストラクターのクラス型を参照することが必要です。
例です。

```typescript
function create<T>(c: {new(): T }): T {
  return new C()
}
```

もっと高度な例ではプロトタイププロパティを使って、コンストラクターとインスタンスの関係性を推論し強制します。

```typescript
class BeeKeeper {
  hasMask: boolean
}

class ZooKeeper {
  nametag: string
}

class Animal {
  numLegs: number
}

class Bee extends Animal {
  keeper: BeeKeeper
}

class Lion extends Animal {
  keeper: ZooKeeper
}

function findKeeper<A extends Animal, K>(a: { new(): A; prototype: { keeper: K }}): K {
  return a.prototype.keeper
}

findKeeper(Lion).nametag // typechecks!
```
