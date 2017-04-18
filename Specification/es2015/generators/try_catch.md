# `try...catch`

```js
function* gen() {
  yield 1
  
  try {
    yield 2
  } catch(e) {
    yield 3
    yield 4
  }

  yield 5
}

const g = gen()

console.log(g.next().value)
> 1
console.log(g.next().value)
> 2
console.log(g.return(10).value)
> 10
console.log(g.next().value)
> undefined
```
