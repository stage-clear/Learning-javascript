# Using `this` 

```js
function* Gen() {
  this.a = 1
  yield this.b = 2
  yield this.c = 3
}

const obj = {}
const g = Gen.call(obj)
// or 
// let g = Gen.call(Gen.prototype)

console.log(g.next().value)
> 2
console.log(g.next().value)
> 3
console.log(g.next().value === obj)
> true
console.log(obj)
> Object{a:1, b:2, c:3}
```

```js
function* gen() {
  this.a = 1
  yield this.b = 2
  yield this.c = 3
  yield this
}

function genFactory() {
  return gen.call(gen.prototype)
}

const g = genFactory()

console.log(g.next().value)
> 2
console.log(g.next().value)
> 3
console.log(obj)
> Object{a:1, b:2, c:3}
```
