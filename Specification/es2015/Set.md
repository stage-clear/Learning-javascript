Set
===

重複がないユニークな値の集合を表すデータ型.

基本操作
--------

```javascript
// コンストラクタ
var set = new Set();
// 値の設定
set.add('value1');

// 値の存在確認
set.has('value1');
console.log(set.has('value1')); //=> true

// サイズの取得
console.log(set.size); //=> 1

// 重複した値は追加されない
set.add('value1');
console.log(set.size); //=> 1

// 値の削除
set.delete('value1')
console.log(set.has('value1')); //=> false

// 一括設定
var set2 = new Set(['v1', 'v2']);
console.log(set2.size); //=> 2

// 全データのクリア
set2.clear();
console.log(set2.size); //=> 0
```

Set は Iterable
----------------

```javascript
var set = new Set(['v1', 'v2']);

for (let v of set) {
  console.log(v);
}
```

メソッドの多くは互換性があり、keys/values/entries/forEach などを持っている
