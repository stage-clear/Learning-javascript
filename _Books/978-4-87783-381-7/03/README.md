# 2次元グラフィックス

## 3.1 座標系

```js
// DrawLine
function setup() {
  line(0, 0, 100, 70);
}
```

## 3.2 描画領域

```js
line(0, 0, 200, 140);
```

- `background(128);` を追加することで描画領域を可視化できます。


## 3.3 図形を描画する

- `point(x, y)` - 点
- `line(x1, y1, x2, y2)` - 線
- `triangle(x1, y1, x2, y2, x3, y3)`- 三角形
- `quad(x1, y1, x2, y2, x3, y3, x4, y4)` - 四角形
- `rect(x, y, width, height [, tl [, tr [, br [, bl]]]])` - 長方形
- `ellipse(x, y, width, height)` - 楕円
- `arc(x, y, width, height, start, stop [, mode])` - 円弧


### 3.3.1 描画関数の使用方法

```js
function setup() {
  rect(40, 10, 50, 50); // これが最初に描画される
  rect(20, 40, 50, 50); // これがその上に描画される
}
```

```js
function setup() {
  ellipse(35, 40, 60, 70);
  rect(35, 40, 50, 50);
}
```


### 3.3.2 円弧の描画

```js

arc(50, 50, 80, 80, 0, PI);
arc(50, 50, 80, 80, 0, radians(180));
```


```js
function setup() {
  var x = 50, y = 50;

  noStroke(); // 輪郭線を描画しない
  fill(180, 180, 255); // 色の指定
  ellipse(x, y, 25, 20);
  ellipse(y, y + 25, 20, 40);
  triangle(x - 10, y - 5, x - 5, y -17, y - 9);
  triangle(x + 10, y - 5, x + 5, y -17, y - 9);
  quad(x - 10, y + 10, x - 30, y + 15, x - 20, y + 25, x - 5, y + 25);
  quad(x + 10, y + 10, x + 30, y + 15, x + 20, y + 25, x + 5, y + 25);
  
  fill(255, 0, 0, 70); // 色の指定
  ellipse(x, y, 15, 13);
  ellipse(x, y + 20, 13, 27);
}

function draw() {
  
}
```


### 3.3.3 頂点をして描画方法

```js
function setup() {
  var points = [ [10, 80], [30, 70], [50, 20], [70, 35], [90, 75] ]; // 頂点の座標
  
  beginShape(); // 図形の定義開始
  for (var i = 0; i < points.length; i += 1) {
    var x = points[i][0]; // x座標
    var y = points[i][1]; // y座標
    vertex(x, y); // 頂点を指定
  }
  endShape();
  // endShape(CLOSE); // 始点と終点が結ばれる
}
```

## 3.4 描画属性

### 3.4.1 輪郭の幅と色、塗りつぶしの色

- `strokeWeight(weight)` - 線の幅
- `stroke(v1 [, v2 [, v3 [, v4]]])` - 線の色
- `fill(v1 [, v2 [, v3] [, a]])` - 塗りつぶしの色
- `noStroke()` - 輪郭線をオフにする
- `noFill()` - 塗りつぶしをオフにする


```js
// strokeWeight
function setup() {
  line(10, 10, 80, 10); // 何も指定しない
  strokeWeight(5); // 幅5
  line(10, 30, 80, 30);
  strokeWeight(10); // 幅10
  line(10, 60, 80, 60);
}
```

```js
// strokeFill
function setup() {
  strokeWeight(5);
  stroke(128); // 線の色を指定
  rect(40, 10, 50, 50);
  fill(200); // 塗りつぶしの色
  rect(20, 40, 50, 50);
}
```

```js
// noStroke
function setup() {
  rect(40, 10, 50, 50);
  fill(200); // 塗りつぶしの色を指定
  noStroke(); // <-
  rect(20, 40, 50, 50);
}
```


### 3.4.2 色の指定方法

1. `fill(v1)` - グレースケール
2. `fill(v1, a)` - 透明度
3. `fill(v1, v2, v3)` - RGB
4. `fill(v1, v2, v3, a)` - RGBA


__色の指定方法__

- `fill('red')`
- `fill('#ff0000')`
- `fill('#f00')`
- `fill('rgb(255, 0, 0)')`
- `fill('rgba(255, 0, 0, 1.0)')`
- `fill('rgb(100%, 0%, 0%)')`
- `fill('rgba(100%, 0%, 0%, 1.0)')`
- `fill(color(255, 0, 0))`
- `fill([255, 0, 0])`
- `fill([244, 0, 0, 255])`

```js
/**
 * color(v1, [v2], [v3], [a])
 * 引数で指定された色を作成する
 */
color(255, 0, 0);
```

### 3.4.3 カラーモード

```js
/**
 * colorMode(mode, max1, max2, max3, maxA)
 * カラーモードを切り替える
 * @param {} mode - RGB | HSB
 * @param {} max1
 * @param {} max2
 * @param {} maxA
 */
colorMode(RGB, 100);
colorMode(HSB, 360, 100, 100, 1);
```

```js
function setup() {
  createCanvas(360, 50);
  colorMode(HSB, 360, 100, 100);
  
  for (var x = 0; x < 360; x++) {
    stroke(x, 100, 100);
    line(x, 10, x, 40);
  }
}

function draw() {
  // ...
}
```

### 3.4.4 長方形と円の描画モード

```js
/**
 * rectMode(mode)
 * 長方形の描画モードを変更する
 * @param {} mode - CENTER | CORNER | CORNERS | RADIUS
 *
 */
rectMode()

/**
 * ellipseMode(mode)
 * 円の描画モードを変更する
 * @param {} mode - CENTER | CORNER | CORNERS | RADIUS
 *
 */
ellipseMode()
```

### 3.4.5 線の描画モード

```js
/**
 * strokeCap(mode)
 * 線の端点の形状を設定する
 * @param {} mode - SQUARE | PROJECT | ROUND
 *
 */
strokeCap()

/**
 * strokeJoin(mode)
 * 線の結合モードを設定する
 * @param {} mode - MITER | BEVEL | ROUND
 *
 */
strokeJoin()
```


## 3.5 文字を描画する

```js
function setup() {
  text('Hello', 40, 30);
}
```

```js
/**
 * text(str, x, y, [width], [height])
 * @param {String} str - 描画する文字列
 * @param {Number} x, y - 描画位置を指定する
 * @param {Number} width, height - 文字列を描画すうr幅と高さ
 *
 */
text('Hello', 40, 30)

/**
 * textWidth(str)
 * 引数で指定した文字列を描画した場合の横幅を計算する
 * @param {String} str - 
 */
textWidth()

/**
 * textSize(size)
 * 文字のサイズを設定する
 * @param {Number} size - 文字のサイズ
 *
 */
textSize()

/**
 * textLeading(lead)
 * 行間を指定する。text 関数で \n を使用した場合に有効
 * @param {Number} lead - 行間の幅
 */
```

サンプル

```js
function setup() {
  var str = '文字列が\n重なります';
  textSize(18);
  textLeading(10);
  text(str, 10, 50);
}
```


### 3.5.2 フォントを設定する

1. ブラウザが提供するフォントを用いる
2. OpenType フォントや TrueType フォントを用いる

```js
/**
 * textFont(f)
 * text関数で描画される文字のフォントを設定する
 * @param {} f - フォントの名前
 */

textFont('Consolas');


/**
 * loadFont(path)
 * ファイルやURL から OpenType フォントを読み込む。通常は preload 関数内で用いる
 * @param {} path ファイル名または URL
 *
 */

```

```js
// textFont
function setup() {
  textSize(20);
  textFont('Monotype Corsiva');
  text('Hello World', 5, 20);
  textFont('HG正楷書体-PRO');
  text('厚い本', 5, 45);
}

// loadFont
var f; // 読み込んだフォントを管理する変数

function preload() {
  f = loadFont('Fontie.ttf');
}

function setup() {
  createCanvas(400, 50);
  textSize(25); 
  textFont(f);
  text('There is always better way !', 5, 50);
}
```


## 3.6 アニメーション

```js
// MovingRect
var x = 0;

function setup() {
  
}

function draw() {
  background(255);
  rect(x, x, 30, 30);
  x++;
  if (x > height) {
    x = 0;
  }
}
```


### 3.6.1 フレームレートを変更する

```js
// FrameRate
var x = 0;

function setup() {
  frameRate(1);
}

function draw() {
  background(255);
  rect(x, x, 30, 30);
  x++;
  if (x > height) {
    x = 0;
  }
}
```

### 3.6.2 描画ループを止めたり、再開したりする

```js
// NoLoop
function draw() {
  background(255);
  rect(x, x, 30, 30);
  x++;
  if (x > height) {
    x = 0;
  }
}

function mouseClicked() {
  if (mouseButton === LEFT) {
    noLoop(); // draw の実行を止める
  } else {
    loop(); // 再開する
  }
}
```

1度だけ draw 関数を実行したい場合、

```js
function setup() {
  noLoop(); // draw の実行を止める
}

function draw() {
  
}

function mouseClicked() {
  redraw(); // 1回だけ draw 関数を実行する
}
```


## 3.7 図形を移動、回転、拡大、縮小する

### 3.7.1 平行移動

```js
/**
 * translate(x, y)
 * 座標系の原点を水平方向に x、垂直方向に y 平行移動する
 * @param {Number} x, y
 *
 */
translate()
```

```js
function setup() {
  rect(0, 0, 40, 40);
  translate(30, 20);
  rect(0, 0, 40, 40);
}

function draw() {
  
}
```

```js
function setup() {
  var x = 50;
  var y = 50;
  
  noStroke(); // 輪郭線を描画しない
  fill(180, 180, 255); // 色の指定
  ellipse(x, y, 25, 20);
  ellipse(y, y + 25, 20, 40);
  triangle(x - 10, y - 5, x - 5, y - 17, x - 2, y - 9);
  triangle(x + 10, y - 5, x + 5, y - 17, x + 2, y - 9);
  quad(x - 10, y + 10, x - 30, y + 15, x - 20, y + 25, x - 5, y + 25);
  quad(x + 10, y + 10, x + 30, y + 15, x + 20, y + 25, x + 5, y + 25);
  
  fill(255, 0, 0, 70); // 色の指定
  ellipse(x, y, 15, 13);
  ellipse(x, y + 20, 13, 27);
}

// translate を使うと
function setup() {
  translate(50, 50); //<-

  noStroke();
  fill(180, 180, 255); // 色の指定
  ellipse(0, 0, 25, 20);
  ellipse(0, 25, 20, 40);
  triangle(-10, -5, -5, -17, -2, -9);
  triangle( 10, -5,  5, -17,  2, -9);
  quad(-10, 10, -30, 15, -20, 25, -5, 25);
  quad( 10, 10,  30, 15,  20, 25, +5, 25);
  
  fill(255, 0, 0, 70); // 色の指定
  ellipse(0, 0, 15, 13);
  ellipse(0, 20, 13, 27);
}
```

### 3.7.2 回転

```js
/**
 * rotate(angle)
 * 指定された角度で座標系を回転する
 * @param {Number} angle - 回転角度（デフォルトはラジアン）
 *
 */
rotate(radians(30))
```

サンプル

```js
// rotate
function setup() {
  rect(0, 0, 40, 40);
  rotate(radians(30));
  rect(0, 0, 40, 40);
}

function draw() {
  
}
```

サンプル:  平行移動後、回転する

```js
function setup() {
  translate(width/2, height/2);
  rotate(radians(30));
  rect(-25, -25, 50, 50);
}
```

サンプル: 回転後、移動する

```js
var angle = 0;

function setup() {
  
}

function draw() {
  background(255); // 前に描画した三角形を消す
  translate(width/2, height/2); // 描画領域の平行移動する
  rotate(radians(angle)); // 回転する
  triangle(0, -25, 25, 25, -25, 25); // 三角形を描画する
  angle++; // 角度を増やす
  if (angle > 360) {
    angle = 0;
  }
}
```


### 3.7.3 拡大・縮小

```js
/**
 * scale(size), scale(x, y)
 * @param {} size - 全体の倍率
 *
 */
scale()
```

サンプル

```js
function setup() {
  noFill(); // 重なってしまうので塗りつぶさない
  rect(0, 0, 30, 30);
  scale(3.0); // 3倍にスケーリングする
  rect(0, 0, 30, 30);
}
```

### 3.7.4 その他

せん断処理を行う shearX 関数、shearY 関数、行列を扱う applyMatrix 関数、resetMatrix関数など


## 3.8 描画属性と座標変換の保存と復元

### 3.8.1 push、pop 関数とサンプルプログラム

```js
// PushPop
function setup() {
  ellipse(50, 20, 30, 30);
  push(); // 描画属性を保存する(ここまでの設定が保存される) <- 
  fill(128);
  ellipse(50, 50, 30, 30);
  pop(); // 保存した描画属性に戻す <-
  ellipse(50, 80, 30, 30);
}
```

```js
/**
 * push()
 * 現在の描画属性と座標変換に関する情報を保存する。pop() で戻す
 *
 */

/**
 * pop()
 * push 関数で保存した描画属性と座標変換を元に戻す
 *
 */
```

描画属性は、次の関数で設定されるものが保存されます。

`fill()`, `stroke()`, `tint()`, `strokeWeight()`, `strokeCap()`,
`strokeJoin()`, `imageMode()`, `rectMode()`, `ellipseMode()`, `colorMode()`,
`textAlign()`, `textFont()`, `textMode()`, `textSize()`, `textLeading()`,
`translate()`, `rotate()`, `scale()`


### 3.8.2 座標変換を保存する

push, pop 関数は座標変換を用いた描画で威力を発揮します

```js
function setup() {
  translate(50, 50);

  noStroke();
  fill(180, 180, 255); // 色の指定
  ellipse(0, 0, 25, 20);
  ellipse(0, 25, 20, 40);
  triangle(-10, -5, -5, -17, -2, -9);
  triangle( 10, -5,  5, -17,  2, -9);
  quad(-10, 10, -30, 15, -20, 25, -5, 25);
  quad( 10, 10,  30, 15,  20, 25, +5, 25);
  
  fill(255, 0, 0, 70); // 色の指定
  ellipse(0, 0, 15, 13);
  ellipse(0, 20, 13, 27);
}
```

```js
// DrawClineFunction

function setup() {
  drawClione(50, 50);
  drawClione(20, 20); 
  // push/pop がなかった場合に前回の座標移動の影響を受ける
}

function drawClione(x, y) {
  push(); // 座標変換を保存する <-
  translate(x, y);

  noStroke();
  fill(180, 180, 255); // 色の指定
  ellipse(0, 0, 25, 20);
  ellipse(0, 25, 20, 40);
  triangle(-10, -5, -5, -17, -2, -9);
  triangle( 10, -5,  5, -17,  2, -9);
  quad(-10, 10, -30, 15, -20, 25, -5, 25);
  quad( 10, 10,  30, 15,  20, 25, +5, 25);
  
  fill(255, 0, 0, 70); // 色の指定
  ellipse(0, 0, 15, 13);
  ellipse(0, 20, 13, 27);
  pop(); // 座標変換を元に戻す <-
}
```


## 3.8.3 push, pop 関数を多段に使用する

```js
// TwoPushPop
function setup() {
  createCanvas(100, 180);
  ellipse(50, 20, 30, 30); // 白で描画される
  push(); // 描画属性を保存する
    fill(128); // 濃いめの灰色にする
    ellipse(50, 50, 30, 30); // 濃いめの灰色で描画される
    push();
      fill(200); // 薄めの灰色にする
      ellipse(50, 80, 30, 30); // 薄い灰色で描画される
    pop();
    ellipse(50, 110, 30, 30); // 濃いめの灰色で描画される
  pop(); // 保存した描画属性に戻す
  ellipse(50, 140, 30, 30);
}
```


## 3.9 描画領域の HTML での表示場所を指定する

```HTML
<!doctype html>
<html>
<body>
  <h1></h1>
  <div id="p5Sketch">
    <p>この下に p5.js の描画領域が表示される</p>
  </div>
  これは ellipse を使用した例です。
</body>
```

```js
// CanvasParent
function setup() {
  var canvas = createCanvas(100, 100);
  canvas.parent('p5Sketch'); // idを保存する
  ellipse(50, 50, 30, 30);
}
```


## 3.10 まとめ


