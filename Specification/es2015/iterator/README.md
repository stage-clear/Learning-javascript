# Iterator
- Iteratorとは、集合から要素を繰り返し取り出すための統一されたインターフェース
- Iterable なオブジェクトは、`Symbol.iterator` をキーとする Iterator を取得することができる  

```js
var iterable = obj[Symbol.iterator]() //=> Iterator
```

- [`for...of`](for_of.md)
- [Spread operator](spread.md) - スプレッドオペレータと分割代入
- [Iterable and Iterator](iterable_and_iterator.md) - イテラブルとイテレータ
- [Tips](tips.md) - 便利な使い方


## External links
- [JavaScript のイテレータを極める！](http://goo.gl/XaKgMI)
