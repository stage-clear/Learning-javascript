# Number
## 2進数と8進数のリテラル

__2進数__

```js
console.log(0b10);//=> 2
console.log(0b100);//=> 4
```

__8進数__

```js
console.log(0o10);//=> 8
console.log(0o100);//=> 64
```

* `parseInt()` ではパースできない


## 整数

```js
// 安全に表現できる最大値
console.log(Number.MAX_SAFE_INTEGER);//=> 9007199254740991
// 安全に表現できる最小値
console.log(Number.MIN_SAFE_INTEGER);//=> -9007199254740991

// 値が整数かどうか
console.log(Number.isInteger(1));//=> true
// 安全な整数かどうか
console.log(Number.isSafeInteger(1));
```

## isNaN と isFinite の改善

```js
// ES5
console.log(isNaN(1));//=> false
console.log(isNaN(NaN));//=> true
console.log(isNaN('foo'));//=> true

// ES6
console.log(Number.isNaN('foo'));//=> false

// * 同様に isFinite() に対して Number.isFinite() も追加された
```
