# 高度なジオメトリとブーリアン演算
## `THREE.ConvecGeometry`
- [three.js docs - __ConvexGeometry__](https://threejs.org/docs/#examples/geometries/ConvexGeometry)
- [01-advanced-3d-geometries-convex.html](https://codepen.io/kesuiket/pen/zzqbJM)

一群の座標を含む[凸包](https://ja.wikipedia.org/wiki/%E5%87%B8%E5%8C%85)(Convec hull)を作成できます.

```js
function generatePoints() {
  var points = []

  for (var i = 0; i < 20; i++) {
    var randomX = -15 + Math.round(Math.random() * 30)
    var randomY = -15 + Math.round(Math.random() * 30)
    var randomZ = -15 + Math.round(Math.random() * 30)
    points.push(new THREE.Vector3(randomX, randomY, randomZ))
  }

  spGroup = new THREE.Group()
  var material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    transparent: false,
  })

  points.forEach(function(point) {
    var spGeom = new THREE.SphereGeometry(0.2)
    var spMesh = new THREE.Mesh(spGeom, material)
    spMesh.position.copy(point)
    spGroup.add(spMesh)
  })

  scene.add(spGroup)
}
```

```js
var convexGeometry = new THREE.ConvexGeometry(points)
convexMesh = createMesh(convexGeometry)
scene.add(convexMesh)
```

`THREE.ConvexGeometry` が受け取ることができるのは（`THREE.Vector3`型の）頂点の配列だけです.

## `THREE.LatheGeometry`
- [three.js docs - __LatheGeometry__](https://threejs.org/docs/#api/geometries/LatheGeometry)
- [02-advanced-3d-geometries-lathe.html](https://codepen.io/kesuiket/pen/xrVebv)

なめらかな曲線を元に3次元形状を作成できます.<br>
この曲線は多くの（ノットとも呼ばれる）点を使用して定義され, [スプライン曲線](https://ja.wikipedia.org/wiki/%E3%82%B9%E3%83%97%E3%83%A9%E3%82%A4%E3%83%B3%E6%9B%B2%E7%B7%9A)とも呼ばれます.
このスプライン曲線がオブジェクトのz軸の周りを周り, ツボのような形や鈴のような形が作成されます.

```js
function generatePoints(segments, phiStart, phiLength) {
  // ランダムな位置に30個の球を追加
  var points = []
  var height = 5
  var count = 30
  for (var i = 0; i < count; i++) {
    points.push(new THREE.Vector2(
      (Math.sin(i * 0.2) + Math.cos(i * 0.3)) * height + 12,
      (i - count) + count / 2
    ))
  }
  ...
  
  // 同じ点列を使用して LatheGeometry を作成
  var latheGeometry = new THREE.LatheGeometry(
    points, segments, phiStart, phiLength
  )
  latheMesh = createMesh(latheGeometry)
  scene.add(latheMesh)
}
```

#### プロパティ
- `points` - ベル型/壺型の形状を生成するために使用されるスプライン曲線を構成する点列
- `segments` - 形状を生成するためにしようされるセグメントの数
- `phiStart` - （デフォルト値: `0`）
- `phiLength` -  （デフォルト値: `2 * Math.PI`）

### 押し出してジオメトリ作成
2次元形状から3次元形状を押し出す手段がいくつかあります.

#### `THREE.ExtrudeGeometry`
- [three.js docs - ExtrudeGeometry](https://threejs.org/docs/#api/geometries/ExtrudeGeometry)
- [03-extrude-geometry.html](https://codepen.io/kesuiket/pen/awNxEO)

## 3Dテキスト作成
### テキストの描画
### 独自フォントの追加
## ブーリアン演算を使用したメッシュの結合
### `subtract`関数
### `intersect`関数
### `union`関数
## まとめ
