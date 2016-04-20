Map
====

- key-value型データ

__オブジェクトをデータ型として使う問題点__

- キー名に制限がある
  `toString` などをキー名としたとき、Object の挙動が破壊される
- キーに指定できるのが文字列に限定される
  文字列ではないオブジェクトをキーに指定した場合、文字列に変換された値がキー名に使われる


基本操作
--------

```javascript
// コンストラクタ
var map = new Map();

// 値の設定
map.set('key1', 'value1');


// 値の取得
map.get('key1');
console.log(map.get('key1')); //=> value1


// 値の存在確認
map.has('key1');
console.log(map.has('key1')); //=> true
console.log(map.has('key2')); //=> false


// 値の削除
map.delete('key1');
console.log(map.has('key1')); //=> false

// 一括設定
var map2 = new Map([['k1', 'v1'],['k2', 'v2']]);
map2.get('k1');
console.log(map2.get('k1')); //=> v1


// サイズの確認
console.log(map2.size); //=> 2


// 全データのクリア
map2.clear();
console.log(map2.size); //=> 0
```

Map は Iterable
----------------

```javascript
var m = new Map([['k1', 'v1'], ['k2', 'v2']]);
for (let [k, v] of m) {
  console.log(k, v);
}
//=> k1 v1
//=> k2 v2
```

`Map#keys` はキーの、`Map#values` は値のイテレータを返す


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



WeakMap と WeakSet
-------------------

Map や Set のキーにオブジェクトを指定できるようになったことで、オブジェクトがガベージコレクションの対象にならずメモリリークを引き起こす可能性がある。
WeakMap と WeakSet は、オブジェクトに対して弱い参照を持つことでガベージコレクションを妨げない。

```javascript
const privateNames = new WeakMap();

class Foo {
  constructor(name) {
    privateNames.set(this, name);
  }
  
  getName() {
    return privateNames.get(this);
  }
}

var foo = new Foo('Bob');
console.log(foo.getName()); //=> Bob
```
