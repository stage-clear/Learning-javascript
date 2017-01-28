# 関数

## 6.3.2 引数の分割代入

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
