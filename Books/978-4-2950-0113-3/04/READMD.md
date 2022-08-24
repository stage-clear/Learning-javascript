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
  return function () {
    let i = start
    let result = args[start].apply(this, arguments)
    while (i--) {
      result = args[i].call(this, result)
    }
    return result
  }
}
```