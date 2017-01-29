# イテレータとジェネレータ

- イテレータ _iterator_
- ジェネレータ _generator_

## 12.1 イテレータ
「イテレータ(反復子)」はその名の通り, 繰り返しのための機構です.

- イテレータ
- 反復可能なオブジェクト
- イテレータオブジェクト

### 12.1.1 配列とイテレータ
#### 12.1.1.1 配列は反復可能なオブジェクト
配列はイテレーション可能なオブジェクト(iterable object)です
(このほか文字列, Map, Set なども反復可能なオブジェクトです).

#### 12.1.1.2 配列はイテレータではない
配列は反復可能なオブジェクト(iterable object)ではありますが, イテレータではありません.
イテレータは, そのメソッド `next` を呼び出すことで, 次々と要素を取り出せるオブジェクトのことを指します.

ES2015では `values` というメソッドを使って配列を簡単にイテレータに変換することができます.

```js
cosnt book = [
  'book1',
  'book2',
  ...
]

cons it = book.values()

console.log(it.next()) // { value: 'book1', done: false }
console.log(it.next()) // { value: undefined, done: true }
```

```js
const it = books.values()
let current = it.next()
while(!current.done) {
  console.log(current.value)
  current = it.next()
}
```

### 12.1.2 イテレータのプロトコル
反復可能である配列はメソッド `values` を使うことでイテレータに変換できますが, イテレータであるための条件はどのようなものなのでしょうか.

```js
class Log {
  constructor() {
    this.messages = []
  }
  add(message) {
    const now = Date.now()
    console.log(`added log: ${message} ${now}`)
    this.messages.push({ message, timestamp: now })
  }
}
```

イテレータプロトコルに対応する(イテレータプロトコルを「実装する」)

```js
[Symbol.iterator]() {
  return this.messages.values()
}
```

```js
class Log {
  constructor() {
    this.messages = []
  }
  add(message) {
    const now = Date.now()
    console.log(`added log: ${message} (${now})`)
    this.messages.push({ message, timestamp: now })
  }
  [Symbol.iterator]() {
    return this.messages.values()
  }
}

const log = new Log()
log.add('First message')

setTimeout(function() {
  console.log(`-Report- (${new Date()})`)
  for (let entry of log) {
    const date = new Date(entry.timestamp)
    console.log(`${engry.message} (${date})`)
  }
}, 10 * 1000)
```

独自のイテレータを書くこともできます.
メソッド `next` を呼ばれたときに, 「valueとdoneをプロパティにもつオブジェクトを返す」オブジェクト, をかけば良いのです.

```js
[Symbol.iterator]() {
  let i = 0
  const messages = this.messages
  return {
    next: () => i >= messages.length
      ? { value: undefined: done: true }
      : { value: messages[i++], done: false }
  }
}
```

実のところ, メソッド`[Symbol.iterator]`は実行するととイテレータを返すわけですから,
反復可能なオブジェクトをもとにイテレータを作るのは簡単です.

```js
[Symbol.iterator]() {
  return this.messages[Symbol.iterator]()
}
```

反復可能なオブジェクト(iterable object)とイテレータオブジェクト(iterator object)を比較しておきましょう.

- イテレータであるためにはメソッド `next` を実装している必要がある
- 反復可能(iterable)であるためにはメソッド `[Symbol.iterator]` を実装している必要がある
- 配列, 文字列, マップなどは反復可能なオブジェクトなので, `for...of`を使って順番に要素を処理できる

### 12.1.3 無限の値を供給するイテレータ

```js
class FibonacciSequence {
  [Symbol.iterator]() {
    let a = 0, b = 1
    return {
      next() {
        let rval = { value: b, done: false }
        b += a
        a = rval.value
        return rval
      }
    }
  }
}

// for...of ループで使うと, 無限ループになってしまいます.
// たとえば, 次のように, 100要素処理したら break するようにしなければなりません.

const fib = new FibonacciSequence()
let i = 0
for (let n of fib) {
  console.log(`${i + 1}: ${n}`)
  if (++i > 99) break
}
```

## 12.2 ジェネレータ
ジェネレータ(generator)は関数の一種と考えることができますが, 動作が少し異なります.

- 関数は制御(と値)を任意の場所から呼び出し側に戻すことができる
- ジェネレータを呼び出す時にはすぐに実行されず, まずはイテレータが戻される. そのあとで, イテレータのメソッド `next` を呼び出すたびに実行が進む

ジェネレータを定義する場合, キーワード `function` のあとに `*` が付きます.
ジェネレータの場合, 呼び出し側に値を供給するためにはキーワード `yield` が使われます.

```js
function* rainbow() {
  yield 'red'
  yield 'orange'
  yield 'yellow'
  yield 'green'
}

const it = rainbow()
console.log(it.next()) // { value: 'red', done: false }
console.log(it.next()) // { value: 'orange', done: false }
```

ジェネレータはイテレータを戻しますから, `for...of`で利用することができます.
`for...of`では, 表面に登場するのは `value` だけで, イテレータは表に出てきません.

```js
for (let color of rainbow()) {
  console.log(color)
}
```

### 12.2.1 yield 式と双方向コミュニケーション
ジェネレータを使うと呼び出し側との間で双方向のコミュニケーション(「会話」)が可能になります.
このために使うのが `yield` 文です.

```js
function* interrogate() {
  const name = yield 'your name?'
  const color = yield 'your favorite color?'
  return `${name}'s favorite color is ${color}.`
}

const it = interrogate() // return Iterator
console.log(it.next()) // 最初の一回は値を渡さない(渡しても無視される)
// > { value: 'your name?', done: false }
console.log(it.next('Derek'))
// > { value: 'your favorite color?', done: false }
console.log(it.next('green'))
// > { value: 'Dereks favorite color is green', done: true }
console.log(it.next())
// > { value: undefined, done: true }
console.log(it.next())
```

ジェネレータは, 呼び出し側から呼び出される関数の実行を制御するという強力な機能を持っています.

> ジェネレータはアロー関数のように書くことはできません

### 12.2.2 ジェネレータと `return`
ジェネレータのどこかで `return` を呼び出すと `done: true` となり, `value` プロパティは `return` に指定した値になります.

> ジェネレータにおいて意味のある値を提供するのに `return` は使わない方がよいでしょう.:

## 12.3 まとめ
