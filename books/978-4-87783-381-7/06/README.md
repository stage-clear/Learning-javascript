# UI部品

## 6.1 ボタン

```js
function setup() {
  var button = createButton('Click me'); // ボタンの作成
  button.mousePressed(clicked); // クリックされたら clicked を実行
}

function draw() {
  
}

function clicked() {
  text('Clicked!', 10, 50);
}
```

```js
/**
 * createButton(label, [value])
 * @param {String} label - ボタンに表示する文字列
 * @param {} value - ボタンが持つ値
 * @return {p5Element}
 */
createButton()
```

__ボタンの提供する関数__

- `mousePressed(callback)` - ボタンが押されたときに callback で指定した関数が実行されるようにする
- `html(label)` - ボタンのラベルを label で指定した文字列にする
- `size(width, height)` - ボタンのサイズを設定する
- `position(x, y)` - ボタンの表示位置を設定する
- `style(prop, value)` - スタイルを設定する
- `hide()` - 非表示にする 
- `show()` - 表示する
- `value([val])` - 引数を指定しないと値を取り出す。指定するとその値を設定する
- `changed(func)` - 保持する値が変わったときに関数 func が実行されるようにする


```js
// 表示領域にも使える
var canvas = createCanvas(100, 100);
canvas.position(50, 100);
```

__ボタンの提供するプロパティ__

- `width` - ボタンの幅
- `height` - ボタンの高さ

```js
// ButtonLabel
var gray = 0; // 背景の色
var button; // ボタンを管理する変数

function setup() {
  button = createButton(gray); // ボタンの作成
  button.position(10, height + 10); // ボタンの位置を指定
  button.mousePressed(clicked); // クリックされたら toggleColor を実行
  background(gray); 
}

function draw() {
  
}

function clicked() {
  gray += 2; // gray を2増やす
  button.html(gray); // ボタンのラベルを変更
  background(gray);
}
```


## 6.2 入力フィールド

```js
// ButtonInput
var input ; // 入力フィールドを管理する変数

function setup() {
  input = createInput('Type something in input'); // 入力フィールドの作成
  input.position(19, height + 10); // 位置の指定
  var button = createButton('send'); // ボタンの作成
  button.position(input.width + 10, height + 10);
  button.mousePressed(perform); //クリックされたら perform を実行
}

function draw() {
  
}

function perform() {
  background(255);
  var cmd = input.value(); // 入力されたテキストの取り出し
  if (cmd === 'rect') {
    rect(10, 10, 80, 80);
  } else if (cmd === 'ellipse') {
    ellipse(50, 50, 70, 70);
  } else {
    text(cmd, 10, height / 2);
  }
}
```

```js
/**
 * createInput([value])
 * テキスト入力ようのフィールドを作成する
 * @param {Any} value - 入力フィールドに表示するデフォルト値
 * @return {p5Element} 
 *
 */
```

## 6.3 スライダー

```js
// Slider 
var tl_slider;
var tr_slider;
var br_slider;
var bl_slider;

function setup() {
  tl_slider = createSlider(0, 40); // スライダの作成
  tl_slider.position(width + 10, 5); // 位置の指定
  tr_slider = createSlider(0, 40);
  tr_slider.position(width + 10, 35);
  br_slider = createSlider(0, 40);
  br_slider.position(width + 10, 65);
  bl_slider = createSlider(0, 40);
  bl_slider.position(width + 10, 95);
}

function draw() {
  var tl = tl_slider.value(); // 値の取り出し
  var tr = tr_slider.value();
  var br = br_slider.value();
  var bl = bl_slider.value();
  background(128);
  rect(10, 10, 80, 80, tl, tr, br, bl);
}
```

## 6.4 ドロップダウンメニュー

```js
// DropDown
function setup() {
  var dropdown = createSelect(); // メニューの作成
  dropdown.option('weight 1', 1);
  dropdown.option('weight 4', 4);
  dropdown.option('weight 6', 6);
  dropdown.selected(6); // 最初に選ばれている項目
  strokeWeight(dropdown.selected()); //上記の太さの設定
  
  dropdown.changed(selected); // 選択されたら selected が実行
}

function draw() {
  background(255);
  ellipse(width / 2, height / 2, 50, 50);
}

function selected() {
  strokeWeight(this.selected()); // 線の太さを変更
}
```

```js
/**
 * createselect([mult])
 * ドロップダウンメニューを作成する
 * @param {Boolean} mult - true の場合、複数選択が可能になる
 * @return {p5Element}
 *
 */
var dropdown = createSelect();
```


## 6.5 チェックボックス

```js
// CheckBox
function setup() {
  var cb = createCheckbox('Paint');
  cb.changed(checked); // チェックされたら checked を実行
  cb = createCheckbox('Stroke', true);  // 最初はチェックされている
  cb.changed(checked); // チェックされたら checked を実行
}

function draw() {
  background(255);
  rect(10, 10, 80, 80);
}

function checked() {
  if (this.value() === 'Paint') {
    if (this.checked()) {
      fill(200);
    } else {
      noFill();
    }
  }
  
  if (this.value() === 'Stroke') {
    if (this.checked()) {
      stroke(0);
    } else {
      noStroke();
    }
  }
}
```

```js
/**
 * createCheckbox([label], [value])
 * @param {String} label - チェックボックスに表示するラベル
 * @param {Boolean} value - チェックボックスの値
 * @return {p5Element}
 */
var cb = createCheckbox('name1', true);
```


## 6.6 ファイル選択ボタン

```js
// FileInput
function setup() {
  noCanvas(); // 描画領域を作成しない
  createFileInput(getFile); // ファイル選択ボタンを作成する
}

function draw() {
  
}

function getFile(file) {
  if (file.type === 'image') { // 画像ファイル
    createImg(file.data); // 画像を表示する
  } else {
    print('画像ファイルを選択してください');
  }
}
```

```js
/**
 * noCanvas()
 * 描画領域を作成しない
 */
noCanvas();
```

__Fileオブジェクトの持つプロパティ__

- `data` - ファイルのデータを管理するオブジェクト
- `type` - ファイルタイプ(image, text, video など)
- `subtype` - ファイルのサブタイプ(通常は、ファイルの拡張子 jpg, png など)
- `name` - ファイル名
- `size` - ファイルのサイズ


```js
/**
 * createImg(src)
 * <img> タグを作成し、指定された画像ファイルを表示する
 * @param {String} str - 画像ファイルへのパスまたはURL
 * @return {p5Element} 
 */
var img = createImg('./file.png');
```

## 6.7 ドラッグ & ドロップ

```js
// Drop 
function setup() {
  var canvas = createCanvas(150, 50);
  canvas.drop(getFile); // ドロップされたら getFile 関数を実行する
  background(200);
}

function draw() {
  
}

function getFile(file) {
  if (file.type === 'image') {
    createImg(file.data);
  } else {
    text('画像ファイルをドロップしてください', 10, height / 2);
  }
}
```


## 6.8 無名関数


```js
// Button 
function setup() {
  var button = createButton('click me'); // ボタンの作成
  // クリックされたら clicked を実行
  button.mousePressed(function() {
    text('clicked!', 10, 50);
  });
}

function draw() {
  
}
```

## 6.9 まとめ
