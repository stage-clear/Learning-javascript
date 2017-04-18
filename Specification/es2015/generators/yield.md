# `yield`

## Return value to `yield`
- `next()` 引数に渡した値が `yield` 式の戻り値となる

```js
function log(msg) {
  console.log('Message: "%s"', msg)
  return msg
}

function* gen() {
  console.log('start')
  
  const step1 = yield log('First yield')
  console.log('Step1: "%s"', step1)
  
  const step2 = yield log('Second yield')
  console.log('Step2: "%s"', step2)
}

const g = gen()

const next1 = g.next('First next')  // Nobody can get this argument.
console.log('Next1: %o', next1)
const next2 = g.next('Second next') // 
console.log('Next2: %o', next2)
const next3 = g.next('Third next')
console.log('Next3: %o', next3)

> start
> Message: "First yield"
> Object{value:"First yeild", done:false}
> Step1: "Second next"
> Message: "Second yield"
> Object{value:"Second yeild", done:false}
> Step2: "Third next"
> Object{value:undefined, done:true}
```

```js
function* gen() {
  console.log('start')
  let a = yield 1
  let b = yield 2
  yield a + b
}

const g = gen()

console.log(g.next().value)
console.log(g.next(10).value)
console.log(g.next(100).value)

> start
> 1
> 2
> 110
```

## External links

- [yeild](https://developer.mozilla.org/ja/docs/JavaScript/Reference/Operators/yield) - MDN
