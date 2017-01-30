# 関数のさまざまな利用方法
## 13.1 サブルーチンとしての関数
サブルーチンは繰り返し行われる機能をまとめ, それに名前を付け, その名前を参照するだけでその機能を実行可能にしてくれます.

サブルーチンは特定のタスクを行うための「アルゴリズム」をひとまとめのユニットにする目的で使われます.

```js
const year = new Date().getFullYear()

if (year % 4 !== 0) console.log(`${year}年はうるう年ではない`)
else if (year % 100 !== 0) console.log(`${year}年はうるう年である`)
else if (year % 400 !== 0) consele.log(`${year}年はうるう年ではない`)
else console.log(`${year}はうるう年である`)

function printLeapYearStatus() {
  const year = new Date().getFullYear()
  if (year % 4 !== 0) console.log(`${year}年はうるう年ではない`)
  else if (year % 100 !== 0) console.log(`${year}年はうるう年である`)
  else if (year % 400 !== 0) console.log(`${year}年はうるう年ではない`)
  else console.log(`${year}年はうるう年である`)
}

printLeapYearStatus()
```

## 13.2 値を返すサブルーチンとしての関数
「値を返すサブルーチン」として上の関数を書き換えます.

```js
function isCUrrentYearLeapYear() {
  const year = new Date().getFullYear()
  if (year % 4 !== 0) return false
  else if (year % 100 !== 0) return true
  else if (year % 400 !== 0) return false
  else return true
}

console.log(isCurrentYearLeapYear()) // 

const daysInMonth = [31, isCurrentYearLeapYear() ? 29: 28, 31, 30, 30, 31, 30, 31, 31, 30, 31, 30, 31]
```

## 13.33 純粋関数としての関数
数学的な意味では関数は「関係」として捉えられます.
入力と出力をもち, 依存して出力が変わります.

「純粋関数」は次の2つの条件を満たすものです.

- 同じ入力に対しては同じ出力を返す
- 「副作用」をもたない. つまりプログラムの状態を変えない

```js
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'water', 'purple']
let colorIndex = -1
function getNextRaibowColor() {
  if (++colorIndex >= color.length) colorIndex = 0
  return color[colorIndex]
}

console.log(getNextRainbowColor()) // red
console.log(getNextRainbowColor()) // orange
console.log(getNextRainbowColor()) // yellow
```

呼び出されるたびに別の色を返します.
この関数は条件を両方とも満たしていません.
同じ入力(なにもない入力)に対して毎回違う値を戻しますし, 副作用もあります.

うるう年判定を純粋関数で書き換えると次のようになります.
```js
function isLeapYear(year) {
  if (year % 4 !== 0) return false
  else if (year % 100 !== 0) return true
  else if (year % 400 !== 0) return false
  else return true
}

console.log(isLeapYear(new Date().getFullYear())) // 
// 同じ入力に対して同じ出力を返しますし
// 副作用もありません
```

`getNextRainbowColor`はどうでしょう.

```js
const getNextRainbowColor = (function() {
  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'water', 'purple']
  let colorIndex = -1
  return function() {
    if (++colorIndex >= color.length) colorIndex = 0
    return colors[colorIndex]
  }
})()

// 副作用のない関数を得ることはできますが, 純粋関数ではありません.
// 同じ入力に対して同じ出力を返しません
```

問題は他の関数などが `getNextRainbowColor` を呼び出したとき, このコードと競合が起こってしまうことです.
これが副作用をもつ関数の問題点です.
こういった場合イテレータのほうが適していると言えるでしょう

```js
function getNextRainbowIterator() {
  const colors = [...]
  let colorIndex = -1
  return {
    next() {
      if (++colorIndex >= colors.length) colorIndex = 0
      console.log('in iterator: ' + colors[colorIndex])
      return { value: colors[colorIndex], done: false }
    }
  }
}
```

これで純粋関数になります.
いつも同じもの(イテレータ)を返します. 副作用もありません.

```js
const rainbowIterator = getRainbowIterator()
setInterval(function() {
  document.querySelector('.rainbow')
    .style['background-color'] = rainbowIterator.next().value
}, 500)
```

## 13.4 なぜ純粋関数か
そもそもなぜ純粋関数にこだわるのでしょうか.
ひとつの答えは「プログラミングが数学的になるから」というものです.
数学的になって何が嬉しいのでしょうか. 
「__純粋関数のほうがテストが簡単だし, 理解が容易だし, 可搬性(ポータビリティ)があがるのです__」

### 13.4.1 関数はオブジェクト
JavaScript においては関数は Function オブジェクトのインスタンスです.

```js
const v = function() {}
const a = [1,2,3]

console.log(typeof(v)) // function
console.log(typeof(a)) // object
console.log(v instanceof object) // true
```

## 13.5 IIFFと非同期コード
「非同期のコードが正しく実行されるように, 新しいスコープで新しい変数を生成する」というものがあります.

## 13.6 関数と変数
### 13.6.1 関数に記憶

```js
const sin = Math.sin
const cos = Math.cos
const theta = Math.PI / 4
const zoom = 2
const offset = [1, -3]

const pipeline = [
  function rotate(p) {
    return {
      x: p.x * cos(theta) - p.y * sin(theta),
      y: p.x * sin(theta) + p.y * cos(theta)
    }
  },
  
  function scale(p) {
    return {
      x: p.x * zoom,
      y: p.y * zoom
    }
  },
  
  function translate(p) {
    return {
      x: p.x + offset[0],
      y: p.y + offset[1]
    }
  }
]

const p = { x: 1, y: 1 }
console.log(p)
let p2 = p
for (let i = 0; i < pipeline.length; i++) {
  p2 = pipeline[i](p2)
  console.log(p2)
}
```

### 13.6.2 関数に関数を渡す

```js
function sum(arr, f) {
  if (typeof f != 'function') f = x => x
  
  return arr.reduce((a, x) => a += f(x), 0)
}

console.log(sum([1,2,3])) // > 6
console.log(sum([1,2,3], x => x * x)) // 14
console.log(sum([1,2,3], x => Math.pow(x, 3))) // 36
```

### 13.6.3 関数から関数を返す

```js
function newSummer(f) {
  return arr => sum(arr, f)
}

const sumOfSquares = newSummer(x => x * x)
const sumOfCubes = newSummer(x => Math.pow(x, 3))

console.log(sumOfSquares([1,2,3]))
console.log(sumOfCubes([1,2,3]))
```

> このような, 「複数の引数をもつ関数」を「一つの引数をもつ関数」に変換するテクニックは
> 「カリー化(currying)」と呼ばれます

## 13.7 再帰
「再帰(recusion)」とは自分自身を呼び出すことを意味し, 自分自身を呼び出す関数のことを「再帰関数」と呼びます.

藁山から針を探すという問題を解いてみましょう.

1. 藁山に針が見つかったらステップ3に行く
2. 藁山から藁を1本取り除いて, ステップ1に行く
3. 終了

```js
function findNeedle(haystack) {
  if (haystack.length === 0) return '藁山はなくなった'
  if (haystack.shift() === '針') return '針が見つかった'
  console.log(haystack)
  return findNeedle(haystack)
}

console.log(findNeedle(['藁','藁','藁','藁','針','藁','藁']))
```

再帰関数には「終了条件」が必要です.

最後にとても有名な例を紹介しておきましょう.
階乗(factrial)を求めるものです.
整数nの階乗とは, 1からnまでの整数をかけたものです
たとえば4の階乗(「4!」と書きます)は `4 x 3 x 2 x 1 = 24` となります

```js
function fact(n) {
  if (n === 1) return 1
  return n * fact(n - 1)
}

console.log(fact(4)) // 24
console.log(fact(5)) // 120
console.log(fact(8)) // 40320
```

## 13.8 まとめ
同じことをするのにいくつもの方法があって, どれを選べば「正解」なのかよくわからないかもしれません.
「正解」は多くの場合, 問題に依存します.


