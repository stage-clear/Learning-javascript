# Making iterators 

```js
const iterate = (array) => {
  let current = 0
  
  return {
    next() => {
      return current < array.length ?
        { value: array[current++], done: false } :
        { done: true }
    }
  }
}
```

```js
const arr = [1, 2, 3]
const it = iterate(arr)

it.next() // { value: 1, done: false }
it.next() // { value: 2, done: false }
it.next() // { value: 3, done: false }
it.next() // { done: true }
```

## References
- [Iterators in Javascript](https://advancedweb.hu/2017/08/29/iterators_js/)
