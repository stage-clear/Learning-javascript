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
