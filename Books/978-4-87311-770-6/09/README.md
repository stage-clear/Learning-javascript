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

<img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Sintel-hand.png" width="200">

#### `THREE.AnimationMixer`を使用したモーフアニメーション
- [three.js docs - __AnimationMixer__](https://threejs.org/docs/#api/animation/AnimationMixer)
- [three.js docs - __AnimationClip__](https://threejs.org/docs/#api/animation/AnimationClip)
- [10-morph-targets.html](https://codepen.io/kesuiket/pen/vZggMv)

```js
var loader = new THREE.JSONLoader()
loader.load('../assets/models/horse.js', function(geometry, mat) {
  geometry.computeVertexNormals()
  
  var mat = new THREE.MeshLambertMaterial({
    morphTargets: true,
    vertexColors: THREE.FaceColors,
  })
  
  mesh = new THREE.Mesh(geometry, mat)
  mesh.position.x = 200
  scene.add(mesh)
  
  mixer = new THREE.AnimationMixer(mesh)
  var clip = THREE.AnimationClip.CreateFromMorphTargetSequence(
    'gallop', geometry.morphTargets, 30
  )
  var action = mixer.clipAction(clip)
  action.setDuration(1).play()
}, '../assets/modles')
```

`THREE.AnimationMixer` はアニメーションを統一的に扱うためのコンテナオブジェクトで,
その `clipAction` メソッドに特定のアニメーションシーケンスを表すクリップオブジェクトを渡すことで
実行可能なアクションが得られます.<br>
なお, アニメーションを読み込む場合は `{morphTargets: true}` に設定されていることを確認してください.

次に描画ループ内でアニメーションを更新します.

```js
function render() {
  stats.update()
  
  var delta = clock.getDelta()
  webGLRenderer.clear()
  if (mixer) {
    mixer.update(delta)
    mesh.rotation.y = 0.01
  }
  
  requestAnimationFrame(render)
  webGLRenderer.render(scene, camera)
}
```

#### `morphTargetInfluence` プロパティを設定してアニメーションを作成
- [11-morph-targets-manually.html](https://codepen.io/kesuiket/pen/eRgvWy)

```js
// 立方体を作成
var cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
var cubeMaterial = new THREE.MeshLambertMaterial({
  morphTargets: true,
  color: 0xff0000,
})

// モーフターゲットを定義. これらのジオメトリの頂点を使用します
var cubeTarget1 = new THREE.BoxGeometry(2, 10, 2)
var cubeTarget2 = new THREE.BoxGeometry(8, 2, 8)

// モーフターゲットを設定
cubeGeometry.morphTargets[0] = {
  name: 't1',
  vertices: cubeTarget2.vertices,
}
cubeGeometry.morphTargets[1] = {
  name: 't2',
  vertices: cubeTarget1.vertices,
}

var cube = THREE.Mesh(cubeGeometry, cubeMaterial)
```

手動でモーフターゲットを作成する場合, モーフターゲットの頂点数は元となるジオメトリと
同じでなければいけません.

ジオメトリが複数のモーフターゲットの影響を同時に受ける場合もあるということに注意してください

モーフアニメーションは非常に簡単でした.
モーフターゲットに全頂点の移動後の座標が設定されていて, それぞれの頂点をある位置から
別のモーフターゲットの位置に移動するだけです.

### ボーンとスキンを使用したアニメーション
ボーンの移動に合わせてボーンに関連付けられたスキン（頂点群）をどこに移動するかを決定しなければいけません.

- [12-bones.manually.html](https://codepen.io/kesuiket/pen/jwyBeG)

```js
var loader = new THREE.JSONLoader()
loader.load('../assets/models/hand-1.js', function(geometry, mat) {
  var mat = new THREE.MeshLambertMaterial({
    color: 0xf0c8c9,
    skinning: true,
  })
  mesh = new THREE.SkinnedMesh(geometry, mat)
  
  // 手全体を回転
  mesh.rotation.x = 0.5 * Math.PI
  mesh.rotation.y = 0.7 * Math.PI
 
  // メッシュを追加
  scene.add(mesh)
  
  // アニメーションを開始
  tween.start()
}, '../assets/models')
```

Three.js には `THREE.SkinnedMesh` という名前のボーンとスキンが設定されたジオメトリ専用のメッシュがあります.
ボーンの移動に合わせてスキンも移動するのは, 使用するマテリアルの `{skinning: true}` に設定する必要があります.

```js
var tween = new TWEEN.Tween({pos: -1})
  .to({pos: 0}, 3000)
  .easing(TWEEN.Easing.Cubic.InOut)
  .yoyo(true)
  .repeat(Infinity)
  .onUpdate(onUpdate)
```

```js
var onUpdate = function() {
  var pos = this.pos
  
  // 指を回転
  mesh.skeleton.bones[5].rotation.set(0, 0, pos)
  mesh.skeleton.bones[6].rotation.set(0, 0, pos)
  mesh.skeleton.bones[10].rotation.set(0, 0, pos)
  mesh.skeleton.bones[11].rotation.set(0, 0, pos)
  mesh.skeleton.bones[15].rotation.set(0, 0, pos)
  ....
  
  // 手首を回転
  mesh.skelton.bones[1.rotation.set(pos, 0 ,0)
}
```

## 外部モデルを使用したアニメーション

__Blenderアニメーション__<br>

__Colladaモデルアニメーション__<br>

__MD2モデルアニメーション__<br>

### Blender アニメーション
フォルダ内に hand.blend ファイルがありますので, Blender に読み込んでください

- モデルの頂点はすべて少なくともひとつの頂点グループに関連付けられていなければいけません
- Blender 内で使用する頂点グループの名前はそれを制御するボーンの名前と一致しなければいけません.
  それによってボーンが移動したときに Three.js はどの頂点を移動する必要があるのか決定することができます
- 最初の「アクション」だけがエクスポートされます. そのためエクスポートしたいアニメーションが一番最初に来るようにしてください
- キーフレームを作成するときにもし変更されていないものがあったとしてもすべてのボーンを選択しておくとよいでしょう
- モデルをエクスポートするときにモデルが [Rest Pose] になっていることを確認してください.
  もしそうなっていないと非常に奇妙なアニメーションになります

- [three.js docs - __SkeletonHelper__](https://threejs.org/docs/#api/helpers/SkeletonHelper)
- [13-animation-from-blender.html](https://codepen.io/kesuiket/pen/gRgWjX)

```js
var loader = new THREE.JSONLoader()
loader.load('../assets/models/hand-2.js', function(geometry, mat) {
  var mat = new THREE.MeshLambertMaterial({
    color: 0xf0c8c9,
    skinning: true,
  })
  mesh = new THREE.SkinnedMesh(geometry, mat)
  
  mesh.rotation.x = 0.5 * Math.PI
  mesh.rotation.z = 0.7 * Math.PI
  
  mixer = new THREE.AnimationMixer(mesh)
  bonesClip = geometry.animations[0]
  var action = mixer.clipAction(bonesClip)
  action.play()
}, '../assets/modles')
```

アニメーションを再生するには, メッシュから `THREE.AnimationMixer` インスタンスを作成し,
ジオメトリに設定されているクリップを mixer から取り出してそのアクションを `play()` で呼び出します.
さらに, `mixer.update(clock.getDelta())` を呼び出すとアニメーションが更新され, ボーンの位置に応じてモデルが変形します.

Three.js にはモデルのボーンの位置を確認するための簡単なヘルパーがあります

```js
helper = new THREE.SkeletonHelper(mesh)
helper.material.linewidth = 2
scene.add(helper)
```

アニメーションさせるには描画ループ内で `helper.update()` を呼び出すのを忘れないようにしてください

### Collada モデルのアニメーション
- [three.js docs - __Animation__](https://threejs.org/docs/#api/constants/Animation)
- [14-animation-from-collada.html](https://codepen.io/kesuiket/pen/pwRPBB)

ColladaLoader に関してはまだ新しいアニメーションフレームワークに対応してないようで, 
古いアニメーションシステムに関係するファイルも合わせて読み込む必要があります.

```js
<script src="../libs/loaders/collada/Animation.js"></script>
<script src="../libs/loaders/collada/AnimationHandler.js"></script>
<script src="../libs/loaders/collada/KeyFrameAnimation.js"></script>
<script src="../libs/loaders/collada/ColladaLoader.js"></script>
```

```js
var loader = new THREE.ColladaLoader()
loader.load('../assets/models/monster.dae', function(collada) {
  var child = collada.skins[0]
  scene.add(child)
  
  var animation = new THREE.Animation(
    child, child.geometry.animation
  )
  animation.play()
  
  child.scale.set(0.15, 0.15, 0.15)
  child.rotation.x = -0.5 * Math.PI
  child.position.x = -100
  child.position.y = -60
})
```

```js
function render() {
  ...
  var delta = clock.getDelta()
  THREE.AnimationHandler.update(delta)
  ...
}
```

### MD2モデルのアニメーション
- [15-animation-from-md2.html](https://codepen.io/kesuiket/pen/JJEJob)

MD2フォーマットは1996年から続くすばらしいゲーム『Quake』のキャラクターをモデリングするために作成されました.<br>
MD2フォーマットを読み込むにはこれまでと同様 MD2Loader も利用できますが, それよりも
MD2Character を使用したほうが作業が簡単です

```html
<script src="../libs/loaders/MD2Loader.js"></script>
<script src="../libs/MD2Character.js"></script>
```

```js
var character = new THREE.MD2Character()
character.loadParts({
  baseUrl: '../assets/models/ogre/', // モデル本体やスキン, 武器を読み込む際のベースとなるURL
  body: 'ogro.md2', // モデル本体のファイル名
  skins: ['skin.jpg'], // モデルで使用されるスキンのファイル名を配列で指定する
  weapons: [], // 利用できるすべての武器モデルのファイル名を配列で指定する
})
```

```js
scene.add(character.root)
```

キャラクターにアニメーションさせるには, モデルの読み込み完了した後で
`THREE.MD2Character` オブジェクトの `setAnimation()` を呼び出す必要があります.
それには次のようなコードを `character.loadParts()` の呼び出しの前に追加してください

```js
character.onLoadComplete = function() {
  ...
  
  character.setAnimation(controls.animations)
  character.setPlaybackRate(controls.fps)
}
```

`onLoadComplete()` を設定することで `loadParts()` 呼び出し後の処理を定義できます.
`setAnimation()` でアニメーションの名前を指定し, `setPlaybackRate()` でアニメーションのFPSを指定します.

```js
var animations = character.meshBody.geometry.animations
var animLabels = []

animations.forEach(function(anim) {
  animLabels.push(anim.name)
})

gui.add(controls, 'animations', animLabels).onChange(function(e) {
  character.setAnimation(controls.animmations)
})

gui.add(controls, 'fps', 1, 20).step(1).onChange(function(e) {
  character.setPlaybackRate(controls.fps)
})
```

最後に描画ループ内で `character.update()` を呼び出すと実際にアニメーションが開始します.
```js
var delta = clock.getDelta()
character.update(delta)
```

## まとめ
