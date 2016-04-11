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



