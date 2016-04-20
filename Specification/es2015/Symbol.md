Symbol
======

- プリミティブ型
- オブジェクトプロパティのキーとして使うことができるユニークの値を生成できる
- また、特別な Well-known Symbol を使うことで、イテレータなどのオブジェクトの振る舞いを変更できる


__メソッド__  

|Method|Syntax|Summary|
|:--|:--|:--|
|for| `Symbol#for(key)` |指定したキーのシンボルを返す|
|keyFor| `Symbol#keyFor(symbol)` |指定したシンボルのキーを返す|


基本操作
--------

```javascript
// Symbol の生成
var sym1 = Symbol();
console.log(typeof sym1); //=> symbol


// 説明を付けることもできる
var sym2 = Symbol('foo');
console.log(sym2.toString()); //=> Symbol(foo)

// Symbol は必ずユニーク
console.log(sym2 === Symbol('foo')); //=> false

// Symbol をキーに持つオブジェクト
var obj = {[sym2]: 1};
// Object.keys で列挙されない
console.log(Object.keys(obj)); //=> []
// Object.getOwnPropertySymbols で列挙される
console.log(Object.getOwnPropertySymbols(obj));//=> [Symbol(foo)]
// * Babel の playground上では[null]となった


// Symbol.for(key)
console.log(Symbol.for('for') === Symbol.for('for'));//=> true

// Symbol.keyFor(symboe);
var symbol = Symbol.for('for');
console.log(Symbol.keyFor(symbol));//=> for

// How Wide is Runtime-wide
var frame = document.createElement('iframe');
document.body.appendChild(frame);
console.log(Symbol.for('foo') === frame.contentWindow.Symbol.for('foo'));//=> true
```


Well-known Symbol
------------------

言語機能に関わるオブジェクトの挙動をカスタマイズする

```javascript
var obj = {
  [Symbol.toStringTag]: 'Foo!'
};

console.log(String(obj));
```
`Symbol.toStringTag` は `Object.prototype.toString` の内部実装から呼ばれ、オブジェクトから文字列への変換の挙動を制御する Well-known Symbol です。

```js
var text = '/foo/';
var literal = /foo/;
literal[Symbol.match] = false;
console.log(text.startsWith(literal));//=> First argument to String.prototype.startsWith must not be a regular expression

var casted = /foo/.toString();
console.log(text.startsWith(casted));//=> true

var frame = document.creteElement('iframe');
document.body.appendChild(frame);
console.log(Symbol.iterator === frame.contentWindow.Symbol.iterator);//=> true

console.log(Symbol.keyFor(Symbol.iterator));//=> undefined
```


Symbol and Iteration
---

```js
var foo = {
  [Symbol()]: 'foo',
  [Symbol('foo')]: 'bar',
  [Symbol.for('bar')]: 'baz',
  what: 'ever'
};

// try `Spred operator`
console.log([...foo]);//=> []

// try `Object.keys`
console.log(Object.keys(foo));//=> ['what']

// try `JSON.stringfy`
console.log(JSON.stringify(foo));//=> {"what": "ever"}

// try `for..in`
for (let key in foo) {
  console.log(key);
  //=> what
}

// try `Object.getOwnPropertyNames`
console.log(Object.getOwnPropertyNames(foo));//=> ['what']

// trye `Object.getOwnPropertySymbols(foo)`
console.log(Object.getOwnPropertySymbols(foo));
//=>[Symbol(), Symbol('foo'), Symbol.for('bar')]
// と、なるはずが [null, null, null]

// tr for...of
for (let symbol of Object.getOwnPropertySymbols(foo)) {
  console.log(foo[symbol]);
  //=> 'foo'
  //=> 'bar'
  //=> 'baz'
}

```


リンク
------

- [ES6 Symbol in Depth](https://ponyfoo.com/articles/es6-symbols-in-depth)
- [Symbol オブジェクト (JavaScript)](https://msdn.microsoft.com/ja-jp/library/dn919632(v=vs.94).aspx)
