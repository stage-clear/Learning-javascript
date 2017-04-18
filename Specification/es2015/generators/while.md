# `While` で順に実行する

```js
function* gen() {
  console.log('start')
  yield 1
  yield 2
}

let g = gen()

while (true) {
  let item = g.next()
  if (item.done) {
    break
  }
  console.log(item.value)
}
```
