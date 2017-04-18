# Using the "Spread operator"

```js
function* gen() {
  console.log('start')
  yield 1
  yield 2
}

console.log( ...gen() )
> start
> 1
> 2

console.log( [...gen()] )
> start
> [1, 2]
```
