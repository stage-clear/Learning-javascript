# `Generator.prototype.return()`
- 与えられた引数を返し, ジェネレータを終了します

```js
function* gen() {
  console.log('start')
  yield 1
  yield 2
  yield 3
}

const g = gen()

console.log(g.next().value)
> 1
console.log(g.return(100).value)
> 100
console.log(g.next().value)
> undefined
```

## `return` operator

```js
function* gen() {
  console.log('start')
  yield 1
  yield 2
  return 3
  yield 4
}

console.log([...gen()])
> start
> [1,2]
```

## External links
- [Generator.prototype.return()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Generator/return)
