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
