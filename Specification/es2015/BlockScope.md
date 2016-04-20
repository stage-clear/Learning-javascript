ブロックスコープ
================

1. let
1. const


let
----

```javascript
var obj = {
  name: 'Goku',
  age: 21,
  car: 'Swift'
};

// let は ブロックレベルのスコープを保持

for (let i in obj) {
  console.log(i);
}

console.log(i); 
// i is not defined.

if (true) {
  let foo = 10;

  let foo = 11; 
  // 重複して宣言された場合エラーを投げます
  // foo = 11;
}

console.log(foo);
// foo is not difend
```


const
-----
const は Read-Only な変数を定義します

```javascript
const bar = 'Hello';

console.log(bar);

bar = 'World';

```
