Object
======

Object#assign
--------------

- 第1引数に第2引数以降をコピーしてマージする
- 第1引数は上書きされる
- シャローコピー

```javascript
var target = {a:1, b:2};
var s1 = {b:3, c:4};
var s2 = {c:5, d:6};
var ret = Object.assign(target, s1, s2);

console.log(target);//=> {"a":1,"b":3,"c":5,"d":6}
console.log(target == ret);//=> true


// オブジェクトのクローン
var clone = Object.assign({}, s1);
console.log(clone);//=> {"b":3,"c":4}


// シャローコピー(ディープコピーではない)
var s3 = {x: {y: 1, z: {w: 1}}};
var clone3 = Object.assign({}, s3);
clone3.x.y = 2;
console.log(clone3);
```

Object#is
----------

- ほとんど `===` による同値比較と同じ
- NaN、-0、+0に関する比較に違いあり

```javascript
// 通常の比較は === と同じ挙動
console.log(Object.is(1,1));//=> true
console.log(Object.is({}, {}));//=> false
var a = {};
console.log(Object.is(a, a));//=> true
// NaNどうしの比較は true
console.log(Object.is(NaN, NaN));//=> true
console.log(NaN === NaN);//=> false
// -0 と +0 の比較は false
console.log(Object.is(-0, +0));//=> false
console.log(-0 ===  +0);//=> true
[0, NaN, 1].findIndex(n => Object.is(n, NaN));//=> 1
```


Object#setPrototypeOf
---------------------

- オブジェクトのプロトタイプオブジェクトを変更する

```javascript
Object.setPrototypeOf(obj, prototype);
```

* プロトタイプオブジェクトをあとから変更することは JavaScript エンジンの最適化を妨げるため、利用は最低限に抑える。


その他
------

- プリミティブ型の引数を取れるようになった
  `Object#keys` `Object#seal` などのスタティックメソッドは、引数にプリミティブを受け取ると例外を投げていたが、ES6から例外を投げなくなった
