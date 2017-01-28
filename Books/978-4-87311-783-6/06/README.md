# 関数

### 6.3.2 引数の分割代入

次のようにするとオブジェクトのプロパティを変数に分配することができます.
```js
// example/ch06/ex06-03-7/main.js
function getSentence({subject, verb, object}) {
  return `${subject} ${verb} ${object}`
}
const o = {
  subject: 'I',
  verb: 'love',
  object: 'JavaScript'
}

console.log(getSentence(o))
```

配列に関しても分割代入が可能です.
```js
// example/ch06/ex06-03-8/main.js
function getSentence([subject, verb, object]) {
  return `${subject} ${verb} ${object}`
}

const arr = ['I', 'love', 'JavaScript']

console.log(getSentence(arr))
```

さらには, 展開演算子を使って残りの引数をまとめてしまうこともできます.

```js
// example/ch06/ex06-03-9/main.js
function addPrefix(prefix, ...words) {
  const prefixedWords = ''
  for (let i = 0; i < words.length; i++) {
    prefixedWords[i] = prefix + words[i]
  }
  return prefixedWrods
}

console.log(addPrefix('con', 'verse', 'vex')) // ['converse', 'convex']
```

## 6.5 this
`this` が「関数の呼び出され方」に依存して束縛される点に注意してください

```js
const o = {
  name: 'Wallace',
  speak() { return `My name is ${this.name}!` }
}
const speak = o.speak
console.log(speak === o.speak) // true
console.log(speak()) // "My name is undefined!"
console.log(o.speak()) // "My name is Wallace!"

```

## 6.6 関数式と無名関数

```js
const g = function f() {
  // ...
}
```
このように関数を作成した場合, `g` の方が優先され, この関数の外では `g` を使ってこの関数を利用することになります.
ただし, `f` を使いたいときがあります. それは `f` の中で `f` を呼び出したい時です(「再帰呼び出し」と言います).

```js
const g = function f(stop) {
  if (stop) {
    console.log('f stopped')
    return 
  } else {
    console.log('f does not stop')
    f(true)
  }
}
```

## 6.7 アロー関数

- `this` が語彙的(lexically)に
- コンストラクタとしては使えない
- `arguments` が使えない

## 6.8 call, apply, bind
call で展開演算子を使うと apply と同じ結果を得ることができます.

```js
const bruce = { name: 'Bruce' }
const madeline = { name: 'Madeline' }

function update(birth, occupation) {
  this.birth = birth
  this.occupation = occupation
}

console.log(bruce)
const newBruce = [1940, '武術家']
update.call(bruce, ...newBruce) // apply(bruce, newBruce) と同じ
```

```js
const arr = [2,3,-5,15,7]
console.log(Math.min(...arr)) // -5
console.log(Math.max(...arr)) // 15
```
