# Using `Array.from`

```js
function* gen() {
  console.log('start')
  yield 1
  yield 2
}

console.log( Array.from(gen()) )
> 'start'
> [1, 2]
```
