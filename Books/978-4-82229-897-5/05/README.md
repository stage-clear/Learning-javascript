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

```json
// ビルドする JavaScript のバージョンの指定 tsconfig.json の抜粋
{
  "compilerOptions": {
    "target": "ES2015",
    
  }
}
```

```js
import * as Enumerable from 'linq'

{
  class Product {
    Name : string;
    Price : number;
    IsNew : boolean
  }
  
  let list : Array<Product> = [
    { Name: 'A', Price: 10, IsNew: false },
    { Name: 'B', Price: 11, IsNew: true },
    ...
  ]
  
  let key = 'B'
  
  let resutls = Enumerable.from(list)
    .where(item => item.Name == key)

  let item = results.firstOrDefault()
  console.info(item)
}
```

### 連想配列 Map の宣言とコンストラクターによる初期化

```js
let 変数名 = new Map<キーのデータ型, 値のデータ型>();
let 変数名 = new Map<キーのデータ型, 値のデータ型>([
  [キー1, 初期値1],
  [キー2, 初期値2],
  ...
])
let 変数名 = new Map([[キー1, 初期値1], [キー2, 初期値2]])
let 変数名 : Map<キーのデータ型, 値のデータ型> = new Map()
```

```js
// 連想配列Mapを, 初期値を指定して初期化する例
let m = new Map<string, number>([
  ['A', 10],
  ['B', 11],
  ...
])
console.info(m)
```

### 連想配列 Map 要素の追加・削除 set, delete, clear

```js
変数名.set(キー, 値)
```

```js
let m = new Map([
  ['A', 10],
  ['B', 11],
  ...
])

m.set('A', 0)
m.set('G', 10000)
m.delete('B')
console.info(m)
m.clear()
console.info(m)
```

### 連想配列 Map 要素の参照 get, has

```js
変数名.get(キー)
変数名.has(キー)
```

```js
// 連想配列 Map の値の参照とキーの確認の例
let m = new Map([
  ['A', 10],
  ['B', 11],
  ['C', 100],
  ['D', 101],
  ['E', 1000],
  ['F', 1001]
])

let valueC = m.get('C')
console.info(valueC)

let valueZ = m.get('Z')
console.info(valueZ)

let keyA = 'A'
if (m.has(keyA)) {
  let valueA = m.get(keyA)
  console.info(valueA)
}
```

### 連想配列 Map 要素の個数 size 

```js
変数名.size
```

```js
let m = new Map([
  ['A', 10],
  ['B', 11],
  ...
])
console.info(`size: ${m.size}`)
```

### forEach で連想配列 Map の要素（キーと値のペア）を列挙

```js
変数名.forEach( 要素ごとに実行されるラムダ式 )
変数名.forEach((value, key, array) => { 要素ごとに実行される文 })
変数名.forEach((value, key) => { 要素ごとに実行される文 })
変数名.forEach((value) => { 要素ごとに実行される文 })
```

```js
let m = new Map([
  ['A', 10],
  ['B', 11],
  ['C', 100],
  ...
])

m.forEach((value, key, array) => {
  console.info(`${key} : ${value}`)
})
```

### for in ループは連想配列 Map では使用できない

### for of ループで連想配列 Map の要素（キーと値のペア）を列挙

```js
for (let キーと値のペアを格納する変数名 of 連想配列の変数名) {
  要素ごとに実行される文
}
```

```js
// for of ループを使用して連想配列 Map のキーと値を列挙する例
let m = new Map([
  ['A', 10],
  ['B', 11],
  ['C', 100],
  ...
])

for (let keyValue of m) {
  let key = keyValue[0]
  let value = keyValue[1]
  console.info(`${key} = ${value}`)
}
```

### クラスオブジェクトの連想配列 Map
クラスオブジェクトを格納した連想配列

```js
class Product {
  Name: string;
  Price: string;
}

let m = new Map<string ,Product> {[
  ['A', {Name: 'Item A', Price: 10}],
  ['B', {Name: 'Item B', Price: 11}],
  ['C', {Name: 'Item C', Price: 100}],
  ...
]}

let p = m.get('F')
console.info(p ? p.name : '')

let result = new Map<string ,Product>();

m.forEach((value, key, array) => {
  if (value.Price > 100) {
    result.set(key, value)
  }
})

console.info(m)
console.info(result)
```

### LINQ クエリで連想配列 Map 要素を列挙

```js
import * as Enumerabe from 'linq'

let m = new Map([
  ['A', 10],
  ['B', 11],
  ['C', 100],
  ...
])

let results = Enumerable.from(Array.from(m))
  .where(keyValue => keyValue[1] > 100)
  .forEach(keyValue => {
    console.info(`${keyValue[0] = ${keyValue[1]}}`)
  })
```

```js
// クラスオブジェクトの連想配列 Map を LINQ で列挙する例
import * as Enumerable from 'linq'

class Product {
  Name : string;
  Price : number;
}

let m = new Map([
  ['A', {Name: 'Item A', Price: 10}],
  ['B', {Name: 'Item A', Price: 11}],
  ['C', {Name: 'Item A', Price: 100}],
  ...
])

let results = Enumerable.from(Array.from(m))
  .where(keyValue => keyValue[1].Price > 100)
  .forEach(keyValue => {
    let p = keyValue[1]
    console.info(`${keyValue[0] = ${p.Name} : ${p.Price}}`)
  })
```

```js
// LINQ クエリ select と toArray を使用して, 連想配列 Map を配列にする例
import * as Enumerable from 'linq'

class Product {
  Name : string;
  Price : number;
}

let m = new Map<string, Product>([
  ['A', { Name: 'Item A', Price : 10 }],
  ['B', { Name: 'Item B', Price : 11 }],
  ['C', { Name: 'Item C', Price : 100 }],
  ...
])

let results = Enumerable.form(Array.from(m))
  .where(keyValue => keyValue[1].Price > 100)
  .select(keyValue => keyValue[1])
  .toArray()

console.info(results)
```

### 連想配列 Object の宣言とオブジェクトリテラルによる初期化
あえて Map を使用しない場合

```js
let 変数名 : {[key:string] : 値のデータ型;} = {キー1: 値1, キー2: 値2, ...}
let 変数名 : {[key:string] : 値のデータ型;} = {}
```

```js
let m : {[key:string] :number;} = {
  'A': 10, 
  'B': 11,
  ...
}
console.info(m)
```

キーのデータ型として任意のデータ型を指定できないことに注意

### 連想配列 Object 要素の参照・追加

```js
変数名['キー']
変数名['キー'] = 値
```

```js
// 連想配列 Object の値の参照と設定の例
let m : {[key:string] :number;} = {
  'A' : 10,
  'B' : 11,
  ...
}

m['A'] = 0;
m['G'] = 10000
console.info(m)

let valueC = m['C']
console.info(valueC)

let valueZ = m['Z']
console.info(valueZ)
```

### 連想配列 Object 要素の個数

```js
Object.keys(変数名).length
```

```js
// 連想配列 Object 要素の個数を取得する例
let m : {[key:string] :number;} = {
  'A': 10,
  'B': 11,
  ...
}

console.info(`keys length : ${Object.keys(m).length}`)
```

### forEach は Object では使用できない

### for in ループで連想配列 Object のキーを列挙

```js
for (let キーを格納する変数名 in 連想配列の変数名) {
  キーごとに実行される文
}
```

```js
let m : {[key:string] : number;} = {
  'A': 10,
  'B': 11,
  ...
}

for (let key in m) {
  if (m.hasOwnProperty(key)) {
    let element = m[key]
    console.info(element)
  }
}
```

### for of ループは連想配列 Object では使用できない

### クラスオブジェクトの連想配列 Object

```js
// クラスオブジェクトの連想配列 Object の例
class Product {
  Name: string;
  Price: number;
}

let m : {[key:string] :Product} = {
  'A' : { Name: 'Item A', Price: 10 },
  'B' : { Name: 'Item B', Price: 11 },
  ...
}

let p = m['F']
console.info(p ? p.Name : '')

let result : {[key : string]: Product;} = {}

for (let key in m) {
  if (m[key].Price > 100) {
    result[key] = value
  }
}

console.info(m)
console.info(result)
```

### LINQ クエリで連想配列 Object 要素を列挙

```js
// クラスオブジェクトの連想配列 Object を LINQ で列挙する例
import * as Enumerable from 'linq'

class Product {
  Name: string;
  Price: number;
}

let m : {[key:string] :number;} = {
  'A': {Name: 'Item A', Price: 10},
  ...
}

let results = Enumerable.from(m)
  .where(keyValue => keyValue.value.Price > 100)
  .forEach(value => {
    let p : Product = keyValue.value
    console.info(`${keyValue.key} = ${p.Name} : ${p.Price}`)
  })
```

Map と違って `Array.from` を使用する必要がありません

```js
// LINQ クエリ select と toArray を使用して, 連想配列 Object を配列にする例
import * as Enumerable from 'linq'

class Product {
  Name: string;
  Price: number;
}

let m : {[key:string] :number;} = {
  'A' : {Name: 'Item A', Price: 10},
  ...
}

let results = Enumerable.from(m)
  .where(keyValue => keyValue.value.Price > 100)
  .select(keyValue => keyValue.value as Product)
  .toArray()

console.info(results)
```

## その他のループ

### for ループ

```js
for (初期化; 状態; 状態の更新) {
  状態が true 間繰り返し実行される文
}
```

### while ループ

```js
while (状態) {
  状態が true の間繰り返し実行される文
}
```
### do while ループ

```js
do {
  最初の1回目とそのあとに状態が true の間繰り返し実行される文
} while(状態)
```
