# 2. TypeScriptの基礎

## 2.1 TypeScriptの基礎知識
### 2.1.1 TypeScript登場の背景

### 2.1.2 TypeSceriptとVisual Studio Code
### 2.1.3 TypeScriptとJavaScriptの違い

- 型定義
- インテーフェースとクラス
- null/undefined安全
- 汎用的なクラスやメソッドの型を実現するジェネリック
- エディターによる入力補完
- そのほかのECMAで定義されているJavaScriptの最新仕様

### 2.1.4 TypeScriptコマンドラインツールによるコンパイル
```shell
$ npm install -g typescript
```

```shell
$ tsc --strictNullChecks sayHello.ts
```

## 2.2 型の定義

```ts
function sayHello (firstName: string) {
  console.log('Hellow ' + firstName)
}

let firstName: string = 'Takuya'
sayHello(firstName)
```

### 2.2.1 変数
```ts
var 変数: 型 = 値
let 変数: 型 = 値
const 変数: 型 = 値
```

```ts
let employeeName = 'John'
let employeeName: string = 'John'
```

```ts
function calc(isSum: boolean) {
  let a = 100
  if (isSum) {
    let b = a + 1
    return b
  }
  
  // error
  return b
}
```

```ts
const num: number = 100

// error
num = 200
```

### 2.2.2 プリミティブ型
string（文字列）、number（数値）、boolean（真偽値）

```ts
let age: number = 36
let isDone: boolean = false
let color: string = '青'
```

### 2.2.3 配列
```ts
const array: string[] = []
array.push('Takuya')
arrau.push(1) // Error
```

```
const mixedArray = ['foo', 1]
const mixedArrayU: (string|number)[] = ['foo', 1]
const mixedArrayT: [string, number] = ['foo', 1]
```

### 2.2.4 オブジェクト型
```ts
{ キー名1: 型; キー名2: 型 2; ...}

let 変数: { キー名1: 型1; キー名2: 型2; ...} = オブジェクト
const 変数: { キー名1: 型1; キー名2: 型2; ...} = オブジェクト
var 変数: { キー名1: 型1; キー名2: 型2; ...} = オブジェクト
```

```ts
const user: { name: string; age: number } = {
  name: 'Takuya',
  age: 36,
}

console.log(user.name)
console.log(user.age)
```

オプショナルなプロパティ

```ts
function printName(obj: { firstName: string, lastName?: string) {
  // ...
}

printName({firstName: 'Takuya')
printName({firstName: 'Takuya', lastName: 'Tejima'})
```

### 2.2.5 any

```ts
let user: any = { firstName: 'Takuya' }

user.hello()
user()
user.age = 100
user = 'hello'

// 他の型への代入を行なってもエラーが起きません
const n: number = user
```

`any`を利用するとチェックの機能が動作しなくなります。
そのため、TypeScriptを利用している恩恵を受け入れられなくなります。

### 2.2.6 関数
```ts
function (引数1: 型1, 引数2: 型2 ...):戻り値 {
  // ...
}
```

```ts
function sayHello (name: string): string {
  return `Hello ${name}`
}

sayHello('Takuya')
```

```ts
function sayHello (name: string, greeting?: string): string {
  return `${greeting} ${name}`
}

sayHello('Takuya')
sayHello('Takuya', 'Hey')
```

```ts
function printName (firstName: string, formatter: (name: string) => string) {
  console.log(formatter(firstName))
}

function formatName (name: string): string {
  return `${name} san`
}

printName('Takuya', formatName) // "Takuya san"
```

#### 関数の型
```ts
(引数名: 引数の型) => 戻り値の型
```

```ts
function getBirdsInfo (name: string): string[] {
  return name.split(',')
}

// (x: string) => string[]
function singBirds(birdInfo: (x: string) => string[]): string {
  return birdInfo('hato, kiji')[0] + ' piyo piyp'
}

console.log(singBirds(genBirdsInfo))
console.log(singBirds('dobato'))
```

## 2.3 基本的な型の機能
### 2.3.1 型推論
TypeScriptでは明示的な変数の初期化を行うと、型推論により、自動的に型が決定される機能があります。

```ts
const age = 10
console.log(age.length) // Error!

const user = {
  name: 'Takuya',
  age: 36
}

console.log(user.age.length) // Error!
```

```ts
function getUser () {
  return {
    name: 'Takuya',
    age: 36
  }
}

const user = getUser()
console.log(user.age.length) // Error!
```

```ts
const names = ['Takuya', 'Yoshiki', 'Taketo']

names.forEach((name) => {
  // Error!
  // 本来は toUpperCase が正しい
  console.log(name.toUppsercase())
})
```

```ts
window.confirm = () => {
  // booleanをreturnしない限りエラーになる
  console.log('confirm関数')
}
```

### 2.3.2 型アサーション
TypeScriptが具体的に型を知ることのできないケースがあります。<br>
以下のように `as` を指定する型アサーションの機能を使用して、より具体的な型を指定できます。

```ts
const myCanvas = document.getElementById('main_canvas') as HTMLCanvasElement
```

複雑なアサーションを行いたいケースでうまく実現できない可能性があります。
このような場合には、まず `any` に変換し、次に目的の型に変換する2段階のアサーションで実現できます。
```ts
const result = (response as any) as User
```

```ts
const hoge: any = 'test'
```

```ts
const fuga: number = hoge as number
console.log(fuga.toFixed(2))
```

### 2.3.3 型エイリアス
```ts
type 型名 = 型

type Name = string
```

```ts
type Point = {
  x: number;
  y: number;
}

function printPoint(point: Point) {
  console.log(`x座標は ${point.x}です`)
  consolo.log(`y座標は ${point.y}です`)
}

printPoint({x: 100, y: 100})
```

```ts
type Formatter = (a: string) => string

function printName(firstName: string, formatter: Formatter) {
  console.log(formatter(firstName))
}
```

```ts
{ []: 型名 }
```

```ts
type Label = {
  [key: string]: string
}
```

```
const labels: Label = {
  topTitie: 'トップページのタイトルです',
  topSubTitle: 'トップページのサブタイトルです',
  topFeature1: 'トップページの機能1です',
  topFeature2: 'トップページの機能2です',
}

const hoge: Label = {
  message: 100
}
```

### 2.3.4 インターフェース
```ts
interface 型名 {
  プロパティ1: 型1;
  プロパティ2: 型2;
}
```

```ts
interface Point {
  x: number;
  y: number;
}

function printPoint(point: Point) {
  console.log(`x座標は${point.x}です`)
  console.log(`y座標は${point.y}です`)
  console.log(`z座標は${point.z}です`)
}

interface Point {
  z: number;
}

// Error: 引数にzがない
printPoint({x: 100, y: 100})

// 問題なく動作します
printPoint({x: 100, y: 100, z: 200})
```

```ts
interface Point {
  x: number;
  y: number;
  z: number;
}

// Error: zが存在しない
class MyPoint implements Point {
  x: number;
  y: number;
}
```

プロパティの定義に`?`を使用すると、オプショナルなプロパティになります。
```ts
interface Point {
  x: number;
  y: number;
  z?: number;
}

// Errorはありません
class MyPoint implements Point {
  x: number;
  y: number;
}
```

`extends`を使ってほかのインターフェースを拡張可能です。
```ts
interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

interface ColorfulCircle extends Colorful, Circle {}

const cc: ColorfulCircle = {
  color: '赤',
  radius: 10
}
```

### 2.3.5 クラス
```ts
class クラス名 {
  フィールド1: 型1;
  フィールド2: 型2;
  // ...
}

class Point {
  x: number;
  y: number;
  
  // 引数がない場合の初期値を指定
  constructor (x: number = 0, y: number = 0) {
    this.x = x
    this.y = y
  }

  // 戻り値がない関数を定義するために void を指定します
  moveX (n: number): void {
    this.x += n
  }
  
  moveY (n: number): void {
    this.y += n
  }
}

const point = new Point()
point.moveX(10)
console.log(`${point.x}`, ${point.y}`) // 10, 0
```

クラスは `extends`を用いてクラスを継承できます
```ts
class Point3D extends Point {
  z: number;
  
  constructor (x: number=0, y: number=0, z: number=0) {
    this.x = x
    this.y = y
    this.z = z
  }
```
