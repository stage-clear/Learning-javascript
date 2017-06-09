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


### マテリアルの組み合わせ

### `THREE.MeshNormalMaterial`

### `THREE.MultiMaterial`

## 高度なマテリアル

### `THREE.MeshLambertMaterial`

### `THREE.MeshPhongMaterial`

### `THREE.MeshStandardMaterial`

### `THREE.ShaderMaterial` を使用した独自シェーダーの作成

## ジオメトリで利用できるマテリアル

### `THREE.LlineBasicMaterial`

### `THREE.LineDashedMaterial`

## まとめ
