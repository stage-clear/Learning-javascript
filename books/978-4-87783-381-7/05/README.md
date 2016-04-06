# スマートフォンで使う

## プログラムの実行方法

## タッチパネルを扱う

```js
// ClickedText
function setup() {
  createCanvas(250, 150);
}

function draw() {
  
}

function mouseClicked() {
  text('Hello', mouseX, mouseY);
}
```

### 3.2.1 システム関数、システム変数

__タッチパネル関連のシステム関数__

- `touchStarted()` - タッチパネルをタッチしたとき
- `touchMoved()` - タッチされたままで指を動かしている間
- `touchEnded()` - タッチパネルから指をはなしたとき

__タッチパネル関連のシステム変数__

- `touchX` - タッチされた場所のx座標
- `touchY` - タッチされた場所のy座標
- `ptouchX` - 直前の touchX
- `ptouchY` - 直前の touchY
- `touches[]` - 複数箇所タッチされている場所の座標群
- `touchIsPressed` - タッチパネルがタッチされているかどうか。


```js
// TouchTexts
function setup() {
  createCanvas(250, 150);
  background(200); // 描画領域を灰色に
}

function draw() {
  
}

function touchStarted() {
  text('Hello', touchX, touchY);
  return false;
}
```


### 5.2.2 タッチで円を描画する

```js
// touchMoved
function setup() {
  //devicePixelScaling(false);
  createCanvas(320, 240);
  fill(0); // 黒くぬりつぶす
  background(200);
}

function draw() {
  
}

function touchMoved() {
  ellipse(touchX, touchY, 20, 20); // タッチされた場所に円を描画する
  return false;
}
```


### 5.2.3 画面いっぱいに表示する

```html
<!doctype html>
<html>
  <head>
    <style>
    body { margin: 0; padding: 0; }
    canvas { display: block; }
    </style>
  </head>
```

```js
// TouchDraw
function setup() {
  //devicePixelScaling(false);
  createCanvas(windowWidth, windowHeight);
  stroke(0); // 黒くぬりつぶす
}

function draw() {
  
}

function touchMoved() {
  line(touchX, touchY, ptouchX, ptouchY);
  return false;
}
```


## 5.3 スマートフォンのデバイスの動きを使う

### 5.3.1 スマートフォンの座標系と動き

- α - デバイスのz軸を中心とした角度 
- β - デバイスのx軸を中心とした角度
- γ - デバイスのy軸を中心とした角度


### 5.3.2 システム関数、システム変数

__デバイス関係のシステム関数__

- `deviceMoved()` - スマートフォンが動き、その値がしきい値以上変わった時
- `deviceTurned()` - スマートフォンが90° より大きく回転したとき。
- `deviceShaken()` - スマートフォンが振られたとき。


__しきい値を設定する関数__

- `setMoveThreshold(val)` - どのくらい動いたら deviceMoved() を実行するか (d: 0.5)
- `setShakeThreshold(val)` - どのくらい振られたら deviceShaken() を実行するか (d: 30)


__センサー関係のシステム変数__

- `accelerationX` - x軸方向の加速度 (m/s2)
- `accelerationY` - y軸方向の加速度 (m/s2)
- `accelerationZ` - z軸方向の加速度 (m/s2)
- `pAccelerationX` - 直前の accelerationX (m/s2)
- `pAccelerationY` - 直前の accelerationY (m/s2)
- `pAccelerationZ` - 直前の accelerationZ (m/s2)
- `rotationX` - β の値 (°)
- `rotationY` - γ の値 (°)
- `rotationZ` - α の値 (°)
- `pRotationX` - 直前の rotationX (°)
- `pRotationY` - 直前の rotationY (°)
- `pRotationZ` - 直前の rotationZ (°)
- `deviceOrientation` - デバイスの向き。 "landscape" (横) | "portrait" (縦)
- `turnAxis` - 回転軸 "X" | "Y" | "Z"


### 5.3.3 縦向きか横向きかをチェックする

```js
// Orientation
function setup() {
  
}

function draw() {
  background(255);
  if (deviceOrientation === 'portrait') {
    text('縦', 10, 100);
  } else if (deviceOrientation === 'landscape') {
    text('横', 10, 100);
  } else {
    text('未定義', 10, 100);
  }
}
```

### 5.3.4 ボールを動かす

```js
var x = 0;
var y = 0;

function setup() {
  //devicePixelScaling(false);
  createCanvas(windowWidth, windowHeight);
  x = width / 2;  // 最初は真ん中に表示
  y = height / 2;
  fill('red'); // ボールを赤にする
  setMoveThreshold(0.05); // しきい値を小さくし感度を上げる
}

function deviceMoved() {
  x += rotationY; // x軸方向に移動
  y += rotationX; // y軸方向に移動

  if (x < 0) { // 画面外に行ってしまった場合の処理
    x = 0;
  } else if (x > windowWidth) {
    x = windowWidth;
  }
  
  if (y < 0) {
    y = 0;
  } else if (y > windowHeight) {
    y = windowHeight;
  }
  background(255); // 画面をクリアする
  ellipse(x, y, 80, 80); //ボールを描画
}
```

### 5.3.5 スマートフォンを振る

```js
var count = 0; // 振った回数

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(width / 4);
  text(count, (width - textWidth(count)) / 2, height / 2); // 回数を描画
}

function draw() {
  
}

function deviceShaken() {
  count++;
  background(255);
  text(count, (width - textWidth(count)) / 2, height / 2); // 回数を描画
}
```


### まとめ

(デバイス関連のサンプルは、codepen.io をデバイスで見ても動作しなかったため、動作確認できていない。)