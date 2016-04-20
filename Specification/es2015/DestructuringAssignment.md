分割代入
========

- 配列やオブジェクトから構造がマッチするデータを抽出できる
- 変数への代入と関数引数の指定という2つの場面で使える

```javascript
// 配列の分割代入
var [year, month, day] = [2015, 12, 31];
console.log(year, month, day);
//=> 2015, 12, 31


// 2番目の値だけを代入
var [, month] = [2015, 12, 31];
console.log(month);
//=> 12


// レストパラメータの活用
var [year, ...monthDay] = [2015, 12, 31];
console.log(year, monthDay);
//=> 2015 [12,31]


// 値の交換に便利
var x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y);
//=> 2, 1


// オブジェクトの分割代入
var {name: a, age: b} = {name: 'Bob', age: 29};
console.log(a, b);
//=> Bob 29


// プロパティ省略記法を使った分割代入
var {name, age} = {name: 'Bob', age: 29};
console.log(name, age);
//=> Bob 29


// デフォルト値の指定
var {name, age = 10} = {name: 'Bob'};
console.log(name, age);
//=> Bob 10


// ネストしたオブジェクトからの抽出
var {foo: {bar: [, x]}} = {foo: {bar: [1,2,3]}};
console.log(x);
//=> 2
```
