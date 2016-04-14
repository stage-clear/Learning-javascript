# サウンドを扱う

- [Web Audio API - Can I use](http://caniuse.com/#feat=audio-api)


## 10.1 音声ファイルを再生する


```js
// Play
var song; // 音声データをを管理する変数

function preload() {
  song = loadSound('jupiter.wav'); // 音声ファイルの読み込み
}

function setup() {
  song.setVolume(0.5); // 音量の設定
  song.play(); // 再生開始
}
```

```js
/**
 * loadSound(path, [loadedCallback], [loadingCallback])
 * path で指定いsた音声ファイルを読み込んで p5.soundFile オブジェクトを生成する
 * @param {String|Array} path - 音声ファイル名、またはその配列
 * @param {Function} loadedCallback - 音声ファイルの読み込み終了後に呼ばれる関数(引数: p5.soundFile)
 * @param {Function} loadingCallback - 音声ファイルを読み込んでいる間呼ばれる関数(引数: 0.0~1.0)
 * @param {p5Element} p5.SoundFile
 */


/**
 * p5.SoundFile.setVolume(volume)
 * 再生する音量を設定する
 * @param {Number} volume - 音量 (0.0 ~ 1.0)
 */
```


## 10.2 再生を制御する
停止や一時停止といった制御

```js
// PlayControl
var song ; // SoundFile オブジェクトを保存用変数

function preload() {
  song = loadSound('jupiter.wav'); // 音声ファイルの読み込み
}

function setup() {
  noCanvas();
  
  var pause = createButton('pause'); // 一時停止ボタン
  pause.size(50, 50);
  pause.mousePressed(() => {
    song.pause(); // 一時停止する
  });
  
  var stop = createButton('stop'); // 停止ボタン
  stop.size(50, 50);
  stop.mousePressed(() => {
    song.stop(); // 停止する
  });
  
  var play = createButton('play'); // 再生ボタン
  play.size(50, 50);
  play.mousePressed(() => {
    song.play(); // 再生する
  });
  
  song.setVolume(0.5);
}

function draw() {
  
}
```


```js
/**
 * p5.SoundFile.play([startTime], [rate], [amp], [cueStart], [duration])
 * @param {} startTime - play 関数を呼び出して何秒後に再生を開始するか
 * @param {} rate - 再生速度 (1.0 で元の速度)
 * @param {} amp -再生の音量 (0で無音, 1.0が最大音量)
 * @param {} cueStart - 音声の何秒目から再生するか (0で先頭から再生)
 * @param {} duration - 何秒間再生するか
 */
```

再生中に `play()` すると既に再生されている音に重ねて、さらに同じ音声が最初から再生されます 
以下の方法で回避できます。

```js
play.mousePressed(() => {
  if (! song.isPlaying() ) {
    song.play();
  }
})
```

## 10.3 マイクを使う

1. マイクからのデータを管理する変数 `mic` を用意する
2. マイクからの音声データを取り込む `p5.AudioIn` オブジェクトを生成し、(1) の変数に代入する
3. `mic.start()` でマイクからの入力を開始する

```js
// MicInput
// マイクから入力した音量によってバーの長さを変えるレベルメータ
var mic ; // マイクからのデータを管理する変数

function setup() {
  createCanvas(300, 100);

  mic = new p5.AudioIn(); // マイク入力のオブジェクトを変数に代入
  mic.start(); // マイクの入力の開始
}

function draw() {
  background(240);
  fill(0, 200, 200);
  noStroke();
  var vol = mic.getLevel();
  var v = map(vol, 0, 1, 0, width);
  rect(0, 0, v, 100);
}
```

```js
/**
 * map(value, start1, stop1, start2, stop2)
 * start1 から stop1 の範囲の value を start2 から stop2 の範囲に対応する値をに変換する
 * @param {} value - 現在の値
 * @param {} start1, stop1 - 現在の値の下限、上限
 * @param {} start2, stop2 - 変換後の範囲の下限、上限
 * @return {} 変換された値
 */


/**
 * p5.AudioIn()
 * マイクなどのオーディオ入力デバイスからの入力を取得する。使う時には new でインスタンス化。
 * @return マイクからの入力を扱うオブジェクト
 */
```


## 10.4 マイクからの音声を録音、再生する

- マイク入力用の `AudioIn` オブジェクト
- 録音用の `p5.SoundRecorder` オブジェクト 
- 保存用の `p5.SoundFile` オブジェクト

```js

// Record
// 1. rec  : クリックして録音を開始する
// 2. stop : クリックして録音を停止し、保存するファイルの名前を入力する
// 3. play : クリックし、録音した音声を再生する

var mic, recorder, soundFile; // マイク、録音、ファイルオブジェクトの管理変数
var recording = false; // 録音中かどうかを管理する変数

function setup() {
  var cvs = createCanvas(300, 25);
  cvs.position(5, 30);
  
  var stop = createButton('stop'); // 停止ボタン
  stop.mousePressed(() => {
    if (recording) { // 録音中
      recorder.stop();
      saveSound(soundFile, 'mySound.wav'); // ファイルへの保存
      recording = false;
    } else { // 録音していない
      soundFile.stop();
    }
  });
  
  var play = createCanvas('play'); // 再生ボタン
  play.mousePressed(() => {
    soundFile.play();
  });
  
  var pause = createButton('rec');
  pause.mousePressed(() => {
    if (mic.enabled) { // マイクが有効の場合
      recorder.record(soundFile); // 録音開始
      recording = true;
    }
  });
  
  // マイクの準備
  mic = new p5.AudioIn();
  mic.start();
  
  // 録音の準備
  recorder = new p5.SoundRecorder();
  recorder.setInput(mic);
  
  // ファイル保存の準備
  soundFile = new p5.SoundFile();
}
```

```js
/**
 * p5.SoundRecorder()
 * 音声を録音する
 * @return {} 音声の録音を扱うオブジェクト
 *
 * - `p5.SoundRecorder().setInput([unit])` - 録音するサウンドオブジェクトを指定する
 * - `p5.SoundRecorder().record(soundFile, [duration], [callback])` - 録音を開始する
 * - `p5.SoundRecorder().stop()` - 録音を停止します
 */
```

```js
/**
 * saveSound(soundFile, name)
 * 録音した音声ファイルを保存する
 * @param {} soundFile - record 関数で指定した soundFile オブジェクト
 * @param {} name - 保存するファイルの名前
 */
```

## 10.5 サウンドを解析する

### 10.5.1 フーリエ変換とは
フーリエ変換とは、音声のように時間で変化する信号を周波数での変化に変換するものです。
フーリエ変換を行うと、元の信号に含まれている任意の周波数を取り出すことができるようになります。

もともとのフーリエ変換は計算にかなり時間がかかるので、高速化に計算できるように工夫した __高速フーリエ変換__
(Fast Fourier Transform, __FFT__ ) があります。

### 10.5.2 音の波形を表示する

```js
// ShowWaveFromMic
// 1. FFT オブジェクトを保存する変数を用意する
// 2. FFT オブジェクトを生成して上の変数に保存する
// 3. FFT オブジェクトの入力に解析したい p5.Sound オブジェクトを設定する
// 4. FFT オブジェクトから波形を取り出す

var ftt; // FFT オブジェクトを保存する変数

function setup() {
  createCanvas(512, 256);
  noFill();
  
  var mic = new p5.AudioIn();
  mic.start(); // マイク入力をスタートする
  
  fft = new p5.FFT(); // FFT オブジェクトを変数に保存する
  fft.setInput(mic); // FFT の入力をマイクにする
}


function draw() {
  var waveform = fft.waveform(); // FFT オブジェクトから波形データを取り出す
  
  // 取り出した波形データを描画する
  background(230);

  beginShape();
  for (var i = 0; i < waveform.length; i++) {
    var x = map(i, 0, waveform.length, 0, width);
    var y = map(waveform[i], -1.0, 1.0, height, 0);
    vertex(x, y);
  }
  endShape();
}
```

波形表示は、マイクからだけでなくファイルから読み込んだ音声に対しても行えます。

```js
// ShowWaveFromFile
var song; // サウンドデータを管理する
var fft; // FFT オブジェクトを保存する変数

function preload() {
  song = loadSound('//www.cutt.jp/books/978-4-87783-381-7/chap10/ShowWaveFromFile/jupiter.wav');
}

function setup() {
  createCanvas(512, 256);
  noFill();
  
  fft = new p5.FFT(); // FFTオブジェクトを変数に保存
  fft.setInput(song); // FFTの入力をファイルにする
  
  song.play(); // 再生開始
}

function draw() {
  var waveform = fft.waveform();
  
  background(230);
  
  beginShape();
  for (var i = 0; i < waveform.length; i++) {
    var x = map(i, 0, waveform.length,  0, width);
    var y = map(waveform[i], -1.0, 1.0, height, 0);
    vertex(x, y);
  }
  endShape();
}
```

### 10.5.3 周波数成分を表示する

`p5.sound` の FFT では人間に聞こえる範囲の音、だいたい20Hzから22KHz の間の周波数を解析してくれます。


```js
// ShowSpectrum
var fft; // FFTオブジェクト

function setup() {
  createCanvas(512, 256);
  noFill();
  
  var mic = new p5.AudioIn();
  
  fft = new p5.FFT(0.8, 32); // FFT オブジェクトを変数に保存
  fft.setInput(mic); // FFTの入力をマイクにする
  
  mic.start();
}

function draw() {
  var  spectrum = fft.analyze(); // FFT オブジェクトから周波数成分を取り出す
  
  // 取り出した波形データを描画する
  background(230);
  for (var i = 0; i < spectrum.length; i++) {
    var x = map(i, 0, spectrum.length, 0, width);
    var h = map(spectrum[i], 0, 255, 0, height);
    rect(x, height, width / spectrum.length, -h);
  }
}
```

```js
/**
 * p5.FFT([smoothing], [bins])
 * 音声の高速フーリエを行う。使うときは new でインスタンス化して使う
 * @param {Number} - smoothing - 周波数成分のスムーズさ。0.0 < smoothing < 1.0 (d: 0.8)
 * @param {Number} - bins 周波数範囲の分割数。16 ~ 1024 の間の "2のべき乗" でなければならない
 */


/**
 * p5.FFT.setInput([source])
 * 解析するサウンドオブジェクトを指定する
 */


/**
 * p5.FFT.waveform([bins], [precision])
 * 波形データを格納した配列を返す
 * [-1.0 ~ 1.0]
 */


/**
 * p5.FFT.analyze([bins], [scale])
 * 周波数成分のデータを格納した配列を返す
 * [0 ~ 255]
 */


/**
 * p5.FFT.getEnergy(frequency1, frequency2)
 * 引数 frequency1 で指定した周波数でのエネルギー(音量)を返す
 * frequency2 を指定した場合は、その周波数範囲のエネルギーを返す
 * frequency1 に "base|lowMid|mid|highMid|treble" の文字列を指定した場合は、
 * プリセットされた範囲のエネルギーを返す
 * この関数を使う場合は、事前に analyze() を実行しておく必要がある
 */


/**
 * p5.FFT.smooth(smoothing)
 * 引数 smoothing で FFT での解析結果のスムーズさを指定する
 * [0.0 ~ 1.0] (デフォルト: 0.8)
 */
```


## 10.6 フィルタを使う

特定の周波数だけを取り出したい場合があります。

- ローパス (Low Pass) - 指定した周波数より低い周波数成分のみを通過させます
- ハイパス (High Pass) - 指定した周波数より高い周波数成分のみを通過させます
- バンドパス (Band Pass) - 指定した2つの周波数の間の周波数成分のみを通過させます


### 10.6.1 ローパスフィルタ
通過させる周波数の上限のことを __カットオフ周波数__ と呼びます。
レゾナンスとは、カットオフ周波数付近を少し持ち上げて強調する機能で、「ミョーン」のような
シンセサイザーらしい効果を出すものです。

```js
// FilterLowPass
var filter; // フィルタオブジェクトの管理変数
var song;
var fft; // FFTオブジェクトを保存する変数

function preload() {
  song = loadSound('jupiter.wav'); 
}

function setup() {
  createCanvas(512, 320);
  fill(200, 200, 255);
  
  filter = new p5.LowPass(); // ローパスフィルタオブジェクトの作成
  
  song.disconnect();
  song.connect(filter); 
  
  fft = new p5.FFT(0.8, 64);
  
  filter.connect(fft);
  
  song.loop(); // 音楽をループ再生
}

function draw() {
  // マウスのx座標によってカットオフ周波数を変化させる
  var freq = map(mouseX, 0, width, 10, 22050);
  filter.freq(freq);
  
  // マウスのy座標によってレゾナンスを変化させる
  var res = map(mouseY, 0, height, 20, 0.1);
  filter.res(res);
  
  // 周波数を描画する
  var spectrum = fft.analyze();
  background(230);
  
  for (var i = 0; i < spectrum.length; i++) {
    var x = map(i, 0, spectrum.length, 0, width);
    var h = map(spectrum[i], 0, 255, 0, height);
    rect(x, height, width / spectrum.length, -h);
  }
}
```

### 10.6.2 バンドパスフィルタ

```js
filter = new p5.BandPass(); // バンドパスフィルタオブジェクトの作成
```

```js
var res = map(mouseY, 0, height, 0, 10);
```

バンドパスフィルタでは、`freq()` `res()` の意味がローパスフィルタとは違います。
バンドパスフィルタの `freq()` は通過させる周波数帯域の中心周波数を設定し、`res()` は
通過させる周波数帯域の幅を設定します (数字が大きくなるほど幅が狭くなります)。 

```js
/**
 * p5.Filter(type)
 * フィルタオブジェクトを生成する
 * フィルタを簡単に作るためのシュガー構文が用意されています
 * @param {} フィルタの種類 "lowpass | highpass | bandpass"
 */

/**
 * p5.LowPass()
 * ローパスフィルタオブジェクトを生成します
 * p5.Filter('lowapss') または setType('lowpass') に相当します
 * @return p5.Filter オブジェクト
 */

/**
 * p5.HighPass()
 * ハイパスフィルタオブジェクトを生成します
 * p5.Filter('highpass') または setType('highpass') に相当します
 * @return p5.Filter オブジェクト
 */

/**
 * p5.BandPass()
 * バンドパスフィルタオブジェクトを生成します
 * p5.Filter('bandpass') または setType('bandpass') に相当します
 * @return p5.Filter オブジェクト
 */

/**
 * p5.Filter.process(Signal, freq, res)
 * 引数 Signal でフィルタをかけるサウンドオブジェクトを指定し、freq と res でそれぞれ
 * 周波数、レゾナンスを指定して処理します
 */

/**
 * p5.Filter.set(freq, res, [timeFromNow])
 * freq と res でそれぞれフィルタの周波数とレゾナンスを設定します
 * 引数 timeFromNow で何秒後にこの設定が有効になるかを指定できます
 */


/**
 * p5.Filter.freq(freq, [timeFromNow])
 * freq でフィルタの周波数を設定します。
 * [10Hz ~ 22050Hz]
 * timeFromNow で何秒後にこの設定が有効になるかを指定できます
 */


/**
 * p5.Filter.res(res, [timeFromNow])
 * res で、Lowpass/Highpass のときはレゾナンス Bandpass のときは通過帯域を幅を指定します
 * timeFromNow で何秒後にこの設定が有効になるか設定できます
 */


/**
 * p5.Filter.setType(type)
 * type でフィルタの種類をしてします
 * ["lowpass" | "highpass" | "bandpass" | "lowshelf" | "highshelf" | notch" | "allpass"]
 */


/**
 * p5.Filter.amp(volume, [rampTime], [timeFromNow])
 * volume で出力の音量を指定します
 * rampTime でフェードの時間を指定できます
 * timeFromNow は同上
 */


/**
 * p5.Filter.connect(unit)
 * unit で、フィルタの出力先のサウンドオブジェクトか web Audio オブジェクトを指定します
 */


/**
 * p5.Filter.disconnect()
 * フィルタの出力先になっているオブジェクトをすべて切り離す
 */
```


## 10.7 音を発生させる
