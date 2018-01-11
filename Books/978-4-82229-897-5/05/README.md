# 配列とクエリ, 繰り返し処理
## なぜ配列とクラスが必要か

## 配列と要素の列挙, LINQクエリ

```js
let 変数名 : Array<データ型> = [初期値1, 初期値2, ... 最後の初期値 ]
let 変数名 : Array<データ型> = []
let 変数名 : データ型[] = [ 初期値1, 初期値2, ... 最後の初期値 ]
let 変数名 : データ型[] = []
let 変数名 : [ 初期値1, 初期値2, ... 最後の初期値 ]
```

```js
// number 型の配列の宣言の例
let list1 : Array<number> = [10, 11, 100, 101, 1000, 1001]
let list2 : Array<number> = []
let list3 : number[] = [10, 11, 100, 101, 1000, 1001 ]
let list4 : number[] = []
let list5 = [10, 11, 100, 101, 1000, 1001]
```

```js
// 空の配列リテラルを指定する any の配列になる
let list6 : any[] = []
let list7 = []
```

### 配列要素の追加・削除 `push` `unshift` `splice` `pop` `shift`

### 配列要素の参照

### 要素の個数 length

### forEach で配列要素とインデックスを列挙

### for in ループで配列のインデックスを列挙

### for of ループで配列要素を列挙

### クラスオブジェクトの配列

```js
// クラスオブジェクトの配列の初期化to forEach で要素を列挙する例
class Product {
  Name: string;
  Price: number;
}

let list : Array<Product> = [
  { Name: 'A', Price: 10 },
  { Name: 'B', Price: 11 },
  { Name: 'C', Price: 100 },
  { Name: 'D', Price: 101 },
  { Name: 'E', Price: 1000 },
  { Name: 'F', Price: 10001 }
]

let result = Array<Product> = []

list.forEach((value) => {
  if (value.Price > 100) {
    result.push(value)
  }
})

console.info(list)
console.info(result)
console.info(result[0].Name)
```

### LINQ クエリで配列要素を絞り込み, 並べ替え

```bash
$ npm install linq --save-dev
```

```js
// LINQ クエリを使用して絞り込み, 並べ替えを行う例
import * as Enumerable from 'linq'

class Product {
  Name : string;
  Price : number;
}

let list : Array<Product> = [
  { Name: 'A', Price: 10 },
  { Name: 'B', Price: 11 },
  { Name: 'C', Price: 100 },
  { Name: 'D', Price: 101 },
  { Name: 'E', Price: 1000 },
  { Name: 'F', Price: 1001 }
]

let results = Enumerable.from(list)
  .where(item => item.Price > 100)
  .orderByDescending(item => item.Price)
  .forEach(item => {
    console.info(item)
  })
```

### LINQの遅延評価の効果とリファクタリングの容易さ

```js
import * as Enumerable from 'linq'
let list : Array<number> = [10, 11, 100, 101, 1000, 1001]
let results = Enumerable.from(list)
  .where((item, index) => item > 10)
  .where((item, index) => item > 100)

let orderByDesc = true 

if (orderByDesc) {
  results = results.orderByDescending((item) => item)
}

results.forEach((item, index) => console.info(item))
```

```js
// LINQ クエリの配列が実行されるタイミング確認する例
import * as Enumerable from 'linq'

let list : Array<number> = [10, 11, 100, 101, 1000, 1001]
let results = Enumerable
  .from(list)
  .where((item, index) => {
    console.info(` where ${item} > 10` : ${item > 10})
    return item > 10
  })
  .where((item, index) => {
    console.info(` where ${item} > 100 : ${item > 100}`)
    return item > 100
  })
console.info('---')

let ofderByDesc = true 

if (orderByDesc) {
  results = results.orderByDescending((item) => {
    console.info(` order by desc ${item}`)
    return item
  })
}

console.info('---')

results.forEach((item, index) => { console.info(item) })
```

```js
// 冗長なクエリの例:
// 「10より大きい」「100より大きい」の後に
// 「0より大きい」で絞り込みを行なっても結果が変わらない
import * as Enumerable from 'linq'
let list : Array<number> = [10, 11, 100, 101, 1000, 1001]
let results = Enumerable
  .from(list)
  .where((item, index) => item > 10)
  .where((item, index) => item > 100)
  .where((item, index) => item > 0)

let orderByDesc = true 

if (orderByDesc) {
  results = results.orderByDescending((item) => item)
}

results.forEach((item, index) => { console.info(item) })
```

```js
// 冗長なクエリをリファクタリングした例:
import * as Enumerable from 'linq'

let list : Array<number> = [10, 11, 100, 101, 1000, 1001]
let results = Enumerable.from(list)
  .where((item, index) => item > 100)

let orderByDesc = true 

if (orderByDesc) {
  results = results.orderByDescending((item) => item)
}

results.forEach((item, index) => { console.info(item) })
```

```js
// クラスオブジェクトの配列の冗長なクエリの例
import * as Enumerable from 'linq'

class Product {
  Name: string;
  Price : number;
  IsNew : boolean;
}

let list : Array<Product> = [
  { Name: 'A', Price: 10, IsNew: false },
  { Name: 'B', Price: 11, IsNew: true },
  { Name: 'C', Price: 100, IsNew: true },
  { Name: 'D', Price: 101, IsNew: true },
  { Name: 'E', Price: 1000, IsNew: true },
  { Name: 'F', Price: 1001, IsNEw: true}
]

let results = Enumerable.from(list)
  .where((item, index) => item.Price > 10)
  .where((item, index) => item.IsNew)
  .where((item, index) => item.Price > 100)

let orderByDesc = true 

if (orderByDesc) {
  results = results.orderByDescending((item) => item.Price)
}

results.forEach((item, index) => { console.info(item) })
```

```js
// firstOrDefault で該当する最初の1件を取得
class Product {
  Name : string;
  Price : number;
  IsNew : boolean;
}

let list : Array<Product> = [
  { Name: 'A', Price: 10, IsNew: false },
  { Name: 'B', Price: 11, IsNew: true },
  { Name: 'C', Price: 100, IsNew: true },
  { Name: 'D', Price: 101, IsNew: true },
  { Name: 'E', Price: 1000, IsNew: true },
  { Name: 'F', Price: 10001, IsNew: true }
]

let results = Enumerable.from(list)

let orderByDesc = true 

if (orderByDesc) {
  results = results.orderByDescending((item) => item.Price)
}

results = results
  .where((item, index) => item.Price > 100)
  .where((item, index) => item.IsNew)

let top1 = results.firstOrDefault()
console.info(top1)
```

### 条件に合う配列要素に絞り込み filter

```js
変数名.filter(要素ごとに実行される絞り込みのラムダ式)

変数名.filter((value, index, array) => { 要素ごとに実行される絞り込みの文 })
変数名.filter((value, index) => { 要素ごとに実行される絞り込みの文 })
変数名.filter((value) => { 要素ごとに実行される絞り込みの文 })
```

```js
// filter メソッドで絞り込みを行う例
class Product {
  Name: string;
  Price: number;
  IsNew: boolean;
}

let list : Array<Product> = [
  { Name: 'A', Price: 10, IsNew: false },
  { Name: 'B', Price: 11, IsNew: true },
  { Name: 'C', Price: 100, IsNew: true},
  ...
]

let result = list
  .filter(value => value.Price > 100)
  .filter(value => value.IsNew)

let orderByDesc = true 

if (orderByDesc) {
  result.sort((a, b) => b.Price - a.Price)
}

console.info(list)
console.info(result)
```

### 配列要素の並べ替え sort, reverse

```js
変数名.sort( 2つの値を比較するラムダ式 )
変数名.reverse()
```

```js
// 配列の値を大小によって並べ替え, あるいは全体を逆に並べ替える例
let list : Array<number> = [10, 11, 100, 101, 1000, 1001, 2, 12, 102, 1002]

list.sort((a, b) => a - b)
console.log(list)

list.reverse()
console.info(list)
```

## 連想配列と要素の列挙, LINQ クエリ
### 連想配列（object, Map）とクラスの配列の使い分け
