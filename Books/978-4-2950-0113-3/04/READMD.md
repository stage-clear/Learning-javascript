# 第４章　モジュール化によるコードの再利用

__リスト4.2 独自に実装したTupleデータ型__
```js
const Tuple = function (/* types */) {
  const typeInfo = Array.prototype.slice.call(arguments, 0) // 1
  const _T = function (/* values */) { // 2
    const values = Array.prototype.slice.call(arguments, 0) // 3
    if (values.some( // 4
      val => val === null || val === undefined)) {
      throw new ReferenceError('Tuples may not have any null values')  
    }
    if (values.length !== typeInfo.length) { // 5
      throw new TypeError('Tuple arity does not match its prototype')
    }
    values.map((val, index) => { // 6
      this['_' + (index + 1)] = checkType(typeInfo[index])(val)
    })
    Object.freeze(this) // 7
  }
  _T.prototype.values = () => { // 8
    return Object.keys(this)
      .map(k => this[k], this)
  }
  return _T
}

// Usecase
const Status = Tuple(Boolean, String)
```

1. タプルに含まれる引数の型を読み込む
2. 内部型 `_T` を宣言。`_T` は対応する値と型との一致を保証する責任を負う
3. タプル内に保持される値を抽出
4. 非null値を検査。関数型におけるデータ型は、null値の通貨を許可しない
5. 定義された型の個数に対して、タプルが正しいアリティを持つことを検査
6. 渡された各値がタプル定義の型と正しく一致するかどうか、`checkType()` を使用して検査<br>タプル要素はすべて、 `._n` によって参照されるタプルの属性へ変換。ここでは `n` は（1から始まる）要素のインデックス
7. タプルインスタンスを不変にする
8. タプルからすべての値を配列の形で抽出し、分割代入によってこのタプル値を変数にマッピング

__リスト4.3 isValid関数のためにタプルを使用する__
```js
// trim :: String -> String
const trim = (str) => str.replace(/^\s*|\s*$/g, '')

// normalize :: String -> String
const normalize = (str) => str.replace(/\-/g, '')

// isValid :: String -> String
const isValid = function (str) {
  if (str.length === 0) {
    return new Status(false, // 1
      'Invalid input. Expected non-empty value!')
  }
  else {
    return new Status(true, 'Success!')
  }
```

1. `status`（Boolean型）および `messsage`(String型）の値を保持するStatus型を宣言

__リスト4.8 compose関数の実装__
```js
function compose (/* fns */) {
  let args = arguments
  let start = args.length - 1
  return function () { // 1
    let i = start
    let result = args[start].apply(this, arguments) // 2
    while (i--) {
      result = args[i].call(this, result) // 3
    }
    return result
  }
}
```

1. `compose` の出力は、実際の引数に対して呼び出される別の関数となる
2. 渡される引数に対して動的に関数を適用
3. 事前に返された値に基づいて以降の関数を繰り返し呼び出す

⚠️ Ramdaは、誰でも利用できる `R.compose` の実装を提供しているので、この機能を新たに実装する必要はありません。

## 4.6 関数コンビネータを使ってフロー制御を管理する

- identity - 与えられた引数と同じ値を返す
- tap - tap関数は、自らを関数に渡して、自らを返します
- alternation - 関数呼び出しに応えて規定の振る舞いを提供する際に、簡単な条件付きロジックを実行する関数
- sequence - 一連の複数の関数をループするために使用される関数
- fork (join) - 1個のリソースを2通りの異なる方法で処理して、その結果を結合するのに便利な関数

### 4.6.1 identity （Iコンビネータ）
```
identity :: (a) -> a
```

### 4.6.2 tap （Kコンビネータ）
```
tap :: (a -> *) -> a -> a
```

```js
const debugLog = _.partial(logger, 'console', 'basic', 'MyLogger', 'DEBUG')
```

### 4.6.3 alternation (ORコンビネータ）

```js
const alt = function (func1, func2) {
  return function (val) {
    return func1(val) || func2(val)
  }
}

// curry関数やラムダを使用して実装する
const alt = R.curry((func1, func2, val) => func1(val) | func2(val))
```


```js
const showStudent = R.compose(
  append('#student-info'),
  csv,
  alt(findStudent, createNewStudent)
)

showStudent('444-44-4444')
```

### 4.6.4 sequence （Sコンビネータ）
seqコンビネータは、2個以上の関数を引数にとり、新しい関数を返します。
新しい関数は、引数で与えられたすべての関数を、同じ値に対して順次実行します。

```js
const seq = function (/* funcs */) {
  const funcs = Array.prototype.slice.call(arguments)
  return function (val) {
    funcs.forEach(function (fn) {
      fn(val)
    })
  }
}
```

```js
// usecase
const showStudent = R.compose(
  seq(
    append('#student-info'),
    consoleLog),
  csv,
  findStudent)
```

💡 seqコンビネータは値を返しません。seqコンビネータは、一連の動作を順々に実行するだけです。
seqコンビネータを合成に追加したい場は、`R.tap`を使用して、その関数を他の関数に橋渡しします。

### 4.6.5 fork(join)コンビネータ

```js
const fork = function (join, func1, func2) {
  return function (val) {
    return join(func1(val), func2(val))
  }
}
```

```js
// usecase
const computeAverageGrade = 
  R.compose(getLetterGrade, fork(R.divide, R.sum, R.length))

computeAverageGrade([90, 80, 89]) // -> 'B'
```

```js
// usecase 2
const eqMedianAverage = fork(R.equals, R.median, R.mean)

eqMedianAverage([80, 90, 89]) // -> true
eqMedianAverage([81, 90, 100]) // -> false
```

## 4.7 まとめ
