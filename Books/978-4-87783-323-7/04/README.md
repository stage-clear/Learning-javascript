# 3次元オブジェクトの制御
## さまざまな数学クラス
### Vector2 クラス
- [three.js docs - __Vector2__](https://threejs.org/docs/#api/math/Vector2)

```js
var vector = new THREE.Vector2(x, y)
```

### Vector3 クラス
- [threes.js docs - __Vector3__](https://threejs.org/docs/#api/math/Vector3)

```js
var vector = new THREE.Vector3(x, y, z)
```

### Vector4 クラス
- [three.js docs - __Vector4__](https://threejs.org/docs/#api/math/Vector4)

```js
var vector = new THREE.Vector4(x, y, z, w)
```

### Matrix3 クラス
- [three.js docs - __Matrix3__](https://threejs.org/docs/#api/math/Matrix3)

```js
var matrix = new THREE.Matrix3(
  n11, n12, n13,
  n21, n22, n23,
  n31, n32, n33,
)
```

### Matrix4 クラス
- [thress.js docs - __Matrix4__](https://threejs.org/docs/#api/math/Matrix4)

```js
var matrix = new THREE.Matrix4(
  n11, n12, n13, n14,
  n21, n22, n23, n24,
  n31, n32, n33, n34,
  n41, n42, n43, n44,
)
```

### Quaternion クラス
- [three.js docs - __Quaternion__](https://threejs.org/docs/#api/math/Quaternion)

```js
var quaternion = new THREE.Quaternion(x, y, z, w)
```

### Euler クラス
- [three.js docs - __Euler__](https://threejs.org/docs/#api/math/Euler)

```js
var euler = new THREE.Euler(x, y, z, order)
```

### Box2 クラス
- [three.js docs - __Box2__](https://threejs.org/docs/#api/math/Box2)

```js
var box2 = new THREE.Box2(min:Vector2, max:Vector2)
```

### Box3 クラス
- [three.js docs - __Box3__](https://threejs.org/docs/#api/math/Box3)

```js
var box3 = new THREE.Box3(min:Vector3, max:Vector3)
```

### Line3 クラス
- [three.js docs - __Line3__](https://threejs.org/docs/#api/math/Line3)

```js
var line3 = new THREE.Line3(start:Vector3, end:Vector3)
```

### Triangle クラス
- [three.js docs - __Triangle__](https://threejs.org/docs/#api/math/Triangle)

```js
var triangle = new THREE.Triangle(a:Vector3, b:Vector3, c:Vector3)
```

### Plane クラス
- [three.js docs - __Plane__](https://threejs.org/docs/#api/math/Plane)

2次元空間中の英面は ax + by + cz + d = 0 で表すことができるため,
4つのパラメータ a, b, c, d で特徴づけられます.
平面の規格化された法線ベクトルは先の方程式のパラメータ a, b, c を用いて
n = 1 √ a<sup>2</sup> + b<sup>2</sup> + c<sup>2<sup>(a,b,c) で表されるため,
平面は法線ベクトルと定数dで表現できます.

```js
var plane = new THREE.Plane(normal:Vector3, constnt:float)
```

### Sphere クラス
- [three.js docs - __Sphere__](https://threejs.org/docs/#api/math/Sphere)

```js
var sphere = new THREE.Sphere(center:Vector3, radius:float)
```

### Spherical クラス
- [three.js docs - __Spherical__](https://threejs.org/docs/#api/math/Spherical)

2次元空間中の極座標を数学的に取り扱うオブジェクトを生成するクラスです
極座標は半径, 仰角, 方位角で特徴づけられます.

```js
var spherical = new THREE.Spherical(radius:float, phi:float, theta:float)
```

### Math ユーティリティ
- [three.js docs - __Math__](https://threejs.org/docs/#api/math/Math)

```js
Math.関数名
```

## 移動・回転・拡大
### Object3D クラス
- [three.js docs - __Object3D__](https://threejs.org/docs/#api/core/Object3D)

```js
var object = new THREE.Object3D()
```

### 3次元オブジェクトのグループ化（Group クラス）
- [three.js docs - __Group__](https://threejs.org/docs/#api/objects/Group)

```js
var axis
var arrows
function initObject() {
  // ... 軸オブジェクトを省略
  // 矢印オブジェクトをグループ化するオブジェクトの生成
  arrows = new THREE.Group()
  // x軸方向矢印オブジェクトの生成と追加
  arrows.add(
    new THREE.ArrowHelper(
      new THREE.Vector3(1, 0, 0), // 方向
      new THREE.Vector3(0, 0, 0), // 原点
      60,                         // 長さ
      0xff0000,                   // 色
      10,                         // 矢印頭の長さ
      5,                          // 矢印頭の大きさ
    )
  )

  // y軸方向矢印オブジェクトの生成と追加
  arrows.add(
    new THREE.ArrowHelper(
      new THREE.Vector3(0, 1, 0), // 方向
      new THREE.Vector3(0, 0, 0), // 原点
      60,                         // 長さ
      0x00ff00,                   // 色
      10,                         // 矢印頭の長さ
      5,                          // 矢印頭の大きさ
    )
  )
  
  // z軸
  arrows.add(
    new THREE.ArrowHelper(
      new THREE.Vector3(0, 0, 1), // 方向
      new THREE.Vector3(0, 0, 0), // 原点
      60,                         // 長さ
      0x0000ff,                   // 色
      10,                         // 矢印頭の長さ
      5,                          // 矢印頭の大きさ
    )
  )
  
  // 3軸矢印オブジェクトのシーンへの追加
  scene.add(arrows)
}
```

### 位置座標の指定
##### 位置座標の指定

1. Vector3 クラスの set メソッドを利用

```js
arrows.position.set(x, y, z)
```

2. Vector3 クラスの setX メソッド, setY メソッド, setZ メソッドを利用

```js
arrows.position.setX(x)
arrows.position.setY(y)
arrows.position.setZ(z)
```

3. Vector3 クラス x, y, z プロパティに直接代入

```js
arrows.position.x = x
arrows.position.y = y
arrows.position.z = z
```

```js
var axis
var arrows

function initObject() {
  // ...
  // ...
  // 3軸オブジェクトの位置座標を設定
  arrows.position.set(25, 20, 15)
}
```

### オイラー角による回転角の設定

##### オイラー角の定義
回転におる座標変換は, もとの座標系における位置座標ベクトル（x, y, z）に対して,
各軸の回転に対する回転行列を順番に行列積を行うことで, __新しい座標における位置座標ベクトル（x', y', z'）__ を得ることができます.
行列の演算が演算の順番によって結果が異なる（__非可換__）ことから, x軸y軸z軸の回転の順番によって結果が異なりmasu.

##### three.js におけるオイラー角による回転角の指定方法

```js
arrows.rotation = new THREE.Vector3(α:回転角度, β:回転角度, γ:回転角度)
```

```js
arrows.rotation.set(Math.PI / 6,           0,           0)
arrows.rotation.set(Math.PI / 6, Math.PI / 6,           0)
arrows.rotation.set(Math.PI / 6, Math.PI / 6, Math.PI / 6)
```

オイラー角を用いること3次元オブジェクトは任意の回転角を指定することができます.
しかしながら, 任意の回転軸に対して回転させたい場合に, どのようにオイラー角を指定していいのか直感的にはわかりません.
またらさらに, 回転演算を繰り返して行なっていくときに特定の条件で __ジンバルロック__ と呼ばれる問題が生じることが知られています.

コンピューターグラフィックでは, もっぱらクォータニオンと呼ばれる代数を用いた回転角の指定が一般に行われます.

### クォータニオンによる回転角の指定
任意の回転軸に対する回転を軸ベクトルと回転角で表したものです.
three.js では, この `x, y, z` と `θ` を与えることで, 3次元オブジェクトの回転を実装することができます.

##### クォータニオンによる任意回転軸の実装手順
1. クォータニオンを利用することで宣言
2. 軸ベクトル Vector3 クラスのオブジェクトを用いて定義
3. 回転角を指定
4. クォータニオンクラスのオブジェクトを宣言
5. 軸ベクトルと回転角からクォータニオンを計算
6. 3次元オブジェクト（3軸矢印オブジェクト）にクォータニオンを代入

```js
// クォータニオンの利用を宣言
/* arrows.useQuaternion = true */
// 回転ベクトルを宣言
var axis = new THREE.Vector3(1, 1, 1)
// 回転軸ベクトルを規格化
axis.normalize()
// 回転角度を指定
var angle = Math.PI / 3
// クォータニオンオブジェクトの宣言
var q = new THREE.Quaternion()
// 3軸矢印オブジェクトの「quaternion プロパティ」に代入
arrows.quaternion.copy(q)
```

###### プログラミングメモ: メソッドチェーンの利用

```js
var axis = new THREE.Vector3(1, 1, 1).normalize()
```

```js
var q = new THREE.Quaternion().setFromAxisAngle(axis, angle)
```

```js
var q = new THREE.Quaternion().setFromAxisAngle(
  new THREE.Vector3(1, 1, 1).normalize(),
  Math.PI / 3
)
```

```js
arrows.quaternion.setFromAxisAngle(
  new THREE.Vector3(1, 1, 1).normalize(),
  Math.PI / 3
)
```
copy メソッドは利用していません.

### 3次元オブジェクトの拡大と縮小
##### three.js における拡大率の指定方法

```js
// 3軸オブジェクトの拡大率を設定
arrows.scale.set(x:x軸方向の拡大率, y:y軸方向の拡大率, z:z軸方向の拡大率)
```

```js
// x軸方向に0.5倍, y軸方向に1.2倍, z軸方向に0.8倍
arrows.scale.set(0.5, 1.2, 0.8)
```

拡大率も位置座標と同様に, プロパティに直接指定することもできます.
```js
arrows.scale.x = 0.5
arrows.scale.y = 1.2
arrows.scale.z = 0.8
```

## three.js によるアニメーション
### JavaScript によるアニメーション

```js
function loop() {
  // 各時間ステップによる描画
  requestAnimationFrame(loop)
}
```

### アニメーション実行のための構成
##### アニメーション実装までの手順
1. three.js スタート関数の定義にて無限ループ関数を実行
2. オブジェクト初期化関数の定義に3つの直方体オブジェクトを準備
3. 描画実行関数を削除し → 無限ループ関数の定義

##### three.js スタート関数の定義

```js
function threeStart() {
  initThree()
  initCamera()
  initLight()
  initObject()
  loop()
}
```

##### オブジェクト初期化関数の定義

```js
var axis 
var cubes = []

function initObject() {
  // ... 軸オブジェクトを省略
  var geometry = new THREE.BoxGeometry()
  var material = new THREE.MeshNormalMaterial()

  // 直方体のオブジェクト
  cubes[0] = new THREE.Mesh(geometry, material)
  scene.add(cube[0])
  cubes[0].position.set(0, -50, 0)
  
  // 直方体オブジェクト2個目
  cubes[1] = new THREE.Mesh(geometry, material)
  scene.add(cube[1])
  cubes[1].position.set(0, 0, 0)
  
  // 直方体オブジェクト3個目
  cubes[2] = new THREE.Mesh(geometry, material)
  scene.add(cube[2])
  cubes[2].position.set(0, 50, 0)
}
```

##### 無限ループ関数の定義
```js
var step = 0
function loop() {
  // ステップ数のインクリメント
  step++
  // 各直方体の角度の変更
  cubes[0].rotation.set(step / 100, 0, 0)
  cubes[1].rotation.set(0, step / 100, 0)
  cubes[2].rotation.set(0, 0, step / 100)
  // レンダリング
  renderer.render(scene, camera)
  // loop関数の呼び出し
  requestAnimationFrame(loop)
}
```

### カメラ移動のアニメーション

```js
var cameraX = 150 * Math.cos(step / 100)
var cameraY = 150 * Math.sin(step / 100)
var cameraZ = 150 * Math.cos(step / 100)
```

```js
var step = 0
function loop() {
  // カメラ位置座標の計算
  var cameraX = 150 * Math.cos(step / 100)
  var cameraY = 150 * Math.sin(step / 100)
  var cameraZ = 150 * Math.cos(step / 100)
  
  // カメラ位置座標の変更
  camera.position.set(cameraX, cameraY, cameraZ)
  camera.up.set(0, 0, 1)
  camera.lookAt({x: 0, y: 0, z: 0 })
  
  ...
}
```
> カメラオブジェクトは position プロパティを変更しただけでは位置の変更結果は反映されません.
> lookAt メソッドを実行する必要があります

## マウスによるカメラ操作
### トラックボールコントロール
マウスドラッグ, マウスホイールによるカメラの移動を行うための __TrackballControls クラス__ が準備されています.
- [three.js examples - TrackballControls](https://threejs.org/examples/#misc_controls_trackball)

##### TrackballControls.js の読み込み方法

```js
<script src="three.js"></script>
<script src="examples/js/controls/TrackballControls.js"></script>
```

##### トラックボールの利用方法(1) - カメラ初期化関数
トラックボールは, カメラ初期化関数内でトラックボールオブジェクトの宣言とプロパティを設定することで利用可能となります.

```js
// カメラ初期化関数の定義
var camera 
function initCamera() {
  camera = new THREE.PrespectiveCamera(
    45,
    canvasFrame.clientWidth / canvasFrame.clientHeight,
    1, 10000
  )

  camera.position.set(100, 100, 100)
  camera.up.set(0, 0, 1)
  camera.lookAt({x: 0, y: 0, z: 0}) // トラックボール利用時は自動的に無効
                                    // その代わりに, トラックボールオブジェクトの target を設定します
  trackball = new THREE.TrackballControls(camera, canvasFrame)
  // トラックボール（左ボタンクリック）による回転無効化と回転速度
  trackball.noRotate = false 
  trackball.rotateSpeed = 2.0
  // トラックボール（ホイール回転）による拡大無効化と拡大速度の設定
  trackball.noZoom = false
  trackball.zoomSpeed = 1.0
  // トラックボール（右ドラッグ）によるカメラ視野中心座標移動の無効化と中心速度の設定
  trackball.noPan = false
  trackball.zoomSpeed = 1.0
  trackball.target = new THREE.Vector3(0, 0, 10)
  // トラックボールのスタティックムーブの有効化（false にするとダイナミックムーブ）
  // （左ボタンドラッグ終了と同時に, カメラ位置座標回転をストップさせる動作）
  trackall.staticMoving = true
  // トラックボールのダイナミックムーブ時の減衰定数
  // (左ボタンドラッグ終了後も回転を続けます) 
  trackball.dynamicDampingFactor = 0.3
}
```

##### トラックボールの利用方法（2）- 無限ループ関数

```js
// トラックボールによるカメラオブジェクトのプロパティの更新
trackball.update()
```

### TrackballControls クラス
- [TrackballControls.js](https://github.com/mrdoob/three.js/blob/master/examples/js/controls/TrackballControls.js)

PerspectiveCamera クラス専用です

```js
var trackball = new THREE.TrackballControls(camera:Camera, domElement:domElement)
```

### OrthographicTrackballControls クラス
- [OrthographicTrackballControls.js](https://github.com/mrdoob/three.js/blob/master/examples/js/controls/OrthographicTrackballControls.js)

OrthographicCamera クラス専用です.

```js
var trackball = new THREE.OrthographicTrackballControls(camera:Camera, domElement:domElement)
```

### フライコントロール
空を飛ぶような視覚効果を得るためのクラスです.
- [three.js example - FlyControls](https://threejs.org/examples/#misc_controls_fly)

##### フライコントロールの利用方法（1）- カメラ初期化関数

```js
var camera
var control
function initCamera() {
  camera = new THREE.PerspectiveCamera(
    45,
    canvasFrame.clientWidth / canvasFrame.clientHeight,
    1, 10000
  )
  
  camera.position.set(0, 0, 200)
  camera.up.set(0, 0, 1)
  camera.lookAt({ x: 0, y: 0, z: 0 })
  control = new THREE.FlyControls(camera, canvasFrame)
  // カメラの前進・後退速度
  control.movementSpeed = 100.0
  // カメラの回転速度
  control.rollSpeed = Math.PI / 6
  // 自動前進の有無（canvas要素がアクティブの状態である必要があります）
  control.autoForward = false
  // マウスドラッグによるカメラの回転の有無
  control.dragToLook = false
}
```

##### フライコントロールの利用方法（2）- 無限ループ価数

```js
var nowTime = new Date()                  // 現在時刻オブジェクトの取得
var delta = (nowTime - lastTime) / 1000   // 1フレームあたりの経過時間
lastTime = nowTime
// フライコントロールによるカメラオブジェクトのプロパティの更新
control.update(delta)
```

### FlyControls クラス
- [FlyControls.js](https://github.com/mrdoob/three.js/blob/master/examples/js/controls/FlyControls.js)

```js
var control = new THREE.FlyControls(camera:Camera, domElement:domElement)
```

### ポインターコントロール
HTML5で採用されたAPIの1つである[マウスポインターを非表示にする機能](https://developer.mozilla.org/ja/docs/API/Pointer_Lock_API)を利用して
マウスポインターを非表示にして, マウスを前後左右に動かすとカメラの方向を変えるという操作を実現する仕組みです.
- [three.js examples - pointerlock](https://threejs.org/examples/#misc_controls_pointerlock)

``` js
var camera
var control
function initCamera() {
  camera = new THREE.PerspectiveCamera(
    60,
    canvasFrame.clientWidth / canvasFrame.clientWidth,
    1, 10000
  )
  
  camera.position.set(20, 0, 100)
  camera.up.set(0, 0, 1) // ポインターロックコントロール時は無効
  camera.lookAt({ x: 0, y: 0, z: 0 }) // ポインターロックコントロール時は無効
  // ポインターロックコントロールオブジェクト
  control = new THREE.PointerLockControls(camera)
  scene.add(controls.getObject())
  // キャンバスフレーム要素をクリックした時のイベント登録
  canvasFrame.addEventListener('click', function(event) {
    document.body.requestPointerLock()
  }, false)
  // ポインターロックイベントの追加
  document.addEventListener('pointerlockchange', pointerlockchange)
  // ポインターロックの変更時に呼び出される関数
  function pointerlockchange(event) {
    if (document.pointerLockElement === document.body) {
      // ポインターロックコントロールを有効化
      control.enabled = true
    } else {
      // ポインターロックコントロールの無効化
      control.enabled = false
    }
  }
}
```

### ポインターロックコントロール＆キーボードによるカメラコントロール
1. カメラ位置の移動に関するフラグと速度ベクトルの準備（カメラ初期化関数）
2. キーボードイベントの登録（カメラ初期化関数）
3. 各種フラグに対応したカメラ位置の更新（無限ループ関数）

##### （1）（2）カメラ初期化関数

```js
function initCamera() {
  ...
  control.moveForward = false   // 前進
  control.moveBackward = false  // 後進
  control.moveLeft = false      // 左進
  control.moveRight = false     // 右進
  control.canJump = false       // ジャンプ可能
  // 速度ベクトル
  control.velocity = new THREE.Vector3()
  // キーダウンイベント
  document.addEventListener('keydown', function(event) {
    // キーの種類の判定
    switch(event.keyCode) {
      case 38: // ↑
      case 87: // w
        control.moveForward = true
        break
      case 37: // ←
      case 65: // a
        control.moveLeft = true
        break
      case 40: // ↓
      case 83: // s
        control.moveBackward = true
        break
      case 39: // →
      case 68: // d
        control.moveRight = true
        break
      case 32: // スペース
        if (control.canJump === true) control.velocity.y += 300
        control.canJump = false
        break
    }
  }, false)
  
  // キーアップイベント
  document.addEventListener('keyup', function(event) {
    switch(event.keyCode) {
      case 38: //
      case 87:
        control.moveForward = false
        break
      case 37:
      case 65:
        control.moveLeft = false
        break
      case 37:
      case 65:
        control.moveBackward = false
        break
      case 40:
      case 83:
        control.moveRight = false
        break
    }
  }, false)
}
```

##### （3）無限ループ関数

```js
var lastTime = new Date()
function loop() {
  ...
  // ポインターロックが有効の場合
  if (control.enabled) {
    var nowTime = new Date()
    var delta = (nowTime - lastTime) / 1000
    lastTime = nowTime
    // 減速
    control.velocity.x -= control.velocity.x * 10.0 * delta
    control.velocity.z -= control.velocity.z * 10.0 * delta
    control.velocity.y -= 0.8 * 100 * delta
    // カメラの移動速度の更新
    if (control.moveForward) control.velocity.z -= 400.0 * delta
    if (control.moveBackward) control.velocity.z += 400.0 * delta
    if (control.moveLeft) control.velocity.x -= 400.0 * delta
    if (control.moveRight) control.velocty.x += 400.0 * delta
    // カメラの位置座標の更新
    control.getObject().translateX(control.velocity.x * delta)
    control.getObject().translateY(control.velocity.y * delta)
    control.getObject().translateZ(control.velocity.z * delta)
    // yの最小値の判定
    if (control.getObject().position.y < 10) {
      // 速度0, 位置10に固定
      control.velocity.y = 0
      control.getObject().position.y = 10
      // ジャンプ可能フラグを設定
      control.canJump = true
    }
  }
}
```

### PointerLockControls クラス
- [PointerLockControls.js](https://github.com/mrdoob/three.js/blob/master/examples/js/controls/PointerLockControls.js)

```js
var control = new THREE.PointerLockControls(camera:Camera)
```

### orbitControls クラス
- [OrbitControls.js](https://github.com/mrdoob/three.js/blob/master/examples/js/controls/OrbitControls.js)
- [three.js exapmle orbit](https://threejs.org/examples/#misc_controls_orbit)

マウスドラッグによるカメラ位置座標の移動を実現するクラスです.
カメラの制御にクォータニオンを利用しておらず, カメラの位置座標ベクトルとy軸とのなす角である PolarAngle が0やπとなる場合に,
カメラは特異的な動きとなる点に注意が必要です.

```js
controls = new THREE.OrbitControls(object:Camera, domElement:domElement)
```

### FirstPersonControls クラス
- [FirstPersonControls.js](https://github.com/mrdoob/three.js/blob/master/examples/js/controls/FirstPersonControls.js)

```js
var control = new THREE.FirstPersonControls(camera:Camera: domElement:domElement)
```

## マウスによるオブジェクト操作
### DragControls クラスによるオブジェクトの実装
- [three.js examples - draggablecubes](https://threejs.org/examples/#Boxes_DragControls)
r75では, 3次元オブジェクトをマウスドラッグで平行移動させることができるクラスが用意されました.

```js
var dragcontrols
function initCamera() {
  ...
  dragcontrols = new THREE.DragControls(camera, null, renderer.domElement)
  // ドラッグコントロールを有効
  dragcontrols.enabled = true
  // マウスドラッグ対象オブジェクト
  var dragObject = null
  // マウスオーバーイベントの登録
  dragcontrols.on('hoveron', function(e) {
    // トラックボールオブジェクトを無効化
    trackball.enabled = false
    // マウスドラッグ対象オブジェクトが存在する場合
    if (dragObject) dragObject.material.opacity = 1.0
    // マウスドラッグ対象オブジェクトを更新
    dragObject = e.target
    // マウスオーバーした3次元オブジェクトを半透明化
    dragObject.material.opacity = 0.5
  })
  
  // マウスアウトイベントの登録
  dragcontrols.on('hoveroff', function(e) {
    // トラックボールオブジェクトを有効化
    trackball.enabled = true
    // マウスオーバーした3次元オブジェクトを不透明化
    if (e) e.object.material.opacity = 1.0
    // マウスドラッグ対象オブジェクトを解除
    dragObject = null
  })
}
```

### DragControls クラス
- [DragControls.js](https://github.com/mrdoob/three.js/blob/master/examples/js/controls/DragControls.js)

```js
var dragcontrols = new THREE.DragControls(camera:Camera, objects:Mesh|Scene, domElement:DOM)
```

##### DragControls クラスによるマウスドラッグの問題点
###### (1) トラックボールコントロールとの併用時

###### (2) マウスドラッグ中にマウスドラッグ対象要素を外れた場合

###### 解決の方針
