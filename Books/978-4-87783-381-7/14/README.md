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
 * @param {Number}  port - パソコンとマイコンボードとを接続しているポートを表す文字列
 *                         Arduino の場合は、IDE の [ツール] -> [ポート] で表示されるものを用いる
 *                         Mac の場合は、 /dev/cu.ubmodem1421 のような文字列
 * @param {String} type - マイコンボードの種類 ('Arduino')
 * @return {Object} マイコンボードを管理するオブジェクト
 */
```

