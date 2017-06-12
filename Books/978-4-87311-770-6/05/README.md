# ジオメトリ
## 基本的なジオメトリ
### 2次元のジオメトリ
#### `THREE.PlaneGeometry`
- [three.js docs - __PlaneGeometry__](https://threejs.org/docs/#api/geometries/PlaneGeometry)
- [01-basic-2d-geometries-plane.html](https://codepen.io/kesuiket/pen/awNyBz)

```js
new THREE.PlaneGeometry(width, height, widthSegments, heightSegments)
```

```js
function createMesh(geom) {
  var meshMaterial = new THREE.MeshNormalMaterial()
  mesh.Material.side = THREE.DoubleSide
  var wireFrameMat = new THREE.MeshBasicMaterial()
  wireFrameMat.wireframe = true
  
  var plane = THREE.SceneUtils.createMultiMaterialObject(
    geom, [meshMaterial, wireFrameMat]
  )

  return plane
}
```

> 作成後にジオメトリのプロパティにアクセスしたい場合, 単に `plane.width` を呼ぶだけではうまくいきません.
> ジオメトリのプロパティにアクセスするには `parameters` プロパティを使用する必要があります.<br>
> (`plane.parameters.width`)

### `THREE.CircleGeometry`
- [three.js docs - CircleGeomtry](https://threejs.org/docs/#api/geometries/CircleGeometry)
- [02-basic-2d-geometries-circle.html](https://codepen.io/kesuiket/pen/vZGeWV)

ラジアンと度の変換には次の関数を使用してください.
```js
function deg2rad(degrees) {
  return degrees * Math.PI / 180
}

function rad2Deg(radian) {
  return radian * 180 / Math.PI
}
```

次のコードで完全な縁を作成できます.

```js
new THREE.CircleGeometry(3, 12)
```

このジオメトリを使用して半円を作成したい場合は次のようにしてください

```js
new THREE.CircleGeometry(3, 12, 0, Math.PI)
```

2次元オブジェクトを垂直ではなく水平向きに作成するもっとも簡単な方法は, 
次のようにメッシュをx軸周りに1/4だけ逆回転（`-Math.PI / 2`）させることです

```js
mesh.rotation.x = -Math.PI / 2
```

#### `THREE.RingGeometry`
- [three.js docs - __RingGeometry__](https://threejs.org/docs/#api/geometries/RingGeometry)
- [03-basic-2d-geometries-ring-html](https://codepen.io/kesuiket/pen/owxGPP)

```js
var ring = new THREE.RingGeometry()
```

- `innerRadius`
- `outerRadius`
- `thetaSegments`
- `phiSegments`
- `thetaStart`
- `thetaLength`

#### `THREE.ShapeGeometry`
- [three.js docs - __ShapeGeometry__](https://threejs.org/docs/#api/geometries/ShapeGeometry)
- [03-basic-2d-geometries-shape.html](https://codepen.io/kesuiket/pen/owxQWO)

`THREE.ShapeGeometry` を作成するには `THREE.Shape` を柵に作成する必要があります.

```js
function drawShape() {
  var shape = new THREE.Shape()
  shape.moveTo(10, 10)
  shape.lineTo(10, 40)
  shape.bezierCurveTo(15, 25, 25, 25, 20, 40)
  shape.splineThru([
    new THREE.Vector2(32, 30),
    new THREE.Vector2(28, 20),
    new THREE.Vector2(30, 10),
  ])
  shape.quadraticCurveTo(20, 15, 10, 10)
  
  var hole1 = new THREE.Path()
  hole1.absellipse(16, 24, 2, 3, 0, Math.PI * 2, true)
  shape.holes.push(hole1)
  
  var hole2 = new THREE.Path()
  hole2.absellipse(23, 24, 2, 3, 0, Math.PI * 2, true)
  shape.holes.push(hole2)
  
  var hole3 = new THREE.Path()
  hole3.absarc(20, 16, 2, 0, Math.PI, true)
  shape.holes.push(hole3)
  
  return shape
}
```


```js
new THREE.ShapeGeometry(drawShape())
```

##### `THREE.ShapeGeometry`のコンストラクタ引数
- `shapes` - `THREE.Geometry`を作成するために利用する `THREE.Shape`オブジェクトはひとつとは限らない
- `options` - `shapes`引数で渡されたすべてのシェイプに適用されるオプション
  - `curveSegements` - 
  - `material` - 
  - `UVGenerator` -

##### `THREE.Shape`の描画関数
- `moveTo(x, y)` - 描画点を指定されたx, y 座標に移動する
- `lineTo(x, y)` - 現在の位置から指定されたx, y座標に直線を描く
- `quadraticCurveTo(aCPx, aCPy, x, y)` - 曲線を指定する方法には, `quadraticCurveTo()` と `bezierCurveTo()` の2種類がある
- `bezierCurveTo(aCPx1, aCPy1, aCPx2, aCPy2, x, y)` - 
- `splineThru(pts)` - 与えられた座標群に沿ったなめらかな曲線を描く. この引数は `THREE.Vector2`オブジェクトの配列でなければいけない
- `arc(aX, aY, aRadius, aStartAngle, aEndAngle, aClockwise)` - 
- `absarc(aX, aY, xRadius, yRadius, aStartAngle, aEndAngle, aClockwise)` - 
- `fromPoints(vectors)` - 
- `holes` - `THREE.Shape`オブジェクトの配列を保持する. この配列ないのオブジェクトは穴として描画される

##### `THREE.Shape` のメソッド
- `makeGeometry(options)` - `THREE.Shape` から `THREE.ShapeGeometry` を返す
- `createPointsGeometry(divisions)` - シェイプを点列に変換する. `divisions`はいくつの点を返すかを指定する
- `createSpacedPointsGeometry(divisions)` - シェイプを点列に変換するが, konnkaiha divisions がパス全体に適用される

点列を作成するには `createPointsGeometry` か `createSpacedPointsGeometry`を使用します.

```
new THREE.Line(shape.createPointsGeometry(10),
  new THREE.LineBasicMaterial({color: 0xff3333, linewidth: 2}))
```

### 3次元のジオメトリ
#### `THREE.BoxGeometry`
- [three.js docs - __BoxGeometry__](https://threejs.org/docs/#api/geometries/BoxGeometry)
- [04-basic-3d-geometries-cube.html](https://codepen.io/kesuiket/pen/owxJQZ)

```js
new THREE.BoxGeometry(10, 10, 10)
```

##### プロパティ
- `width` - 
- `height` - 
- `depth` - 
- `widthSegments` -
- `heightSegments` -
- `depthSegments` -

#### `THREE.SphereGeometry`
- [three.js docs - __SphereGeometry__](https://threejs.org/docs/#api/geometries/SphereGeometry)
- [05-basic-3d-geometries-sphere.html](https://codepen.io/kesuiket/pen/BZKMzM)

##### プロパティ
- `radius` - 
- `widthSegments` -
- `heightSegments` - 
- `phiStart` - 
- `phiLength` - 
- `thetaStart` - 
- `thetaLength` -

#### `THREE.CylinderGeometry`
- [three.js docs - __CylinderGeometry__](https://threejs.org/docs/#api/geometries/CylinderGeometry)
- [06-basic-3d-geometries-cylinder.html](https://codepen.io/kesuiket/pen/LLNqOQ)

##### プロパティ
- `radiusTop` -
- `radiusBottom` -
- `height` -
- `radialSegments` - 
- `openEnded` - 
- `thetaStart` - 
- `thetaLength` -

#### `THREE.ConeGeometry`
- [three.js docs - __ConeGeometry__](https://threejs.org/docs/#api/geometries/ConeGeometry)
- [10-basic-3d-geometries-cone.html]()

#### `THREE.TorusGeometry`
- [three.js docs - __TorusGeometry__](https://threejs.org/docs/#api/geometries/TorusGeometry)
- [07-basic-3d-geometries-torus.html](https://codepen.io/kesuiket/pen/WOwPgv)

##### プロパティ
- `radius` -
- `tube` -
- `radialSegments` -
- `tubularSegments` -
- `arc` -

#### `THREE.TorusKnotGeometry`
- [three.js docs - __TorusKnotGeometry__](https://threejs.org/docs/#api/geometries/TorusKnotGeometry)
- [08-basic-3d-geometries-torus-knot.html](https://codepen.io/kesuiket/pen/WOwPBr)
- [トーラス結び目](https://ja.wikipedia.org/wiki/%E3%83%88%E3%83%BC%E3%83%A9%E3%82%B9%E7%B5%90%E3%81%B3%E7%9B%AE)

##### プロパティ
- `radius` - 
- `tube` -
- `radialSegments` - 
- `tubularSegments` -
- `p` -
- `q` -

#### `THREE.PolyhedronGeometry`
- [three.js docs - __PolyhedronGeometry__](https://threejs.org/docs/#api/geometries/PolyhedronGeometry)
- [09-basic-3d-geometries-polyhedron.html](https://codepen.io/kesuiket/pen/QgNojG)

```js
var vertices = [
   1,  1,  1,
  -1, -1,  1,
  -1,  1, -1,
   1, -1, -1,
]

var indices = [
  2, 1, 0,
  0, 3, 2,
  1, 3, 0,
  2, 3, 1,
]

polyhedron = createMesh(new THREE.PolyhedronGeometry(
  vertices,
  indices,
  controls.radius,
  controls.detail,
))
```

#####  プロパティ
- `vertices` - 
- `indices` - 
- `radius` - 
- `detail` -

#### `THREE.IcosahedronGeometry`

#### `THREE.TetrahedronGeometry`

#### `THREE.DodecahedronGeometry`

## まとめ
複雑なマテリアルをいきなり使わないようにしましょう.<br>
その代わりに `wireframe` を`true` に設定した `THREE.MeshBasicMaterial`か`THREE.MeshNromalMaterial`を使用して単純なもので試して見ましょう.

2次元形状では, それらがx-y平面上に配置されるということに気をつけてください.
水平な2次元形状が必要ならメッシュをx軸周りに `-0.5 * Math.PI` だけ回転します.

2次元形状や開いた2次元形状を回転するときは, マテリアルを `THREE.DoubleSide` に設定するのを忘れないようにしてください.
これを忘れるとジオメトリの内側や裏側が表示されません.
