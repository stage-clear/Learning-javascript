# マテリアル
マテリアルは `THREE.Geometry` と組み合わせて `THREE.Mesh` を構成するものです.<br>
マテリアルは形状の外側がどのように見えるかを定義するオブジェクトの皮のようなものです.

- `MeshBasicMaterial`
- `MeshDepthMaterial`
- `MeshNormalMaterial`
- `MultiMaterial`
- `MeshLambertMaterial`
- `MeshPhongMaterial`
- `MeshStandardMaterial`
- `ShaderMaterial`
- `LineBasicMaterial`
- `LineDashMaterial`

## マテリアルの共通プロパティ

__基本的なプロパティ__<br>
もっともよく使用することになるであろうプロパティです.
これらのプロパティを使用すると, 例えばオブジェクトの透明度やオブジェクトを表示するか否か, またどのように（IDまたは独自の名称で）参照するかなどを制御できます.

__ブレンディングプロパティ__<br>
すべてのオブジェクトはブレンディングに関わるプロパティの一群を持ちます.
これらのプロパティはオブジェクトとその背景ををどのように組み合わせるかを指定simasu.

__高度なプロパティ__<br>
低レベルな WebGL コンテキストがオブジェクトを描画する方法を制御できる高度なプロパティも数多くありますが,
ほとんどの場合それらのプロパティを気にかける必要はありません.

### 基本的なプロパティ

- `id`
- `uuid`
- `name`
- `opacity`
- `transparent`
- `overdraw`
- `side` - ジオメトリの裏表どちら側にマテリアルを適用するか `THREE.FrontSide | THREE.BackSide | THREE.DoubleSide`
- `clippingPlanes` - `THREE.Plane`オブジェクトの配列を設定すると, このマテリアルが設定されているメッシュの表示がそれら平面の法線側で切り取られた領域に限られる
- `clipShadows` - `clippingPlanes` が影にも影響を与えるかどうかを指定する `false | true`
- `needsUpdate` - マテリアルを更新するには, マテリアルが変更されていることを伝える必要がある. これを `true` に設定すると更新する

### ブレンディングプロパティ

- `blending` - 
- `blendSrc` - 
- `blendDst` - 
- `blendEquation` - 
- `blendSrcAlpha` - 
- `blendDstAlpha` - 
- `blendEquationAlpha` - 

### 高度なプロパティ
[仕様書](https://www.khronos.org/registry/OpenGL/specs/es/2.0/es_full_spec_2.0.pdf)

- `depthTest` - 
- `depthWrite` - 
- `polygonOffset` - 
- `polygonOffsetFactor` `polygonOffsetFactor`, `polygonOffsetUnits` - 
- `alphaTest` - 

## 単純なマテリアル

```js
// プロパティを引数で渡す
var material = new THREE.MeshBasicMaterial({
  color: 0xff0000, name: 'material-1', opacity: 0.5,
  transparency: true, ...
})

// 個別にプロパティを渡す
var material = new THREE.MeshBasicMaterial()
material.color = new THREE.Color(0xff0000)
material.name = 'material-1'
material.opacity = 0.5
material.transparency = true
```

### `THREE.MeshBasicMaterial`
非常に単純なマテリアルでライトの影響を考慮しません.

- `color`
- `wireframe`
- `wireframeLinewidht`
- `wireframeLinecap`
- `wireframeLinejoin`
- `vertexColors`
- `fog`

```
var meshMaterial = new THREE.MeshBasicMaterial({color: 0x7777ff})
```

```js
var clippingPlane = new THREE.Plane(new THREE.Vector3(0, 0, -1), 0)
meshMaterial.clippingPlanes = [clippingPlane]

spGui.add(controls, 'clippingEnabled').onChange(e => {
  webGLRenderer.localClippingEnabled = e
})

spGui.add(controls, 'clippingPlaneZ', -5.0, 5.0).onChange(e => {
  meshMaterial.clippingPlanes[0].constant = e
})
```

### `THREE.MeshDepthMaterial`
- [three.js docs - MeshDepthMaterial](https://threejs.org/docs/#api/materials/MeshDepthMaterial)
- [02-depth-material.html](https://codepen.io/kesuiket/pen/zzrZRB)

このマテリアルを使用した場合, オブジェクトの見た目はライトやマテリアルの何かの特定のプロパティにはよらず,
オブジェクトからカメラの距離だけで決まります.<br>
これは単独ではあまり利用する場合がありませんが, ほかのマテリアルと組み合わせるとおもしろい効果効果を得ることができます.

- `wireframe` - ワイヤーフレームを表示するかどうか
- `wireframeLinewidth` - ワイヤーフレームの幅を指定する

カメラの `near` と `far` の間の距離によりオブジェクトの色の変化の速さが決まります.<br>
その距離が非常に大きければ, オブジェクトがカメラから遠ざかってもあまり変化しません.
距離が小さければ非常に速く変化します.

### マテリアルの組み合わせ
- [three.js docs - SceneUtils](https://threejs.org/docs/#api/extras/SceneUtils)
- [03-combined-material.html](https://codepen.io/kesuiket/pen/Qgygxr)

```js
var cubeMaterial = new THREE.MeshDepthMaterial()
var colorMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  transparent: true, 
  blending: THREE.MultiplyBlending,
})
var cube = new THREE.SceneUtils.createMultiMaterialObject(
  cubeGeometry, [colorMaterial, cubeMaterial]
)
cube.children[1].scale.set(0.99, 0.99, 0.99)
```

まず, マテリアルを2つ作成する必要があります.
`THREE.MeshDepthMatarial` にはなにもありませんが, `THREE.MeshBasicMaterial` では `transparent` を `true` にし, ブレンディングモードを設定しています.<br>
`transparent` プロパティを `true` にしないとすでに描画されている色を考慮する必要がないと判断してしまうため, 全体が緑色のオブジェクトが表示されます.
`transparent` を `true` にすれば, `blending` プロパティを確認して, 緑色の `THREE.meshBasicMaterial` が背景の影響をどのように受けるべきかを知ることができます.

ところでこのサンプルでは `THREE.MultiplyBlending` を使用しました.
このブレンドモードは前景の色と背景の色を掛け合わせることで臨む効果を得ます.

`THREE.SceneUtils.createMultiMaterialObject()` でメッシュを作成すると, 
ジオメトリをコピーして, 2つの厳密に同じメッシュをグループ内に入れて返します.
最後の行を追加せずにこれらを描画するとチラツキ発生するのがわかるでしょう.
この現象はあるオブジェクトが別のオブジェクトの上に描画された片方が半透明である時に発生することがあります.
`THREE.MeshDepthMaterial` で作成されたメッシュを縮小すると, この現象が避けられます.

```js
cube.children[1].scale.set(0.99, 0.99, 0.99)
```

### `THREE.MeshNormalMaterial`
- [three.js docs - MeshNormalMaterial](https://threejs.org/docs/#api/materials/MeshNormalMaterial)
- [04-mesh-normal-material.html](https://codepen.io/kesuiket/pen/weMqJE)

メッシュの各部分がそれぞれ少し違う色で描画されていて, 球が回転しているにもかかわらず同じ場所の色は同じままです.
これは各部の色が外向きの法線に基づいて決められているからです.
法線とは面に対して垂直なベクトルで, Three.js のさまざまな場所で利用されています.

```
for (var f = 0; fl = sphere.geometry.faces.length; f < fl; f++) {
  var face = sphere.geometry.faces[f]
  var centroid = new THREE.Vector3(0, 0, 0)
  centroid.add(sphere.geometry.vertices[face.a])
  centroid.add(sphere.geometry.vertices[face.b])
  centroid.add(sphere.geometry.vertices[face.c])
  centroid.divideScalar(3)

  var arror = new THREE.ArrowHelper(
    face.normal,
    centroid,
    2, 
    ox3333ff,
    0.5,
    0.5,
  )

  sphere.add(arrow)
}
```

### `THREE.MultiMaterial`
- [three.js docs - Group](https://threejs.org/docs/#api/objects/Group)
- [05-multi-material.html](https://codepen.io/kesuiket/pen/QgNGoK)

実際にはマテリアルではなく, むしろ他のマテリアルのためのコンテナのようなものです.
`THREE.MultiMaterial` を使用するとジオメトリの面に個別に異なるマテリアルを指定できます.

```js
var matArray = []
matArray.push(new THREE.MeshBasicMaterial({color: 0x009e60}))
matArray.push(new THREE.MeshBasicMaterial({color: 0x009360}))
...

var faceMaterial = new THREE.MultiMaterial(matArray)

var cubeGeom = new THREE.BoxGeometry(3, 3, 3)
var cube = new THREE.Mesh(cubeGeom, faceMaterial)
```

## 高度なマテリアル

### `THREE.MeshLambertMaterial`
- [three.js docs MeshLambertMaterial](https://threejs.org/docs/#api/materials/MeshLambertMaterial)
- [06-mesh-lambert-material.html](https://codepen.io/kesuiket/pen/mwPREy)

シーン内の高原に反応する非常に使いやすいマテリアルで, くすんだ見た目の光沢のない表面を作成するために使用できます.

- `emissive` - マテリアルが発する色

このマテリアルの反射はすこし鈍く見えます.

### `THREE.MeshPhongMaterial`

### `THREE.MeshStandardMaterial`

### `THREE.ShaderMaterial` を使用した独自シェーダーの作成

## ジオメトリで利用できるマテリアル

### `THREE.LlineBasicMaterial`

### `THREE.LineDashedMaterial`

## まとめ
