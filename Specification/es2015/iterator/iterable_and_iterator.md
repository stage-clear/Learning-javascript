# Iterable and Iterator

- Iterable 
  - Iterator として取得可能なオブジェクト
    - `Iterable[Symbol.iterator]()`
  - `for`で反復処理ができる
- Iterator
  - Interface
  - `next()` メソッドを持つ

```js
let arr = ['foo', 'bar']              // Iterable object
let iterator = arr[Symbol.iterator]() // Iterator object

console.log(iterator.next().value)
> foo
console.log(iterator.next().value)
> bar
console.log(iterator.next().value)
> undefined
```

## External links
- [Iteration protocols](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Iteration_protocols#iterable)
