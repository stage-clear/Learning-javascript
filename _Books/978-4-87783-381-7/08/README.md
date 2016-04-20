# 動画を扱う

1. ファイルに保存した動画を処理する方法
2. パソコンに内臓されたカメラや、USBなどでつないだWebカメラから取り込んだ映像を処理する方法

画像の場合と同様に、Processing でもできますが、p5.js ではやり方が少し異なるので、注意してください。


## 8.1 動画ファイルを再生する (PlayVideo)

```js
function setup() {
  noCanvas(); // デフォルトの描画領域を作成しない
  var video = createVideo('movie.webm'); // 動画ファイルを読み込む
  video.play(); // 動画ファイルを再生する
}

function draw() {
  
}
```


```js
/**
 * createVideo(src)
 * @param {} src - 動画ファイルへのパス名、またはパス名の配列 (['movie.mp4', movie.webm''])
 * @return {p5Element} 
 */
createVideo()
```

__`<video>` タグを管理する p5.Element オブジェクトが提供する関数__

- `play()` - 動画を再生する
- `stop()` - 動画を停止する（次に再生すると最初から再生される）
- `pause()` - 動画を一時停止する(次に再生すると停止した場所から再生される)
- `loop()` - ループ再生を true にして、動画を再生する(ループ再生される)
- `noLoop()` - ループ再生を false にする(ループ再生されなくなる) 
- `autoplay()` - 動画の準備ができたら自動的に再生するように設定する
- `volume(val)` - 音量を指定する(0.0 ~ 1.0)。引数を指定しないと現在の音量が返る
- `time(t)` - 引数(t) で指定した時刻から再生する (秒)
- `duration()` - 再生している時間を得る (秒)
- `showControls()` - 再生ボタンなどのコントロールを表示する
- `hideControls()` - 再生ボタンなどのコントロールを非表示する


```js
// PlayVideo
function setup() {
  noCanvas();
  var video = createVideo('movie.webm');  // 動画ファイルを読み込む
  video.play(); // 動画ファイルを再生する
  video.showControls(); // コントロールを表示する
}
```

## 8.2 マウスクリックで動画を再生、停止する

```js
// PlayPauseVideo
var video = // 動画ファイルを管理する
var playing = false;

function setup() {
  noCanvas(); // デフォルトの canvas を作成しない
  video = createVideo('movie.webm'); // 動画ファイルを読み込む
}

function draw() {
  
}

function mouseClicked(event) {
  if (playing) { // 再生中
    video.pause(); // -> 停止する
  } else { //　停止中
    video.play(); // -> 再生する
  }
}
```


## 8.3 動画の色を反転する

2つの方法があります。

1. filter 関数を用いる方法
2. ピクセルを直接変更する方法

### 8.3.1 filter

```js
// InvertVideo
var video ; // 再生する動画を管理する変数

function setup() {
  createCanvas(640, 360);
  video = createVideo('movie.webm');
  video.hide(); // ビデオを表示しないようにする
  video.play();
}

function draw() {
  image(video, 0, 0, width, height); // ビデオを表示する
  filter(INVERT); // 入りを反転する
}
```

### 8.3.2 ピクセルを直接変更する方法

```js
// InvertVideoPixelArray
var video;

function setup() {
  createCavans(640, 360);
  video = createVideo('movie.webm');
  video.hide(); // 動画を表示しない
  video.loop();
}

function draw() {
  video.loadPixels(); // 画像のピクセルを pixels 配列に読み込む
  var pixels = video.pixels;
  
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var i = (x + y * video.width) * 4; // 配列の添え字を計算する
      pixels[i + 0] = 255 - pixels[i + 0];
      pixels[i + 1] = 255 - pixels[i + 1];
      pixels[i + 2] = 255 - pixels[i + 2];
    }
  }
  
  video.updatePixels(); // pixels 配列の内容を描画バッファに反映する
  image(video, 0, 0, width, height);
}
```


## 8.4 ドラッグ & ドロップされたビデオを再生する

```js
// DropVideo
var media;

function setup() {
  var canvas = createCanvas(640, 360);
  canvas.drop(getFile);
  background(200);
  text('画像や動画ファイルをドロップしてください', 10, height / 2);
  noLoop(); // 描画ループを止める
}

function draw() {
  if (media) { // 画像や動画が読み込まれたら
    image(media, 0, 0, width, height);
  }
}

function getFile(file) {
  if (file.type === 'video') {
    media = createVideo(file.data);
    media.play(); // 動画を再生する
    media.hide(); // 非表示にする
    loop(); // 描画ループを再開する
  } else if (file.type === 'image') {
    media = createImg(file.data);
    media.hide();
    redraw(); // 1度だけ描画ループを回す
  }
}
```


## 8.5 カメラの映像を表示する

### 8.5.1 ブラウザによる UI の違い

```js
// HelloCamera

function setup() {
  noCanvas(); // 描画領域は作成しない
  var capture = createCapture(VIDEO);
}

function draw() {
  
}
```

```js
/**
 * createCapture([type], [callback])
 * @param {} type - VIDEO または AUDIO を指定する。指定しないと映像と音声の両方が取り込まれます
 * @param {Function} callback - 映像や音声が取り込まれると呼び出される関数
 * @return {p5Element} キャプチャした映像を管理するオブジェクト
 */
createCapture();
```

type 引数には、HTML5 の `getUserMedia()` 関数の `constraints` 引数に渡せるものが指定できます。

```js
// CameraConstraints
function setup() {
  var constraints = {
    video: {
      mandatory: {
        minWidth: 1280,
        minHeight: 720
      },
      optional: [
        { maxFrameRate: 10 }
      ]
    },
    audio: true
  };
  
  createCapture(constraints, function(stream) {
    print('started');
  });
}
```

### 8.5.2 マウスクリックでカメラを制御する

```js
// PlayPauseCamera
var capture;
var capturing = true; // デフォルトではすぐに表示されてしまうため

function setup() {
  capture = createCapture(VIDEO); // カメラを用意する
}

function draw() {
  
}

function mouseClicked() {
  if (capturing) {
    capture.pause(); // カメラを停止する
  } else {
    capture.play(); // カメラを起動する
  }
  capturing = !capturing; // 状態を入れ替える
}
```


## 8.6 カメラからの映像の色を反転する

### 8.6.1 filter 関数を用いる

```js
// InvertCamera
var capture ; 

function setup() {
  createCanvas(320, 240);
  capture = createCanvas(VIDEO);
  capture.hide(); // カメラからの映像を非表示にする
}

function draw() {
  image(capture, 0, 0, width, height); // 描画領域に描画する
  filter(INVERT); // 映像を反転する
}
```

### 8.6.2 ピクセルを直接操作

```js
// InvertCameraPixelArray
function setup() {
  
}

function draw() {
  capture.loadPixels(); // pixels 配列にピクセルを読み込む
  var pixels = capture.pixels;
  for (var y = 0; y < capture.height; y++) {
    for (var x = 0; x < capture.width; x++) {
      var i = (x + y * capture.width) * 4; // 配列の添字を計算する
      pixels[i + 0] = 255 - pixels[i + 0]; // ピクセルの色を判定する
      pixels[i + 1] = 255 - pixels[i + 1];
      pixels[i + 2] = 255 - pixels[i + 2];
    }
  }
  capture.updatePixels();
  image(capture, 0, 0, width, height); // 色を反転した画像を表示する
}
```