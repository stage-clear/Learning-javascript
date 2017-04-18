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

```js
function* idMaker() {
  let index = 0
  
  while (true) {
    yield index++
  }
}

const gen = idMaker()

console.log(gen.next().value)
> 0
console.log(gen.next().value)
> 1
console.log(gen.next().value)
> 2
```


## External Links

- [Generator](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Generator) - MDN
