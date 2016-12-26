# Generics
> ジェネリックは簡単に言えば、型引数を使用して、実際に利用されるまで型が確定しないクラスや関数を実現するためのものだ。  
> <sup>[TypeScriptの目玉機能「ジェネリック（Generics）」はこうなっている](http://www.buildinsider.net/language/tsgeneric/01)</sup>

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

## Generic Types
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
```

同様のサンプルでは、ジェネリック引数をインターフェース全体の引数として書き換えたくなるかもしれません。  
何の型を越えたのかを見せてくれます（例えば、`Dictionary<string>` ではなくむしろ　`Dictionary` ）。  
見える型引数を、すべてのインターフェイスのその他のメンバーとします。

```typescript
interface GenericIdentity<T> {
  (arg: T): T
}

function identity<T>(arg: T): T {
  return arg
}

let myIdentity: GenericIdentityFn<number> = identity
```
