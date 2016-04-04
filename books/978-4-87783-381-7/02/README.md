# p5.js と JavaScript 入門

## 2.1 「hello」と表示するプログラムの作成と実行

## 2.2 プログラムの書き方

## 2.3 プログラムの処理の流れ

## 2.4 p5.js で扱えるデータ

1. 数値 - 整数と浮動小数点数が扱えます
2. 文字列
3. 論理値(ブール値)

## 2.5 変数

## 2.6 コメント(注釈)

## 2.7 演算子

## 2.8 条件分岐

## 2.9 比較、論理演算子

## 2.10 繰り返し

## 2.11 関数

## 2.12 グローバル変数とローカル変数

## 2.13 配列

## 2.14 システム関数とシステム変数

### 2.14.1 draw 関数

draw関数は、setup関数の実行後、定期的に繰り返し実行されます。

```js
// DrawFunction
var x = 0;
function setup() {
  
}

function draw() { // 1秒間に60回実行される
  background(255); // 背景をクリアする
  text('こんにちは', x, x);
  x += 1;
  
  if (x > width) {
    x = 0;
  }
}
```

### 2.14.2 setup 関数

```js
var x = 0;
function setup() { // 最初に1回だけ実行される
  createCanvas(250, 150);
}

function draw() {
  
}
```

### 2.14.3 その他のシステム関数とシステム変数

```js

function mouseClicked() {
  text('Hello', mouseX, mouseY);
}
```


## 2.15 間違いの見つけ方

## 2.16 p5.js で注意する点



