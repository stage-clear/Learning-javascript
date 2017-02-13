# Math
より複雑な構造やアルゴリズムが必要な場合は, まず[Math.js](http://mathjs.org/)をチェックしてみてください.

## 16.1 数値のフォーマット指定
必然的に, 数のフォーマットのメソッドはすべて, 数値でなく文字列を返します.

### 16.1.1 固定小数点数

- `Number.prototype.toFixed`

```js
const x = 19.51
console.log(x.toFixed(3)) // 19.150
console.log(x.toFixed(2)) // 19.15
console.log(x.toFixed(1)) // 19.5
console.log(x.toFixed(0)) // 20
```
四捨五入されます.

### 16.1.2 指数表現

- `Number.ptorotype.toExponential`

```js
const x = 3800.5
console.log(x.toExponential(4))
console.log(x.toExponential(3))
console.log(x.toExponential(2))
console.log(x.toExponential(1))
console.log(x.toExponential(0))
```
四捨五入されます.

### 16.1.3 精度の指定

- `Number.prototype.toPrecision`

```js
let x = 1000
console.log(x.toPrecision(5)) // 1000.0
console.log(x.toPrecision(4)) // 1000
console.log(x.toPrecision(3)) // 1.00e+3
console.log(x.toPrecision(2)) // 1.0e+3
console.log(x.toPrecision(1)) // 1e+3
x = 15.335
console.log(x.toPrecision(6)) // 15.3350
console.log(x.toPrecision(5)) // 15.335
console.log(x.toPrecision(4)) // 15.34
console.log(x.toPrecision(3)) // 15.3
console.log(x.toPrecision(2)) // 15
console.log(x.toPrecision(1)) // 2e+1
```

四捨五入され, 必要に応じて指数表現になります

### 16.14 奇数の指定

```js
const x = 12
console.log(x.toString()) // 12
console.log(x.toString(10)) // 12
console.log(x.toString(16)) // c
console.log(x.toString(8)) // 14
console.log(x.toString(2)) // 1100
```

### 16.1.5 より細かなフォーマット指定

- 3桁ごとの区切り「,」
- 負数を異なる形式で表示する(たとえば括弧をつけるなど)
- 工学用の表記法(工学分野では, 指数表現の指数部分に3の倍数を用いることが多い)
- SI接頭辞

[Numeral.js](http://numeraljs.com/)

## 16.2 定数

```js
// 基本的な定数
Math.E // 自然対数の底 ≠ 2.718
Math.PI // 円周率 ≠ 3.142

// 対数関連の定数
Math.LN2 // 2の自然対数 ≠ 0.693
Math.LN10 // 10の自然対数 ≠ 2.303
Math.LOG2E // 2を底とする Math.E の対数 ≠ 1.443
Math.LOG10E // 10を底とする Math.E の対数 ≠ 0.434

// 台数関連の定数
Math.SQRT1_2 // 1/2 の平方根 ≠ 0.707
Math.SQRT2 // 2の平方根 ≠ 1.414
```

## 16.3 代数関連の関数
### 16.3.1 累乗

- `Math.pow(x, y)` - x<sup>y</sup>
- `Math.sqrt(x)` - √x (`Math.pow(x, 0.5)` に同じ)
- `Math.cbrt(x)` - xの立方根(`Math.pow(x, 1/3)` に同じ)
- `Math.exp(x)` - e<sup>x</sup> (`Math.pow(Math.E, x)` に同じ)
- `Math.expml(x)` - e<sup>x</sup> - 1 (`Math.exp(x) - 1` に同じ)
- `Math.hypot(x1, x2, ...)` - 引数の2乗の和の平方根 √x1<sup>2</sup> + x2<sup>2</sup> +...

### 16.3.2 対数関連の関数

- `Math.log(x)` - xの自然対数
- `Math.log10(x)` - 10を底とするxの対数(`Math.log(x) / Math.log(10)`に同じ)
- `Math.log2(x)` - 2を底とするxの対数(`Math.log(x) / Math.log(2)`に同じ)
- `Math.log1p(x)` - 1 + x の自然対数(`Math.log(1 + x)`に同じ)

### 16.3.3 その他の関数

- `Math.abs(x)` - xの絶対値
- `Math.sign(x)` - xの符号. xが負なら-1, xが正なら1, xが0なら0
- `Math.ceil(x)` - xの上限値. xより大きいか等しい最小の整数値
- `Math.floor(x)` - xの下限値. xより小さいか等しい整数値
- `Math.trunc(x)` - xの整数部分(少数部分はすべて切り捨て)
- `Math.round(x)` - xを最も近い整数に四捨五入
- `Math.min(x1, x2,...)` - 最小の引数を返す
- `Math.max(x1, x2,...)` - 最大の引数を返す

### 16.3.4 擬似乱数発生

- [0, 1) -- `Math.random()`
- [x, y) -- `x + (y - x) * Math.random()`:
- [m, n) の整数 -- `m + Math.floor((n - m) * Math.random())`
- [m, n] の整数 -- `m + Math.floor((n - m + 1) * Math.random())`

## 16.4 三角関数

- `Math.sin(x)` - xラジアンのサイン
- `Math.cos(x)` - xラジアンのコサイン
- `Math.tan(x)` - xラジアンのタンジェント
- `Math.asin(x)` - xのアークサイン(arcsin, 結果はラジアン)
- `Math.acos(x)` - xのアークコサイン(arccos, 結果はラジアン)
- `Math.atan(x)` - xのアークタンジェント(arttan, 結果はラジアン)
- `Math.atan2(y, x0)` - x軸から座標(x, y)までの反時計回りの角度(ラジアン)

```js
function deg2rad(d) { return d / 180 * Math.PI }
function rad2deg(r) { return r / Math.PI * 180 }
```

## 16.5 双曲線関数

- `Math.sinh(x)` - xの双曲線正弦
- `Math.cosh(x)` - xの双曲線余弦
- `Math.tanh(x)` - xの双曲線正接
- `Math.asinh(x)` - xの逆双曲線正弦(arcsinh)
- `Math.acosh(x)` - xの逆双曲線余弦(arccosh)
- `Math.atanh(x)` - xの逆双曲線正接(arttanh)
