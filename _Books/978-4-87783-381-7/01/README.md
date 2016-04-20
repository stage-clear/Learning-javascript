# p5.js って何

- [p5.js で作成されたWebページ](http://otoro.net/planks/)


## 1.1 p5.js と Processing


## 1.2 p5.js の提供する機能

- 2次元図形の病が
- テキスト表示や入力
- ボタンやスライダー、ファイル選択ボタンなどのUI部品の表示
- 画像の表示、動画再生やWebカメラからの画像や音声の取り込み
- 音などの入力、再生、加工
- 音声合成、音声認識、2Dゲーム作成機能、Aruduino との連携


## 1.3 サンプルプログラムを実行する

- [p5.js Examples](https://p5js.org/examples/)


## 1.4 プログラムの開発方法


## 1.5 p5.js エディタを用いる

## 1.8 Processing を p5.js に書き換える

```processing
void setup() {
  size(320, 180);
}

void draw() {
  background(255);
  for (int x = 0; x < 20; x++) {
    rect(x, x, 10, 10);
  }
}
```

```js
function setup() {
  createCanvas(320, 320); // size() -> createCanvas()
}

function draw() {
  background(255);
  for (var x = 0; x < 20; x++) {
    rect(x, x, 10, 10);
  }
}
```