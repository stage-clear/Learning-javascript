# 関数と変数・引数・戻り値の扱い

## なぜラムダ式（匿名関数）、関数、クラスのメソッドが必要か

## 名前付き関数（function）

### 関数の宣言と使用方法

```js
function 関数名(引数名1: データ型, 引数名2 : データ型, ...) : 戻り値のデータ型 {
  関数として実行される文
  return 戻り値として返す値あるいは式
}

let 変数名 = 関数名(引数の値あるいは式1, 引数の値あるいは式2, ...)
```

```js
// 関数の定義と使用する例
function GetSomething(value1:number, value2:number):number {
  let r = value1 + 1.05 * value2
  return r
}

let r = GetSomething(100, 100)
console.info(r)
```

```js
function 関数名(引数名1 : データ型, 引数名2 : データ型, ...) { ... }
function 関数名() : 戻り値のデータ型 { ... }
function 関数名() { ... }

関数名(引数の値あるいは式1, 引数の値あるいは式2, ...)
let 変数名 = 関数名()
関数名()
```

```js
// 関数を何度も使用する例
function GetSomething(value: number, value2:number):number {
  let r = value1 + 1.05 * value2;
  return r;
}

function GetAnother(value:number, value2:number):number {
  let r = 1.02 * value1 + 1.05 * value2;
  return r;
}

console.info(GetSomething(100, 100))
console.info(GetSomething(10, 10))
console.info(GetAnother(1000, 1000))
console.info(GetSomething(1, 1))
console.info(GetSomething(0, 200))
```

### 引数には何を指定すべきか

```js
// 引数として時刻を指定し, 時刻に応じて返す挨拶を返す実装例（関数版）
function getGreeting(now: Date) : string {
  ...
}

console.info(GetGreeting(new Date()))
console.info(GetGreeting(new Date(2018, 0, 1, 9, 0, 0, 0)))
```

```js
// 引数なしで, 現在の時刻を使用する関数の実装例
function GetGreetingFromNow () : string {
  let now = new Date()
  ...
}

console.info(GetGreetingFromNow())
```

```js
引数（入力値） → 戻り値（出力値）
```

### 戻り値には何を返すべきか

```js
function DoSomething(value: number) :void {
  if (value < 0) {
    throw Error(`value に負の値${value}は指定できません`)
  }
  console.info(`Do ${value}`)
}

try {
  DoSomething(1)
  DoSomething(-1)
  console.info('他の処理')
} catch (error) {
  console.info(error.message)
}
```

### 関数にはどんな処理をさせるべきか
- 「同じとき」に実行される文をただまとめる関数
- 必要な処理の文を目的でまとめる関数

### 単体テストで引数と戻り値, 使いやすさを確認する

```js
// Mocha 単体テストで入力値のパターンを試験する例
import assert = require('assert')
import appTalk = require('../app')

describe('functions', () => {
  it('GetGreeting Test', () => {
    assert.equal(GetGreeting(new Date(2018, 0, 1, 0, 0, 0, 0)), 'Wecome back!')
    assert.equal(GetGreeting(new Date()2018, 0, 1, 4, 59, 59, 999), 'Wecome back')
    ...
  })
})
```

### JSDoc コメントで関数の使い方を表示する

```js
// JSDoc コメントの書式
/**
 * 何かを実行します
 * @param value1 最初の値を指定します
 * @param value2 2番目の値を指定します
 */
function ExecuteSomething(value1: number, value2:boolean): number {
  return 0;
}
```

## ラムダ式（匿名関数）
### 匿名関数の宣言と使用

### ラムダ式の宣言と使用

```js
let ラムダ式の変数名 = 
  (引数名1: データ型, 引数名2: データ型): 戻り値のデータ型 => {
    関数として実行される文
    return 戻り値として返す値あるいは式;
  }
  
let ラムダ式の変数名 = 
  (引数名1: データ型, 引数名2: データ型): 
    戻り値のデータ型 => 戻り値として返す値あるいは式

let 結果の変数名 = ラムダ式の変数名(引数の値あるいは式1, 引数の値あるいは式2, ...);
```

```js
// ラムダ式の定義と使用例
let lambdaExpression = 
  (value1: number, value2: number): number => {
    return value1 + 1.05 * value2
  }

let lambda2 = 
  (value1: number, value2: number) : number => value1 + 1.05 * value2;

let r = lambdaExpression(100, 100)
console.info(r)
console.info(lambda2(100, 100))
```

### ラムダ式をデータ型として使用

```js
let ラムダ式の変数名 : (引数名1 : データ型, 引数名2 : データ型, ...) => 
  戻り値のデータ型;

ラムダ式の変数名 = (引数名1, 引数名2, ...) => {
  関数として実行される文
  return 戻り値として返す値あるいは式
}

ラムダ式の変数名 = (引数名1, 引数名2, ...) => 戻り値として返す値あるいは式
```

```js
// ラムダ式を変数のデータ型として宣言した例
let lambda3 : (value1: number, value2: number) => number;
let lambda4 : (value1: number, value2: number) => number;

lambda3 = (value1, value2) => {
  return value1 + 1.05 * value2;
}

lambda4 = (value1, value2) => value1 + 1.05 * value2;

console.info(lambda3(100, 100))
console.info(lambda4(100, 100))
```

```js
let ラムダ式の変数名 : (引数名 : データ型) => 戻り値のデータ型;

ラムダ式の変数名 = 
  引数名 => {
    関数として実行される文
    return 戻り値として返す値あるいは式;
  }

ラムダ式の変数名 = 引数名 => 戻り値として返す値あるいは式
```

```js
// 引数が1つのラムダ式は変数の代入時に () を省略できる
let lambda5 : (value : number) => number;
let lambda6 : (value : number) => number;

lambda5 = value => {
  return 1.05 * value;
}

lambda6 = value =L 1.05 * value;

console.info(lambda5(100))
console.info(lambda6(100))
```


```js
let ラムダ式の変数名 : () => 戻り値のデータ型;

ラムダ式の変数名 = 
  () => {
    関数として実行される文;
    return 戻り値として返す値あるいは式;
  };

ラムダ式の変数名 = () => 戻り値として返す値あるいは式;
```

```js
// 引数のないラムダ式の例
let counter = 0
let lambda7 : () => number;
let lambda8 : () => number;

lambda7 = () => {
  return counter++
}

lambda8 = () => counter++;

console.info(lambda7());
console.info(lambda8());
```

```js
// ラムダ式を指定する関数の例
function Filter (
  values: Array<number>,
  where : (value:number) => boolean,
): Array<number> {
  let results = Array<number> = []
  values.forEach(value => {
    if (where(value)) {
      results.push(value)
    }
  })
  
  return result
}

let items = [1, 10, 11, 100, 101, 1000, 1001]
let r1 = Filter(items, a => a < 100)
conosle.info(r1)

let r2 = itmes.filter(a => a < 100)
console.info(r2)
```

### 何をラムダ式（匿名関数）にすべきか

```js
// クラスのプロパティで絞り込み, プロパティの値を抽出する例
import * as Enumerable from 'linq'

class Product {
  Name: string;
  Price : number;
}

let items : Array<Product> = [
  { Name: 'Item A', Price: 10 },
  { Name: 'Item B', Price: 11 },
  ...
]

let result = Enumerable.from(items)
  .where(a => a.Price > 100)
  .select(a => a.Name)
  .toArray()

console.info(results)
```

- 式を指定させ, ある値に応じた結果を求めさせるという使い方
  - filter メソッドでは値を絞り込みの結果を残すかどうかを boolean 値として返させます
  - sort メソッドでは, 並べ替え順を決めるために2つの値を比較するラムダ式を指定します
- 関数として定義するほど意味が明確にあるわけではないが, 同じプログラムの中で何度も実行される
  - たとえば, 条件演算子（三項演算子）では表現できないが, そこまで難しいわけではない
  - 少しだけ複雑な分岐を伴う計算のような処理はラムダ式に最適と言えます

## 変数のスコープ, クロージャー変数, let と var
### ES5以前と ES2015 以降で扱える変数の扱いが異なる

```js
// ビルドする JavaScript のバージョンnositei tsconfig.json（抜粋）
{
  "compilerOptions": {
    "target": "ES2015"
  }
}
```

### var を使用しないで let を使用すべき理由と変数のシャドウ

```js
// ビルドエラー, jikkoujiha ES5 以前では undefined, ES2015以降ではエラー
let value1 = 1;
console.info(value1)
console.info(value2) // ERROR

{
  console.info(value1)
  console.info(value2) // ERROR 
  
  let value2 = 2 
  console.info(value2)
}
```

- ブロックの外ですでに宣言された変数と, まったく同じ名前の変数をもう一度ブロックの内側で宣言する
- let では別の変数として扱われこれを「シャドウ」と呼びます
- var では, 同じ名前の変数を宣言すると, ブロックの外で宣言された変数と同じ変数が使用されます

```js
// let による変数のシャドウと, var でバグになる例
console.info('let')
for (let i = 0; i < 3; i++) {
  console.info('A')
  for (let i = 0; i < 3; i++) {
    console.info('B')
  }
}
// > let
// > A
// > B(3)
// > A
// > B(3)
// > A
// > B(3)

console.info('var')
for (var i = 0; i < 3; i++) {
  console.info('A');
  for (var i = 0; i < 3; i++) {
    console.info('B')
  }
}
// > var
// > A
// > B(3)
```

```js
// ラムダ式（匿名関数）のブロックでは let と var に違いがない
let value5 = 1
console.info(value5) // > 1
let exec5 = () => {
  let value5 = 10
  console.info(value5) // > 10
}
exec5()
console.info(value5) // > 1

var value6 = 1
console.info(value6) // > 1
let exec6 = () => {
  console.info(value5) // > 1
  var value6 = 10
  console.info(value6) // > 10
}
exec6()
console.info(value6) // > 1 <-
```

- var の挙動のわかりづらさ
  - 関数の内側で var で宣言した変数は, 関数の外で宣言されたまったく同じ名前の変数とは異なる変数として認識されます
  - これは期待される一般的なスコープです

```js
// 複数のブロックとラムダ式で同じ名前の変数を宣言する例
let value9 = 1
let value10 = 'A'
console.info(value9) // > 1
console.info(value10) // > A

{
  let value9 = 2
  console.info(value9) // > 2
  console.info(value10) // > A
}

{
  let value9 = 3
  console.info(value9) // > 3
  console.info(value10) // > A
}

(() => {
  let value9 = 4
  console.info(value9) // > 4
  console.info(value10) // > A
})()

console.info(value9) // > 1
console.info(value10) // > A
```

### クロージャー

```js
// クロージャー変数の例
let getLastCount = () => -1
let resetCount = () => {}

function InitializeCountUp () {
  let counter = 0
  resetCount = () => {
    counter = 0
  }
  getLastCount = () => counter++
}

InitializeCountUp()

console.info(getLastCount())
console.info(getLastCount())
console.info(getLastCount())

resetCount()
console.info(getLastCount())
console.info(getLastCount())
console.info(getLastCount())
```

## 戻り値を返す return と yield
### return で関数から抜ける

### return に到達しないで関数を抜けると undefined

```ts
// return に到達しないで関数を抜けるバグの例
function IsMinus (value: number) {
  if (value < 0) {
    return true
  }  else if (value > 0) {
    return false
  }
}

console.info(IsMinus(1)) // false
console.info(IsMinus(-1)) // true
console.info(IsMinus(0)) // undefined
```

```js
// 戻り値を定義すると戻り値を必ず返すかチェックできる
function IsMinus (value: number): boolean { ... }
```

### 新しい TypeScript(JavaScript) で使用できる yield

```js
// ES5以前の JavaScript で yield を使用する場合の tsconfig.json
{
  "compilerOptions": {
    "target": "ES5",
    "downLevelIteration": true,
    "module": "commonjs",
    ...
  }
}

// ターゲットとしてES2015を指定する tsconfig.json
{
  "compilerOptions": {
    "target": "ES2015",
    "module": "commonjs",
    ...
  }
}
```

### function* と yield によるジェネレータ, イテレーターによる列挙

```js
function* 関数名() {
  yeild 返す値1
  yeild 返す値2
  ...
}
```

```js
let values = [1, 2, 3, 4, 5]

function GetReturnValues() {
  console.info('return values')
  return values
}

console.info('GetReturnValues')
for (let value of GetReturnValues()) {
  console.info(`value = ${value}`)
}
```

```js
// 配列の要素を一つずつ返す yield の例
let values = [1, 2, 3, 4, 5]

function* GetYieldValues () {
  for (let value of values) {
    console.info(`yield value = ${value}`)
    yield value
  }
}

console.info('GetYieldValuds')
for (let value of GetYieldValues()) {
  console.info(`value = ${value}`)
}
```

yield を使うと, 配列の値全体を一度に返すのではなく, 要素の値を1つずつ返すような動作を実現できます

関数の function に * を続けて記載し, その関数の中で yeild を使う関数は, 
配列全体を返す代わりに, 配列の要素を列挙することができる「イテレータ」というオブジェクトを返す特殊な関数になります.<br>
イテレータを返し, そのイテレータで要素を列挙すると, それに応じて値を返す特殊な関数を「ジェネレータ関数」と呼びます.

```js
// for of の代わりにイテレータのメソッドを使用して列挙した例
function* GetYieldValues () {
  for (let value of [1, 2, 3, 4, 5]) {
    console.info(`yield value = ${value}`)
    yield value
  }
}

console.info('GetYieldValues')
let iterator = GetYieldValues()
for (var r = iterator.next(); r.done == false; r = iterator.next()) {
  console.info(`value = ${r.value}`)
}
```

イテレータはnextメソッドが実行されるたびに, 次の要素を取得します.
next が実行されるまではジェネレータ関数のコードの内容はまだ実行されていません.
next が実行されるとジェネレータ関数の処理が実行され, 最初の yield で指定された値が取得されます.
プログラムの処理は関数の中ではなく, イテレータの next を実行した部分に戻され, もう一度 next が実行されるまで
関数の内部のプログラムの実行は待機されます.
