# アニメーションとカメラの移動

- 基本のアニメーション
- カメラの移動
- モーフィングとスキンメッシュアニメーション
- 外部アニメーションの読み込み

## 基本的なアニメーション

```js
render()

function render() {
  renderer.render(scene, camera)
  
  requestAnimationFrame(render)
}
```

### 単純なアニメーション
- [09-basic-animation.html](https://codepen.io/kesuiket/pen/WOReZK)

回転角, 拡大率, 位置, マテリアル, 頂点, 面, その他考えられるすべてのものを定期的に変更するだけで
非常に簡単にアニメーションを実現できます.

```js
function render() {
  cube.rotation.x += controls.rotationSpeed
  cube.rotation.y += controls.rotationSpeed
  cube.rotation.z += controls.rotationSpeed
  
  step += controls.bouncingSpeed
  
  sphere.position.x = 20 + (10 * (Math.cos(step)))
  sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)))
  
  scalingStep += controls.scalingStep
  var scaleX = Math.abs(Math.sin(scalingStep / 4))
  var scaleY = Math.abs(Math.cos(scalingStep / 5))
  var scaleZ = Math.abs(Math.sin(scalingStep / 7))
  cylinder.scale.set(scaleX, scaleY, scaleZ)
  
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}
```

### オブジェクトの選択
- [02-selecting-objects.html](https://codepen.io/kesuiket/pen/EXZxgZ)

マウスを使用して真の中のオブジェクトを選択する方法です.

```js
var projector = new THREE.Projector()

function onDocumentMouseDown(event) {
  var vector = new THREE.Vector3(
     (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1,
    0.5
  )
  vector = vector.unproject(camera)
  
  var raycaster = new THREE.Raycaster(
    camera.position,
    vector.sub(camera.position).normalize()
  )
  
  var intersects = raycaster.intersectObject([
    sphere, cylinder, cube,
  ])
  
  if (intersects.length > 0) {
    intersects[0].object.material.transparent = true
    intersects[0].object.material.opacity = 0.1
  }
}
```

特定のオブジェクトがクリックされたかどうかを判定するために, `THREE.Projecter` と `THREE.Raycaster` を
組み合わせて使用しています

1. 初めに, クリックされたスクリーン上の位置を元に `THREE.Vector3` が作成されます
2. 次に `vector.unproject()` を使用して, クリックされたスクリーン上の位置を Three.js シーン内の座標に変換します.
   言い換えると, スクリーン座標からワールド座標系に逆射影（unproject）します
3. `THREE.Raycaster` を作成します. `THREE.Raycaster` を使用するとシーンの中でレイを飛ばすことができます.
   今回はカメラの位置（`camera.position`）からシーン内のクリックされた位置までレイを飛ばします
4. 最後に, `raycaster.intersectObjects()` を使用して与えられたオブジェクトのいずれかが例に当たっているかどうかを確認します

レイが当たったオブジェクトの情報の例:

```js
distance: 49.904788522448 // カメラからクリックされたオブジェクトまでの距離
face: THREE.Face3         // 選択されたメッシュのどの面がクリックされたか
faceIndex: 4              // 同上
object: THREE.Mesh        // クリックされたメッシュ
point: THREE.Vector3      // クリックされたメッシュ上の正確な位置
uv: THREE.Vector2         // 
```

### Tween.js を使用したアニメーション
- [Tween.js](https://github.com/sole/tween.js/)
- [tween.js graphs](http://sole.github.io/tween.js/examples/03_graphs.html) - 利用できる曲線の一覧
- [03-animation-tween.html](https://codepen.io/kesuiket/pen/owBYzj)

例えば, メッシュのx座標を10から3まで10秒かけて変化させる場合

```js
var tween = new TWEEN.Tween({x: 10}).to({x: 3}, 1000)
  .easing(TWEEN.Easing.Elastic.InOut)
  .onUpdate(function() {
    // メッシュの座標を更新
  })
```

```js
var posSrc = {pos: 1}
var tween = new TWEEN.Tween(posSrc).to({pos: 0}, 5000)
tween.easing(TWEEN.Easing.Sinusoidal.InOut)

var tweenBack = new TWEEN.Tween(posSrc).to({pos: 1}, 5000)
tweenBack.easing(TWEEN.EasingSinusoidal.InOut)

tween.chain(tweenBack)
tweenBack.chain(tween)

var onUpdate = function() {
  var count = 0
  var pos = this.pos
  
  loadedGeometry.vertices.forEach(function(e) {
    var newY = ((e.y + 3.22544) * pos) - 3.22544
    pointCloud.geometry.vertices[count++].set(e.x, newY, e.z)
  })
  
  pointCloud.geometry.verticesNeedUpdate = true
}

tween.onUpdate(onUpdate)
tweenBack.onUpdate(onUpdate)
```

モデルの読み込みが完了するのを待ってからトゥイーンを開始します
```js
var loader = new THREE.PLYLoader()
loader.load('../assets/models/test.ply', function(geometry) {
  ...
  tween.start()
  ...
})
```

トゥイーンを開始した後は, Tween.js ライブラリの管理しているすべてのトゥイーンをいつ更新すべきかを
ライブラリに指定する必要があります

```js
function render() {
  TWEEN.update()
  requestAnimationFrame(render)
  webGLRenderer.render(scene, camera)
}
```

## カメラの使用

##### 主なカメラコントロール
- __FirsrPersonControls__ - 一人称視点のシューティングゲームのような動作をする. キーボードを使用して移動し, マウスを使用して視点を変える
- __FlyControls__ - フライトシュミレーターのようなコントロール. キーボードとマウスを使用して移動, 操縦できる
- __TrackBallControls__ - もっともよく利用されるコントロールで, マウス（またはトラックボール）を使用してシーン内を簡単に移動, パン, ズームできる
- __OrbitControls__ - 特定のシーンを回る軌道上の衛星をシミュレートする. マウスとキーボードを使用して動き回ることができる

##### その他のカメラコントロール
- __DeviceOrientationControls__ - デバイスの向きや傾きに基づいてカメラの動きを制御する. 内部的にはHTML5の [DeviceOrientation Event](https://www.w3.org/TR/orientation-event/) を使用している
- __EditorControls__ - オンラインの3Dエディタ専用のコントロール. [Three.js オンラインエディタ](https://threejs.org/editor/)で使われている
- __OrthographicTrackballControls__ - TrackBallControls と同じだが, 特に `THREE.OrthographicCamera` と組み合わせて使用するために作成されている
- __PointerLockControls__ - マウスカーソルの動きをシーンが描画されれいるDOM要素上に制限する簡単なコントロール. 単純な3Dゲームのための基本的な機能を提供する
- __TransformControls__ - Three.js エディタによって使用されている内部的なコントロール. メッシュの拡大率や平行移動, 回転を制御するUI（ギズモ）を追加できる
- __VRControls__ - PositionSensorVRDevice API を使用してシーンを制御するコントロール. 詳細は[Navigator.getVRDisplays()](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getVRDisplays)を参照
- __DragControls__ - オブジェクトをドラッグで移動できるコントロールを表示する
- __MouseControls__ - コンストラクタの引数として渡したメッシュが常にマウスカーソルの方向に向くようになるコントロール

> 以前にあった `THREE.PathControls` という特殊なカメラコントロールは, 定義したパスに沿って動かすことができました.
> しかし, コードが複雑すぎたため, Three.js の最新バージョンでは削除されています.

### `THREE.TrackballControls`
- [three.js docs - __Clock__](https://threejs.org/docs/#api/core/Clock)
- [04-trackball-control.html](https://codepen.io/kesuiket/pen/XgpNQb)

```html
<script src="../libs/controls/TrackballControls.js"></script>
```

次のようにしてコントロールを作成して, カメラと関連づけることができます.
```js
var trackballControls = new THREE.TrackballControls(camera)
trackballControls.rotateSpeed = 1.0
trackballControls.zoomSpeed = 1.0
trackballControls.panSpeed = 1.0
```

このコントロールを使用してカメラの位置を更新するには描画ループ内で次のようにして `update()` を呼び出します
```js
var clock = new THREE.Clock()

function render() {
  var delta = clock.getDelta()
  trackballControls.update(delta)
  requestAnimationFrame(render)
  webGLRenderer.render(scene, camera)
}
```

`THREE.Clock` は経過時間を正確に計算し, 特殊な処理を起動したりレンダリングループを確実に実行されるために使用されます.
`clock.getDelta()` を呼び出すと, 前回の `getDalta()` 呼び出しからの経過時間が得られます.

カメラの位置を更新するには `trackballControls.update()` を呼び出します.
この関数には最後に `update()` を呼び出した時間からの経過時間を渡す必要があり, `THREE.Clock.getDalta()` はそのために呼び出されます.<br>
`requestAnimationFrame` は 60fps で実行されることが期待されますが確実ではないためです

##### `THREE.TrackballControls` の操作
- __マウス左ボタンを押しながらドラッグ__ - シーン内でカメラを回転もしくは傾ける
- __マウスホイール__ - ズームインまたはズームアウトする
- __マウス中ボタンを押しながらドラッグ__ - ズームインまたはズームアウトする
- __マウス右ボタンを押しながらドラッグ__ - シーンをパンする

何が設定可能なのか全体像を理解したければ, TrackballControls.js のソースを見てください

### `THREE.FlyControls`
- [05-fly-contols-camera.html](https://codepen.io/kesuiket/pen/VWPPjr)

```html
<script src="../libs/FlyControls.js"></script>
```

```js
var flyControls = new THREE.FlyControls(camera)
flyControls.movementSpeed = 25
flyControls.domElement = document.querySelector('#WebGL-output')
flyControls.rollSpeed = Math.PI / 24
flyControls.autoForward = true
flyControls.dragToLook = false
```

必ず正しく設定する必要があるプロパティは `domElement` です.
このプロパティはシーンが描画される要素を設定しなければいけません.

##### `THREE.FlyControls` の操作
- __マウス左/中ボタン__ - 前に移動する
- __マウス右ボタン__ - 後ろに移動する
- __マウス移動__ - 周りを見る
- __W__ - 前に移動する
- __S__ - 後ろに移動する
- __A__ - 左に移動する
- __D__ - 右に移動する
- __R__ - 上に移動する
- __F__ - 下に移動する
- __上下左右カーソル__ - 上下左右を見る
- __G__ - 左に回転する
- __E__ - 右に回転する

### `THREE.FirstPersonControls`
- [07-first-person-camera.html](https://codepen.io/kesuiket/pen/VWPPPy)

```js
var camControls = new THREE.FirstPersonControls(camera)
camControls.lookSpeed = 0.4
camControls.movementSpeed = 20
camControls.noFly = true
camControls.lookVertical = true
camControls.constrainVertical = true
camControls.verticalMin = 1.0
camControls.verticalMax = 2.0
camControls.lon = -150
camControls.lat = 120
```

使用するときに気をつけるべきプロパティは最後の2つ, `lon` と `lat` だけです.
これら2つのプロパティは初めにシーンが描画されたときにカメラをどこに配置するかを指定します.

##### `THREE.FirstPersonControls`の操作
- `マウス移動` - 周りを見る
- `上下左右カーソルキー` - 前後左右に移動する
- `W` - 前に移動する
- `A` - 左に移動する
- `S` - 後ろに移動する
- `D` - 右に移動する
- `R` - 上に移動する
- `F` - 下に移動する
- `Q` - すべての動きを停止する

### `THREE.OrbitControls`
- [08-controls-orbit.html](https://codepen.io/kesuiket/pen/GErrvY)

```html
<script src="../libs/OrbitControls.js"></script>
```

```js
var orbitControls = new THREE.OrbitControls(camera)
orbitControls.autoRotate = true
var clock = new THREE.Clock()

function render() {
  ...
  var delta = clock.getDelta()
  orbitControls.update(delta)
}
```

##### `THREE.OrbitControls` の操作
- __マウス左ボタンを押しながらドラッグ__ - カメラがシーンの中心を軸に回転移動する
- __マウスホイールまたはマウス中ボタンを押しながらドラッグ__ - ズームイン/ズームアウトする
- __マウス右ボタンを押しながらドラッグ__ - シーンをパンする
- __上下左右カーソルキー__ - シーンをパンする

## モーフィングとスケルタルアニメーション
外部プログラム（例えばBlender）でアニメーションを作成する場合, その定義方法には通常2つのタイプがあります.

__モーフターゲット__<br>
キーポジション, つまり変形したメッシュを定義します.
この変形されたターゲットにはすべての頂点座標が保持されています.
このキーボードポジションがあれば, すべての頂点を現在の位置から別のキーフレーム内の対応する頂点の位置まで
移動することを繰り返して形状を変化させることができます.

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Sintel-face-morph.png/1200px-Sintel-face-morph.png" width="200">

__スケルタルアニメーション__<br>
メッシュのスケルトン, つまりボーンを定義して, それぞれの頂点をいずれかのボーンに関連づけます.
そうすることであるボーンを移動すると, そのボーンに接続されたボーンが適切に移動され, さらに関連づけられている頂点群も移動されるようになります.
その結果, ボーンの位置, 動き, 拡大率に基づいてメッシュを変形できます.

Three.js は両方サポートしていますが, 一般的にはモーフターゲットを使用した方がよい結果が得られます.
スケルタルアニメーションの場合, Blender のような3Dプログラムから Three.js 内でアニメーショできる形でエクスポートする部分に問題が発生しがちです.

### モーフターゲットを使用したアニメーション
この方法には欠点もあり, 巨大なメッシュに巨大なアニメーションを定義するとモデルファイルが非常に大きくなってしまいます.
これはそれぞれのキーフレームにすべての頂点群が繰り返し定義されるためです.

#### `THREE.AnimationMixer`を使用したモーフアニメーション
- [10-morph-targets.html]()

<img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Sintel-hand.png" width="200">
