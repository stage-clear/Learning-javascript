# 物理演算と立体音響

- オブジェクトが重力の影響を受け, お互いに衝突するようになる [Physijs](http://chandlerprall.github.io/Physijs/) シーン
- シーンないの物体の摩擦係数と反発係数
- Physijs がサポートしているさまざまな形状
- 単純な形状を組み合わせた合成形状
- ハイトフィールドを使用した複雑な形状
- オブジェクトの動きの制限する点制約, ヒンジ制約, スライダー制約, コーンツイスト制約, 自由度制約
- 左右の音量がカメラの位置に基づいて決定される音源

## 基本的な Three.js シーンの作成
- [chandlerprall/Physijs](https://github.com/chandlerprall/Physijs)
- [kripken/ammo.js](https://github.com/kripken/ammo.js/)

```html
<script src="../libs/physi.js"></script>
```

```js
Physijs.scripts.worker = '../libs/physjis_worker.js'
Physijs.scripts.ammo = '../libs/ammo.js'
```

Physijs には通常の Three.js シーンのラッパーがあり, シーンはそのラッパークラスを使用して作成します.
```js
var scene = new Physijs.Scene()
scene.setGravity(new THREE.Vector3(0, -10, 0))
```

Three.js でオブジェクトを作る時には, Physijs ライブラリで動きを管理できるように,
対応する Physijs オブジェクトでラップする必要があります.
```js
var stoneGeom = new THREE.BoxGeometry(0.6, 6, 2)
var stone = new Physijs.BoxMesh(
  stoneGeom,
  new THREE.MeshPhongMaterial({color: 0xff0000}),
)
scene.add(stone)
```

```js
render = function() {
  requestAnimationFrame(render)
  renderer.render(scene, camera)
  scene.simulate()
}
```

- [01-basic-scene.html](https://codepen.io/kesuiket/pen/WOpEVp)

```js
function createGround() {
  var textureLoader = new THREE.TextureLoader()
  var groundMaterial = Physijs.createMaterial(
    new THREE.MeshPhongMaterial({
      map: textureLoader.load('../assets/textures/general/wood-2.jpg')
    }, .9, .3)
  var ground = new THREE.Physijs.BoxMesh(
    new THREE.BoxGeoemtry(60, 1, 60), groundMaterial, 0
  )
  
  var borderLeft = new Physijs.BoxMesh(
    new THREE.BoxGeometry(2, 3, 60), groundMaterial, 0)
  borderLeft.position.x = -31
  borderLeft.position.y = 2
  ground.add(borderLeft)
  
  var borderRight = new Physijs.BoxMesh(
    new THREE.BoxGeometry(2, 3, 60), groundMaterial, 0)
  borderRight.position.x = 31
  borderRight.position.y = 2
  ground.add(borderRight)
  
  var borderBottom = new Physijs.BoxMesh(
    new THREE.BoxGeometry(64, 3, 2), groundMaterial, 0)
  borderBottom.position.z = 30
  borderBottom.position.y = 2
  ground.add(borderBottom)
  
  var borderTop = new Physijs.BoxMesh(
    new THREE.BoxGeometry(64, 3, 2), groundMaterial, 0)
  borderTop.position.z = -30
  borderTop.position.y = 2
  ground.add(borerTop)
  
  scene.add(ground)
}
```
`Physijs.createMaterial()` を使用して作成されている `groundMaterial` です.
この関数は Three.js の標準のマテリアルをラップして, 摩擦係数や反発係数といった設定項目を追加します.

BoxMeshオブジェクトについてはすべて最後の引数が`0`に指定されています.
このパラメータはオブジェクトの質量を設定するものです.
`0`に設定すると地面のオブジェクトは重力の影響を受けなくなります.

```js
var stoneGeom = new THREE.BoxGeometry(0.6, 6, 2)
var stone = new Physijs.BoxMesh(stoneGeom, 
  Physijs.createMaterial(new THREE.MeshPhongMaterial({
    color: scale(Math.random()).hex(),
    transparent: true,
    opacity: 0.8,
  }))
)
stone.position.copy(point)
stone.lookAt(scene.position)
stone.__dirtyRotation = true
stone.position.y = 3.5
scene.add(stone)
```

`lookAt()` を使用して適切な回転角を設定し, ドミノ牌を正しく整列しています.
この処理がないとすべての牌が同じ方向を向いてしまい, うまく倒れません

`rotation` を変更した場合は, 内部的に使用されている `__dirtyRotation` を明示的に設定することで内部表現を更新できます.

```js
stones[0].rotation.x = 0.2
stones[0].__dirtyRotation = true
```

## マテリアルのプロパティ
- [02-material-properties.html](https://codepen.io/kesuiket/pen/QgpOmR)

このサンプルでは Physijs マテリアル作成時に設定される `restitution`プロパティ（反発係数）と
`friction`プロパティ（摩擦係数）の値をいろいろと変更することができます.

restitution プロパティはオブジェクトが衝突したときにどのくらいのエネルギーで反発するかを指定します.
つまり反発係数がを大きくするとよく弾むオブジェクトになり, 小さくすると他のオブジェクトに衝突するとそのまま止まってしまうオブジェクトになります.

> Physijs では次のようにして Physijs メッシュにイベントリスナーを追加できます

```js
mesh.addEventListener('collision', function(otherObject, relativeVelocity, relativeRotation, contactNormal) {
  // do something...
})
```

こオールバック関数の引数はそれぞれ衝突したオブジェクト, 衝突オブジェクト間の相対速度,
衝突オブジェクト間の相対回転速度, 衝突面の法線です.


```js
sphere = new Physijs.SphereMesh(
  new THREE.SphereGeometry(2, 20),
  Physijs.createMaterial(new THREE.MeshPhongMaterial({
    color: colorSphere,
    opacity: 0.8,
    transparent: true,
  }),
  controls.sphereFriction,
  controls.sphereRestitution,
))
```

## サポートされている基本形状
##### Physijsのメッシュ
- `Physijs.PlaneMesh` - このメッシュは厚さのない平面を作成するために利用できる. 厚みの薄い `THREE.BoxGeometry であれば `Physijs.BoxMesh` を利用することもできる
- `Physijs.BoxMesh` - 立方体のようなジオメトリであればこのメッシュを利用する
- `Physijs.SphereMesh` - 球状の形状にはこのメッシュを使用する. このジオメトリは `THREE.SphereGeometry` のためによく利用される
- `Physijs.CylinderMesh` - `THREE.Cylinder` を使用するとさまざまな円柱状の形状を作成できるが, Three.js とは異なり Physijs には円柱のタイプに応じてさまざまなメッシュがある
- `Physijs.ConeMesh` - 
- `Physijs.CapsuleMesh` - 
- `Physijs.ConvexMesh` - 複雑なオブジェクトのために利用できる粗い形状である. 
- `Physijs.ConcaveMesh` - 粗い形状だが, 複雑なジオメトリのさらに詳細な表現である. 計算負荷がたかいということに注意してほしい
- `Physijs.HeightfieldMesh` - ハイトフィールドを作成できる

```js
var plane = new Physijs.PlaneMesh(
  new THREE.PlaneGeometry(5, 5, 10, 10), 
  material,
)
scene.add(plane)
```
- [03-shapes.html](https://codepen.io/kesuiket/pen/mwMgOB)

形状のいくつかを作成しているコードを確認してみましょう.
```js
new Physijs.SphereMesh(new THREE.SphereGeometry(3, 20), mat)
new Physijs.BoxMesh(new THREE.BoxGeometry(4 ,2, 6), mat)
new Physijs.CylinderMesh(new THREE.CylinderGeometry(2, 2, 6), mat)
new Physijs.ConeMesh(new THREE.CylinderGeometry(0, 3, 7, 20, 10), mat)
```

Three.js にはカプセル状のジオメトリはありません.
そのためカプセル形状を自分で作成する必要があります.

```js
var merged = new THREE.Geometry()
var cyl = new THREE.CylinderGeometry(2, 2, 6)
var top = new THREE.SpehreGeometry(2)
var bot = new THREE.SpehreGeometry(2)

var matrix = new THREE.Matrix4()
matrix.makeTranslation(0, 3, 0)
top.applyMatrix(matrix)

var matrix = new THREE.Matrix4()
matrix.makeTranslation(0, -3, 0)
bot.applyMatrix(matrix)

// マージしてカプセルを作成
merged.merge(top)
merged.merge(bot)
merged.merge(cyl)

// physijs のカプセルメッシュの作成
var capsule = new Physijs.CapsuleMesh(
  merged, 
  getMaterial(),
)
```

ハイトフィールドを使用すれば凸凹のある地形を簡単に作成して, 他の全ての物体をこの地形の高低差に適切に反応させることができます.

```
var date = new Date()
var pn = new Perlin('rnd' + date.getTime())
var map = createHeightMap(pn)
scene.add(map)

function createHeightMap(pn) {
  var textureLoader = new THREE.TextureLoader()
  var groundMaterial = Physijs.createMaterial(
    new THREE.MeshLambertMaterial({
      map: textureLoader.load('../assets/textures/ground/grasslight-big.png')
    }),
    0.3, // 高摩擦係数
    0.8, // 低反発係数
  )

  var groundGeometry = new THREE.PlaneGeometry(
    120, 100, 100, 100
  )

  for (var i = 0; i < groundGeometry.vertices.length; i++) {
    var vertex = groundGeometry.vertices[i]
    var value = pn.noise(vertex.x / 10, vertex.y / 10, 0)
    vertex.z = value * 10
  }
  groundGeometry.computeFaceNormals()
  groundGeometry.computeVertexNormals()

  var ground = new Physijs.HeightfieldMesh(
    groundGeometry,
    groundMaterial,
    0, // 質量
    100,
    100,
  )

  ground.rotation.x = Math.PI / -2
  ground.rotation.y = 0.4
  ground.receiveShadow = true

  return ground
}
```

- まず Physijs マテリアルと `PlaneGeometry` を作成します
- `PlaneGeoemtry` の頂点を走査して, zプロパティの値をランダムに設定し凸凹のある地形を作成します
- テクスチャ, ライティング, 影を正しく描画するために `computeFaceNormals()` と `computeVertexNormals()` を呼び出す必要があります
- この `PlaneGeometry` を使用すると `Physijs.HeightfieldMesh` が作成できます
- `Physijs.HeightfieldMesh` コンストラクタの最後の2つの引数は `PlaneGeometry`コンストラクタの2つの引数と等しくなければいけません
- 最後に `Physijs.HeightfiledMesh` を期待する位置まで回転してシーンに追加します

## 制約を使用してオブジェクトの動きを制限
Physijs にはさらに高度な要素としてオブジェクトの動きに制限を加える機能があります.<br>
Pysijs ではこれらのオブジェクトは制約（constrait）と呼ばれています.

##### 制約
- PointConstraint - 
- HingeConstraint -
- SliderConstraint - 
- ConeTwistConstraint - 
- DOFConstraint - 

### PointConstraint を使用して2点間の動きを制限






