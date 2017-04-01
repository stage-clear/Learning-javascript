# 一歩進んだ TypeScript
## オプショナル
### 関数のオプショナル引数
#### 空かもしれない
**オプショナル**とは, **取捨選択可**という意味で, 具体的には**空かもしれない**ことを示します.

#### オプショナルな引数を取る関数

```ts
// 6-1. 関数 showMember (オプショナル引数を含む)
function showMember(username:string, realname?:string):string {
  let showStr = username
  if (realname) {
    showStr += `(本名: ${realname})`
  }
  return showStr + 'さん'
}
```

#### オプショナルな関数の呼び出し方

```ts
// 6-2 引数を1つしか与えず, 関数が呼べる
let cheetah = showMember('チーター')
```

```ts
// 6-4 引数をすべて与えて, 関数を呼ぶ
let susie = showMember('スージー', '高橋明子')
```

```ts
// 6-4 最後に出力する
const br = '<br>'
document.body.innerHTML = cheetah + susie
```

### インターフェイスのオプショナル属性
#### オプショナルな属性を持つインターフィエス

```ts
// オプショナル属性をもつインターフェイス
interface Member {
  username:string;
  realname?:string;
}
```

#### オプショナルな属性をもつインターフェイスのオブジェクト

```ts
// 6-7 インターフェイス Member のオブジェクト2つ
let cheetah = { username: 'チーター' }
let susie = { username: 'スージー', realname: '高橋明子' }
```

これでは, 書いた人の気持ちは `Member` オブジェクトなのですが, インターフェイス `Member` の定義を知らない人には分かりません.

```ts
// 6-8 データ型を明記
let cheetah:Member = { username: 'チーター' }
let susie:Member = { username: 'スージー', realname: '高橋明子' }
```

#### オプショナルな属性をもつインターフェイスを用いる関数
オプショナルな属性をもつインターフェイスのオブジェクトを, 関数などで用いる場合は, その属性が空である場合は考慮しなければなりません.

```ts
// 6-9 Memberオブジェクトを用いる, 関数 showmember
function showMember(member:Member):string {
  let showStr = member.usename
  if (member.realname) {
    showStr += `(本名: ${member.realname})`
  }
  return showStr + 'さん'
}
```

```ts
// 6-10 関数を用いて完成
const br = '<br>'
document.body.innerHTML = showMember(cheetah) + br + showMember(susie)
```

### クラスのオプショナル属性は
#### オプショナルにしなくても対処できる

#### 属性を空にしないクラス

```ts
// 6-11 クラス UniversalMember の定義
class UniversalMember {
  username:string
  realname:string
  
  constructor() {
    this.username = 'anonymous'
    this.realname = '匿名'
  }
  // 後から属性地を変更するメソッドを与える
}
```

#### 後から属性を変えてもいい (オプショナル)
メソッドの中でオブジェクトを新規作成し, 属性地を与えて, そのオブジェクトを返すというメソッドです.
このようなメソッドはファクトリメソッドと呼ばれ, static メソッドにします.

```ts
// 6-12 オブジェクトを作る static メソッド
static createMember(username?:string, realname?:string):UniversalMember {
  let member = new UniversalMember()
  if (username !== null) {
    member.username = username
  }
  if (realname !== null) {
    member.realname = realname
  }
  return member
}
```

```ts
// 6-13 属性値を表示するメソッド showMember
showMember():string {
  return `${thsi.username} (本名: ${this.realname})さん`
}
```

```ts
// 6-14 トップレベルの処理. 与える引数は1つでも2つでもOK
let cheetah = UniversalMember.createMember('チーター')
let susie = UniversalMember.createMember('スージー', '高橋明子')
```

```ts
// 6-15 出力する
const br = '<br>'
document.body.innerHTML = 
  cheetah.showMember() + br + susie.showMember()
```

## ジェネリック
### データ型の指定法
#### 型はなんでもいいが, 一度決めたらそれだけを使う
> データ型は何でもいいが, 文字列なら文字列, 数値なら数値と決めて, 他は使わない

```ts
// 6-17 ジェネリック型の書き方を使わない, 空の配列
let someStringArray:string[]
someStringArray = new Array()
```

```ts
// 6-18 文字列の配列だがまだ要素はない, という値
let someStringArray = new Array<string>()
```

> Array の要素はどんな型でもいいが, 型の指定は決めなければならないという決まりです.  
> そこで, string であると決めたのです.

```ts
// 6-19 someStringArray に文字列を格納して出力
for (let i = 1; i < 6; i++) {
  someStringArray.push(`${i}月`)
}
document.body.innerHTML = someStringArray.toString()
```

### なぜジェネリック?
#### 何かをジェネリックに指定するには

```ts
// 6-21 引数 item の型は, ジェネリックです
function useGeneric<T>(item:T):string {
  return item.toString()
}
```

```ts
// 6-22 関数 useGeneric 用いる例
let numstr = useGeneric<number>(3.1418)
```

```ts
// 6-23 引数と戻り値が同じデータ型になるジェネリック関数
function useGenericAndGet<T>(item:T):T {
  // ...何か操作して, T型の値を戻す
}
```

#### より複雑なデータ型を準備する

```ts
interface YaoyaItem {
  item:string
  price:number
}

class VgShopGood {
  good:string
  cost:number
  constructor(good:string, cost:number) {
    this.good = good
    this.cost = cost
  }
}

class FieldVg {
  name:string
  value:number
  static createVg(name:string, value:number):FieldVg {
    let vg = new FieldVg()
    vg.name = name
    vg.value = value
    return vg
  }
}
```

#### 3つのデータ型を包含するクラス

```ts
// ジェネリックな型指定を含む, クラス MyVg の定義
class MyVg<T> {
  vg:T
  name:string
  price:number
  constructor(vg:T, name:string, price:number) {
    this.vg = vg
    this.name = name
    this.price = price
  }
}
```

#### ジェネリックなクラスのオブジェクト

```ts
// 6-26 似ているが, 構造が異なる3つのオブジェクト
let yaoyaCarrot:YaoyaItem = { item: 'にんじん', price: 120 }
let shopDaikon = new VgShopGood('だいこん', 90)
let fieldCabbage = FieldVg.createVg('キャベツ', 100)
```

```ts
// 6-27 クラス MyVg<T> 型のオブジェクトを作る関数
let buyFromYaoya = function(vg:YaoyaItem):MyVg<YaoyaItem> {
  return new MyVg<YaoyaItem>(vg, vg.item, vg.price)
}

let buyFromShop = function(vg:VgShopGood):MyVg<VgShopGood> {
  return new MyVg<VgShopGood>(vg, vg.good, vg.cost)
}

let buyFromField = function(vg:FieldVg):MyVg<FieldVg> {
  return new MyVg<FieldVg>(vg, vg.name, vg.value)
}
```


```ts
// 6-28 MyVg<any>型のオブジェクトを格納する配列
let vgcart: MyVg<any>[]
```

```ts
// 6-29 MyVg<any>型の配列 vgcart に, 実際の配列を与える
vgcart = [
  buyFromYaoya(yaoyaCarrot), 
  buyFromShop(shopDaikon), 
  buyFromField(fieldCabbage)
]
```

```ts
// 6-30 後は綺麗にデータ処理
const br = '<br>'
let resultStr = ''
let mySum = 0

for (let vg of vgcart) {
  resultStr += `${vg.name}は ${vg.price}円` + br
  mySum = vg.price
}

resultStr += `合計${mySum}円でした`
document.body.innerHTML = resultStr
```

## データ型の面白い仕様
### 複合的な型指定
#### データ型へのこだわり

#### 3つの型のどれか
6-28 では, 配列 `vgcart` の要素のデータ型を `MyVg<any>` にしましたが,
`MyVg`のジェネリックなデータに指定するデータ型を, `any` よりも厳しく, 以下のように指定できます.


```ts
// 6-32 複合型で指定
let vgcart: MyVg<YaoyaItem|VgShopGood|FieldVg>[]
```

### 型チェック
#### 3つのデータ型を, 1つの関数で処理

#### クラスのオブジェクト(インスタンス)かどうか

```ts
// 6-33 instanceof で型チェック
if (vg instanceof VgShopGood) {
  //...
}
```

### インターフェイスのオブジェクトかどうか
インターフェイスはクラスではないので, `instanceof` が使えません.

```ts
// 6-34 特定のデータ型の属性を取り出せるチェック
if (<YaoyaItem>Vg.item && <YaoyaItem>vg.price) {
  // ...
}
```

`<YaoyaItem>vg` と書いたのは, **強制型変換**というか, **データ型の一方的な解釈**です.

```ts
// 6-35 関数 makeMyVg
let makeMyVg = function(vg:any):MyVg<any> {
  if (vg instanceof VgShopGood) {
    return new MyVg<VgShopGood>(vg, vg.good, vg.cost)
  } else if (vg instanceof FieldVg) {
    return new MyVg<FieldVg>(vg, vg.name, vg.value)
  } else if (<YaoyaItem>vg.item && <YaoyaItem>vg.price) {
    return new MyVg<YaoyaItem>(vg, vg.item, vg.price)
  }
  // どれでもなかった場合, この後に対処
}
```

```ts
// 6-36 処理前のデータを配列に入れてしまう
let rawVgCart = [yaoyaCarrot, shopDaikon, fieldCabbage]
```

```ts
// 6-37 処理前のデータで繰り返し処理ができるようになった
for (let vg of rawVgCart) {
  let myvg = makeMyVg(vg)
  resultStr += `${myvg.name}は${myvg.price}円` + br
  mySum += myvg.price
}
```

####  戻り値も複合型

```ts
// 6-38 異なるデータが混入されている
let rawVgCart = [yaoyaItem, shopDaikon, fieldCabbage, 'サンダル片方']
```

```ts
// 6-39 null も戻り値としてあり得る
let makeMyVg = function(vg:any):MyVg<any>|null {
  // これまでの表記
  return null
}
```

```ts
// 6-40 null でないかどうかのチェックを入れる
for (let vg of rawVgCart) {
  if (makeMyVg(vg)) {
    let myvg = makeMyVg(vg)
    resultStr += `${myvg.name}は  ${myvg.price}円` + br
    mysum += myvg.price
  } else {
    resultStr += '変なものも入っています' + br
  }
}
```
