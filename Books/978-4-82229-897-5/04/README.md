# 基本的なデータ型と制御文
## プログラムの実行順序

## 変数とデータ型の違い

```ts
class Product {
  id: number;
  Name: string;
  ISBN10: string;
  ISBN13: string;
}

let item1 : Product = {
  id: 1,
  Name: 'チーム開発の教科書',
  ISBN10: '48xxxxxxxxx',
  ISBN13: '978-xxxxxxxxxxx'
}

let item2 : Product = {
  id: 2, 
  Name: 'はじめてのASP.net',
  ISBN10: 'xxxxxxxxx',
  ISBN13: 'xxx-xxxxxxxxxxx'
}
```

```ts
// 4.12 表の値として同じデータ型が複数入れられる
let values : Array<number> = [1, 2, 3]

let products : Array<Product> = [
  {
    id: 1, 
    Name: 'チーム開発の教科書',
    ISBN10: 'xxxxxxxxxx',
    ISBN13: 'xxx-xxxxxxxxxxx'
  },
  {
    id: 2,
    Name: 'はじめてのASP.NET',
    ISBN10: 'xxxxxxxxxx',
    ISBN13: 'xxx-xxxxxxxxxx'
  }
]
```

```ts
// 4.13 値を束ねる Tuple
let result : [number, number]

result - [6156, 2]
console.log(result[0])
```

Tuple を1つの変数に複数の値をいれることができますが, クラスと違って名前を付けて広範囲で使える新しい型を宣言するのではなく,
ごく限られた範囲で一時的に使用できる型の組み合わせを決めることができます.
```ts
// 4.14 変数宣言時にいくつかのデータ型から選びたい ジェネリック
class Favorites<T> { // 宣言時はTで仮の型を表しておく
  private list : Array<T> = new Array<T>()
  
  public GetItems () : Array<T> {
    return this.list
  }
  
  public Add (item : T):void {
    this.list.push(item)
  }
}

let animals = new Favorites<string>() // T を string に置き換える

animals.Add('Dog')
console.info(animals.GetItems()[0])

let days = new Favorites<Date>() // T を Date に置き換える
days.Add(new Date())
console.info(days.GetItems()[0])
```

```ts
// 4.15 機能使用時にいくつかのデータ型から選びたい オーバーロード

// オーバーロードで引数の型を選べるように定義
function getText(value: number) : string 
function getText(value: Date) : string 
function getText(value: string) : string
function getText(value: any): string  {
  // 実際に指定された引数の型を特定しながら処理を行う
  if (typeof value ==~ 'string') {
    return value
  } else if (typeof value === 'number') {
    return value.toString()
  } else if (typeof value === 'object' && value instanceof Date) {
    return value.toLocalDateString()
  }
  return 'others'
}

// 使用時にデータ型を選ぶ
console.log(getText(100))
console.log(getText(new Date()))
console.log(getText('Hello!'))
```
再利用可能な「機能」として作成した関数やクラスのメソッドに渡す値の型を, 1つのデータ型には限定しないで,
いくつかのデータ型を指定できるようにしたい場合はオーバーロードを定義します.
オーバーロードを使用すると, たとえば「数値あるいは日付を指定できる関数」が作れます.


```ts
// 4.16 どんなデータ型でも良いとする any 
let something : any // どんな型でも代入できる変数

something = 'Hello!'
console.info(something)

something = 100 
console.info(something / 10)

something = true 
console.info(something)

something = new Date()
console.info(something.toLocaleDateString())
```

## プログラムコードの書き方（文, 行, ブロック, コメント）
### `;` （文末セミコロン）

### `{}` （ブロック）

### 改行・インデント（字下げ）

### コメント

## 変数の宣言

```ts
let 名前 : データ型 = 初期値;
let 名前 : データ型;
let 名前 = 初期値;
```

### スコープ内で重複しない名前をつける

### 変数名の変更

## 基本的なデータ型と演算子
### boolean 型

```ts
let isStudent : boolean = true
let opened = false
```

### number 型

```ts
let num1 : number = 10
let num2 : number = 0xF
let num3 : number = 0.1
let num4 = 10000000000000000
```

### string 型

```ts
let userName : string = 'Moe Yamada'
let welcome : string = '"Welcome Back!"'
let messgaae = `${userName} says
${welcome}`

console.log(userName)
console.log(welcome)
console.log(message)
```

### null と undefined

```ts
let u : Date
console.info(u)

let n : Date = null 
console.info(n)

let d = new Date()
console.info(d)
```

### 代入演算子 `=`

### 比較演算子 `""` `!=` `===` `!==`

### 論理否定（NOT）演算子 `!`

### 論理積（AND）演算子 `&&`

### 論理和（OR）演算子 `||`

### 比較演算子 `<` `<=` `>=` `>`

### 算術演算子 `+` `-` `*` `/` `%` `**`

### 算術演算子の優先順位

### 文字列連結演算子+

### 複合代入演算子 `+=` `-=` `*=` `/=` `%=` `**=`

### インクリメント演算子 `++`, デクリメント演算子 `--`

## 列挙型 enum と定数 const 
たとえば3つの値の中から1つを選択できるような値を扱うにはどうすればよいでしょうか.
それを実現できるのが列挙型 enum です

### 列挙型 enum 

```ts
enum 列挙型の名前 {
  メンバー1の名前,
  メンバー2の名前,
  ...,
  最後のメンバーの名前
}
```

```ts
enum Decision {
  Yes,
  No,
  Pending
}

let d : Decision =  Decision.Pending
console.log(d === Decision.Pending)
```

```ts
// 4.43 条件分岐を使って列挙型の値に応じた処理を実行する例

if (d == Decision.Yes) {
  console.log('YES')
} else {
  console.log('Not YES')
}

switch (d) {
  case Decision.Yes:
    console.log('Yes')
    break 
  case Decision.No:
    console.log('No')
    break
  default:
    console.log('Others')
    break
}
```

```ts
// 列挙型で扱う内容の例
enum WorkingDays{ None, Monday, Tuesday, Wednesday, Thursday, Friday }
let w = WorkingDays.Friday
console.info(w == WorkingDays.Friday)

enum ItemState { Started, Approved, Compolete, Cancelled }
let s = ItemState.Approved
console.info(s == ItemState.Approved) // true
console.info(ItemState[s]) // "Approved"
```

### 列挙型 enum メンバーの名前の扱い
`列挙型の名前[変数の名前]` の書式で指定すると, 変数の現在の名前を取得することができます

```ts
// 列挙型の変数の値の名前を取得する例
enum Decision {
  Yes, 
  No, 
  Pending
}
let d : Decision = Decision.Pending
console.info(d)
console.info(Decision[d])
```

この方法では列挙型を使用する場合, 列挙型の変数をテキストとして出力すると管理上の数値が表示され,
`列挙型の名前[変数の名前]` の書式で名前を確認することができます.

```ts
enum Decision {
  Yes = 'YES',
  No = 'No',
  Pending = 'PENDING'
}

let d : Decision = Desicion.Pending
console.info(d) // "PENDING"
console.info(Decision[d]) // undefined
```

頻繁に名前をテキストとして出力する場合などに,
必要に応じて列挙型のメンバーそれぞれに名前とは別の文字列の値を設定して使用することができます.

```ts
// 列挙型 enum をフラグとして使用する定義とビット演算の例
enum Decision {
  Yes = 0x1,
  No = 0x2,
  Pending = 0x4,
  YesAndNo = Yes | No
}

let d : Decision Decision.YesAndNo
console.info( (d & Decision.Yes) != 0 )
console.info( (d & Decision.No) != 0 )
console.info( (d & Decision.Pending) != 0 )

d = Decision.Pending
console.info( (d & Decision.Yes) != 0 )
console.info( (d & Decision.No) != 0 )
console.info( (d & Decision.Pending) != 0 )
```

### 定数 const

```ts
const 定数の名前 = 値
```

```ts
// 定数の宣言の例
const beta = true 
console.info(beta)

let other = beta
let isTrue = (beta == true)

const rate = 0.1
console.info(rate)

const domain = 'example.com'
console.info(domain)
```

```ts
// 定数を変更するとエラー
const beta = true 
console.info(beta)
beta = false
```

### 定数列挙型 `const enum`

```ts
const enum WorkingDays { None, Monday, Thuesday, Wednesday, Thursday, Friday }
let w = WorkingDays.Friday
console.info(w == WorkingDays.Friday)
```

```ts
// 生成された JavaScritp コード
var w = 5 /* Friday */;
console.info(w == 5 /* Friday */);
```

```ts
// 定数列挙型 const enum で文字列挙値を指定した宣言と使用の例
conste enum = WorkingDays {
  None = 'None',
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday'
}

let w = WorkingDays.Friday
console.info(w == WorkingDays.Friday)
```

## 条件分岐 if, switch
### 条件分岐 `.if - else`
### 条件演算子（参考演算子）`? :`
### 条件分岐 `switch`

```ts
// 列挙型 enum の値によって処理を分岐する switch の例
enum ItemState{ Started, Approved, Complete, Cancelled }

let getSubmitButtonEnabled = (s: ItemState) : boolean => {
  switch (s) {
    case ItemState.Started:
    case ItemState.Approved:
      return true 
    default:
      return false
  }
}

let enabled = getSubmitButtonEnabled(ItemState.Approved)
console.info(enabled)
```
