イテレータ
==========

- Iteratorとは、集合から要素を繰り返し取り出すための統一されたインターフェース
- Iterable なオブジェクトは、`Symbol.iterator` をキーとする Iterator を取得することができる  

```javascript
var iterable = obj[Symbol.iterator]();//=> iterator
```

for/of 文
---------

- `next()` を使った反復処理は最もプリミティブなAPIで、普通は for/of 文を使う。

```javascript
var iterable = [1,2,3];
arr.obj = 'I am a string';

for (let i of iterable) {
  console.log(i);
}
// 1
// 2
// 3

for (let i of 'abc') {
  console.log(i);
}
// a
// b
// c
```


スプレッドオペレータと分割代入
------------------------------

スプレッドオペレータと分割代入には、配列だけでなく Iterable なオブジェクトも受け付ける

```javascript
// スプレッドオペレータ
var arr = [...'foo'];

```


__IterableとIterator__

```javascript
var arr = ['foo', 'bar'];
// IterableからItaretorを取得
var iterator = arr[Symbol.iterator]();
// Iteratorから要素を取得
iterator.next();
// {"value":"foo","done":false}
iterator.next();
// {"value":"bar","done":false}

// 要素はもうない
iterator.next();
// {"done":true}
```


イテレータの便利な使い方
------------------------

```javascript
var num = [1,2,3,2,3,4,5];
var str = 'あいうえお';

// 列挙
console.log(...num);
console.log(...str);

// 可変長引数を渡す系
console.log( Math.max(...num) );

// 一括代入
var [a,b,c] = num;
var [d,e,f] = str;
console.log(a,b,c,d,e,f);

// 重複の削除
console.log(new Set(num));
```


リンク
------

- [JavaScript のイテレータを極める！](http://goo.gl/XaKgMI)
