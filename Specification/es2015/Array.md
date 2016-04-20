Array
======

Array.from
----------

Array のようなオブジェクトやイテレータを Array に変換する

```javascript
class MyArray extends Array {}
var arr = MyArray.from('foo');

console.log(arr);//=> ['f','o','o'];
console.log(arr instanceof MyArray);//=> true
```

Array.of
---------

- 引数を要素に持つ配列を生成する
- 通常は配列リテラルを使えばよいが、Array のサブクラスから生成する場合に便利

```javascript
var arr = MyArray.of(1,2,3);
console.log(arr); //=> [1,2,3]
console.log(arr instanceof MyArray);//=> true
```


インスタンスメソッドの追加
--------------------------

- イテレータへの対応で、Map や Set と互換性のあるメソッドが keys/values/entries
- 配列内で要素をコピーする `Array#copyWithin`
- 要素とそのインデックスを検索する `Array#find` `Array#findIndex`
- 要素を指定の値で埋める `Array#fill`

