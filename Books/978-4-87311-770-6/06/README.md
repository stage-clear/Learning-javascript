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

```js
var options = {
  amount: 10,
  bevelThickness: 2,
  bevelSize: 1,
  bevelSegments: 3,
  bevelEnabled: true,
  curveSegments: 12,
  steps: 1,
}

shape = createMesh(new THREE.ExtrudeGeometry(drawShape(), options))
```

- `shapes`
- `amount`
- `bevelThickness`
- `bevelSize`
- `bevelSegments`
- `bevelEnabled`
- `curveSegments`
- `steps`
- `extrudePath`
- `uvGenerator`
- `frames`

#### `THREE.TubeGeometry`
- [three.js docs - __TubeGeometry__](https://threejs.org/docs/#api/geometries/TubeGeometry)
- [04-exturude-tube.html](https://codepen.io/kesuiket/pen/OgXJqW)

```js
var points = []
for (var i = 0; i < controls.numberOfPoints; i++) {
  var randomX = -20 + Math.round(Math.random() * 50)
  var randomY = -15 + Math.round(Math.random() * 40)
  var randomZ = -20 + Math.round(Math.random() * 40)
  
  points.push(new THREE.Vector3(randomX, randomY, randomZ))
}

var tubeGeometry = new THREE.TubeGeometry(
  new THREE.CatmullRomCurve3(points),
  segments, radius, radiusSegments, closed
)
tubeMesh = createMesh(tubeGeometry)
scene.add(tubeMesh)
```

`THREE.ConvexGeometry`や`THREE.LatheGeometry`の場合と同じように, まず初めに `THREE.Vector3`型の頂点群を作成する必要があります.
ただし, これらの点列を直接使用してチューブを作成するのではなく, まず点列を `THREE.CatmullRomCurve3`に変換します.

- `path`
- `segments`
- `radius`
- `radiusSegumets`
- `closed`
- `taper`

#### SVGの押し出し
- [05-exturude-svg.html](https://codepen.io/kesuiket/pen/PjzwEO)
- [asutherland/d3-threeD](https://github.com/asutherland/d3-threeD) - 少し修正するだけで特定の関数を単独で利用できるようになります

```js
function drawShape() {
  var svgString = document.querySelector('#batman-path').getAttribute('d')
  var shape = transformSVGPathExposed(svgString)
  return shape
}

var options = {
  amount: 10,
  bevelThickness: 2,
  bavelSize: 1,
  bevelSegments: 3,
  bevelEnabled: true,
  curveSegments: 12,
  steps: 1,
}

shape = createMesh(new THREE.ExtrudeGeometry(
  drawShape(), options
))
```

#### `THREE.ParametricGeometry`

## 3Dテキスト作成
### テキストの描画
- [07-text-geometry.html](https://codepen.io/kesuiket/pen/qjaoeg)

```js
var options = {
  size: 90,
  height: 90,
  font: helvetikerFont, // THREE.FontLoader で事前に読み込まれたフォント
  bevelThickness: 9,
  bevelSize: 4,
  bevelSegments: 3,
  bevelEnabled: true,
  curveSegments: 12,
  steps: 1,
}

text1 = createMesh(new THREE.TextGeometry('Learning', options))
text1.position.z = -100
text1.position.y = 100
scene.add(text1)

text2 = createMesh(new THREE.TextGeometry('Three.js', options))
scene.add(text2)
```

- `size`
- `height`
- `width`
- `font`
- `bevelThickness`
- `bevelSize`
- `bevelEnabled`
- `steps`
- `extrudePath`
- `uvGenerator`
- `frames`

> もしフォントを2次元で描画したいのであれば, 例えばそれらをテクスチャとして設定したマテリアルを使うなどして,
> `THREE.TextGeometry` の使用は避けるべきです.

### 独自のフォントの追加
- [facetype.js](http://gero3.github.io/facetype.js/)

```js
var fontFile = 'path/to/{font}.typeface.json'
var fontLoader = new THREE.FontLoader()
fontLoader.load(fontFile, function(fontData) {
  init()
})
```

## ブーリアン演算を使用したメッシュの結合
CSG(Constructive Solid Geometry) として知られる技術を用いて,
基本的なジオメトリの組み合わせから新しい形状を作成する方法を紹介します

- [skalnik/ThreeBSP](https://github.com/skalnik/ThreeBSP)

この拡張ライブラリを使うと3つの機能が利用できます.

- `intersect`
- `union`
- `subtract`

これら3つの関数はメッシュの絶対座標を計算に使用しています.
そのためこの関数適用前にメッシュをグループ化していたりマルチマテリアルを使用していると
おそらく結果がおかしなことになります

- [08-binary-operation.html](https://codepen.io/kesuiket/pen/xrEjQK)

### `subtract` 関数
メッシュ同士の重なっている部分を取り除く

### `intersect`関数
メッシュ同士の重なっている部分だけを残します

### `union`関数
2つのメッシュを統合したひとつの新しいメッシュを作成します

メッシュ同士の結合は `THREE.Geometry.merge` として Three.js でも提供しています.
ThreeBSPのunion関数を使用した場合はジオメトリ同士が交差した部分にある頂点や面は取り除かれ,
ジオメトリの境界部分に矛盾がないように新しく頂点や面が追加されます.<br>
ほとんどの場合はオブジェクトの内部を気にかける必要はないので, ジオメトリの結合には
`THREE.Geometry.merge`を使用すると良いでしょう.
ただし, メッシュが半透明な場合や, CADのようにソリッドなオブジェクトが必要なアプリケーションを
作成する場合はオブジェクトの内部を気にかける必要があるので ThreeBSP を使用してください.




## まとめ
