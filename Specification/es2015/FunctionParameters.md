関数パラメータ
==============

<a name="defaultParameter">デフォルトパラメータ
--------------------

引数のデフォルト値を指定できる

```javascript
var fun = (a, b = 5) => {
  console.log(a + b);
}

fun(1);
```

<a name="restParameter">レストパラメータ
------------------

可変長の引数を簡単に書ける

```javascript
// `...` 以降のパラメータを1つの配列にまとめる
var fun = (a, ...b) => {
  console.log(a, b);
};

fun(1,2,3,4,5);
//=> 1,[2,3,4,5]
// * argumentsと違ってちゃんと配列
```


<a name="spredOperator">スプレッドオペレータ
--------------------

レストパラメータの逆で、配列で指定した引数を単一の引数で受け取る

```javascript
// ES6)
var fun = (a, b, c, d) => {
  console.log(a);
  console.log(b);
  console.log(c);
  console.log(d);
}

fun(...[1,2,3,4]);


// ES6) サンプル1
var largest = Math.max(...[3,1,2]);


// ES6) サンプル2
var arr1 = [1,2];
var arr2 = [3,4,5, ...arr1];
//=> [3,4,5,1,2]
```
