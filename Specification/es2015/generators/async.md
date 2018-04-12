# Generator in asynchronous

```js
const items = [
  { id: 1, name: 'aaa' },
  { id: 2, name: 'bbb' },
  { id: 3, name: 'ccc' },
]

async(function* () {
  const a = yield getItem(0, items, 1000)
  console.log('item1 %o', a)
  const b = yield getItem(1, items, 2000)
  console.log('item2 %o', b)
})

function async(gen) {
  const g = gen()
  const next = value => {
    const result = g.next(value)
    if (!result.done) {
      const promise = result.value
      promise.then(value => {
        next(value)
      })
    }
  }

  next()
}

/**
 * @param {Number} index
 * @param {Number} delay(ms)
 * @return {Promise}
 */
function getItem(index, items, delay) {
	return new Promise(resolve => {
		window.setTimeout(() => {
			resolve(items[index])
		}, delay)
	})
}
```
