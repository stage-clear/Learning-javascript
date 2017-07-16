# Generators
## 概要
- `function` と関数名の間に * を付けて定義する( `function* name() {}` )
- Generator 関数を実行すると、Iterator が返る
- `yield` で実行を区切る
- `Generator#next()` で、`yield` を1つ進む
- Generator は、`yield` と `next` によって関数を停止・再開する
- 関数の呼び出し先と呼び出し元で値を交換できる

## Syntax

```js
function* gen() {
  yield 1;
  yield 2;
  return 3;
}
```

- [`Generator.prototype.next()`](next.md) - method
- [`Generator.prototype.return()`](return.md) - method
- [`yield`](yield.md) - operation
- [`yield*`](yield*.md) - operation
- [Using `this`](this.md) - constructor
- [Using `for...of`](for_of.md)
- [Using `while`](while.md)
- [Using "Spread operator"](spread.md)
- [Using `Array.from`](array_from.md)
- [Using `try...catch`](try_catch.md)
- [Generator in Asynchronous](async.md)


## Related
- [Iterator](./Iterator.md)

## References:
- [ES6 Generators in Depth](https://ponyfoo.com/articles/es6-generators-in-depth)
- [ES6 Iterators and Generators in Practice](http://www.zsoltnagy.eu/es6-iterators-and-generators-in-practice/)
- [The Hidden Power of ES6 Generators: Observable Async Flow Control](https://medium.com/javascript-scene/the-hidden-power-of-es6-generators-observable-async-flow-control-cfa4c7f31435)
- [2 cases where JavaScript generators rock](https://goshakkk.name/javascript-generators-understanding-sample-use-cases/)
- [ジェネレータについて](http://js-next.hatenablog.com/entry/2014/08/07/174147)
- [JavaScript のジェネレータを極める！](http://goo.gl/KBRGxb)
- [最近のjs非同期処理 PromiseとGeneratorの共存](http://qiita.com/kidach1/items/d997df84a0ede39d76ad)

## Polyfills:
- [co](https://github.com/tj/co)
