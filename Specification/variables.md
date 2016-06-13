# 変数

```js
var a = 0;
```

意図しないグローバルを避ける

__暗黙のグローバル: `var` を使った宣言で代入の連鎖を行う__

```js
// Bad
function foo() {
  var a = b = 0;
  // `a` はローカルだが, `b` はグローバルとなる
}

// Good
function foo() {
  var a, b;
  a = b = 0;
}
```

__暗黙のグローバル: `var` なしでの宣言__

```js
// Bad
// `var` を忘れた場合は、暗黙のグローバルとなる
c = 0;

// Good
var c = 0;
```

__単独 `var` パターン__

```js
function func() {
  var a = -1,
      b = 2,
      sum = a + b,
      i,
      j;
  
  // ...
}
```
