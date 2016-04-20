# 画像を扱う

## 7.1 画像ファイルを読み込んで表示する

- `createImg()`
- `loadImage()`

### 7.1.1 createImg 関数を用いる

```js
function setup() {
  noCanvas();
  createImg('https://cdn2.iconfinder.com/data/icons/despicable-me-2-minions/128/despicable-me-2-Minion-icon-7.png');
}

function draw() {
  
}
```

### 7.1.2 画像をアニメーションで動かす

```js
// CreateMovingImg
var img;  // 読み込んだ画像
var x = 0, y = 0; // 画像の描画位置

function setup() {
  noCanvas();
  img = createImg('https://cdn2.iconfinder.com/data/icons/despicable-me-2-minions/128/despicable-me-2-Minion-icon-7.png');
}

function draw() {
  x++; y++; // 画像の表示位置を変える
  img.position(x, y);
}
```

読み込んだ画像を描画領域(canvas)に表示します

```js
// CreateImgCanvas
var img ; // 読み込んだ画像を管理する変数

function setup() {
  createCanvas(640, 320); // 描画領域を作成
  img = createImg('https://cdn2.iconfinder.com/data/icons/despicable-me-2-minions/128/despicable-me-2-Minion-icon-7.png'); // 画像の読み込み
  img.hide();
}

// createImg 直後では、読み込みが完了していないこともあるため、
// draw 関数内で描画領域に表示します
function draw() {
  image(img, 0, 0); // 画像の表示
}
```

```js
/**
 * image(img, x, y)
 * img に読み込んだ画像を (x, y) を左上の座標として表示する
 * @param {p5ImageElement} 
 * @param {Number} x, y
 */
image()
```


### 7.1.3 loadImage 関数を用いる方法

`createImg()` が画像の表示まで行うのに対し、 `loadImage()` は画像の読み込みのみで表示は行いません

1. 読み込んだ画像を管理する変数 `img` を用意する
2. `loadImage()` を使って画像を読み込み、`img` 変数に格納する
3. `image()` で画像を表示する


```js
// showImage
var img ; // 1. 管理する変数

function preload() {
  img = loadImage('https://cdn2.iconfinder.com/data/icons/despicable-me-2-minions/128/despicable-me-2-Minion-icon-7.png'); // 2. 画像の読み込み
}

function setup() {
  createCanvas(img.width, img.height); // 画像と同じサイズの描画領域を用意する
  image(img, 0, 0);
}

function draw() {
  
}
```

```js
/**
 * preload()
 * setup() の前に実行され、ファイルの読み込み処理に用いられる
 * setup() は preload() の実行が終わってから実行されます
 */
function preload() {
  // load some images.
}
```

```js
/**
 * loadImage(path, [callback], [errorback])
 * @param {String} path - 画像のパス
 * @param {Function} callback
 * @param {Function} errorback
 * @return {p5ImageElement}
 * p5ImageElement {
 *  pixels : []
 *  width  : ,
 *  height : ,
 * }
 */
```

### 7.1.4 画像をアニメーションで動かす

```js
// MovingImage
var img;
var x = 0, y = 0; // 画像の描画位置

function preload() {
  img = loadImage('https://cdn2.iconfinder.com/data/icons/despicable-me-2-minions/128/despicable-me-2-Minion-icon-7.png');
}

function setup() {
  createCanvas(img.width * 2, img.height * 2);
}

function draw() {
  background(255); // 描画領域をクリアする
  image(img, x, y); // 画像を表示する
  x++; y++; // 画像の表示位置を変更する
}
```


### 7.1.5 画像にフィルタをかけてみる

- `GRAY` - グレースケール化
- `BLUR` - 平滑化
- `DILATE` - 膨張
- `ERODE` - 収縮
- `POSTERIZE` - 階調変換

```js
// FilterImage
var img; // 画像を管理する変数
var copy; // img をコピーした画像

function preload() {
  img = loadImage('https://cdn2.iconfinder.com/data/icons/despicable-me-2-minions/128/despicable-me-2-Minion-icon-7.png');
}

function setup() {
  createCanvas(img.width, img.height);
  copy = img.get(); // 元の画像を壊さないようにコピーする
}

function draw() {
  background(255);
  image(copy, 0, 0); // 画像を表示
}

function keyTyped() {
  copy = img.get(); // 元の画像をコピーする
  
  if (key === 'i') {
    copy.filter(INVERT); // 色の反転
  } else if (key === 't') {
    copy.filter(THRESHOLD, 0.5); // 2値化
  } else if (key === 'g') {
    copy.filter(GRAY); // グレースケール化
  } else if (key === 'b') {
    copy.filter(BLUR, 3); // 平滑化
  } else if (key === 'd') {
    copy.filter(DILATE); // 膨張
  } else if (key === 'e') {
    copy.filter(ERODE);  // 収縮
  } else if (key === 'p') {
    copy.filter(POSTERIZE, 3); // 階調変換
  }
}
```


## 7.2 ピクセルって何?

### 7.2.1 画像は何からできているか?

- pixel - picuter element の略

### 7.2.2 ピクセルの色を調べる

### 7.2.3 コンピュータで色はどのように表現するか?


## 7.3 ピクセルを取り出し、色を調べる

```js
// ShowPixel
var img; // 読み込んだ画像を管理する変数

function preload() {
  img = loadImage('https://cdn3.iconfinder.com/data/iconsets/previews/medium-2x/easter-curvy.png');
}

function setup() {
  createCanvas(img.width, img.height);
  image(img, 0, 0);
  
  // ピクセルのRGB値を表示
  var c = img.get(0, 0); // ピクセル値を取り出す
  print(c[0]); // Rの値を表示
  print(c[1]); // Gの値を表示
  print(c[2]); // Bの値を表示
}

function draw() {
  
}
```

```js
/**
 * p5.Image.get(x, y)
 * 読み込んだ画像の x, y の場所にあるピクセルを取り出す
 * @param {Number} x, y
 * @return {Array} [R, G, B]
 */
```

### 7.3.1 クリックした場所のピクセル値を表示する

```js
// ClickedPixel
var img; // 読み込んだ画像を管理する変数

function preload() {
  img = loadImage('https://cdn2.iconfinder.com/data/iconsets/previews/medium-2x/circle-icons-1.png');
}

function setup() {
  createCanvas(img.width, img.height);
  image(img, 0, 0);
}

function draw() {
  
}

function mouseClicked() {
  var c = img.get(mouseX, mouseY); // ピクセル値を取り出す
  console.log(red(c), green(c), blue(c));
}
```

## 7.4 ピクセルの色を変えて描画する

```js
/**
 * p5.Image.set(x, y, color)
 * 読み込んだ画像の x, y の場所にあるピクセルの値を変更する
 * @param {Number} x, y
 * @param {} color - color() で指定した色
 */
```

サンプル

```js
// OverridePixel.js
var img; // 読み込んだ画像を管理する変数

function preload() {
  img = loadImage('https://cdn2.iconfinder.com/data/iconsets/previews/medium-2x/circle-icons-1.png');
}

function setup() {
  createCanvas(img.width, img.height);
  
  var c = color(0, 0, 255);
  for (var y = 0; y < 10; y++) {
    for (var x = 0; x < img.width; x++) {
      img.set(x, y, c); // 色を変更
    }
  }
  img.updatePixels();  // 変更したピクセル値を描画に反映
  image(img, 0, 0);
}

function draw() {
  
}
```

```js
/**
 * p5.Image.updatePixels()
 * 内部バッファ (p5.Image の pixels 配列) の内容で表示用のバッファを更新する
 */
```

## 7.5 ピクセルの色に応じて色を変える

```js
var img; // 読み込んだ画像を管理する変数

function preload() {
  img = loadImage('https://cdn2.iconfinder.com/data/iconsets/previews/medium-2x/circle-icons-1.png');
}

// ModifiedPixels
function setup() {
  createCanvas(img.width, img.height);
  
  for (var y = 0; y < 10; y++) {
    for (var x = 0; x < img.width; x++) {
      var c = img.get(x, y); // コピー済みの要素でないと動かない??
      if (red(c) === 255 && green(c) === 0 && blue(c) === 0) {
        img.set(x, y, color(0, 255, 0));
      } else {
        img.set(x, y, color(0, 0, 255));
      }
    }
  }
  
  img.updatePixels();
  image(img, 0, 0);
}
```


## 7.6 画像の色を反転する

```js
// InvertPixels
var img; // 読み込んだ画像を管理する変数

function preload() {
  img = loadImage('https://cdn2.iconfinder.com/data/icons/despicable-me-2-minions/128/despicable-me-2-Minion-icon-7.png');
}

function setup() {
  createCanvas(img.width, img.height);
  
  var copy = img.get(); // <-
  
  for (var y = 0; y < 20; y++) {
    for (var x = 0; x < img.width; x++) {
      var c = copy.get(x, y);
      var r = 255 - red(c);
      var g = 255 - green(c);
      var b = 255 - blue(c);

      img.set(x, y, color(r,g,b));
    }
  }
  
  img.updatePixels();
  image(img, 0, 0);
}

function draw() {
  
}
```

### 7.6.1 画像全体の色を反転する

```js
// InvertAll
var img; // 読み込んだ画像を管理する変数

function preload() {
  img = loadImage('https://cdn2.iconfinder.com/data/icons/despicable-me-2-minions/128/despicable-me-2-Minion-icon-7.png');
}

function setup() {
  createCanvas(img.width, img.height);
  
  var copy = img.get();
  
  for (var y = 0; y < img.height; y++) {
    for (var x = 0; x < img.width; x++) {
      var r = 255.0 - red(copy.get(x, y));
      var g = 255.0 - green(copy.get(x, y));
      var b = 255.0 - blue(copy.get(x, y));
      
      img.set(x, y, color(r, g, b));
    }
  }
  img.updatePixels();
  image(img, 0, 0);
}
```

### 7.6.2 ピクセルの値を直接操作する

```js
// InvertPixelArray
var img; // 読み込んだ画像を管理する変数

function preload() {
  img = loadImage('https://cdn2.iconfinder.com/data/icons/despicable-me-2-minions/128/despicable-me-2-Minion-icon-7.png');
}

function setup() {
  createCanvas(img.width, img.height);
  
  img.loadPixels(); // 画像のピクセル値を pixels 配列に読み込む
  var pixels = img.pixels;

  for (var y = 0; y < img.height; y++) {
    for (var x = 0; x < img.width; x++) {
      var i = (x + y * img.width) * 4; // 配列の添字を計算する
      pixels[i + 0] = 255 - pixels[i + 0];
      pixels[i + 1] = 255 - pixels[i + 1];
      pixels[i + 2] = 255 - pixels[i + 2];
    }
  }
  
  img.updatePixels();
  image(img, 0, 0);
}

function draw() {
  
}
```

```js
/**
 * p5.Image.loadPixels()
 * 読み込んだ画像のピクセルの値を pixels 配列に設定する
 * 
 */
```


### 7.7 まとめ

