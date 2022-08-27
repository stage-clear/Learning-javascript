# 第５章　複雑性を抑えるデザインパターン

### 5.2.2 ファンクターの詳細
ファンクターとは、本質的には、関数をマッピングできるデータ構造にすぎません。
その関数の目的は、値をラッパーから持ち上げて（リフトし）、変更してからラッパーに戻すことです。

```
fmap :: (A -> B) -> Wrapper(A) -> Wrapper(B)
```

```js
const plus = R.curry((a, b) => a + b)
const plus3 = plus(3)

// 数値2をWrapperファンクターに保存します
const two = wrap(2)

// fmapを呼び出し、plus3をコンテナにマッピングして、加算を実行します
const five = two.fmap(plus3) // -> Wrapper(5)
five.map(R.identity) // -> 5
```

__リスト5.2 ファンクターをつなげて、与えられたコンテキストに新しい振る舞い（処理）を適用する__
```js
const two = wrap(2)
two.fmap(plus3).fmap(R.tap(infoLogger)) // -> Wrapper(5)
```

- 副作用が存在してはならない
- 合成可能でなければならない
- ⚠️ ファンクターでは、例外を投げることやリストの要素を変異させること、そして関数の動作を変更することは禁止されています。

## 5.3 モナドを使った関数型エラー処理

### 5.3.1 モナド: 制御フローからデータフローへ

```js
class Empty {
  map (f) {
    return this // 1
  }
  
  // fmap :: (A -> B) -> Wrapper[A] -> Wrapper[B]
  fmap (_) {
    return new Empty()
  }
  
  toString () {
    return 'Empty ()'
  }
}

const empty = () => new Empty()
```

1. Emptyに関数をマッピングすると、単純に処理をスキップする

```js
const isEven = (n) => Number.isFinite(n) && (n % 2 == 0) // 1
const half = (val) => isEven(val) ? wrap(val / 2) : empty()

half(4) // -> Wrapper(2)
half(3) // -> Empty
```
1. ヘルパー関数が偶数と奇数の数字を区別する
2. halfは偶数にも半分にし、奇数の場合はEmptyコンテナを返す

モナドに関して、理解すべき2つの重要なコンセプトがあります。
- __モナド（Monad）__: モナド処理（_Monadic operation_）の抽象インターフェースを提供する
- __モナド型（Monadic type）__: モナドインターフェースの実装

モナド型は、処理のチェーン化やその型の関数を入れ子にするとはどのようなことかということを定義します。
そして、モナド型のすべてが次に挙げるインターフェースに準拠していなければなりません。

- __型コンストラクタ__（型構築子）: モナド型を生成する（Wrapperコンストラクタに類似）
- __ユニット関数__: ある型の値をモナド構造（_Monadic structure_）に挿入する（`wrap`や`empty`関数に似ている）。モナド内部に実装された場合は、`of`関数と呼ぶ
- __バインド関数__: 処理をチェーン化する（`flatMap`としても知られている）。本書では以後、ただ`map`と呼ぶ
- __ジョイン（結合）処理__: モナド構造のレイヤーを単層に平坦化する。特にモナドを返す関数について複数個合成する際に重要

```js
class Wrapper {
  constructor (value) { // 1
    this._value = value
  }
  
  static of (a) { // 2
    return new Wrapper(a)
  }
  
  // 3
  map (f) {
    return Wrapper.of(f(this._value))
  }
  
  join () { // 4
    if (!(this._value instanceof Wrapper)) {
      return this
    }
    return this._value.join()
  }
  
  get () {
    return this._value
  }
  
  toString () { // 5
    return `Wrapper (${this._value})`
  }
}
```

1. 型コンストラクタ
2. ユニット関数
3. バインド関数（ファンクター）
4. 入れ子になった層を平坦化する
5. この構造のテキスト表現を返す

```js
Wrapper.of('Hellow Monads!')
  .map(R.toUpper)
  .map(R.identity) // -> Wrapper('HELLO MONADS!')
```

__リスト5.4 平坦化のためのモナド構造のサンプル__
```js
// findObject :: DB -> String -> Wrapper(A)
const findObject = R.curry((db, id) =>
  Wrapper.of(find(db, id)))

// getAddress :: Student -> Wrapper(A)
const getAddress = student =>
  Wrapper.of(student.map(R.prop('address'))

const studentAddress =
  R.compose(getAddress, findObject(DB('student')))
studentAddress('444-44-4444').join().get()

Wrapper.of(Wrapper.of(Wrapper.of('Get Functional'))).join()
//-> Wrapper('Get Funtional')
```

### 5.3.2 MaybeモナドとEitherモナドによるエラー処理
- 不純性を論理的に分離する
- nullチェックのロジックを統合する
- 例外を投げる処理を統合する
- 関数の合成をサポートする
- デフォルト値の提供ロジックを一元化する

#### Maybe で null チェックを一元化
Maybeモナドはnullチェックのロジックを効果的に統合します。Maybe自体は、以下の2つの具象サブタイプを持つただのEmpty型です。

- Just(value): 定義した値をラッピングするコンテナを表す
- Nothing(): 値を持たないコンテナ、または追加情報の必要がない失敗を表す。`Nothing`の場合でも、（この場合は存在しない）その値に関数を適用できる

__リスト5.5 JustおよびNothingの各サブクラスを使ったMaybeモナド__
```js
class Maybe {
  static just(a) {
    return new Just(a)
  }
  
  static nothing () {
    return new Nothing()
  }
  
  static fromNullable (a) {
    return a !== null ? Maybe.just(a) : Maybe.nothing()
  }
  
  static of (a) {
    return just(a)
  }
  
  get isNothing () {
    return false
  }
  
  get isJust () {
    return false
  }
}

class Just extends Maybe {
  constructor (value) {
    super()
    this._value = value
  }
  
  get value () {
    return this._value
  }
  
  map (f) {
    return Maybe.fromNullable(f(this._value))
  }
  
  getOrElse (_) {
    return this._value
  }
  
  filter (f) {
    Maybe.fromNullable(f(this._value) ? this._value : null)
  }
  
  chain (f) {
    return f(this._value)
  }
  
  toString () {
    return `Maybe.Just(${this._value})`
  }
}

class Nothing extends Maybe {
  map (f) {
    return this
  }
  
  get value () {
    throw new TypeError("Can't extract the value of a Nothing.")
  }
  
  getOrElse (ohter) {
    return ohter
  }
  
  filter ( f) {
    return this
  }
  
  chain (f) {
    return this
  }
  toString () {
    return `Maybe.Nothing`)
  }
}
```

Maybeは明治的に「null許容」値（nullとundefined）の扱い抽象化します。
そのため、より重要なことだけを心配すればよくなります。Maybeは基本的に、具象的なモナド構造であるJustとNothingのための包括的な抽象オブジェクトです。

取得結果をMaybe型でラッピングし、さらには該当する関数の名前の先頭に `safe` を追加します。

```js
// safeFindObject :: DB, string -> Maybe(Object)
const safeFindObject = R.curry((db, id) => Maybe.fromNullable(find(db, id)))

// safeFindStudent :: String -> Maybe(student)
const safeFindStudent = safeFindObject(DB('student'))

// address :: safeFindStudent('444-44-4444').map(R.prop('address'))
address
// -> Just(Address(...)) またはNothing
```

フォームの入力フィールドの設定値を参照する例
```js
const userName = findStudent('444-44-4444').map(R.prop('firstName'))

document.querySelector('#student-firstname').value =
  username.getOrElse('Enter first name')
```

⚠️ オブジェクト指向のコードによくあるアンチパターン
```js
function getCountry (student) {
  const school = student.school()
  if (school !== null) {
    const addr = school.address()
    if ( addr !== null) {
      return addr.country()
    }
  }
  return 'Country does not exist!'
}
// 最悪ですね。関数が 'Country does not exist!' という文字列を返したら、何が失敗したということなのでしょうか
```
Maybe構造はこの動作（Nullチェック）を再利用できる形にカプセル化します。
```js
const country = R.compose(getCountry, safeFindStudent)

const getCountry = (student) => student
  .map(R.prop('school'))
  .map(R.prop('address'))
  .map(R.prop('country'))
    .getOrElse('Country does not exist!')
// どこかで Nothing が発生すると、残りの処理はすべてスキップされる
```

#### 関数の持ち上げ（function lifting)

```js
const safeFindObject = R.curry((db, id) =>
  Maybe.fromNullable(find(db, id)))
```
すべての関数にモナドを導入しなければならないということでしょうか？必ずしもそうではありません。
ここでは__関数の持ち上げ__（function lifting）と呼ばれるテクニックを使用できます。

```js
const lift = R.curry((f, value) =>
  Maybe.fromNullable(value).map(f))
```
モナドは関数本で直接使用する代わりに、そのまま保持できます。
```js
const findObject = R.curry((db, id) => find(db, id))
```
そしてliftを使ってこの関数をコンテナに持ち上げます（格納します）
```js
const safeFindObject = R.compose(lift(console.log), findObject)
safeFindObject(DB('student'), '444-44-4444')
```
持ち上げはあらゆるモナドに対して、あらゆる関数で動作します。

Maybeは不正なデータを１箇所で管理することに長けているのは明らかですが、失敗の原因を知らせてくれるような、より積極的なソリューションが必要です。
そのためのツールがEitherモナドです。

#### Eitherモナドを使って失敗から回復する
Eitherモナドは、同時に取りえない（排他的な）2つの値aと値bの間の論理的分離を表します。

- __Left(a)__: 起こりうるエラーメッセージや投げる例外オブジェクトを格納
- __Right(b)__: 成功値を格納

Eitherモナドは一般的に、右側のオペランドに偏った形で実装されます。つまり、コンテナに関数をマッピングする場合は常に Right(a) サブタイプに対して行われます。
RightはMaybeモナドのJustに相当します。

__リスト5.6 LeftおよびRightのサブクラスを使ったEitherモナド__

```js
class Either {
  constructor (value) {
    this._value = value
  }
  get value () {
    return this._value
  }
  static left (a) {
    return new Left(a)
  }
  static right (a) {
    return new Right(a)
  }
  static fromNullable (val) {
    return val !== null && val !== undefined ? Either.right(val) : Either.left(val)
  }
  static of (a) {
    return Either.right(a)
  }
}

class Left extends Either {
  map (_) {
    return this
  }
  get value () {
    return throw new TypeError("Can't extract the value of a Left(a).")
  }
  getOrElse (other) {
    return other
  }
  orElse (f) {
    return other
  }
  chain (f) {
    return this
  }
  getOrElseThrow (a) {
    throw new Error(a)
  }
  filter (f) {
    return this
  }
  toString () {
    return `Either.Left(${this._value})`)
  }
}

class Right extends Either {
  map (f) {
    return Either.of(f(this._value))
  }
  get value () {
    return this._value
  }
  getOrElse (other) {
    return this._value
  }
  orElse (_) {
    return this
  }
  chain (f) {
    return f(this._value)
  }
  getOrElseThrow (_) {
    return this.value
  }
  filter (f) {
    return Either.fromNullable(f(this._value) ? this._value : null)
  }
  toString () {
    return `Either.Right(${this._value})`
  }
}
```

MaybeとEitherは両方とも、何も行わない処理をいくつか持っていることに注目してください。
これは意図的なもので、特化したモナドが適切と判断する場合、関数の実行を安全にスキップできるようにするためのプレースホルダーです。

```js
const safeFindObject = R.curry((db, id) => {
  const obj = find(db, id)
  if (obj) {
    return Either.of(obj) // 1
  }
  return Either.left(`Object not found with ID: ${id}`) // 2
})
```

```js
const findStudent = safeFindObject(DB('student'))
findStudent('444-44-4444').getOrElse(new Student())
// -> Student（あるいはObject）
```
Maybe.Nothingと異なり、Either.Leftは値を格納できます。
```js
const errorLogger = _.partial(logger, 'console', 'basic', 'MyErrorLogger', 'ERROR')
findStudent('444-44-4444').orElse(errorLogger)

// MyErrorLogger [ERROR] Student not found with ID: 444-44-4444
```


```js
function decode (url) {
  try {
    const result = decodeURIComponent(url)
    return Either.of(result)
  catch (uriError) {
    return Either.Left(uriError) // 慣例的にEither.Leftにはエラーオブジェクトが格納されます
  }
}
```
```js
const parse = (url) => url.parseUrl() // 1
decode('%').map(parse)
//-> Left(Error('URI malformed')
decode('http%3A%2F%2Fexample.com').map(parse)
//-> Right(true)
```
1. parseUrl() は4.4.1で定義

#### 参考にすべき関数型プログラミングプロジェクト
- [Fantasy Land](https://github.com/fantasyland/)
- [Falktale](https://folktale.origamitower.com/)

### 5.3.2 IOモナドを使用して外部リソースとやり取りする

```js
IO.of('An unsafe operation').map(alert)
```

JavaScriptは、常に変化し、共有され、状態を持つDOMを扱うことは避けられません。
そのため、DOMに対して実行される処理は、読み出しか書き込みかにかかわらず副作用を発生させ、参照透過性に違反します。

```js
const read = (document, selector) => document.querySelector(selector).innerHTML // 1

const write = (document, selector, val) =>
  document.querySelector(selector).innerHTML = val // 2
  return val
}
```
1. 以降の`read`の呼び出しは、異なる結果が生成される可能性がある
2. 値を返さず、明らかに変異が発生する（安全でない処理）

__リスト5.7 IOモナド__
```js
class IO {
  constructor (effect) {
    if (!_.isFunction(effect)) { // 1
      throw 'IO Usage: function required'
    }
    this.effect = effect
  }
  
  static of (a) { // 2
    return new IO(() => a)
  }
  
  static from (fn) { // 3
    return new IO(fn)
  }
  
  map (fn) {
    const self = this
    return new IO(() => fn(self.effect()))
  }
  
  chain (fn) {
    return fn(this.effect()0)
  }
  
  run () {
    return this.effect() // 4
  }
}
```

1. IOコンストラクタは（DOMへの読み書きのように）読み書き処理により初期化される。この処理は効果関数（_effect function_）として知られている
2. 値や関数をIOモナドへ持ち上げるユニット関数
3. Mapファンクター
4. 遅延初期化チェーンを排除してIO処理を実行

このIOモナドは、それ以外のモナドとは異なる動作をします。値の代わりに**効果関数**をラッピングしているのです。
関数は、いうなれば計算されるのを待っている**遅延評価される値**とみなすことができることを思い出してください。
このモナドにより、DOM処理をまとめてチェーン化して、単一の「疑似的な」参照透過な処理として実行することが可能です。

```js
const read = (document, selector) =>
  () => document.querySelector(selector).innerHTML

const write = (document, selector) =>
  return (val) => {
    document.querySelector(selector).innerHTML = val
    return val
  }
}
```
`document`のたらい回しを避けるために、また楽をするために、これらの関数に`document`を部分適用します。
```js
const readDom = _.partial(read, document)
const writeDom = _.partial(write, document)
```

`readDom`と`writeDom`はチェーン化可能の関数となり、実行が遅延されます。
```html
<div id="student-name">alonze church</div>
```

```js
const changeToStartCase =
  IO.from(readDom('#student-name'))
    .map(_.startCase) // ->1
    .map(writeDom('#student-name')
```

1. 任意の変換処理をマッピングすることが可能

モナドを利用する利点は、純粋関数によって強制される要求事項が遵守されることです。

```js
changeToStartCase.run()
```

IOモナドの最も重要な利点は、純粋な部分から不純な部分を明確に分離することです。
`changeToStartCase`の定義からもわかりますが、IOコンテナとマッピングする変換関数は、DOMへの読み書きのロジックからは完全に分離しています。
HTML要素の内容を必要に応じて変更することが可能です。また、一度にすべてが実行されるので、読み書きの実行中には他の処理が発生しないことが保証されており、予測不可能な結果を招く可能性はなくなります。

## 5.4 モナドチェーンと合成

本書では、関数型プログラミングで関数を合成する方法を2つ紹介しました。
つまり、`chain`と`compose`です。

__リスト5.8 Eitherモナドを使用するように関数をリファクタリングする__
```js
// validLength :: Number, String -> Boolean
const validLength = (len, str) => str.length === len

// checkLengthSsn :: String -> Either(String)
const checkLengthSsn = ssn => // 1
  validLength(0, ssn) ? Eigher.right(ssn) : Eigher.left('Invalid SSN')

// safeFindObject :: Store, String -> Either(Object)
const safeFiindObject = R.curry((db, id) => { // 1
  const val = find(db, id)
  return val ? Either.right(val) : Either.left(`Object not foundwith ID: ${id}`)
})

// findStudent :: String -> Either(Student)
findStudent = sefeFindObject(DB('students')

// csv :: Array => String
const csv = arr => arr.join(',') // 2
```

1. この関数をEitherモナドに持ち上げる代わりに、モナドを直接利用することで、エラーに応じて特定のエラーメッセージを提供することが可能
2. リファクタリングされたcsv関数は、値の配列から文字列を返す

```js
const debugLog = _.partial(logger, 'console', 'basic', 'Monad Example', 'TRACE')

const errorLog = _.partial(logger, 'console', 'basic', 'Monad Example', 'ERROR')

const trace = R.curry((msg, val) => debugLog(msg + ':' + val))
```

今度は、EitherおよびMaybeを利用して `showStudent`関数に自動エラー処理を追加する方法を以下に示します。

__リスト5.9 自動エラー処理にモナドを利用した showStudent 関数__
```js
const showStudent = (ssn) => // 1
  Maybe.fromNullable(ssn)
    .map(cleanInput)
    .chain(checkLengthSsn)
    .chain(findStudent)
    .map(R.props(['ssn', 'firstname', 'lastname'])) // 2
    .map(csv)
    .map(append('#student-info'))
```
1. `map`および`chain`メソッドを使用して、モナド内の値を変換することができる。`map`はモナドを返す。これにより、入れ子の回避や構造の平坦化をする必要がなくなり、`map`と`chain`を混在させて、呼び出し処理の間は単一のモナドのレベルを保持することができる
2. オブジェクトから選択されたプロパティを配列の形で抽出する


EitherとMaybeのモナドが割り込んでシームレスに処理を行う様子にも注目してください。
これは、EitherとMaybeが同じモナドインターフェースを実装しているからです。
```js
showStudent('444-44-4444').orElse(errorLog)
```

チェーン化の他にもパターンは存在します。合成を使って、エラー処理ロジックを簡単に導入することが可能です。
このロジックを実現するには、シンプルなオブジェクト指向から関数型への変換を行います。
この変換は、モナドメソッドを関数に変換します。変換された関数は（[リスコフの置換原則](https://bit.ly/3PZ3Rua)から得られる）任意のモナド型に対して異なる振る舞いを実現します。

__リスト5.10 コンテナで動作する汎用的な`map`および`chain`の関数__
```js
// map :: (ObjectA -> ObjectB), Monad(ObjectA) -> Monad(ObjectB)
const map = R.curry((f, container) => container.map(f))

// chain :: (ObjectA -> ObjectB), Monad(ObjectA) -> ObjectB
const chain = R.curry((f, container) => container.chain(f))
```

リスト5.11のコードは、リスト5.9と同様の結果を生成します。モナドはある式から次の式にデータが流れる方法を制御するので、このスタイルのコーディングは、**プログラム可能なカンマ（_programmable comma_）**、あるいはポイントフリーとも呼ばれます。

__リスト5.11 モナドとプログラム可能なカンマ__
```js
const showStudent = R.compose(
  R.tap(trace('Student added to HTML page'),
  map(append('#student-info')),
  R.tap(trace('Student info vonberted to CSV')),
  map(csv),
  map(R.props(['ssn', 'firstname', 'lastname'])),
  R.tap(trace('Record fetched successfully!')),
  chain(findStudent),
  R.tap(trace('Input was valid')),
  chain(checkLengthSsn),
  lift(cleanInput))
```

```js
map(append('#student-info'))
```
a`append`は自動的なカリー化機能を有しているので、IOを使ってうまく機能します。
この時点では、「まず`csv`から持ち上げる」「次に`IO.of`を使用して、`R.identity`をIOにマップしてその内容を抽出する」「さらに両方の処理をチェーン化する」ということだけでよいのです。

```js
const liftIO = function (val) {
  return IO.of(val)
}
```

__リスト5.12 `showStudent`プログラムを完成させる__
```js
const getOrElse = R.curry((message, container) => container.getOrElse(message))

const showStudent = R.compose(
  map(append('#student-info')),
  liftIO,
  getOrElse('unable to find student'),
  map(csv),
  map(R.props(['ssn', 'firstname', 'lastname'])),
  chain(findStudent),
  chain(checkLengthSsn),
  lift(clearnInput)
)

// データをIOモナドに持ち上げたので、次はその（クロージャ）内に遅延して含まれるデータに対して、`run`関数を呼び出します。
showStudent(studentId).run()
```

## 5.5 まとめ

