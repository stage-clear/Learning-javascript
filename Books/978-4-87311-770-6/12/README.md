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
- `Physijs.PlaneMesh` - 
- `Physijs.BoxMesh` - 
- `Physijs.SphereMesh` - 
- `Physijs.CylinderMesh` - 
- `Physijs.ConeMesh` - 
- `Physijs.CapsuleMesh` - 
- `Physijs.ConvexMesh` - 
- `Physijs.ConcaveMesh` - 
- `Physijs.HeightfieldMesh` - 

```js
var plane = new Physijs.PlaneMesh(
  new THREE.PlaneGeometry(5, 5, 10, 10), 
  material,
)
scene.add(plane)
```

- [03-shapes.html]()
