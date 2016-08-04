# 2Dゲームを作る
p5.play.js を使うと簡単に2Dゲームが作成できる

## 13.1 準備する

- [p5.play.js](http://p5play.molleindustria.org/)


```html
<script src="path/to/p5.play.js"></script>
```

## 13.2 スプライトに画像を表示させるプログラム

```js
// DrawSprites
function setup() {
  createSprite(40, 30, 50, 50); // スプライトを作成する
}

function draw() {
  background(255); // 画面をクリアする
  drawSprites(); // スプライトを表示する
}
```

```js
/**
 * createSprite(x, y, [width], [height])
 * スプライトを作成する (画像の指定がない場合は四角形が作成される)
 * @param {Number} x - x座標
 * @param {Number} y - y座標
 * @param {Number} width - スプライトの幅 (d: 100)
 * @param {Number} height - スプライトの高さ (d: 100)
 * @return {Object} スプライトオブジェクト
 */


/**
 * drawSprite()
 * 作成したスプライトを表示する関数
 */
```

### 13.2.1 スプライトに画像を設定する

```js
// DrawImageSprite
var img; // スプライトに表示させる画像

function preload() {
  img = loadImage('assets/pumpkin10.png');
}

function setup() {
  var sprite = createSprite(40, 30); // スプライトの作成
  sprite.addImage(img); // スプライトに画像を加える
}

function draw() {
  background(255);
  drawSprite();
}
```

```js
/**
 * Sprite.addImage(image)
 * 画像をスプライトに設定する
 * @param {String} image - 読み込む画像のファイル名(パス名)
 */
```


### 13.2.2 スプライトにアニメーションを表示させる

```js
// AnimatedSprite
var animation;

function preload() {
  // アニメーション画像を読み込む
  animation = loadAnimation('assets/pumpkin10.png', 'assets/pumpkin15.png');
}

function setup() {
  var sprite = createSprite(40, 30); // スプライトを作成
  sprite.addAnimation('pumpkin', animation); // スプライトにアニメーションをせっていsるう
}

function draw() {
  background(255);
  drawSprites();
}
```

```js
/**
 * Sprite.loadAnimation(images, ... images)
 * アニメーションに使われる画像を読み込む複数指定した場合は、前から順に読み込む
 * @param {String} [..images] - アニメーションに使用する画像
 * @return {Object} アニメーションを管理するオブジェクト
 */

/**
 * Sprite.addAnimation(label, animation)
 * アニメーションの画像をスプライトに追加する
 * @param {String} label - アニメーションを識別するための名前
 * @param {Object} animation - アニメーションを管理するオブジェクト (loadImage関数の戻り値など)
 */
```

### 13.2.3 スプライトを複数表示させる

```js
// TwoSprites
var animations;

function preload() {
  // アニメーションの画像を読み込む
  animation = loadAnimation('assets/pumpkin10.png', 'assets/pumpkin15.png');
}

function setup() {
  var sprite = createSprite(30, 50); // 1つ目のスプライトを作成
  sprite.addAnimation('pumpkin', animation); // スプライトにアニメーションを加える
  
  sprite = createSprite(70, 50); // 2つ目のスプライトを作成
  sprite.addAnimation('pumpkin', animation); // スプライトにアニメーションを加える
}

function draw() {
  
}
```

片方を異なるアニメーション。

```js
// TwoSprites
var anim_pump, anim_ghost; // 2つのアニメーション

function preload() {
  // アニメーションを読み込む
  anim_pump = loadAnimation('assets/pumpkin10.png', 'assets/pumpkin15.png');
  anim_ghost = loadAnimation('assets/ghost10.png', 'assets/ghost15.png');
}

function setup() {
  var sprite = createSprite(30,50); // スプライトを作成
  sprite.addAnimation('pumpkin', anim_pump); // スプライトにアニメーションを加える
  
  sprite = createSprite(70, 50); // スプライトの作成
  sprite.addAnimation('ghost', anim_ghost); 
}

function draw() {
  
}
```

### 13.2.4 アニメーションを切り替える

マウスクリックでアニメーションを切り替える

```js
// ChangeAnimation
var anim_pump, anim_ghost; // アニメーション
var sprite; // スプライト
var clicked = false; // マウスがクリックされたかどうか

function preload() {
  // アニメーションを読み込む,
  anim_pump = loadAnimation('assets/pumpkin10.png', 'assets/pumpkin15.png');
  anim_ghost = loadAnimation('assets/ghost10.png', 'assets/ghost15.png');
}

function mouseClicked() {
  if (clicked) { // すでにクリックされている
    sprite.changeAnimation('pumpkin');
  } else {
    sprite.changeAnimation('ghost');
  }
  clicked = !clicked;
}
```

1つのスプライトオブジェクトに2つのアニメーションを設定すると、
`changeAnimation()` で変更することができます。


## 13.3 スプライトを移動させる

```js
// MovingSprites
function setup() {
  createCanvas(300, 300);
  
  for (var i = i; i < 7; i++) {
    var sprite createSprite(random(width), random(-height)); // 座標を上方向、左右にずらす
    sprite.addAnimation('pumpkin', 'assets/pumpkin10.png', 'assets/pumpkin15.png');
    sprite.velocity.y = 1; // 落ちてくる速度(y軸方向の速度)
  }
}

function draw() {
  background(255);
  drawSprite();
}
```

__スプライトの持つ主なプロパティ__

- `depth` - グループ内での描画順序
- `friction` - 大きいほどスプライトの速度を減少させる(摩擦係数)
- `height` - スプライトの画像の高さ
- `immovable` - true にすると、スプライトは固定され動かなくなる(重力無限大)
- `mass` - 重量。スプライトが違いにぶつかったときに跳ね返る速度に影響
- `maxSpeed` - スプライトの速度の上限
- `originalHeight` - 画像やアニメーションが設定されていない場合に用いられる長方形の高さ
- `originalWidth` - 画像やアニメーションが設定されていない場合に用いられる長方形の幅
- `position` - スプライトの位置。
- `previousPosition` - スプライトの直前の位置
- `rotation` - スプライトの回転角度
- `rotationSpeed` - スプライトの倍率
- `scale` - スプライトの倍率
- `shapeColor` - 画像やアニメーションが設定されていない場合に代わりに用いられる長方形の色
- `touching` - `Sprite.overlap()` か `Sprite.collide()` と一緒に使用することで、衝突したかどうかを判断できる
- `velocity` - スプライトの移動速度
- `visible` - スプライトの表示
- `width` - スプライトの画像の幅


下まで行くと再度表示されるように

```js
// MovingSpriteRepeat

//...

function draw() {
  background(255);
  
  for (var i = 0; i < allSprites.length; i++) {
    var s = allSprites[i]; // すべてのスプライトを管理する配列
    if (s.position.y > height) {
      s.position.y = 0; // 画面の下まで行ったら上に戻す
    }
  }
  
  drawSprite();
}
```

## 13.4 キーとマウスで操作する

```js
// KeyMouse
var sprite;

function setup() {
  sprite = createSprite(50, 50);
  sprite.addAnimation('pumpkin', 'assets/pumpkin10.png', 'assets/pumpkin15.png');
}

function draw() {
  background(255);
  if (keyWentDown('UP_ARROW') || mouseWentDown(LEFT)) {
    sprite.velocity.y = -1;
  } else if (keyWentDown('DOWN_ARROW') || mouseWentDown(RIGHT)) {
    sprite.velocity.y = 1;
  }
  drawSprite();
}
```

__`KeyWentDown()` に指定できるキー名__

(soon...)


## 13.5 コライダー

### 13.5.1 スプライトをクリックする

```js
// Collider
function setup() {
  var sprite = createSprite(40, 30); // 適当な場所に表示する
  sprite.addAnimation('pumpkin', 'assets/pumpkin10.png', 'assets/pumpkin15.png');
  sprite.setCollider('circle', 0, 0, 16); // コライダーの範囲を設定する
  sprite.onMousePressed = clicked; // スプライトをクリックしたときの関数を設定
}

function draw() {
  background(255);
  drawSprite();
}

function clicked(s) {
  s.remove(); // スプライトを消す
}
```

```js
/**
 * Sprite.setCollider(type, offsetX, offsetY, width, height)
 * スプライトにコライダーを指定する
 * @param {} type - コライダーのタイプ ["circle"|"rectangle"]
 * @param {} offsetX, offsetY - コライダーの基準になる座標
 * @param {} width - "circle" の場合は半径。 "rectangle" の場合は長方形の幅
 * @param {} height - "rectangle" の場合にだけ使われる。長方形の高さ
 */
```


__マウス操作に関するスプライトのプロパティ__

- `onMouseOver` - マウスがスプライトの上におったとき
- `onMouseOut` - マウスがスプライト上から出たとき
- `onMousePressed` - マウスのボタンがスプライト上で押されたとき
- `onMouseReleased` - マウスのボタンがスプライト上で離されたとき

```js
// 無名関数で書くこともできる
sprite.onMousePressed = function() {
  this.remove();
};
```

### 13.5.2 スプライト同士の衝突を扱う

```js
// Bounce 
var pumpkin, wall; // カボチャと壁のスプライト

function setup() {
  createCanvas(300, 300);
  
  wall = createSprite(width / 3, height * 2 / 3, width * 2 / 3, 30); // 横幅の 2/3 の壁を作る
  wall.shapeColor = color(0, 135, 155); // 壁の色を設定する
  wall.immovable = true; // 固定する
  
  pumpkin = createSprite(0, 0); // 左上に置く
  pumpkin.addAnimation('pumpkin', 'assets/pumpkin10.png', 'assets/pumpkin15.png');
  pumpkin.velocity.x = pumpkin.velocity.y = 1; // 落下速度(右下に進む)
}

function draw() {
  background(255);
  pumpkin.bounce(wall); // 跳ね返る
  // pumpkin.collide(wall); // 衝突する
  // pumpkin.overlap(wall); // 重なる
  drawSprites();
}
```

__スプライト同士の衝突処理__

|関数名|説明|
|:--:|:--:|
|`bounce(sprite, [callback])`|スプライトがぶつかると跳ね返る|
|`collide(sprite, [callback])`|スプライトがぶつかると、ぶつからない場所に移動する|
|`overlap(sprite, [callback])`|スプライトがぶつかると、callback が呼び出される|

### 13.5.3 衝突した場合に関数を実行する
スプライト同士がぶつかると色が変化するプログラムを作ってみましょう

```js
// OverlapCallback
var pumpkin, wall;

function setup() {
  createCanvas(300, 300);
  
  wall = createSprite(width / 2, height * 2 / 3, width * 2 / 3, 30);
  wall.shapeColor = color(0, 135, 155);
  wall.immovable = true;
  
  pumpkin = createSprite(0, 0);
  pumpkin.addAnimation('pumpkin', 'assets/pumpkin10.png', 'assets/pumpkin15.png');
  pumpkin.velocity.x = pumpkin.velocity.y = 1;
}

function draw() {
  background(255);
  pumpkin.overlap(wall, overlapped);//カボチャが壁と重なった場合
  drawSprites();
}

function overlapped(pumpkin, wall) {
  wall.shapeColor = color(255, 0, 0);
}
```

### 13.5.4 描画領域から出ないようにする
```js
// 4walls
var pumpkin, wall_top, wall_bottom, wall_left, wall_right;
var THICKNESS = 20;

function setup() {
  createCanvas(300, 300);
  
  wall_top = createSprite(width / 2, -THICKNESS / 2, width + THICKNESS * 2, THICKNESS);
  wall_top.immovable = true;
  
  wall_bottom = createSprite(width / 2, height + THICKNESS / 2, width + THICKNESS * 2, THICKNESS);
  wall_bottom.immovable = true;
  
  wall_left = createSprite(-THICKNESS / 2, height / 2, THICKNESS, height);
  wall_left.immovable = true;
  
  wall_right = createSprite(width + THICKNESS / 2, height / 2, THICKNESS, height);
  wall_right.immovable = true;
  
  pumpkin = createSprite(0, 0);
  pumpkin.addAnimation('pumpkin', 'assets/pumpkin10.png', 'assets/pumpkin15.png');
  pumpkin.velocity.x = pumpkin.velocity.y = 1;
}

function draw() {
  background(200); // 背景を薄い灰色に
  pumpkin.bounce(wall_top);
  pumpkin.bounce(wall_bottom);
  pumpkin.bounce(wall_left);
  pumpkin.bounce(wall_right);
  drawSprites();
}
```

スプライトが一番下まで行った時に再び上から表示させる

```js
// WrapUp
var pumpkin, wall;
var THICKNESS = 20;

function setup() {
  createCanvas(300, 300);
  wall = createSprite(width / 2, height + THICKNESS / 2, width + THICKNESS * 2, THICKNESS);
  
  pumpkin = createSprite(0, 0);
  pumpkin.addAnimation('pumpkin', 'assets/pumpkin10.png', 'assets/pumpkin15.png');
  pumpkin.velocity.y = 1; // 落ちてくる速度
}

function draw() {
  background(255);
  pumpkin.overlap(wall, overlapped);
  drawSprites();
}

function overlapped(pumpkin, wall) {
  pumpkin.position.y = 0;
}
```

## 13.6 グループ
```js
// Group
var group;

function setup() {
  group = new Group(); // 空のグループを作成
  
  var sprite = createSprite(0, 0); // 左上
  sprite.addAnimation('pumpkin', 'assets/pumpkin10.png', 'assets/pumpkin15.png');
  sprite.velocity.x = 1;
  sprite.velocity.y = 1;
  group.add(sprite); // グループに追加する
  
  sprite = createSprite(width, height); // 右下
  sprite.addAnimation('pumpkin', 'assets/pumpkin10.png', 'assets/pumpkin15.png');
  sprite.velocity.x = 1;
  sprite.velocity.y = -1;
  group.add(sprite); // グループに追加する
  
  sprite = createSprite(0, height);
  sprite.addAnimation('sheep', 'assets/sheep10.png', 'assets/sheep15.png');
  sprite.velocity.x = 1;
  sprite.velocity.y = -1;
  group.add(sprite); // グループに追加する
  
  sprite = createSprite(width, 0);
  sprite.addAnimation('ghost', 'assets/ghost10.png', 'assets/ghost15.png');
  sprite.velocity.x = -1;
  sprite.velocity.y = 1;
  group.add(sprite); // グループに追加する
}

function draw() {
  background(255);
  group.bounce(group); // group 内のスプライト同士が衝突したら跳ね返る
  drawSprites();
}
```
