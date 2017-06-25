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

- [04-constraints.html](https://codepen.io/kesuiket/pen/owervV)

### PointConstraint を使用して2点間の動きを制限
- __Physijs.PointConstraint__

2点間の距離を一定に保って両方の球がつられて動くのがわかります

```js
function createPointToPoint() {
  var obj1 = new THREE.SphereGeometry(2)
  var obj2 = new THREE.SphereGeometry(2)
  var objectOne = new Physijs.SphereMesh(obj1,
    Physijs.createMaterial(new THREE.MeshPhongMaterial({
      color: 0xff4444,
      transparent: true,
      opacity: 0.7,
    }))
  )
  objectOne.position.z = -18
  objectOne.position.x = -10
  objectOne.position.y = 2
  objectOne.castShadow = true
  scene.add(objectOne)
  
  var objectTwo = new Physijs.SphereMesh(obj2,
    Physijs.createMaterial(new THREE.MeshPhongMaterial({
      color: 0xff4444,
      transparent: true,
      opacity: 0.7,
    }))
    objectTwo.position.z = -5
    objectTwo.position.x = -20
    objectTwo.position.y = 2
    objectTwo.castShadow = true
    scene.add(objectTwo)
    
    var constraint = new Physijs.PointConstraint(
      objectOne, objectTwo, objectTwo.position
    )
    scene.addConstraint(constraint)
  )
}
```

- 初めの2つの引数はお互いに接続したいオブジェクトを指定します
- 3つめの引数は制約で束縛する位置を指定します.
  例えばあるオブジェクトを別の非常に大きなオブジェクトに束縛する時に, この値を巨大なオブジェクトの右端に設定するようなことができます.
  通常は2体をただ接続したいだけでしょうから, 2つめのオブジェクトの座標を値として指定するとよいでしょう

### HingeConstraint でドアのように動きを制限
- __Physijs.HingeConstraint__

[hinge]メニューで[enableMotor]メニューをクリックします.
そうすると, [general]メニューで指定した速度までフリッパーが加速されます.

```js
var constraint = new Physijs.HingeConstraint(
  flipperLeft,
  flipperLeftPivot,
  flipperLeftPivot.position,
  new THREE.Vector3(0, 1, 0),
)
scene.addConstraint(constraint)
constraiont.setLimits(-2.2, -0.6, 0.1, 0)
```

##### `Physijs.HingeConstraint` コンストラクタの引数
- mesh_a - 動きを制約されるオブジェクト
- mesh_b - mesh_a が制約されるオブジェクト
- position - 制約が適用される位置
- axis - ヒンジが回転する軸. サンプルでは水平面状に動きを制限するヒンジとして `0, 1, 0` を指定している

##### `setLimits()` の引数
- low - ラジアンで指定される, 動きの最小角度
- hight - ラジアンで指定される, 動きの最大角度
- bias_factor - 位置が不正だった場合に制約がそれを補正するために使用する変化量を定義する（0.5より小さな値にすることが推奨されている）
- relaxation_factor - 制約によって速度が変更される割合. 大きな値を指定すると動きの最大角または最小角に到達した時にオブジェクトが跳ね返る

```js
constraint.enableAngularMotor(
  controls.velocity,
  controls.acceleration,
)
```

```js
constraint.disableMotor()
```

### SliderConstranit でひとつの軸方向に動きを制限
- __Physijs.SliderConstraint__

```js
var constraint = new Physijs.SliderConstraint(
  sliderMesh, 
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 1, 0),
)

scene.addConstraint(constraint)
constraint.setLimits(-10, 10, 0, 0)
constraint.setRestitution(0.1, 0.1)
```

##### Physijs.SliderConstraint のコンストラクタ引数
- mesh_a - 制約されるオブジェクト
- mesh_b - mesh_a が制約されるオブジェクト. この引数は任意で, 今回のサンプルでは省略されている. 省略するとメッシュはシーンに対して制約される
- position - 制約が適用される位置. mesh_a を mesh_b に制約する場合に特に重要になる
- axis - mesh_a がスライドする軸
  - x軸: `new THREE.Vector3(0, 1, 0)`
  - y軸: `new THREE.Vector3(0, 0, Math.PI / 2)`
  - z軸: `new THREE.Vector3(Math.PI / 2, 0, 0)`

##### `setLimits()` の引数
- linear_lower - 移動距離制限の下限
- linear_upper - 移動距離制限の上限
- angular_lower - 回転角制限の下限
- angular_higher - 回転角制限の上限

### ConeTwistConstraint で玉継手のように制限
- __Physijs.ConeTwistConstraint__

あるオブジェクトを基準に別のオブジェクトのx, y, z軸周りの回転の最小角度と最大角度を指定できます.

```js
var baseMesh = new THREE.SphereGeometry(1)
var armMesh = new THREE.BoxGeometry(2, 12, 3)

var objectOne = new Physijs.BoxMesh(baseMesh,
  Physijs.createMaterial(new THREE.MeshPhongMaterial({
    color: 0x4444ff, transparent: true, opacity: 0.7
  }), 0, 0), 0
)
objectOne.position.z = 0
objectOne.position.x = 20
objectOne.position.y = 15.5
objectOne.castShadow = true
scene.add(objectOne)

var objectTwo = new Physijs.SphereMesh(armMesh,
  Physijs.createMaterial(new THREE.MeshPhongMaterial({
    color: 0x4444ff, transparent: true, opacity: 0.7
  }), 0, 0), 0
)

objectTwo.position.z = 0
objectTwo.position.x = 0
objectTwo.position.y = 7.5
objectTwo.castShadow = true
scene.add(objectTwo)

var constraint = Physijs.ConeTwistConstraint(
  objectOne, objectTwo, objectOne.position
)

scene.addConstraint(constraint)
constraint.setLimit(
  0.5 * Math.PI, 
  0.5 * Math.PI, 
  0.5 * Math.PI,
)
constraint.setMaxMotorImpulse(1) //モーターが与える力
constraint.setMotorTarget(new THREE.Vector3(0, 0, 0))
```

### DOFConstraint で制限を細かく制御
- [05-dof-constraint.html](https://codepen.io/kesuiket/pen/VWMjLO)

自由度制約（the degree of freedom）とも呼ばれる DOFConstraint を使用するとオブジェクトの線形移動や回転移動を正確に制御できます.

車輪の作成から始めましょう
```js
function createWheel(position) {
  var wheelMaterial = Physijs.createMaterial(
    new THREE.MeshLambertMaterial({
      color: 0x444444, opacity: 0.9, transparent: true,
    }),
    1.0, // 高い摩擦係数
    0.5, // 中程度の反発係数
  )
  
  var wheel_geometry = new THREE.CylinderGeometry(4, 4, 2, 10)
  var wheel = new Physijs.CylinderMesh(
    wheel_geometry,
    wheelMaterial, 
    100,
  )
  
  wheel.rotation.x = Math.PI / 2
  wheel.castShadow = true,
  wheel.position.copy(position)

  return wheel
}
```

次に車体を作成し, それらをすべてシーンに追加する必要があります.
```js
var car = {}
var car_material = Physijs.createMaterial(
  new THREE.MeshLambertMaterial({
    color: 0xff4444,
    opacity: 0.9,
    transparent: true,
  }), 0.5, 0.5
)

var geom = new THREE.BoxGeometry(15, 4, 4)
var body = new Physijs.BoxMesh(geom, car_material, 500)
body.position.set(5, 5, 5)
body.castShadow = true
scene.add(body)

var fr = createWheel(new THREE.Vector3(0, 4, 10))
var fl = createWheel(new THREE.Vector3(0, 4, 0))
var rr = createWheel(new THREE.Vector3(10, 4, 10))
var rl = createWheel(new THREE.Vector3(10, 4, 0))

scene.add(fr)
scene.add(fl)
scene.add(rr)
scene.add(rl)
```

車輪をそれぞれ車体に対して接続する制約は次のようにして作成します

```js
var frConstraint = createWheelConstraint(fr, body, new THREE.Vector3(0, 4, 8))
var flConstraint = createWheelConstraint(fl, body, new THREE.Vector3(0, 4, 2))
var rrConstraint = createWheelConstraint(rr, body, new THREE.Vector3(10, 40, 8))
var rlConstraint = createWheelConstraint(rl, body, new THREE.Vector(10, 4, 2))

scene.addConstraint(frConstraint)
scene.addConstraint(flConstraint)
scene.addConstraint(rrConstraint)
scene.addConstraint(rlConstraint)
```

前輪については単に自動車を駆動できるようにz軸だけに沿って回転できればよく, 
それ以外の軸に関しては回転できなくしておく必要があります。

```js
frConstraint.setAngularLowerLimit({x: 0, y: 0, z: 0})
frConstraint.setAngularUpperLimit({x: 0, y: 0, z: 0})
flConstraint.setAngularLowerLimit({x: 0, y: 0, z: 0})
flConstraint.setAngularUpperLimit({x: 0, y: 0, z: 0})
```
下限と上限を同じ値に設定すると指定した方向以外には一切回転できなくなります.
つまりこの指定ではz軸周りにも回転できません.<br>
特定の軸についてモーターを有効にするとその軸に対してはこの制限が無視されます.
そのため, この時点でz軸に制限を加えても最終的には前輪の動きになにも影響はありません.

後輪が下に落ちてしまわないようにx軸を固定します.

```js
rrConstraint.setAngularLowerLimit({x: 0, y: 0.5, z: 0.1})
rrConstraint.setAngularUpperLimit({x: 0, y: 0.5, z: 0})
rlConstraint.setAngularLowerLimit({x: 0, y: 0.5, z: 0.1})
rlConstraint.setAngularUpperLimit({x: 0, y: 0.5, z: 0})
```

### シーンに音源を追加
- [three.js docs - __AudioListener__](https://threejs.org/docs/#api/audio/AudioListener)
- [three.js docs - __PositionalAudio__](https://threejs.org/docs/#api/audio/PositionalAudio)
- [Web Audio API](https://webaudio.github.io/web-audio-api/)
- [06-audio.html](https://codepen.io/kesuiket/pen/QgqEOq)

音源のもっとも興味深いところはカメラの位置に応じて聞こえ方が変化することです

- 音源とカメラの間の距離によって音の大きさが決まります
- カメラの右側にあるか左側にあるかによって左側のスピーカーと右側のスピーカーの音量がそれぞれ決まります

##### THREE.PositionalAudio のプロパティ
- `autoplay` -
- `load` - 再生するファイル
- `setRefDistance` - 音量が下がり始めるオブジェクトからの距離
- `setLoop` - デフォルトでは一度だけ再生されますが, `true` に設定すると音がループします
- `setRolloffFactor` - 音源から遠ざかった時にどのくらいすぐに音量がさがるか

## まとめ
