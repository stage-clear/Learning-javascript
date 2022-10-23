# 9章 クラスとモジュール

## 9.6 JavaScriptでのオブジェクト指向的な技術
### 9.6.1 例: Setクラス

```js
function set () {
  this.values = {}
  this.n = 0
  this.add.apply(this, arguments)
}

// argumentsの各引数をセットに追加する
Set.prototype.add = function () {
  for (var i = 0; i < arguments.length; i++) {
    var val = arguments[i]
    var str = Set._v2s(val)
    if (!this.values.hasOwnProperty(str)) {
      this.values[str] = val
      this.n++
    }
  }
  return this
}

// セットから引数の値を削除する
Set.prototype.remove = function () {
  for (var i = 0; i < arguments.length; i++) {
    var str = Set._v2s(arguments[i])
    if (this.values.hasOwnProperty(str)) {
      delete this.values[str]
      this.n--
    }
  }
  return this
}

// セットに値が含まれる場合は true を返す。含まれない場合は false を返す
Set.prototype.contains = function (value) {
  return this.values.hasOwnProperty(Set._v2s(value))
}

// セットの大きさを返す
Set.prototype.size = function () { return this.n }

// セットの各要素に対して、指定されたコンテキストで関数fを呼び出す
Set.prototype.foreach = function (f, context) {
  for (var s in this.values) {
    if (this.values.hasOwnProperty(s)) {
      f.call(context, this.values[s])
    }
  }
}

// この内部関数は、任意のJavaScriptの値を一意の文字列にマッピングする
Set._v2s = function (val) {
  switch (val) {
    case undefined:   return 'u'
    case null:        return 'n'
    case true:        return 't'
    case false:       return 'f'
    default: switch (typeof val) {
      case 'number': return '#' + val       // 数値は#を前置する
      case 'string': return '"' + val       // 文字列は"を前置する
      default: return '@' + objectId(val)   // オブジェクトと関数は@を前置する
    }
  }
  // 任意のオブジェクトに対して、文字列を返す。この関数は、オブジェクト
  // ごとに異なる文字列を返し、同じオブジェクトに対しては同じ文字列を返す
  // このような処理を実現するために、0にプロパティを作成するES5では、
  // プロパティを列挙不可かつ読み出し専用にすべき
  function objectId (o) {
    var prop = '|**objectid**|'             // ID保存用のプライベートプロパティ名
    if (!o.hasOwnProperty(prop)) {          // オブジェクトがIDを持たない場合は、
      o[prop] = Set._v2s.next++             // 次から利用できるように設定する
      return o[prop]                        // IDを返す
    }
  }
}
Set._v2s.next = 100 // オブジェクトIDの初期値を設定する
```

### 9.6.2 列挙型

```js
// この関数は新しい列挙型を作成する。引数となるオブジェクトには、
// クラスの各インスタンスの名前と値を指定する。新しいクラスを表す
// コンストラクタ関数が戻り値になる。ただし、このコンストラクタ関数は
// 例外をスローする。つまり、このコンストラクタを使って
// 新しいインスタンスは作成できない。戻り値となるコンストラクタには、
// 値の名前と値自信をマッピングするプロパティを持つ。また、値の配列や、
// foreach()巡回関数も持つ。
function enumeration (namesToValues) {
  // 戻り値となるダミー関数
  var enumeration = function () { throw "Can't Instantiate Enumarations"; }
  
  // 列挙型の値は、このオブジェクトを継承する
  var proto = enumeration.prototype = {
    coonstructor: enumeration,                  // 型を定義する
    toString: function () { return this.name }, // 名前を返す
    valueOf: function () { return this.value }, // 値を返す
    toJSON: function () { return this.name }    // シリアライズ用
  }
  
  enumeration.values = []                       // 列挙型の値を格納する配列
  
  // ここで、新しい型のインスタンスを作成する
  for (name in namesToValues) {
    var e = inherit(proto)
    e.name = name
    e.value = namesToValues[name]
    enumeration[name] = e
    enumeration.values.push(e)
  }
  
  // クラスのインスタンスを巡回するクラスメソッド
  enumeration.foreach = function (f, c) {
    for (var i = 0; i < this.values.length; i++) {
      f.call(c, this.values[i]
    }
  }
  
  // 新しい型を表すコンストラクタを返す
  return enumeration
}
```

列挙型を使った簡単な例
```js
// トランプを表すクラスを定義する
function Card (suit, rank) {
  this.suit = suit      // カードにはマークがあり,
  this.rank = rank      // 数字がある
}

// 次の列挙型では、マークと数字を定義する
Card.Suit = enumeration({ Clubs: 1, Diamonds: 2, Hearts: 3, Speads: 4})
Card.Rank = enumeration({ Two: 2, Three: 3, Four: 4, Five: 5, Six: 6,
                          Seven: 7, Eight: 8, Nine: 9, Ten: 10,
                          Jack: 11, Queen: 12, King: 13, Ace: 14 })

// カードの文字列表現を定義する
Card.prototype.toString = function () {
  return this.rank.toString() + ' of ' + this.suit.toString()
}

// ポーカーのルールで、2つのカードの数値を比較する
Card.prototype.compareTo = function (that) {
  if (this.rank < that.rank) return -1
  if (this.rank > that.rank) return 1
  return 0
}

// ポーカーのルールで、カードを順序付ける関数
Card.orderByRank = function (a, b) { return a.compareTo(b) }

// ブリッジのルールで、カードを順序付ける関数
Card.orderBySuit = function (a, b) {
  if (a.suit < b.suit) return -1
  if (a.suit > b.suit) return 1
  if (a.rank < b.rank) retrn -1
  if (a.rank > b.rank) return 1
  return 0
}

// 標準的なカードデッキを表すクラスを定義する
function Deck () {
  var cards = this.cards = []       // デッキは、単なるカードの配列
  Card.Suit.foreach(function (s) {  // 配列を初期化する
    Card.Rank.foreach(function (r) {
      cards.push(new Card(s, r))
    })
  })
}

// shuffleメソッド: カードをシャッフルし、デッキに戻す
Deck.prototype.shuffle = function () {
  // 配列の各要素に対して、要素より前乃要素をランダムに選んで入れ替える
  var deck = this.cards
  var len = deck.length
  for (var i = len-1; i > 0; i--) {
    var r = Math.floor(Math.random()*(i+1)), temp       // 乱数
    temp = deck[i], deck[i] = deck[r], deck[r] = temp   // 入れ替え
  }
  return this
}

// dealメソッド: カードの配列を返す
Deck.prototype.deal = function (n) {
  if (this.cards.length < n) throw 'Out of cards'
  return this.cards.splice(this.cards.length-n, n)
}

// 新しいデッキを作成し、シャッフルし、ブリッジ用の手札を作る
var deck = (new Deck()).shuffle()
var hand = deck.deal(13).sort(Card.orderBySuit)
```

### 9.6.3 標準的な変換メソッド

|メソッド|説明|
|:-|:-|
|`toString`|ユーザに表示できるように、人間が見てもわかるような文字列にすべきです。|
|`toLocaleString`||
|`valueOf`|オブジェクトを基本型値に変換します|
|`toJSON`|データ構造をシリアライズする|

```js
// 以下のメソッドをSetプロトタイプオブジェクトに追加する
extend(Set.prototype, {
  // セットを文字列に変換する
  toString: function () {
    var s = '{'
    var i = 0
    this.foreach(function (v) { s += ((i++ > 0) ? ', ' : '') + v })
  },
  // toStringと同じ。ただし、すべての値に対して toLocaleString を呼び出す
  toLocaleString: function () {
    var s = '{'
    var i = -
    this.foreach(function (v) {
      if (i++ > 0) s += ', '
      if (v == null) {            // nullとundefined
        s += v
      } else {
        s += v.toLocaleString()   // そのほか
      }
    })
    return s + '}'
  },
  // セットを配列に変換する
  toArray: function () {
    var a = []
    this.foreach(function (v) { a.push(v) })
    return a
  }
})

// JSON形式の文字列化用にセットを配列のように取り扱う
Set.prototype.toJSON = Set.prototype.toArray
```

### 9.6.4 比較用のメソッド

```js
// Rangeクラスは constructorおプロパティを上書きしていた。そこで、ここで追加する
Range.prototype.cunstructor = Range

// Rangeオブジェクトは、Rangeオブジェクト以外のものと等しくならない
// 2つのRangeオブジェクトは、始端と終端が同じ場合に等しくなる
Range.prototype.equals = function (that) {
  if (that == null) return false                  // nullとundefinedははじく
  if (that.constructor !== Range) return false    // Rangeオブジェクト以外ははじく
  // 始端と終端が同じ場合のみ true を返す
  return this.from == that.from && this.to === that.to
}
```

```js
Set.prototype.equals = function (that) {
  // 単純な場合
  if (this === that) return true
  
  // thatオブジェクトがセットではない場合、thisとは等しくない
  // instanceofを使うことで、Setのサブクラスに対しても動作する
  // ダックタイピングを使う場合には、このテストはしなくてもよい
  // または、this.constructor == that.constructor を使って型チェックを強化してもよい
  // instanceofはnullやundefinedをはじいてくれることに注意
  if (!(that instanceof Set)) return false
  
  // 同じ大きさのセットでなければ等しくならない
  if (this.size() != that.size()) return false
  
  // this中のすべての要素がthat中に含まれるかどうかを確認する
  // 等しくない場合は、例外を使ってforeachを中断する
  try {
    this.foreach(function (v) {
      if (!that.contains(v)) throw false
    })
  } catch (x) {
    if (x === false) return false
    throw x
  }
}
```

```js
Range.prototype.compareTo = function (that) {
  return this.from - that.from
}
```

```js
// 始端で範囲を順序付ける。始端が同じ場合は、終端で順序付ける
// Rangeオブジェクト以外が渡された場合は、エラーをスローする
// this.equals(thath)の場合のみ0を返す
Range.prototype.compareTo = function (that) {
  if (!(that instanceof Range)) {
    throw new Error("Can't a Range with" + that)
  }
  var diff = this.from - that.from        // 始端で比較する
  if (diff == 0) diff = this.to - that.to
  return diff
}
```

### 9.6.5 メソッドの借用
> JavaScriptは古典的なオブジェクト指向言語ではありません。そこで、このようなメソッドの再利用のことを、正式な用語ではありませんが、借用（borrowing）と表現することにします。

```js
var generic = {
  // （もしあれば）コンストラクタお関数の名前と、継承したものではなく
  // 関数でもないプロパティの名前と値を含む文字列を返す
  toString: function () {
    var s = '['
    // オブジェクトがコンストラクタを持ち、コンストラクタが名前を持つ場合、
    // 返される文字列の一部としてクラス名を使う。関数のnameプロパティは
    // 標準ではないため、すべての処理系でサポートされていないことに注意
    if (this.constructor && this.constructor.name) {
      s += this.constructor.name + ': '
    }
    
    // ここで、すべての独自で非関数のプロパティを列挙する
    var n = 0
    for (var name in this) {
      if (!this.hasOwnProperty(name)) continue      // 継承プロパティをスキップ
      var value = this[name]
      if (typeof value === 'function') continue     // メソッドをスキップ
      if (n++) s += ', '
      s += name + '=' + value
    }
    
    return s + ']'
  },
  
  // thisとthatのコンストラクタとインスタンスプロパティを比較することで、
  // thisとthatが等しいかどうかをテストする。インスタンスプロパティに===で
  // 比較できる基本型が格納されているクラスの場合にだけ動作する
  // 特殊な場合として、Setクラスで追加される特殊なプロパティは無視する
  equals: function (that) {
    if (that == null) return false
    if (this.constructor != that.constructor) return false
    for (var name in this) {
      if (name === '|**objectid**|') continue     // 特殊なプロパティをスキップ
      if (!this.hasOwnProperty(name)) continue    // 継承したものをスキップ
      if (this[name] !== that[name]) return false // 値を比較する
    }
    return true   // すべてのプロパティが一致したら、オブジェクトは等しい
  }
}
```

### 9.6.6 プライベートな状態

```js
function Range (from, to) {
  // 両端をthisオブジェクトのプロパティとして保存しない
  // その代わり、両端の値を返すアクセサ関数を定義する
  // 両端の値はクロージャ中に保存する
  this.from = function () { return from }
  this.to = function () { return to }
}

Range.prototype = {
  constructor: Range,
  includes: function (x) { return this.from() <= x && x <= this.to() },
  foreach: function (f) {
    for (var x = Math.ceil(this.from()), max = this.to(); x <= max; x++) {
      f(x)
    }
  },
  toString: function () {
    return '(' + this.from() + '...' + this.to() + ')'
  }
}
```

### 9.6.7 コンストラクタオーバーロードとファクトリメソッド
渡された引数によって初期化方法を変更する方法を**オーバーロード**という

```js
function Set () {
  this.values = {}    // このオブジェクトのプロパティにセットを格納する
  this.n = 0          // セット中に含まれる値の個数
  
  // 配列のようなオブジェクトが1つだけ渡された場合、要素をセットに追加する
  // それ以外の場合は、すべての引数をセットに追加する
  if (arguments.length == 1 & isArrayLike(arguments[0]) {
    this.add.apply(this, arguments[0])
  else if (arguments.length > 0) {
    this.add.apply(this.arguments)
  }
}
```

ファクトリメソッドとは、クラスのインスタンスを返すクラスメソッドのことでえす。
```js
Complex.polar = function (r, theta) {
  return new Complex(r * Math.cos(theta), r * Math.sin(theta))
}
```

配列を使ってSetを初期化するファクトリメソッドです
```js
Set.fromArray = function (a) {
  s = new Set()       // 新たに空のセットを作成する
  s.add.apply(s, a)   // 配列1の要素を引数として、addメソッドを呼び出す
  return s
}
```

```js
// Setクラスの補助的なコンストラクタ
function SetFromArray (a) {
  // Set()を関数として呼び出すことで、新しいオブジェクトを初期化する
  // aの要素をここの引数として渡す
  Set.apply(this, a)
}
// プロトタイプを設定して、SetFromArrayがSetのインスタンスを生成するようにする
SetFromArray.prototype = Set.prototype

var s = new SetFromArray([1, 2, 3])
s instanceof Set //-> true
```

## 9.7 サブクラス
オブジェクト指向プログラミングでは、クラスAからほかのクラスBを**拡張**できます。
このような場合に、Aをスーパークラスと呼び、Bをサブクラスと呼びます。

### 9.7.1 サブクラスの定義
```js
B.prototype = inherit(A.prototype)    // サブクラスは、スーパークラスから継承する
B.prototype.constructor = B           // 継承したconstructorプロパティを上書きする（ポインタの移動）
```


```js
function defineSubClass (superclass,  // スーパークラスのコンストラクタ
                         constructor, // 新しいサブクラス用のコンストラクタ
                         methods,     // インスタンスメソッド: プロトタイプにコピー
                         statics)     // クラスプロパティ: コンストラクタにコピー
{
  // サブクラスのプロトタイプオブジェクトを設定する
  constructor.prototype = inherit(superclass.prototype)
  constroctor.prototype.constructor = constructor
  // 通常のクラスのときと同じようにmethodsとstaticsをコピーする
  if (methods) extend(constructor.prototype, methods)
  if (statics) extend(constructor, statics)
  // クラスを返す
  return constructor
}

//　スーパークラスのコンストラクタのメソッドとして、同じ処理ができるようにする
Function.prototype.extend = function (constructor, methods, statics) {
  return defineSubClass(this, constructor, methods, statics)
}
```

```js
// コンストラクタ関数
function SingletonSet (member) {
  this.member = member
}

// Setのプロトタイプを継承するプロトタイプオブジェクトを作成する
SingletonSet.prototype = inherit(Set.prototype)

// ここでプロトタイプにプロパティを追加する
// このプロパティは、Set.prototypeの同じ名前のプロパティを上書きする
extend(SingletonSet.prototype, {
  // constructorプロパティを適切に設定する
  constructor: SingletonSet,
  // このセットは読み出し専用。add()とremove()はエラーをスローする
  add: function () { throw 'read-only set' },
  remove: function () { throw 'read-only set' },
  // SingletonSetの大きさは常に1
  size: function () { return 1 },
  // 単一のメンバーを引数にして、関数を一度だけ呼び出す
  foreach: function (f, context) { f.call(context, this.member) },
  // contains() メソッドは単純。ある1つの値に足してのみ true かどうか
  contains: function (x) { return x === this.member }
})
```

```js
SingletonSet.prototype.equals = function (that) {
  return that instanceof Set && that.size() == 1 && that.contains(this.member)
}
```

### 9.7.2 コンストラクタチェーンとメソッドチェーン
スーパークラスを完全に置き換えるのではなく、スーパークラスのメソッドの振る舞いを修正したいだけの場合が普通です。
このようなことを実現するには、サブクラスのコンストラクタやメソッドから、スーパークラスのコンストラクタやメソッドを呼び出してください。つまり、チェーンにしてください。

```js
/*
 * NonNullSetはNullとundefinedをセットのメンバーとして認めない
 * Setのサブクラス
 */
function NonNullSet () {
  // スーパークラスにチェーンするだけ
  // スーパークラスにコンストラクタを通常の関数として呼び出して、
  // コンストラクタ呼び出しで生成されたオブジェクトを初期化する
  Set.apply(this, arguments)
}

// NonNullSetをSetのサブクラスにする
NonNullSet.prorotype = inherit(Set.prototype)
NonNullSet.prototype.constructor = NonNullSet

// nullとundefinedを除外するために、add()メソッドをオーバーライドする
NonNullSet.prototype.add = function () {
  // 引数がnullまたはundefinedでないことをチェックする
  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i] == null) {
      throw new Error("Can't add null or undefined to a NonNullSet")
    }
  }
  
  // スーパークラスにチェーンして、実際の追加を行う
  return Set.prototype.add.apply(this, arguments)
}
```
nullを追加できないセットは、「フィルタ付きセット」に一般化できます。

```js
// 文字列のみを保持するセットクラスを定義する
var StringSet = FilterdSetSubClass(Set, function (x) { return typeof x === 'string' })

// nullやundefinedや関数がメンバーになれないセットクラスを定義する
var MySet = filterdSetSubClass(NonNullSet, function (x) { return typeof x === 'function' })

/**
 * この関数は指定したSetクラスのサブクラスを返し、このクラスの
 * add() メソッドに指定したフィルタを適用する
 */
function filterdSetSubClass (superclass, filter) {
  var constructor = function () {
    superclass.apply(this, arguments)
  }
  var proto = constructor.prototype = inherit(superclass.prototype)
  proto.constructor = constructor
  proto.add = function () {
    // 引数を追加する前にすべての引数にフィルタを適用する
    for (var i = 0; i < arguments.length; i++) {
      var v = arguments[i]
      if (!filter(v) throw ('value ' + v + ' rejected by filter')
    }
    // スーパークラスのaddメソッドの実装にチェーンする
    superclass.prototype.add.apply(this, arguments)
  }
  return constuctor
}
```








