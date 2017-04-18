# Generators
## 概要
- `function` と関数名の間に * を付けて定義する( `function* name() {}` )
- Generator 関数を実行すると、Iterator が返る
- `yield` で実行を区切る
- `Generator#next()` で、`yield` を1つ進む
- Generator は、`yield` と `next` によって関数を停止・再開する
- 関数の呼び出し先と呼び出し元で値を交換できる

## 基本
### Generator を生成する

```js
// Generator の基本
function* generator1() {
  // yield でイテレータの区切りを指定
  yield 1;
  yield 2;
  return 3;
}
```

__Constructor として生成することで this 参照を扱う__

```js
function* F() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}

let obj = {};
let f = F.call(obj); // obj を this に指定して呼び出す
// または
let f = F.call(F.prototype); // 自分の prototype を this とする

// または、コンストラクターを生成する関数を定義する
function* gen() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}

function F() {
  return gen.call(gen.prototype);
}

let f = new F();

// test
f.next();
f.next();
f.next();
```

- [`Generator.prototype.next()`](next.md)
- [`Generator.prototype.return()`](return.md)
- [`yield`](yield.md)
- [`yield*`](yield*.md)
- [Using `this`](this.md)
- [Using `for...of`](for_of.md)
- [Using `while`](while.md)
- [Using "Spread operator"](spread.md)
- [Using `Array.from`](array_from.md)
- [Using `try...catch`](try_catch.md)
- [Generator in Asynchronous](async.md)


## Related
- [Iterator](./Iterator.md)

# External links
- [ES6 Generators in Depth](https://ponyfoo.com/articles/es6-generators-in-depth)
- [ジェネレータについて](http://js-next.hatenablog.com/entry/2014/08/07/174147)
- [JavaScript のジェネレータを極める！](http://goo.gl/KBRGxb)
- [最近のjs非同期処理 PromiseとGeneratorの共存](http://qiita.com/kidach1/items/d997df84a0ede39d76ad)
- [co](https://github.com/tj/co)
