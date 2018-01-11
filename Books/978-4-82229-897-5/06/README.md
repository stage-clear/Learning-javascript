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

