# 後書きに代えて
## 14.1 Arduino を扱う
### 14.1.1 ArduinoIDE と node.js をインストールする
- Arduino 用の開発環境 (Arduino IDE)
- Node.js と npm

:arrow_forward: [https://www.arduino.cc](https://www.arduino.cc)

### 14.1.2 準備する
- [p5bots.js](https://github.com/sarahgp/p5bots)

```html
<!-- index.html -->
<!doctype html>
<html>
  <head>
    <script src="libs/p5.dom.js"></script>
    <script src="libs/p5.sound.js"></script>
    <script src="libs/p5bots.js"></script>
    <script src="https://cdn.socket.io/socket.io-1.3.5.js"></script>
    <script src="sketch.js"></script>
    
    <style> body { padding: 0; margin: 0; } </style>
  </head>
```

### 14.1.3 Arduino のボードの設定 (LED を点灯する)
### 14.1.4 実行方法
#### (1) ArduinoIDE でArduino にパソコンとの通信プログラムをダウウンロードする
[ファイル] -> [スケッチの例]  -> [Firmata] -> [StandardFirmata]

#### (2) bots-go サーバを起動する

```sh
$ bots-go -f ./iindex.html -d ./
```

#### (3) bots-go サーバにアクセスする
`localhost:8000`

### 14.1.5 LED を点灯するプログラム

```js
//LEDoN
var board = p5.board('COM4', 'arduino'); // Arduino に接続する

function setup() {
  var led = board.pin(9, 'led');
  led.on(); // LED を点灯する
}

function draw() {

}
```

```js
/**
 * p5.board(port, type)
 * @param {String}  port - パソコンとマイコンボードとを接続しているポートを表す文字列
 *                         Arduino の場合は、IDE の [ツール] -> [ポート] で表示されるものを用いる
 *                         Mac の場合は、 /dev/cu.ubmodem1421 のような文字列
 * @param {String} type - マイコンボードの種類 ('Arduino')
 * @return {Object} マイコンボードを管理するオブジェクト
 */
```

__p5bots.js のサポートする別名__

|別名|モード|
|:--|:--|
|button|digital|
|knock|analog|
|led|digital|
|motor|pwm|
|piezo|digital|
|rgbled|pwm|
|servo|servo|
|temp|analog|
|tone|digital|
|vres|analog|

__LED の提供する関数__

|関数名|説明|
|:--|:--|
|on()|LEDを点灯する|
|off()|LEDを消す|
|fade(start, stop, [totalTime], [increment])|LEDの明るさを start の明るさから stop の明るさまで time (ミリ秒)かけて徐々に変化させる|
|blink(length)|LEDを指定した感覚 length (ミリ秒)で点滅させる|
|noBlink()|LEDの点滅をやめる|

```js
// LEDoN
var board = p5.board('COM4', 'arduino');
var on = false; // オン・オフを制御する変数

function setup() {
  var led = board.pin(9, '.led');
}

function mouseClicked() {
  (on) ? led.off() : led.on(); // LED を点灯、消去する
  on = !on;
}
```

## 14.1.6 Arduino のポートの設定（光センサーを使う）
- 1kΩ の抵抗（カラーコードは左から、茶色、黒色、赤色、金色）
- 光センサー (CdS)

### 14.1.7 光センサーからデータを受け取るプログラム

```js
// CDS
var board = p5.board('COM4', 'arduino');
var cds; // 光センサー(CDS) を管理する変数

function setup() {
  cds = board.pin(0, 'analog'); // analog 入力
  cds.read(update);
}

function draw() {
}

function update(data) {
  background(255);
  fill(255 - data / 4); // 値は 0~1023 なので4で割る fill(map(data, 0, 1023, 255, 0)); でもよい
  ellipse(width / 2, height / 2, 70, 70);
}
```

## 14.2 3D グラフィックス
:warning: 書籍執筆時点から構文が変わっていて動作しあいものがあります
:arrow_forward: [Getting started with WebGL in p5](https://github.com/processing/p5.js/wiki/Getting-started-with-WebGL-in-p5)

### 14.2.1 座標系
3Dグラフィックスで用いる座標系は、2次元のx軸とy軸からなる座標系にもう1つz軸が加わったものです

### 14.2.2 球を表示する

```js
function setup() {
  createCanvas(360, 180, 'webgl');
  background(255); // デフォルトでは黒になる
  translate(0, 0, -10);
  sphere(10); // 球を描画する
}

function draw() {

}
```

```js
// v0.5.2
function setup() {
  createCanvas(360, 180, WEBGL);
}

function draw() {
  background(255);
  translate(0, 0, -10);
  sphere(10);
}
```

球以外に平面、円柱、円錐、円環（トーラス）、直方体などの図形がサポートされています。

### 14.2.3 立方体を回転させる

```js
// Box
var theta = 0; // 回転角

function setup() {
  createCanvas(360, 180, 'webgl');
}

function draw() {
  background(255);
  translate(0, 0, -100);
  rotateX(theta);
  box(10, 10, 10);
  theta += 0.05;
  if (theta > radians(360)) {
    theta = 0;
  }
}
```

```js
// v0.5.2
var theta = 0;
function setup() {
  createCanvas(360, 180, WEBGL);
}

function draw() {
  background(255);
  translate(0, 0, -100);
  rotateX(theata);
  box(100, 100, 100);
  theta += 0.05;
  if (theta > radians(360)) {
    theta = 0;
  }
}
```

3つの軸で順に回転させてみましょう

```js
// BoxXYZ
var theta = 0;

function setup() {
  createCanvas(360, 180, WEBGL);
}

function draw() {
  background(255);
  translate(0, 0, -100);
  rotateZ(theta);
  rotateX(theta);
  rotateY(theta);
  box(100, 100, 100);
  theta += 0.05;
  if (theta > radians(360)) {
    theta = 0;
  }
}
```

## 14.3 まとめ
