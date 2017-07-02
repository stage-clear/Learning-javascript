# 3次元オブジェクトの描画
## 直方体オブジェクトの描画方法
### 形状オブジェクトと材質オブジェクト

### 直方体オブジェクトの描画

```js
var axis
var cube
function initObject() {
  var geometry = new THREE.BoxGeometry(50, 50, 50)
  var material = new THREE.MeshNormalMaterial()
  cube = new THREE.Mesh(geometry, material)
  scene.add(cube)
}
```

##### Canvas レンダラーによる描画
WebGLRenderer と比較して, 直方体オブジェクトは同様に描画されていますが,
軸オブジェクトのうち本来であれば直方体オブジェクトに隠れるはずの領域も描画されてしまう問題があります.

### BoxGeometry クラス
- [three.js docs - __BoxGeometry__](https://threejs.org/docs/#api/geometries/BoxGeometry)

```js
var geometry = new THREE.BoxGeometry(
  width, height, depth, 
  widthSegments, heightSegments, depthSegmenths
)
```

### MeshNormalMaterial クラス
- [three.js docs - __MeshNormalMaterial__](https://threejs.org/docs/#api/materials/MeshNormalMaterial)

カメラに対する法線方向によって表面色が異なる「法線材質オブジェクト」を生成するクラス

```js
var material = new THREE.MeshNormalMaterial(parameters)
```

##### ワイヤーフレームの表示

```js
var material = new THREE.MeshNormalMaterial({
  wireframe: true,
  wireframeLinewidth: 3,
})
```

### Mesh クラス
- [three.js docs - __Mesh__](https://threejs.org/docs/#api/objects/Mesh)

```js
var mesh = new THREE.Mesh(geometry, material)
```

## さまざまな形状オブジェクト
### PlaneGeometry クラス
- [three.js docs - __PlaneGeometry__](https://threejs.org/docs/#api/geometries/PlaneGeometry)

```js
var geometry = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments)
```

##### 最もシンプルな例

```js
var geometry = new THREE.PlaneGeometry(100, 100)
var material = new THREE.MeshNormalMaterial()
plane = new THREE.Mesh(geometry, material)
```

### CircleGeometry クラス
- [three.js docs - __CircleGeometry__](https://threejs.org/docs/#api/geometries/CircleGeometry)

```js
var geometry = new THREE.CircleGeometry(radius, segments, thetaStart, thetaLength)
```

##### デフォルトの円形オブジェクト

```js
var geometry = new THREE.CircleGeometry()
var material = new THREE.MeshNormalMaterial()
circle = new THREE.Mesh(geometry, material)
```

### SphereGeometry クラス
- [three.js docs - __SphereGeometry__](https://threejs.org/docs/#api/geometries/SphereGeometry)

```js
var geometry = new THREE.SphereGeometry(
  radius, widthSegments, heightSegments,
  phiStart, phiLength,
  thetaStart, thetaLength,
)
```

##### デフォルトの球オブジェクト

```js
var geometry = new THREE.SphereGeometry()
var material = new THREE.MeshNormalMaterial()
sphere = new THREE.Mesh(geometry, material)
```

##### 法線材質におけるフラットシェーディング

```js
// 頂点法線ベクトルを面法線ベクトルに置き換える
for (var i = 0; i < geometry.faces.length; i++) {
  geometry.faces[i].vertexNormal[0].copy(geometry.faces[i].normal)
  geometry.faces[i].vertexNormal[1].copy(geometry.faces[i].normal)
  geometry.faces[i].vertexNormal[2].copy(geometry.faces[i].normal)
}
```

##### 1/4 欠けた球の描画

```js
var geometry = new THREE.SphereGeometry(50, 10, 10, 0, 2 * Math.PI * 3 / 4)
var geometry = new THREE.SphereGeometry(50, 10, 10, 0, 2 * Math.PI, Math.PI * 3/ 4)
```

### CylinderGeometry クラス
- [three.js docs - __CylinderGeometry__](https://threejs.org/docs/#api/geometries/CylinderGeometry)

```js
var geometry = new THREE.CylinderGeometry(
  radiusTop, radiusBottom,
  height,
  radialSegments, heightSegments,
  openEnded,
  thetaStart, thetaLength,
)
```

###### デフォルトの円柱オブジェクト

```js
var geometry = new THREE.CylinderGeometry()
var material = new THREE.MeshNormalMaterial()
cylinder = new THREE.Mesh(geometry, material)
```

##### フラットシェーディング化した円柱オブジェクト

```js
var geometry = new THREE.CylinderGeometry(40, 40, 80, 10, 10)
var material = new THREE.MeshNormalMaterial()
for (var i = 0; i < geometry.faces.length; i++) {
  geometry.faces[i].vertexNormal[0].copy(geometry.faces[i].normal)
  geometry.faces[i].vertexNormal[1].copy(geometry.faces[i].normal)
  geometry.faces[i].vertexNormal[2].copy(geometry.faces[i].normal)
}
```

##### 筒型のオブジェクト

```js
var geometry = new THREE.CylinderGeometry(40, 40, 80, 50, 50, true)
var material = new THREE.MeshNormalMaterial({ side: THREE.DounbleSide })
```

##### 円錐型のオブジェクト

```js
var geometry = new THREE.CylinderGeometry(0, 40, 80, 50, 50)
```

##### 1/4欠けた円柱オブジェクト

```js
var geometry = new THREE.CylinderGeometry(40, 40, 80, 50, 50, false, 0, Math.PI / 3 * 4)
var material = new THREE.MeshNormalMaterial()
```

### TorusGeometry クラス
- [three.js docs - __TorusGeometry__](https://threejs.org/docs/#api/geometries/TorusGeometry)

```js
var geometry = new THREE.TorusGeometry(
  radius, tube,
  radialSegments, tubularSegments,
  arc,
)
```

##### デフォルトのトーラスオブジェクト

```js
var geometry = new THREE.TorusGeometry()
var material = new THREE.MeshNormalMaterial()
torus = new THREE.Mesh(geometry, material)
```

##### 滑らかなトーラスオブジェクト

```js
var geometry = new THREE.TorusGeometry(40, 10, 50, 50)

// 1/4 欠けたトーラス
var geometry = new THREE.TorusGeometry(40, 10, 50, 50, 2 * Math.PI * 3/ 4)
```

### PolyhedronGeometry クラス
- [three.js docs - __PolyhedronGeometry__](https://threejs.org/docs/#api/geometries/PolyhedronGeometry)

```js
var geometry = new THREE.PolyhedronGeometry(vertices, faces, radius, detail)
```

##### 球面上の描画

```js
var vertices = [
  [1, 1, 1],
  [0, 0, -1],
  [0, -1, 0],
  [-1, 0, 0],
]

var faces = [
  [2, 1, 0],
  [0, 3, 2],
  [1, 3, 0],
  [2, 3, 1],
]

var geometry = new THREE.PolyhedronGeometry(vertices, faces, 40, 0)
var material = new THREE.MeshNormalMaterial(geometry, material)
polyhedron = new THREE.Mesh(geometry, material)
```

### LatheGeometry クラス

```js
var geometry = new THREE.LatheGeometry(
  points, segments, phiStart, phiLength,
)
```

##### 回転体の描画

```js
var points = []
points[0] = new THREE.Vector2(0, -60)
points[1] = new THREE.Vector2(22, 15)
points[2] = new THREE.Vector2(30, 30)
points[3] = new THREE.Vector2(15, 45)
points[4] = new THREE.Vector2(0, 45)

var geometry = new THREE.LatheGeometry(points, 50)
// 頂点法線ベクトルの計算
geometry.computeVertexNormals()

var material = new THREE.MeshNormalMaterial()
lathe = new THREE.Mesh(geometry, material)
```

##### 切れ込みのある回転体の描画

```js
var geometry = new THREE.LatheGeometry(points, 50, Math.PI / 3, Math.PI * 5 / 3)
var material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide })
```

### TetrahedronGeometry クラス
- [three.js docs - __TetrahedronGeometry__](https://threejs.org/docs/#api/geometries/TetrahedronGeometry)

```js
var geometry = new THREE.TetrohedronGeometrh(radius, detail)
```

##### プログラムソース

```js
var geometry = new THREE.TetrahedronGeometry(50)
var material = new THREE.MeshNormalMaterial()
tetrahedron = new THREE.Mesh(geometry, material)
```

### OctahedronGeometry クラス
- [three.js docs - __OctahedronGeometry__](https://threejs.org/docs/#api/geometries/OctahedronGeometry)

```js
var geometry = new THREE.OctahedronGeometry(radius, detail)
```

##### サンプルプログラム

```js
var geometry = new THREE.OctahedronGeometry(50)
var material = new THREE.MeshNormalMaterial()
octahedron = new THREE.Mesh(geometry, material)
```

### DodecahedronGeometry クラス
- [three.js docs - __DodecahedronGeometry__](https://threejs.org/docs/#api/geometries/DodecahedronGeometry)

```js
var geometry = new THREE.DodecahedronGeometry(radius, detail)
```

##### サンプルプログラム

```js
var geometry = new THREE.DodecahedronGeometry(50)
var material = new THREE.MeshNormalMaterial()
dodecahedron = new THREE.Mesh(geometry, material)
```

### IcosahedronGeometry クラス
- [three.js docs - __IcosahedronGeometry__](https://threejs.org/docs/#api/geometries/IcosahedronGeometry)

```js
var geometry = new THREE.IcosahedronGeometry(radius, detail)
```

##### サンプルプログラム

```js
var geometry = new THREE.IcosahedronGeometry(50)
var material = new THREE.MeshNormalMaterial()
icosahedron = new THREE.Mesh(geometry, material)
```

### TorusKnotGeometry クラス
- [three.js docs - __TorusKnotGeometry__](https://threejs.org/docs/#api/geometries/TorusKnotGeometry)

```js
var geometry = new THREE.TorusKnotGeometry(
  radius, tube,
  radialSegments, tubularSegments,
  p, q, heightScale,
)
```

##### サンプルプログラム

```js
var geometry = new THREE.TorusKnotGeometry(40, 5, 50, 50, p, q, 2)
var material = new THREE.MeshNormalMaterial()
torusKnot = new THREE.Mesh(geometry, material)
```

### ParametricGeometry クラス
- [three.js docs - __ParametricGeometry__](https://threejs.org/docs/#api/geometries/ParametricGeometry)

```js
var geometry = new THREE.ParametricGeometry(func, slices, stacks, useTris)
```

##### ParametricGeometries.js で定義されるパラメトリック関数による描画

```html
<script src="../js/ParametricGeometries.js"></script>
```

```js
var geometry = new THREE.ParametricGeometry(THREE.ParametricGeometries.Klein, 100, 100)
var material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide })
parametric = new THREE.Mesh(geometry, material)
```

### TubeGeometry クラス
- [three.js docs - __TubeGeometry__](https://threejs.org/docs/#api/geometries/TubeGeometry)

```js
var geometry = new THREE.TubeGeometry(
  path, segments,
  radius, radiusSegments,
  closed, debug,
)
```

##### CurveExtra.js で定義されるチューブパスによる描画

```html
<script src="./js/CurveExtras.js"></script>
```

```js
var curves = new THREE.Curves.GrannyKnot()
var geometry = new THREE.TubeGeometry(curves, 200, 3, 8, false, false)
var material = new THREE.MeshNormalMaterial()
tube = new THREE.Mesh(geometry, material)
```

CurveExtras.js には様々な形状が用意されています.
（GrannyKnot, HeartCurve, KnotCurve, HelixCurve, 
TrefoilKnot, CinquefoilKnot, TrefoilPolynomiaKnot, FigureEightPolynomiaKnot, 
DecoratedTorusKnot4a, DecoratedTousKnot4b, DecoratedTorusKnot5a, DecoratedTorusKnot5c, ...）

### ShapeGeometry クラス
- [three.js docs - __ShapeGeometry__](https://threejs.org/docs/#api/geometries/ShapeGeometry)

```js
var geometry = new THREE.ShapeGeometry(shapes, options)
```

##### 2次元平面状オブジェクトの例

```js
var n = 8
var size = 50
var shape = new THREE.Shape()
shape.moveTo(0, size)
for (var i = 1; i < n; i++) {
  var theta = 2 * Math.PI / n * i
  shape.lineTo(size * Math.sin(theta), size * Math.cos(theta))
}
var holePath = new THREE.Path()
holePath.absarc(20, 20, 15, 0, Math.PI * 2, true)
shape.holes.push(holePath)
var geometry = new THREE.ShapeGeometry(shape)
var material = new THREE.MeshNormalMaterial()
shape = new THREE.Mesh(geometry, material)
```

### ExtrudeGeometry クラス
- [three.js docs - __ExtrudeGeometry__](https://threejs.org/docs/#api/geometries/ExtrudeGeometry)

```js
var geometry = new THREE.ExtrudeGeometry(shapes, options)
```

##### 抽出オブジェクトの生成サンプル

```js
var parameters = {
  amount: 20,
  bevelEnabled: true,
  bevelSegments: 2,
  bevelThickness: 5,
  bevelSize: 3,
}

var geometry = new THREE.ExtrudeGeometry(shape, parameters)
var material = new THREE.MeshNormalMaterial()
extrude = new THREE.Mesh(geometry, material)
```

### TextGeometry クラス
- [threejs docs - __TextGeometry__](https://threejs.org/docs/#api/geometries/TextGeometry)

```js
var geometry = new THREE.TextGeometry(text, parameters)
```

##### FontLoader クラスによるフォンントデータの読み込み

```js
var fontPass = 'examples/fonts/gentilis_bold.typeface.js'

var loader = new THREE.FontLoader()
loader.load(fontPass, function(font) {
  // テキストオブジェクトの生成
})
```

##### サンプルプログラム

```js
var loader = new THREE.FontLoader()
loader.load(fontPass, function(font) {
  var parameters = {
    font: font,
    weight: 'normal',
    style: 'normal',
    size: 100,
    height: 50,
    curveSegments: 4,
    bevelEnabled: false,
    bevelThickness: 10,
    bevelSize: 8,
  }
  
  var geometry = new  THREE.TextGeometry('three.js', parameters)
  var material = new THREE.MeshNormalMaterial()
  text = new THREE.Mesh(geometry, material)
  scene.add(text)
  text.position.set(0, 0, 0)
})
```

### RingGeometry クラス
- [three.js docs - __RingGeometry__](https://threejs.org/docs/#api/geometries/RingGeometry)

```js
var geometry = new THREE.RingGeometry(
  innerRadius, outerRadius,
  thetaSegments, phiSegments,
  thetaStart, thetaLength,
)
```

##### サンプルプログラム

```js
var geometry = new THREE.RingGeometry(20, 50, 50)
var material = new THREE.MeshNormalMaterial()
ring = new THREE.Mesh(geometry, material)
```

### ConvexGeometry クラス
- [three.js docs - ___ConvexGeometry__](https://threejs.org/docs/#examples/geometries/ConvexGeometry)

```js
var geometry = new THREE.ConvexGeometry(vertices)
```

##### 凸型オブジェクト

```js
var vertices = []
vertices[0] = new THREE.Vector3(-50, -50, 0)
vertices[1] = new THREE.Vector3(-50, 50, 0)
vertices[2] = new THREE.Vector3(50, 50, 0)
vertices[3] = new THREE.Vector3(50, -50, 0)
vertices[4] = new THREE.Vector3(0, 0, 70)
var geometry = new THREE.ConvexGeometry(vertices)
var material = new THREE.MeshNormalMaterial()
convex = new THREE.Mesh(geometry, material)
```

##### ランダム凸型オブジェクト

```js
var vertices = []
for (var i = 0; i < 100; i++) {
  vertices[i] = new THREE.Vector3(
    100 * Math.random() - 50,
    100 * Math.random() - 50,
    100 * Math.random() - 50,
  )
}
```

### TeapotBufferGeometry クラス

```js
var geometry = new THREE.TeapotBufferGeometry(
  size, segments, bottom, lid, body, fitLid, blinn,
)
```

##### プログラムソース

```js
var geometry = new THREE.TeapotBufferGeometry(50, 10, true, false, true, true, false)
var material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide })
teapot = new THEE.Mesh(geometry, material)
```

## 材質オブジェクトの基底クラス
