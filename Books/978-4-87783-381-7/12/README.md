# 音声合成、認識

- 音声合成 - 文字列を音声で読み上げたりなど
- 音声認識 - マイクから入力された音声を認識し文字列に変換したりなど

`p5.speech.js` が必要です


## 12.1 準備

- [p5.speech](http://ability.nyu.edu/p5.js-speech/)


```html
<script src="path/to/p5.speech.js"></script>
```

## 12.2 文字列を読み上げる

```js
// Speak
function setup() {
  var speech = new p5.Speech(); // 音声合成用のオブジェクト
  speech.speak('hi there');
}

function draw() {
  
}
```

```js
/**
 * p5.Speech([voice])
 * 音声合成用のオブジェクトを作成する
 * @param {String|Number} voice - 音声を表す名前か番号を指定する
 * @param {p5.Speech} 発話を管理するオブジェクト
 */
```

## 12.3 日本語で発話する

```js
function setup() {
  var speech = new p5.Speech(); // 音声合成用のオブジェクト
  speech.utterance.lang = 'ja-JP'; // 日本語に切り替える
  speech.speak('こんにちは');
}

function draw() {
  
}
```

__言語を表すタグ__

- `en-US` - 英語(アメリカ)
- `en-GB` - 英語(イギリス)
- `en-ES` - スペイン語
- `fr-FR` - フランス語
- `it-IT` - イタリア語
- `de-DE` - ドイツ語
- `ko-KR` - 韓国語
- `kh-CN` - 中国語
- `ja-JP` - 日本語


## 12.4 音量を変える

```js
/**
 * p5.Speech.setVolume(volume)
 * @param {Number} volume [0.0~1.0]
 */
```

```js
var speech = new p5.Speech();
speech.setVolume(0);
speech.speak('I\'m sorry Dave, I\'m afraid I can\'t do that.');
```

```js
// SpeechVolume

var speech; // 音声合成用のオブジェクトを作成
var slider; // 音量変更用のスライダー

function setup() {
  noCanvas(); // 描画領域を作成しない
  speech = new p5.Speech();
  speech.utterance.lang = 'ja-JP'; 
  slider = createSlider(0,0, 1.0, 1.0);
  slider.mouseReleased(setVolume);
}

function draw() {
  
}

function setVolume() {
  speech.setVolume(slider.value());
  speech.speak('国境の長いトンネルを抜けると雪国であった。夜の底が白くなった。');
}
```

__`p5.speech` オブジェクトの提供する関数__

- `cancel()` - 現在の発話をキャンセルし、バッファに溜まっている発話をクリアする
- `listVoices()` - サポートされている音声のリストをコンソールに表示する
- `pause()` - 発話を一時停止。`onPause` プロパティに設定した関数が実行される
- `resume()` - 発話を再開。`onResume` プロパティに設定した関数が実行される
- `setPicth(picth)` - ピッチを指定。[0.01~2.0]
- `setRate(rate)` - 再生速度を指定。[0.1~0.2]
- `speak(text)` - text で指定された文字列を発話。開始に `onStart` 終了後に `onEnd` プロパティに設定した関数が実行される
- `stop()` - 現在の発話を停止する `onEnd` プロパティに設定した関数が実行される


## 12.5 指定した音声で読み上げる

### 12.5.1 ブラウザがサポートする音声を調べる

```js
// listVoices
var speech;

function setup() {
  speech = p5.Speech();
  speech.onLoad = loaded; // 音声が読み込まれたら loaded を実行
}

function loaded() {
  speech.listVoices(); // 音声のリストを表示する * > console
}
```

__p5.Speechオブジェクトに設定できる関数用のプロパティ__

- `onEnd` - 発話が終了したとき
- `onLoad` - 音声合成用のデータが読み込み終わっととき
- `onPause` - 発話が一時停止されたとき
- `onResume` - 発話が再開されたとき
- `onStart` - 音声合成が開始されたとき


### 12.5.2 音声を設定する

```js
// SpeakItarian
function setup() {
  var speech = new p5.Speech();
  speech.onload = loaded;
}

function draw() {
  
}

function loaded() {
  speech.setVoice('Google Italiano'); // イタリアの音声に変更
  speech.speak('I\'m sorry Dave. I\'m afraid I\' can\'t do that.');
}
```

```js
// SpeakRandom
var speech; // 音声合成用のオブジェクト

function setup() {
  noCanvas();
  speech = new p5.Speech();
  var button = createButton('ランダムに発話');
  button.mousePressed(speak);
}

function speak() {
  speech.setVoice(Math.floor(random(speech.voices.length))); // ランダムに音声を選ぶ
  speech.speak('I\'m sorry Dave. I\'m afraid I\' can\'t do that.');
}
```


## 12.6 長い文章を読ませる

- 現在の実装では、文字数制限がある
- 長い文章は分解して、1つの発話が終わったら、次の文を発話する


```js
// Speaklong
var speech;
var text = '';
var sentences = text.split('。'); // 文に分ける
var i = 0;

function setup() {
  speech = new p5.Speech();
  speech.utterance.lang = 'ja-JP';
  if (sentences.length >= 2) {
    speech.onEnd = next;
  }
  speech.speak(sentences[i]);
}

function draw() {
  
}

function next() {
  i++;
  speech.speak(sentences[i]);
  if (i === sentences.length - 1) { // 全部の文の発話が終了
    speech.onEnd = undefined; // next が実行されないように
  }
}
```

## 12.7 音声を認識する

```js
// SpeechRec
var rec; // 音声認識用の -5.SpeechRec オブジェクトを管理する変数

function setup() {
  rec = new p5.SpeechRec(); // 音声認識用のオブジェクトを作成
  rec.onResult = showResult; // 認識されたら showResult が実行される
  rec.start(); // 認識開始
}

function draw() {
  
}

function showResult() { // 認識されたら実行される
  alert(rec.resultString); // 認識結果を表示
}
```

```js
/**
 * p5.SpeechRec([lang])
 * 音声認識用のオブジェクトを作成する
 * @param {} lang - 音声認識に使用する言語を指定する
 * @return {} p5.Speech オブジェクト
 */

/**
 * p5.SpeechRec.start()
 * 音声認識を開始する
 */
```

__p5.SpeechRecオブジェクトのプロパティ__

- `continuous` - 連続して認識を行うかどうか
- `interimResults` - 途中の認識結果を返すかどうか
- `onEnd` - 認識終了後に実行される関数
- `onError` - エラーが発生したときに実行される関数
- `onResult` - 認識結果が得られたときに実行される関数
- `onStart` - 認識がはじまったときに実行される関数
- `resultConfidence` - 認識結果の信頼度 [0.0~1.0]
- `resultString` - もっとも最近認識された発話を含む文字列


## 12.8 連続して音声を認識する

連続して音声認識させるには、`continuous` プロパティを `true` にするだけです。

```js
// ContRec
var rec;

function setup() {
  rec = new p5.SpeechRec();
  rec.continuous = true;
  rec.onResult = showResult;
  rec.start();
}

function draw() {
  
}

function showResult() {
  print(rec.resultString);
}
```



```js
// MoveBySpeech
// 上下右左のいずれかを発話することでその方向に移動します

var rec;
var x, y;
var dx = 0, dy = 0;

function setup() {
  createCanvas(640, 480);
  rec = new p5.SpeechRec();
  x = width / 2;
  y = height / 2;
  rec.continuous = true;
  rec.interimResults = true;
  rec.onResult = parse;
  rec.start();
}

function draw() {
  ellipse(x, y, 20, 20); // 丸を描画する
  x += dx;
  y += dy;
  
  // 描画領域の端を超えた場合の処理
  if (x < 0) {
    x = width;
  } else if (x > width) {
    x = 0;
  }
  
  if (y < 0) {
    y = height;
  } else if (y > height) {
    y = 0;
  }
}

function parse() {
  var word = rec.resultString.split(' ').pop();
  if (wrod.indexOf('左') !== -1) {
    dx = -1;
    dy = 0;
  } else if (word.indexOf('右') !== -1) {
    dx = 1;
    dy = 0;
  } else if (word.indexOf('上') !== -1) {
    dx = 0;
    dy = -1;
  } else if (word.indexOf('下') !== -1) {
    dx = 0;
    dy = 1;
  } else if (wrod.indexOf('止まれ') !== -1) {
    dx = 0;
    dy = 0;
  }
}
```

## 12.9 まとめ

