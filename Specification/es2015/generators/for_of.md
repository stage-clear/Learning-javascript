# Using `for...of`

```js
function* gen() {
  console.log('start')
  yield 1
  yield 2
}

for (let n of gen()) {
  console.log(n)
}

> start
> 1
> 2
```
