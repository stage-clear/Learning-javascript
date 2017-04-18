# Using `next()`

```js
function* gen() {
  console.log('start')
  yield 1
  yield 2
}

const g = gen()
> start

console.log(g.next())
> {value:1, done:false}

console.log(g.next())
> {value:2, done:false}

console.log(g.next())}
> {value:undefined: done:true}
```
