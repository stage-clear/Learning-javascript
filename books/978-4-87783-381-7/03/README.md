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