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

```ts
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
    // 継承元のコンストラクタを呼び出す
    super(x, y)
    this.z = z
  }
  
  moveZ (n: number): void {
    this.z += n
  }
}

const point3D = new Point3D()
// 継承元のメソッドを呼び出すことができます
point3D.moveX(10)
point3D.moveZ(20)
console.log(`${point3D.x}, ${point3D.y}, ${point3D.z}`)
```

```ts
interface IUser {
  name: string;
  age: number;
  sayHello: () => string; // 引数なしで文字列を返す
}

class User implements IUser {
  name: string;
  age: number;
  
  constructor () {
    this.name = ''
    this.age = 0
  }
  
  // インターフェースに定義されているメソッドを実装しない場合
  // コンパイル時エラーになります
  sayHello (): string {
    return `こんにちは、私は${this.name}、${this.age}歳です。`)
  }
}

const user = new User()
user.name = 'Takuya'
user.age = 36
console.log(user.sayHello())
```

#### アクセス修飾子
`public` `private` `protected`

```ts
classs BasePoint3D {
  public x: number;
  private y: number;
  protected z: number;
}

// インスタンス化を行った場合のアクセス制御の例です
const basePoint = new BasePoint3D()
basePoint.x // OK
basePoint.y // コンパイル時にエラー: privateであるためアクセスできません
basePoint.z // コンパイル時にエラー: protectedもアクセスできませんん

// クラスを継承した際のアクセス制御
class ChildPoint extends BasePoint3D {
  constructor () {
    super()
    this.x // OK
    this.y // コンパイル時エラー: privateであるためアクセスできません
    this.z // protectedはアクセスできます
  }
}
```

## 2.4 実際の開発で重要な型
### 2.4.1 Enum型
Enumを利用することで、**名前のついた定数セット**を定義できます。

```ts
const Direction = {
  'Up': 0,
  'Down': 1, 
  'Left': 2,
  'Right': 3
}
```
Enumがあると、列挙した値以外を代入できない型を定義できます。
```ts
enum Direction {
  Up,
  Down,
  Left,
  Right
}

// enum Directionを参照
let direction: Direction = Direction.Left
// 2という数字が出力されます
console.log(direction)

// enumを代入した変数に別の型を代入しようとするとエラーになります
direction = 'Left' // Error
```

特に指定しなかった場合、Enumは定義された順番に沿ってゼロから数字が自動的にインクリメントされて設定されます。

```ts
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT'
}

// たとえばAPIのパラメータとして文字列が渡されたケースを想定します
const value = 'DOWN'
// 文字列からEnum型に変換しまうs
const enumValue = value as Direction

if (enumValue === Direction.Down) {
  console.log('Down is selected')
}

```

### 2.4.2 ジェネリック型
ジェネリックとは、クラスや関数において、その中で使う型を抽象化し外部から具体的な型を指定できる機能です。

```ts
// Tはクラス内で利用する仮の型の名前です
class Queue<T> {
  // 内部にTの型の配列を初期化します
  private array: T[] = []
  
  // Tの型の値を配列に追加します
  push (item: T) {
    this.array.push(item)
  }
  
  // Tの型の配列最初の値を取り出します
  pop (): T | undefined {
    return this.array.shift()
  }
}

const queue = new Queue<number>()
queue.push(111)
queue.push(112)
queue.push('hoge') // コンパイル時エラー:

let str = 'fuga'
str = queue.pop() // コンパイル時エラー:
```

### 2.4.3 Union型とIntersection型
TypeScriptの型は組み合わせて利用できます。
少し複雑な表現をしたい際に、指定した複数の型の和集合を意味するUnion型と積集合を意味するIntersection型というものがあります。

```ts
// 変数や引数の宣言時にUnion型を指定して、numberもしくはstringを受け付けることができます
function printId (id: number | string) {
  console.log(id)
}

// numberでも正常に動作します
printId(11)

// stringでも正常に動作します
printId('22')
```

これを型エイリアスとして定義できます

```ts
type Id = number | string

function printId (id: Id) {
  console.log(id)
}
```

型エイリアスどうしを掛け合わせて新たな型を定義できます
```ts
type Identity = {
  id: number | string;
  name: string;
}

type Contact = {
  name: string;
  email: string;
  phone: string;
}

// 和集合による新たなUnion型の定義をします
// Identity もしくは Contact の型を受けることが可能です
type IdentityOrContact = Identity | Contact

// OK
const id: IdentityOrContact = {
  id: '111',
  name: 'Takuya'
}

// OK
const contact: IdentityOrContact = {
  name: 'Takuya',
  email: 'test@example.com',
  phone: '012345678'
}
```

```ts
// 先述の Identity と Contact を定義
// 積集合による新たな Intersection型を定義します
// IdentityとContactの両方のすべてのプロパティがマージされた型として扱います
type Employee = Identity & Contact

// OK
const employee: Employee = {
  id: '111',
  name: 'Takuya',
  email: 'test@example.com',
  phone: '012345678'
}

// エラー: Contact情報のみでは変数定義できません
const employeeContact: Employee = {
  name: 'Takuya',
  email: 'test@example.com',
  phone: '12345678'
}
```

### 2.4.4 リテラル型

`|`でデータを区切るリテラル型を用いると、決まった文字列や数値しか入らない型という制御が可能です


```ts
変数: 許可するデータ1 | 許可するデータ2 | ...
```

```ts
let postStatus: 'draft' | 'published' | 'deleted'
postStatus = 'draft' // OK
postStatus = 'drafts' // コンパイル時エラー:
```

```ts
function compare (a: string, b: string): -1|0|1 {
  return a === b ? 0 : a > b ? 1 : -1
}
```

### 2.4.5 never型
never型は、決して発生しない値の種類を表します

```ts
// エラーが常に変えるような関数で決して値が正常に返らない場合にnever型を指定します
function error (message: string): never {
  throw new Error(message)
}

function foo (x: string | number | number[]): boolean {
  if (typeof x === 'string') {
    return true
  } else if (typeof x === 'number') {
    return false
  }
  
  // never を利用することで明示的に値が返らないことをコンパイラに伝えることができます
  // never を使用しないと TypeScriptはコンパイルエラーになります
  return error('Never happens')
```

```
// 将来的にも定数が追加される可能性のある enum 型を定義します
enum PageType {
  ViewProfile,
  EditProfile,
  ChangePassword
}

const getTitleText = (type: PageType) => {
  switch (type) {
    case PageType.ViewProfile:
      return 'Setting'
    case PageType.EditProfile
      return 'Edit Profile'
    case PageType.ChangePassword
      return 'Change Password'
    default:
      // 決して起きないことをコンパイラに伝える never型に代入を行います
      // これによって仮に将来PageTypeのenum型に定数が新規で追加された際に
      // コンパイル時にエラーが起きるためバグを未然に防ぐ対応を行うことができます
      const wrontType: never = type
      throw new Error(`${wrontType} is not in PageType`)
  }
}
```

## 2.5 TypeScriptのテクニック
### 2.5.1 Optional Chaining
ネストされたオブジェクトのプロパティが存在するかどうかの条件分岐を簡単に記述できる

```ts
// nullになり得るsocialというプロパティの型を定義します
interface User {
  name: string
  social?: {
    facebook: boolean
    twitter: boolean
  }
}

let user: User

user = { name: 'Takuya', social: { facebook: true, twitter: true }}
console.log(user.social?.facebook) // true

user = { name: 'Takuya' }
console.log(user.social?.facebook) // 実行時エラーになりません
```

### 2.5.2 Non-null Assertion Operator
コンパイラオプション `--strictNullChecks`を指定してコンパイルする場合、TypeScriptは通常`null`の可能性のあるオブジェクトへのアクセスはエラーとして扱います。

```ts
// userがnullの場合、実行時エラーになる可能性があるプロパティへのアクセスはコンパイルエラー
// !を用いて明示的に指定することでコンパイルエラーを抑制
function processUser (usre?: User) {
  let s = user!.name
}
```

`?`を使用する Optional Chaining と少し似ていますが、この Non-null AssertionはあくまでTypeScriptのコンパイルエラーを起こさなくて良いとマークするだで実行時にエラーが起きてしまう過剰性があります。

### 2.5.3 型ガード
TypeScriptでif文やSwitch文の条件分岐にて型のチェックを行った際、その条件分岐ブロック以降は変数の型を絞り込まれる推論が行われます。これが型ガードです。

```ts
function addOne (value: number|string) {
  if (typeof value === 'string') {
    return Number(value) + 1
  }
  
  return value + 1
}

console.log(addOne(10)) // 11
console.log(addOne('20')) // 21
```
型ガードの機能を用いると、実行時エラーを引き起こしやすい`as`を使用する型アサーションよりも安全に型を利用したコードを書けます。

```ts
// オプションプロパティでinfoを定義します
type User = {
  info?: {
    name: string;
    age: number;
  }
}

let response = {}
// responseはJSON形式のAPIレスポンスが代入されている想定。
// Userに型アサーションします。
const user = (response as any) as User

// オプショナルなプロパティへの型ガードを行う
if (user.info) {
  // オプショナルプロパティ配下のプロパティである user.info.name にアクセスしてもエラーが起きません
  // もし if　の条件がない場合は Object is possibly 'undefined' というエラーが発生します
  console.log(user.info.name)
}
```

### 2.5.4 keyofオペレーター
型に対してkeyofオペレーターを用いると、その型が持つ各プロパティの型のUnion型を返せます。

```ts
interface User {
  name: string;
  age: number;
  email: string;
}

type UserKey = keyof User // 'name'|'age'|'email'というUnion型になる

const key1: UserKey = 'name' // 代入可能
const key2: UserKey = 'phone' // コンパイル時エラー

//
function getProperty<T, K extends keyofT>(obj: T, key: K): T[K] {
  return obj[key]
}

const user: User = {
  name: 'Takuya',
  age: 36,
  email: 'test@example.com'
}

// OK
const userName = getProperty(user, 'name')

// コンパイル時エラー
const userGender = getProperty(user, 'gender')
```

### 2.5.5 インデックス型
インデックス型を用いると、オブジェクトのプロパティが可変のとき、まとめて型を定義できます。
```ts
// プロパティ名を任意のnumberとして扱う型の定義の例です
type SupportVersions = {
  [env: number]: boolean
}

// エラー:
let versions: SupportVersions = {
  102: false,
  103: false,
  104: true,
  'v105': true //-> Error
}
```

### 2.5.6 readonly

```ts
type User = {
  readonly name: string;
  readonly gener: string;
}

let user: User = { name: 'Takuya', gender: 'Male' }

// コンパイル時エラー
user.gender = 'Female'
```

`const`は変数の代入に対して行う宣言、`readonly`はオブジェクトやクラスのプロパティに対して行う宣言でコンパイル時にエラーを検知できます。

### 2.5.7 unknown

`any`と異なり、代入された値はそのまま任意の関数やプロパティにアクセスできません。
`typeof`や`instanceof`などを利用して型安全な状況を作ることで、変数の値にアクセスを行い関数などの処理を実行できます。


```ts
const x: unknown: 123
const y: unknown: 'Hello'

// コンパイル時エラー:
consooe.log(x.toFixed(1))
console.log(y.toLowerCase())

// 型安全な状況下でOK
if (typeof x === 'number') {
  console.log(x.toFixed(1))
}

if (typeof y === 'string') {
  console.log(y.toLowerCase())
}
```

### 2.5.8 非同期のAsync/Await
```ts
// 非同期関数
function fetchFromServer(id: string): Promise<{success: boolean}> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({success: true})
    }, 100)
  })
}

// 非同期処理を含むasync functionの戻り値の型はPromiseとなります
async function asyncFunc (): Promise<string> {
  // Promiseな値をawaitすると中身が取り出せる（ように見える）
  const result = await fetchFromServer('111')
  return `The result: ${result.success}`
}

// await構文を使うためには async functionの中で呼び出す必要があります
(async () => {
  const result = await asyncFunc()
  console.log(result)
})()

// Promiseとして扱う際は以下のように記述します
asyncFunc().then(result => console.log(result))
```

### 2.5.9 型定義ファイル

#### 型定義ファイルの導入
```shell 
$ npm install --save-dev @types/jquery
```

#### 型定義ファイルの作成
`./lib/hello.js`
```ts
exports.hello = function (name) {
  console.log(`Hello ${name}`)
}
```

`./lib/hello.ts`
```ts
export function hello(name: string): void
```

```ts
import { hello } from './lib/hello'

// コンパイルエラー: 引数 name
hello()
```

## 2.6 TypeScriptの開発時設定

### 2.6.1 tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "strictNullChecks": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "baseUrl": "src"
  },
  "include": [
    "next-env.d.ts",
    "src/**/*.ts",
    "src/**/*.tsx"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

### 2.6.2 Prettier
```shell
$ npm install prettier --save-dev
```

`.prettierrc`
```json
{
  "semi": false,
  "trailingComma": "none",
  "singleQuote": true,
  "printWidth": 80
}
```

`package.json`
```json
{
  "script": {
    "prettier-format": "prettier --config .prettierrc 'src/**/*.ts' --write"
  }
}
```

```shell
$ npm run prettier-format
```

### 2.6.3 ESLint

```json
{
  "rules": {
    "semi": ["error", "always"],
    "quotes": ["error", "double"]
  }
}
```

### 2.6.4 コンパイルオプション
#### noImplictAny
暗黙的な`any`を使用した場合にエラーを起こすよう設定を変更できます

```ts
// エラー
function hello (word) {
  console.log(`Hello ${name}`)
}

hello('Takuya')
```

#### strictNullChecks
`null`や`undefined`を厳格に扱う

```ts
let date: Date
date = new Date()

// エラー
date = null
```

```
let date: Date | null
date = new Date()

// OK
date = null
```

#### target

```shell
$ tsc --target es5 sayHello.ts
```





