# シャドーイング
## シャドーイングの実装方法
### 影の必要性
現実の3次元空間上に存在する物体の位置関係を, 人間は2つの目から入ってくる情報の差から脳内で演算して認識しています.
これは無意識階層で行われています.またさらに, 過去の経験を踏まえた情報を保管して最終的に判断しています.
つまり, 両目で2次元平面上に射影された描画結果をいくら見続けても判断することは不可能です.

そのため, CGの世界では距離感を表現するための手法として影を描画します.

### 影描画の手法と実装手順
影とは無論, 光源から発せられた光が遮られたときに, 遮られた領域が暗くなる現象です.<br>
CGは, 光源に視点を置いて見えない領域, つまり光が直接当たっていない領域に色をつけることで影とします.
__シャドーマッピング__ と呼ばれる手法で, three.js でも簡単に実装するための手段が用意されています.<br>
<sup>一般に, シャドーマッピングは比較的高負荷なため多用する際は注意が必要です</sup>

##### 影描画の実装手順

1. レンダラーオブジェクト (shadowMap.enabled = true)
2. 光源オブジェクト (castShadow = true)
3. 影生成元のオブジェクト (castShadow = true)
4. 影描画オブジェクト (receiveShadow = true)

#### 1. レンダラーオブジェクト (three.js 初期化関数)
```js
// シャドーマップの利用
renderer.shadowMap.enabled = true
```

#### 2. 光源オブジェクト (光源初期化関数)

```js
// 平行光源オブジェクトの影の生成元
directionalLight.castShadow = true
```

#### 3. 4. 影生成元オブジェクトと影描画オブジェクト (オブジェクト初期化関数)

```js
var axis
var cube
var torus
var plane
function initObject() {
  ...
  // 直方体オブジェクトの描画
  // 形状オブジェクトの宣言と生成
  var geometry = new THREE.BoxGeometry(20, 20, 20)
  // 材質オブジェクトの宣言と生成
  var material = new THREE.MeshLambertMaterial({ color: 0xff0000 })
  // 直方体オブジェクトの生成
  cube = new THREE.Mesh(geometry, material)
  // 直方体オブジェクトの影の生成元
  cube.castShadow = true
  // 直方体オブジェクトのシーンへの追加
  scene.add(cube)
  // 直方体オブジェクトの位置座標を設定
  cebe.position.set(0, 40, 30)
  
  // トーラスオブジェクトの描画
  // 形状オブジェクトの宣言と生成
  var geometry = new THREE.TorusGeometry(20, 50, 50, 50)
  // 材質オブジェクトの宣言と生成
  var material = new THREE.MeshLambertMaterial({ color: 0xfffe98d })
  // トーラスオブジェクトの生成
  torus = new THREE.Mesh(geometry, material)
  // トーラスオブジェクトの影の生成元
  torus.castShadow = true
  // トーラスオブジェクトのシーンへのつか
  scene.add(torus)
  // トーラスオブジェクトの位置座標の設定
  torus.position.set(30, -10, 30)
  
  // 平面オブジェクトの描画
  // 形状オブジェクトの宣言と生成
  var geometry = new THREE.PlaneGeometry()
  // 材質オブジェクトの宣言と生成
  var material = new THREE.MeshLambertMaterial({ color: 0xeeeeee })
  // 平面オブジェクトの生成
  plane = new THREE.Mesh(geometry, material)
  // 平面オブジェクトの影の描画
  plane.receiveShadow = true
  // 平面オブジェクトのシーンへの追加
  scene.add(plane)
}
```

##### シャドーカメラのサイズを指定 `>= r75`
デフォルトでは平行光源に対する影が意図通り描画されません.
シャドーイングにて利用されるシャドーカメラと呼ばれるカメラの大きさがデフォルトでは小さすぎるため, 影が一部しか描画されません.<br>
そのため, シャドーカメラのサイズを以下のとおり指定します.

```js
// 生投影カメラのパラメータ
directionalLight.shadow.camera.left = -100 // 左
directionalLight.shadow.camera.right = 100 // 右
directionalLight.shadow.camera.top = 100 // 上
directionalLight.shadpw.camera.bottom = -100 // 下
directionalLight.shadow.camera.near = 0 // 手前
directionalLight.shadow.camera.far = 300 // 奥
```

### castShadow プロパティと receiveShadow プロパティ
Object3Dクラスのプロパティとして定義されています.
そのため両プロパティを登場する3次元オブジェクトすべてに存在します.

```js
// 直方体オブジェクトの影の生成元
cube.castShadow = true
// 直方体オブジェクトの影の描画
cube.receiveShadow = true
```

### WebGLShadowMap クラス
通常 three.js 内部のみで利用され, ユーザーが本クラスのオブジェクトを生成することはありません.<br>

```js
var shadowMap = new THREE.WebGLShadowMap(_renderer:WebGLRenderer, _lights:object, _objects:WebGLObjects)
```

### LightShadow クラス
- [three.js docs - __LightShadow__](https://threejs.org/docs/#api/lights/shadows/LightShadow)

```js
var shadow = new THREE.LightShadow(camera:Camera)
```

## シャドーイング関連パラメータ
### シャドーカメラ
シャドーマッピングとは, 光源から光が到達する範囲を撮影する __シャドーカメラ__ と呼ばれる専用のカメラを用いて,
このカメラに撮影されていない領域を影として処理する技法です.

### シャドーカメラの可視化
シャドーカメラを可視化することで, 影生成元オブジェクトが視体積内に収まっているかを確かめます.

```js
// 正投影カメラのパラメータ
directionalLight.shadow.camera.left = -100 // 左
directionalLight.shadow.camera.right = 100 // 右
directionalLight.shadow.camera.top = 100 // 上
directionalLight.shadow.camera.bottom = -100 // 下
directionalLight.shadow.camera.near = 0 // 手前
directionalLight.shadow.camera.far = 300 // 奥
// シャドーカメラ可視化オブジェクトの生成
cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// シャドーカメラ可視化オブジェクトのシーンへの追加
scene.add(cameraHelper)
```

##### 平行光源ベクトルのターゲットオブジェクトの設定
平行光源ベクトルは, デフォルトで光源位置から原点に向かう方向で定義されます.
`target` プロパティに任意の3次元オブジェクトを指定することで, 
平行光源ベクトルを光源位置からオブジェクトの位置への方向へと指定することができます.

```js
directionalLight.target = cube
```

### CameraHelper クラス
- [three.js docs - __CameraHelper__](https://threejs.org/docs/#api/helpers/CameraHelper)

```js
var shadow = new THREE.CameraHelper(camera:Camera)
```

### 影の高精密化
影の描画の精密度はシャドーマップのサイズで決まります.
影の描画が大雑把であるのは, シャドーマップのサイズが小さいために起こります.

シャドーマップのサイズは, 光源オブジェクトの shadow プロパティの mapSize プロパティ (Vector2クラス) で指定することができます.

```js
// 平行光源オブジェクトのシャドーマップのサイズ
directionalLight.shadow.mapSize.x = 2048
directionalLight.shadow.mapSize.y = 2048
```

シャドーマップのサイズは大きいほど精密な描画を行うことができます.
ちなみに, シャドーマップのサイズは絶対値であるため, シャドーカメラの大きさを小さくすることで,
シャドーマップのサイズが小さくても影の描画は精密になります.

### シャドーマップのフィルタリング
シャドーマップのサイズを大きくすることで, 影と影ではない領域の境界をくっきりさせました.
しかしながら, シャドーマップのサイズが大きくなるほど描画に必要な計算処理が大きくなってしまいます.
そこで導入されるのが __PCF__ (Percentage Closer Filtering) です.
これは, 小さなサイズのシャドーマップを用いて, 影をその面積の割合に対応する中間色で描画して境界をぼかす技法です

- BasicShadowMap: 影の描画色の有無だけで2値化したシャドーマップを実現する
- PCFShadowMap: シャドーマップ上の影の面積の割合から影の描画色を決定する (PCF)
- PCFSoftShadowMap: PCFの結果に対して隣り合う影の描画色を用いてさらに線形補間で滑らかにする

これらは, レンダラーオブジェクトの shadowMap プロパティに格納される WebGLShadowMap クラスの type プロパティに指定します.

```js
// シャドーマップの計算タイプ
// renderer.shadowMap.type = THREE.BasicShadowMap // PCFなし
// renderer.shadowMap.type = THREE.PCFShadowMap //PCFあり (デフォルト)
renderer.shadowMap.type = THREE.PCFSoftShadowMap // ソフト化PCF
```

## スポットライト光源と点光源によるシャドーイング
### スポットライト光源によるシャドーイング

```js
// スポットライトオブジェクトの影の生成元
spotLight.castShadow = true
```

### スポットライト光源のシャドーカメラの可視化

```js
// シャドーカメラ可視化オブジェクトの生成
cameraHelper = new THREE.CameraHelper(spotLight.shadow.camera)
// シャドーカメラ可視化オブジェクトのシーンへの追加
scene.add(cameraHelper)
```

厳密にはスポットライト光源のカットオフ角度 (angle) とシャドーカメラの fov を一致させる必要があります.

### 点光源によるシャドーイング
点光源のシャドーカメラは, `r75` から用意されています.

```js
// 点光源オブジェクトの影の生成
pointLight.castShadow = true
```

### 点光源のシャドーカメラの可視化

```js
// シャドーカメラ可視化オブジェクトへの生成
cameraHelper = new THREE.CameraHelper(spotLight.shadow.camera)
// シャドーカメラ可視化オブジェクトのシーンへの追加
scene.add(cameraHelper)
```

実行して気づくことですが, シャドーカメラは全く意図通りに方向を向いていません.
しかしながら, 影は意図通りに描画されています.
この結果から憶測されるのは, 点光源に対するシャドーイングは, 1度の描画に対して異なる方向から
複数回シャドーカメラで撮影しているのではないかということです.

## シャドーマップの可視化方法
### シャドーマップ可視化オブジェクトの生成
シャドーマップが適切に生成されていることを確認するための仕組みが用意されています.

このシャドーマップ可視化用のオブジェクトは通常の3次元オブジェクトとは異なり, 専用のシーンオブジェクトに格納されています

1. 外部ファイルの読み込み
2. シャドーマップ可視化オブジェクトの生成 (shadowMapViewer クラス)
3. シャドーマップ可視化オブジェクトのレンダリング

#### 1. 外部ファイルの読み込み

```html
<script src="js/shader/UnpackDepthRGBAShader.js"></script>
<script src="js/utils/ShadowMapViewer.js"></script>
```

#### 2. シャドーマップ可視化オブジェクトの生成

```js
// シャドーマップ可視化オブジェクトの生成
shadowMapViewer = new THREE.ShadowMapViewer(directionalLight)
shadowMapViewer.position.x = 10
shadowMapViewer.position.y = 10
shadowMapViewer.size.width = window.innerWidth / 3
shadowMapViewer.size.height = window.innerHeight / 3
shadowMapViewer.update()
```

#### 3. シャドーマップ可視化オブジェクトのレンダリング

```js
// レンダリング
renderer.render(scene, camera)
// シャドーマップのレンダリング
shadowMapViewer.render(renderer)
```

### ShadowMapViewer クラス
`/examples/js/shaders/UnpackDepthRGBAShader.js` を読み込んでおく必要があります.

```js
var shadowMapViewer = new THREE.ShadowMapViewer(light:Light)
```

### シャドーオブジェクトの生成
- [three.js webgl - __ShadowMesh__](https://threejs.org/examples/webgl_shadowmesh.html)

three.js の外部ファイルに光源によって生じる影に対応する通常の3次元オブジェクトを生成する ShadowMesh クラスが定義されています

見た目には通常のシャドーイングの結果のように見えますが, 影部分は影を模した3次元オブジェクト（シャドーオブジェクト）です.
通常のシャドーイングとは独立なので, アイデア次第で影を利用したさまざまな効果として利用することができます.<br>
ただし, シャドーオブジェクトには平面への影しか表現できないという欠点があります.

1. 外部ファイルの読み込み
2. シャドーオブジェクトの生成 (ShadowMesh クラス)
3. シャドーオブジェクト

#### 1. 外部ファイルの読み込み

```html
<script src="js/objects/ShadowMesh.js"></script>
```

#### 2. シャドーオブジェクトの生成

```js
// シャドーオブジェクトの生成
cubeShadow = new THREE.ShadowMesh(cube)
// シャドーオブジェクトのシーンへの追加
scene.add(cubeShadow)
// 平面の方程式
groundPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0.01)
// 光源4次元ベクトル
lightPosition4D = new THREE.Vector4()
```

#### 3. シャドーオブジェクトの更新
無限ループ関数内でシャドーオブジェクトの形と位置を更新する update メソッドを実行します.
そのメソッドの引数に平面の方程式と4次元ベクトルを与えます.

```js
// 光源4次元ベクトルの取得
lightPosition4D.x = directionalLight.position.x
lightPosition4D.y = directionalLight.position.y
lightPosition4D.z = directionalLight.position.z
lightPosition4D.w = 0 // 平行光源のbaaiha「0」, 点光源の場合は「1」
// シャドーオブジェクトの更新
cubeShadow.update(groupPlane, lightPosition4D)
```

### ShadowMesh クラス
- [ShadowMesh.js](https://github.com/mrdoob/three.js/blob/master/examples/js/objects/ShadowMesh.js)

```js
var shadowMapViewer = new THREE.ShadowMesh(mesh:Mesh)
```
