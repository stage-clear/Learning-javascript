# マウスとキーボードを扱う

## 4.1 マウス操作を扱う

```js
// ClickedText
function setup() {
  createCanvas(250, 150);
}

function draw() {
  
}

function mouseClicked() {
  text('Hello', mouseX, mouseY);
}
```

### 4.1.1 システム関数とシステム変数

__マウス関連のシステム関数__

- `mouseMoved()` - マウスボタンを押さずにマウスを動かしている間
- `mouseDragged()` - マウスボタンを押しながら動かしている間
- `mousePressed()` - マウスボタンを押したとき
- `mouseReleased()` - マウスボタンを離したとき
- `mouseClicked()` - マウスボタンをクリックしたとき
- `mouseWheel(event)` - マウスホイールやタッチパッドが操作されたとき


__マウス関連のシステム変数__

- `mouseX` - 描画領域の `(0, 0)` から相対のマウスポインタの x座標
- `mouseY` - 描画領域の `(0, 0)` から相対のマウスポインタの y座標
- `pmouseX` - 直前(1フレーム前)のマウスポインタの x座標
- `pmouseY` - 直前(1フレーム前)のマウスポインタの y座標
- `winMouseX` - ウィンドウの `(0, 0)` から相対のマウスポインタの x座標
- `winMouseY` - ウィンドウの `(0, 0)` から相対のマウスポインタの y座標
- `pwinMouseX` - 直前(1フレーム前)の winMouseX
- `pwinMouseY` - 直前(1フレーム前)の winMouseY
- `mouseButton` - 押されたり離されたりしたボタン `LEFT | RIGHT | CENTER`
- `mouseIsPressed` - マウスボタンが押されているかどうか


### 4.1.2 マウスドラッグで円を描画する

```js
// mouseDragged
function setup() {
  createCanvas(320, 240);
  fill(0); // 黒くぬりつぶす
}

function draw() {
  
}

function mouseDragged() {
  ellipse(mouseX, mouseY, 20, 20);  // マウスの位置に円を描画する
}
```

### 4.1.3 線がつながるように描画する

```js
// MouseDraw
function setup() {
  createCanvas(320, 240);
  stroke(0); // 黒くぬりつぶす
  strokeWeight(20);
}

function draw() {
  
}

function mouseDragged() {
  line(mouseX, mouseY, pmouseX, pmouseY);
  // pmouseX と pmouseY を使って直前の点と繋げる
}
```

### 4.1.4 マウスホイールで円を上下させる

```js
// mouseWheel
var x = 160;
var y = 120;

function setup() {
  createCanvas(320, 240);
  fill(0);
  ellipse(x, y, 20, 20); // 黒丸を描画する
}

function draw() {
  
}

function mouseWheel(event) {
  y += event.delta; // 丸の位置を変更する
  ellipse(x, y, 20, 20); // 丸を描画する
}
```

### 4.1.5 winMouseX, winMouseY 変数

```js
// winMouseXY
function setup() {
  background(200);
}

function draw() {
  
}

function mouseClicked() {
  background(200);
  point(mouseX, mouseY); // クリックされた場所に点を描画
  text(mouseX + ', ' + mouseY, 10, 50);
  text(winMouseX + ', ' + winMouseY, 10, 70);
}
```


### 4.1.6 マウスカーソルを変更する

```js
// MouseCursor
function setup() {
  background(200);
}

function draw() {
  if (mouseX < width / 2) {
    cursor(MOVE);
  } else {
    cursor(HAND);
  }
}
```

```js
/**
 * cursor(type, [x], [y])
 * カーソルの形をあらかじめ用意されているものに設定する
 * @param {} ARROW | CROS | HAND | MOVE | TEXT | WAIT
 * @param {} x, y
 */
```

## 4.2 キー操作を扱う

### 4.2.1 システム関数とシステム変数

__システム関数__

- `keyPressed()` - キーを押したとき。大文字、小文字は区別されない。
- `keyReleased()` - キーを離したとき。大文字、小文字は区別されない。
- `keyTyped()` - キーをおしたとき。大文字、小文字は区別され、Ctrl、Shift、Alt などは無視される
- `keyIsDown(code)` - 引数(code)で指定されたキーが現在押されているかをチェックする


__システム変数__

- `keyIsPressed` - キーが押されている場合に true、そうでない場合に false
- `key` - 押されたキー
- `keyCode` - 押されたキーのキーコード


### 4.2.2 入力したキーを表示する

```js
// keyTyped
var x = 0;
var y = 50;

function setup() {
  createCanvas(320, 100);
}

function keyTyped() {
  text(key, x, y); // キーを描画する
  x += textWidth(key); // 描画位置を変更する
}
```

### 4.2.3 矢印キーを使用する

```js
// keyPressed
var x = 160;
var y = 120;

function setup() {
  createCanvas(320, 240);
  fill(0);
  ellipse(x, y, 20, 20);
}

function draw() {
  
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    y -= 1;
  } else if (keyCode === DOWN_ARROW) {
    y += 1;
  } else if (keyCode === LEFT_ARROW) {
    x -= 1;
  } else if (keyCode === RIGHT_ARROW) {
    x += 1;
  }
  ellipse(x, y, 20, 20);
}
```

## 4.3 まとめ



