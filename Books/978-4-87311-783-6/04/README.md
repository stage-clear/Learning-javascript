# 制御フロー

## JavaScript の制御フロー文

### 4.2.3 構文の詳細
EBNF(Extended Backus-Naur Form: 拡張バッカス・ナウア記法)は「メタ構文」と呼ばれるもので,
プログラミング言語などの構文を説明する際によく使われます.

### 4.2.4 while

```js
while(condition)
  statement
```

### 4.2.5 if...else

```js
if (condition)
  statement1
[else
  statement2]
```

### 4.2.6 do...while

```js
do 
  statement
while (condition)
```

### 4.2.7 for

```js
for ([initalize]; [condition]; [update]) 
  statement
```

### 4.3.8 その他の for ループパターン

```js
// 先頭から8個のフィボナッチ数を取得
for (let temp, i = 0, j = 1; j < 30; temp = i, i = j, j = i + temp)
  console.log(j)
```

```js
// 無限ループ
for (;;) console.log('永遠に繰り返し!')
```

```
let s = '3'
// 10桁になるまで前に空白を埋める
for (; s.length < 10; s = ' ' + s)
  console.log(s)
```

```js
// 整数以外の増分
for (let x = 0.2; x < 3.0; x += 0.2)
  console.log(x)
```

```js
// 条件としてオブジェクトのプロパティを使う
for (; !player.isBroke;)
  console.log('まだプレイ中です!')
```

for ループは while ループで書き直すことができます.

```js
for ([initalize]; [condition]; [update])
  statement

[initialize]
while([condition]) {
  statement
  [update]
}
```

### 4.2.9 switch

```js
switch(expression) {
  case value1:
    [break]
  case value2
    [break]
  ...
  case valueN
    [break]
  default
    [break]
}
```

### 4.2.10 for...in

```js
for (variable in object) 
  statement
```

### 4.2.11 for...of

```js
for (variable in object)
  statement
```

## 4.3 便利な制御フローパターン
### 4.3.1 条件の入れ子を減らすために `continue` を使う方法
```js
while(funds > 1 && funds < 100) {
  let totalBet = rand(1, funds)
  if (totalBet === 13) {
    console.log('不吉だ...今回はパス')
    continue
  }
}
```

### 4.3.4 不要な計算を避けるために `break` や `return` を使う方法

```js
let firstPrime = null
for (let n of bigArrayOfNumbers) {
  if (isPrime(n)) {
    firstPrime = n
    break
  }
}
```

`break` でループを終わりにすることができます.
このループが関数の中にある場合は, `break` でなく `return` を使って関数から戻ります.

### 4.3.4 ループ終了後のループ変数の値を使う方法

```js
let i = 0
for (; i < bigArrayOfNumbers.length; i++) {
  if (isPrime(bigArrayOfNumbers[i])) break
}
if (i === bigArrayOfNumbers.length) {
  console.log('素数はなし')
} else {
  console.log(`最初の素数の発見位置: ${i}`)
}
```

### 4.3.5 リストを変更するときにチェックを降順に行う方法

```js
for (let i = bigArrayOfNumbers; i >= 0; i--) {
  if (isPrime(bigArrayOfNumbers[i])) bigArrayOfNumbers.splice(i, 1)
}
```
