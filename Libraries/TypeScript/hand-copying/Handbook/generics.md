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
