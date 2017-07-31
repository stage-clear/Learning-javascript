# マッピング
## テクスチャマッピング
### テクスチャマッピングとは
形状が精密になればなるほどポリゴンを指定するためのデータが莫大になってしまうため,
現実的な時間では描画できないような事態に陥ってしまいます.

そこで, コンピューターグラフィックスの世界では, 別にあらかじめ用意された
画像データをポリゴンの表面に貼り付けることで複雑な形状を視覚的に表現する手法が用いられ,
テクスチャマッピングと呼びます.

### テクスチャマッピングの実装方法
TextureLoader クラスを用いてマッピング用の画像を読み込み,
Texture クラスのオブジェクトを材質オブジェクトの __map プロパティ__ に設定することで利用できます.

```js
function initObject() {
  ...
  // テクスチャの読み込み
  var loader = new THREE.TextureLoader()
  var texture = loader.load('path/to/image')
  // 形状オブジェクトの宣言と生成
  var goemetry = new THREE.PlaneGeometry(100, 100)
  // 材質オブジェクトの宣言と生成
  var material = new THREE.MeshBasicMaterial({map: texture})
  // 平面オブジェクトの生成
  plane = new THREE.Mesh(geometry, material)
  // 平面オブジェクトのシーンへの追加
  scene.add(plane)
}
```

#### color プロパティの指定
テクスチャマッピングを実装時に color プロパティを同時に指定することで,
テクスチャ画像色と発光色との色積算が行われます.

```js
var material = new THREE.MeshBasicMaterial({
  color: 0x00ff00, // <-
  map: texture
})
```

#### メモ: CanvasRenderer 利用時のアンチエイリアスギャップ
CanvasRenderer 利用時にポリゴンのエッジに線が入ってしまいます.
これはアンチエイリアスギャップと呼ばれ, 材質オブジェクトの `overdraw` プロパティを有効にすることで線を消すことができます

```js
var material = new THREE.MeshBasicMaterial({
  map: texture,
  overdraw: true,
})
```

#### 反射材質に対するテクスチャマッピング
テクスチャマッピングは, MeshBasicMaterial だけでなく, 光源オブジェクトによるシェーディングの対象となる
ランバート反射材質 (MeshLambertMaterial) とフォン反射材質(MeshPhongMaterial)に対しても実装することができます.

```js
var material = new THREE.MeshPhongMaterial({
  color: 0xfffffff,
  specular: 0xffffff
  shininess: 200,
  map: texturem,
})
```

### Texture クラス
- [three.js docs - __Texture__](https://threejs.org/docs/#api/textures/Texture)

```js
var texture = new Texture(
  image, mapping, wrapS, wrapT, magFilter, minFilter,
  format, type, anistropy, encoding,
)
```

### TextureLoader クラス
- [three.js docs - __TextureLoader__](https://threejs.org/docs/#api/loaders/TextureLoader)

```js
var loader = new THREE.TextureLoader(manager:LoadingManager)
```

### ImageLoader クラス
画像データの読み込みにはHTMLタグの img 要素を用いています

```js
var loader = new THREE.ImageLoader(manager:lodingManager)
```

### canvas 要素によるテクスチャ画像の生成と実装
canvas 要素に描画した内容をそのままテクスチャ画像としてりようすることにより,
テクスチャ画像を動的に変更することができるため, 表現の幅が飛躍的に広がります.

#### canvas 要素の生成

1. canvas 要素とコンテキストの生成
2. 各ピクセルに対応する描画色の指定
3. イメージデータオブジェクトの生成と canvas 要素への出力

```js
function generateCanvas() {
  // canvas 要素の生成
  var canvas = document.createElement('canvas')
  // canvas 要素のサイズ
  canvas.width = 256
  canvas.height = 256
  // コンテキストの取得
  var context = canvas.getContext('2d')
  // ガウス分布の平均値と分散
  var x_ = canvas.width / 2 // 平均値 (x座標)
  var y_ = canvas.height / 2 // 平均値 (y座標)
  var sigma2 = 5000 // 分散
  // ビットマップデータのRGBAデータ格納配列
  var bitmapData = []
  // RGBA データ格納配列への値の代入
  for (var j = 0; j < canvas.height; j++) {
    for (var i = 0; i < canvas.width; i++) {
      var index = (j * canvas.width + i) * 4
      var x = i
      var y = j
      // ガウス分布の値の取得
      var f = Math.exp(-((x - x_) * (x - x_) + (y - y_) * (y - y_)) / (2 * sigma2))
      bitmapData[index + 0] = 255 * f
      bitmapData[index + 1] = 0
      bitmapData[index + 2] = 0
      bitmapData[index + 3] = 255
    }
  }
  
  // イメージデータオブジェクトの生成
  var imageData = context.createImageData(canvas.width, canvas.height)
  for (var i = 0; i < canvas.width * canvas.height * 4; i++) {
    imageData.data[i] = bitmapData[i]
  }
  // イメージデータオブジェクトから canvas に描画する
  context.putImageData(imageData, 0, 0)
  return canvas
}
```

canvas 要素に出力した画像をテクスチャ画像として利用する場合には, needsUpdate プロパティを true とする必要があります.

```js
// テクスチャ画像用の canvas 要素の取得
var canvas = generateCanvas()
// テクスチャオブジェクトの生成
var texture = new THREE.Texture(canvas)
// テクスチャ画像の更新
texture.needsUpdate = true // <-
```

### ローカル環境による画像読み込みエラーの回避方法
ローカル環境にて TextureLoader クラスで画像を読み込む場合, セキュリティ関連のエラーが発生することがあります.

#### 1. DataURL 形式の画像データ（文字列）の準備

```js
var UV_Grid_sm ='data:image/png;base64, ....'
```

#### 2. HTMLのimg要素（Imageクラス）の準備

```js
// img 要素の生成
var img = new Image()
img.src = UV_Grid_Sm
```

#### 3. three.js のテクスチャオブジェクト（Textureクラス）の生成

```js
// テクスチャオブジェクトの生成
var texture = new THREE.Texture(img)
texture.needsUpdate = true
```

#### 留意: 画像データの外部リソース化の検討
DataURL形式の文字列は非常に長いので, JavaScript プログラムソースに直接記述すると不便です

```js
<script src="UV_Grid_Sm.js"></script>
```

##### 注意: HTML要素を用いた読み込みでは回避できません

```html
<img src="UV_Grid_Sm.jpg" id="UV_Grid_Sm">
```

```js
var img = document.getElementById('UV_Grid_Sm')
```

### Google Chrome の WebGL 実行時 RENDER WARNING
RENDER WARNING はテクスチャマッピングに利用する画像の読み込みが完了していない状態で,
マッピングを施したレンダリングを実行する際に, 意図通りの描画結果が得られていないことを注意しています.

1. テクスチャマッピング無しで3次元オブジェクトを生成
2. テクスチャオブジェクトの生成が完了後, 3次元オブジェクトの map プロパティにテクスチャオブジェクトを与える
3. 3次元オブジェクトの材質オブジェクトを更新

```js
// 形状オブジェクトの宣言と生成
var geometry = new THREE.PlaneGeometry(100, 100) // 平面オブジェクト
// 材質オブジェクトの宣言と生成
var material = new THREE.MeshBasicMaterial({ color: 0xffffff })
// 平面オブジェクトの生成
plane = new THREE.Mesh(geometry, material)
// 平面オブジェクトのシーンへの追加
scene.add(plane)
// テクスチャの読み込み
var loader = new THREE.TextureLoader()
loader.load(
  'simyu-kun256.png',
  function(texture) {
    // map プロパティにテクスチャオブジェクトを与える
    plane.material.map = texture
    // 材質オブジェクトの更新
    plane.material.needsUpdate = true
  }
)
```

## Texture クラスのプロパティ
### テクスチャラッピング方法の指定
wrapS プロパティと wrapT プロパティはテクスチャ画像のラッピング方法を指定するためのプロパティです

- ClampToEdgeWrapping（デフォルト）: 指定された領域全体に引き伸ばされてラッピングされます
- RepeatWrapping: テクスチャ画像を繰り返しマッピングする
- MirroredRepeatWrapping: テクスチャ画像を反転させながら繰り返しマッピングする

#### リピートラッピング (RepeatWrapping)
```js
// 画像データの読み込みとテクスチャオブジェクトの生成
var texture = THREE.ImageUtils.loadTexture('simyu-kun256.png')
// テクスチャラッピングの指定
texture.wrapS = THREE.RepeatWrapping // x軸方向
texture.wrapT = THREE.RepeatWrapping // y軸方向
// リピートの指定
texture.repeat.set(2.5, 2.5)
```

#### ミラーリピートラッピング (MirroredRepeatWrapping)

```js
// テクスチャラッピングの設定
texture.wrapS = THREE.MirroredRepeatWrapping // x軸方向
texture.wrapT = THREE.MirroredRepeatWrapping // y軸方向
// リピートの指定
texture.repeat.set(2.5, 2.5)
```

リピートラッピングとミラーリピートラッピングでは, テクスチャ画像に使用する画像データの縦横サイズは2のべき乗である必要があります.

### 補完方法の指定
テクスチャ画像のサイズとマッピングを施すオブジェクトのサイズが異なる場合には,
描画色の補間が自動的に行われます.
あらかじめ用意された補間方法を magFilter と minFilter で指定できます.
magFilter はテクスチャ画像サイズよりも大きなオブジェクトにマッピングする場合,
minFilter は反対にテクスチャ画像サイズよりも小さなオブジェクトにマッピングする場合の補間方法を指定することができます.

#### magFilter プロパティと minFilter プロパティに設定可能な値

|magFilter|minFilter|ステート定数|補間方法|
|:--|:--|:--|:--|
|◯|◯|NearestFilter|対象ピクセルに対して最も近い点のテクスチャ色で近似|
|◯|◯|LinearFilter|対象ピクセルに対して最も近い4点のテクスチャ色で線形近似|
|×|◯|NearestMipMapNearestFilter|最も近いミップマップを選択後, 対象ピクセルに対して最も近い点の値で近似|
|×|◯|NearestMipMapLinearFilter|最も近いミップマップを選択後, 対象ピクセルに対して最も近い4点の値で線形近似|
|×|◯|LinearMipMapNearestFilter|近い2つのミップマップで線形補間後, 対象ピクセルに対して最も近い値で近似|
|×|◯|LinearMipMapLinearFilter|近い2つのミップマップで線形補間後, 対象ピクセルに対して最も近い4点で線形近似|

### ミップマップの用意

#### ミップマップ用画像データの用意

```js
function mipmap(size, color) {
  var canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  // コンテキストの取得
  var context = canvas.getContext('2d')
  context.fillStyle = '#444444'
  context.fillRect(0, 0, size, size)
  context.fillStyle = color
  context.fillRect(0, 0, size / 2, size / 2)
  context.fillRect(size / 2, size / 2, size / 2)
  return canvas
}
```

#### ミップマップの指定方法

```js
// 空のimg要素を生成
var img = new Image()
// テクスチャオブジェクトの生成
var texture = new THREE.Texture(img)
// テクスチャラッピングの設定
texture.wrapS = THREE.RepeatWrapping
texture.wrapT = THREE.RepeatWrapping
// リピートの指定
texture.repeat.set(100, 100)
// 補間方法の指定
texture.magFilter = THREE.LinearFilter
texture.minFilter = THREE.LinearMipMapLinearFilter
// ミップマップの指定
texture.mipmaps[0] = mipmap(128, '#ff0000')
texture.mipmaps[0] = mipmap(64,  '#00ff00')
texture.mipmaps[0] = mipmap(32,  '#0000ff')
texture.mipmaps[0] = mipmap(16,  '#440000')
texture.mipmaps[0] = mipmap(8,   '#004400')
texture.mipmaps[0] = mipmap(4,   '#000044')
texture.mipmaps[0] = mipmap(2,   '#004444')
texture.mipmaps[0] = mipmap(1,   '#440044')
```

