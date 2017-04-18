# `yield*`
- `yield*` には iterable なオブジェクトを渡す

```js
function* gen() {
  yield* [1, 2, 3]
}

console.log([...gen()])
> [1,2,3]

const g = gen()

console.log(g.next().value)
> 1
console.log(g.next().value)
> 2
console.log(g.next().value)
> 3
```

```js
function* kana() {
  yield* 'あいうえお'
}

console.log([...kana()])
> ["あ","い","う","え","お"]

const k = kana()
console.log(k.next().value)
> "あ"
console.log(k.next().value)
> "い"
console.log(k.next().value)
> "う"
console.log(k.next().value)
> "え"
console.log(k.next().value)
> "お"
```

## External links
- [yield*](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/yield*) - MDN
