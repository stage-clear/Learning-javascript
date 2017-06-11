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
- [three.js docs - meshPhongMaterial](https://threejs.org/docs/#api/materials/MeshPhongMaterial)
- [07-mesh-phong-material](https://codepen.io/kesuiket/pen/ZyWLvR)

光沢のあるマテリアルを作成できます.

- `emissive` - マテリアルが発する色
- `specular` - マテリアルにどのくらい光沢があるかと, その光沢の色を指定する
- `shininess` - 反射するハイライトがどのくらい明るいかを指定する
- `shading` - シェーディングがどのように適用されるかを定義する. `THREE.smoothShading|THREE.NoShading|THREE.FlatShading`

### `THREE.MeshStandardMaterial`
- [three.js docs - MeshStandardMaterial](https://threejs.org/docs/#api/materials/MeshStandardMaterial)
- [11-mesh-standard-material.html](https://codepen.io/kesuiket/pen/NgNpKy)

簡易的な物理ベースレンダリング(Physically-based rendering:PBR)を実現するマテリアルです
物理ベースレンダリングではオブジェクトの質感をより物理現象に則した形で表現しようとします.
ただし, `THREE.MeshStandardMaterial`は将来本格的な物理ベースレンダリングを導入することを視野に入れつつ,
必要なパラメーターを大幅に省略した簡易的な実装になっています.

- `metalness` - 金属性. この値によって光をどの程度どのような色で反射するかが決定される. 0から1の値をとる. (デフォルト値: `0.5`)
- `metalnessMap` - `metalness`をより細かく指定するためのテクスチャ
- `roughness` - 表面の粗さ. 光沢の度合いを指定する. 0から1の値をとる. (デフォルト値; `0.5`)
- `roughnessMap` - `roughness` をより細かく指定するためのテクスチャ

```js
var meshMaterial = new THREE.MeshStandardMaterial({color: 0x7777ff})
```

### `THREE.ShaderMaterial` を使用した独自シェーダーの作成
- [three.js docs - ShaderMaterial](https://threejs.org/docs/#api/materials/ShaderMaterial)
- [08-shader-material.html](https://codepen.io/kesuiket/pen/qjZroq)

マテリアルの中でもっとも強力ですが, その分非常に複雑なマテリアルです.
このマテリアルには, WebGLのコンテキストで直接実行される独自シェーダーを設定することができます.<br>
シェーダーとは JavaScript で記述された Three.js のメッシュを画面上のピクセルに変更するためのもです,
独自シェーダーを使用するとオブジェクトの描画方法や Three.js のデフォルトの表示を上書きする方法を厳密に指定できます.

これまで見てきたような多くのプロパティを設定できます.<br>
ただし, Three.js はこれらのプロパティに関係する情報をすべてシェーダーに渡しますが,
`THREE.ShaderMaterial` の場合, この情報の処理は自作シェーダープログラム内で自分で記述する必要があります.

- `wireframe`
- `wireframeLinewidth`
- `linewidth`
- `shading`
- `vertexColors`
- `fog`

これらのプロパティ以外にも, 独自シェーダーに追加の情報をわたすことができる特殊なプロパティがたくさんあります.

- `fragmentShader`
- `vertexShader`
- `uniforms`
- `defines`
- `attributes`
- `lights`

#### `vertexShader`
ジオメトリの頂点それぞれについて実行されます.
このシェーダーを利用すると, 頂点の位置を変更してジオメトリを変形させることができます.

#### `fragmentShader`
ジオメトリのフラグメントそれぞれについて実行されます.
`fragmentShader` は特定のフラグメントについて表示すべき色を返します.

簡単なサンプルを使用します.
サンプルでは立方体の頂点の x, y, z 座標を変更する非常に簡単な `vertexShader` プログラムと
[http://glslsandbox.com/](http://glslsandbox.com/) にあるシェーダーを利用する `fragmentShader`
プログラムを使用して, アニメーションするマテリアルを作成します.

シェーダーは JavaScript で記述するわけではないことに注意してください.
シェーダーは次のように GLSL(WebGLはOpenGL ESシェーダー言語1.0をサポートしています) と呼ばれるC言語のような言語で記述します.

- [GLSL](https://www.khronos.org/webgl/)

```glsl
<script id="vertex-shader" type="x-shader/x-vertex">
uniform float time;

void main() {
  vec3 postChanged = position;
  posChanged.x = posChanged.x * (abs(sin(time * 1.0)));
  posChanged.y = posChanged.y * (abs(cos(time * 1.0)));
  posChanged.z = posChanged.z * (abs(sin(tiem * 1.0)));
  gl_Position = projectionMatrix * modeViewMatrix * vec4(posChanged, 1.0);
}
</script>
```

1. JavaScript からシェーダーに情報を渡すためには, `uniforms` と呼ばれる変数を使用します.
2. `gl_Position` は特殊な変数で, ここに代入された値が最終的な座標として返されます.
3. 次に, `shaderMaterial` を作成して, `vertexShader` を渡さなければいけません.
   `var meshMaterial = createMaterial('vertex-shader', 'fragment-shader-1')` のようにして利用します.

```js
function createMaterial(vertexShader, fragmentShader) {
  var vertShader = document.getElementById(vertexShader).innerHTML
  ver fragShader = document.getElementById(fragmentShader).innerHTML
  var uniforms = {
    time: {type: 'f', value: 0.2},
    scale: {type: 'f', value: 0.2},
    alpha: {type: 'f', value: 0.6},
    resolution: {type: 'v2', value: new THREE.Vector2()}
  }
  uniforms.resolution.value.x = window.innerWidth
  uniforms.resolution.value.y = window.innerHeight
  
  var meshMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertShader,
    fragmentShader: fragShader,
    transparent: true
  })

  return meshMaterial
}
```

`uniforms` 変数を準備していますが, この変数はレンダラからシェーダーに情報を渡すためのものです.<br>
この `uniforms` 変数には次のように描画ループ内で値が設定されます.

```js
function render() {
  stats.update()
  
  cube.rotation.y = step += 0.01
  cube.rotation.x = step
  cube.rotation.z = step
  
  cube.material.materials.forEach(function(e) {
    e.uniforms.time.value += 0.01
  })

  requestAnimationFrame(render)
  renderer.render(scene, camera)
}
```

このサンプルでは, fragmentShader オブジェクトはすべて [GLSL Sandbox Gallery](http://glslsandbox.com/) からコピーしたものです.

最終的に返される色は `gl_FragColor = color_final` で設定された値です.

次のマテリアルの説明に進む前に, [独自 `vertexShader` プログラム](https://www.shadertoy.com/view/4dXGR4) でなにができるかを示す例をもうひとつ紹介します.

## ラインジオメトリで利用できるマテリアル
`THREE.Line` でだけ利用できます.<br>
このジオメトリは単純な線で, 頂点と辺だけで構成されていて面を持ちません.

- `THREE.LineBasicMaterial` - ラインのための基本的なマテリアルで, `linewidth` `linecap` `linejoin` といったプロパティを設定できます.
- `THREE.LineDashedMaterial` - `THREE.LineBasicMaterial` と同じプロパティを持っていますが, それ以外にも線と線間の長さを指定して点線を作ることができます

### `THREE.LlineBasicMaterial`

- `color`
- `linewidth`
- `linecap`
- `linejoin`
- `vertexColors`
- `fog`

```js
var points = gosper(4, 60)

var lines = new THREE.Geometry()
var colors = []
var i = 0
points.forEach(function(e) {
  lines.vertices.push(new THREE.Vector3(e.x, e.z, e.y))
  colors[i] = new THREE.Color(0xffffff)
  colors[i].setHSL(e.x / 100 + 0.5, (e.y * 20) / 300, 0.8)
  i++
})

lines.colors = colors

var material = new THREE.LineBasicMaterial({
  opacity: 1.0,
  linewidth: 1,
  vertexColors: THREE.VertexColors
})

var line = new THREE.Line(lines, material)
```
最初の部分では, x座標とy座標の組みを生成しています.
今回の例では, `gosper()` を使用して2次元領域を満たす簡単なアルゴリズムである[ゴスパー曲線](https://en.wikipedia.org/wiki/Gosper_curve)上の各点を得ています.

[HSL color values](https://www.w3.org/TR/2003/CR-css3-color-20030514/#hsl-color)

- [three.js docs - LineBasicMaterial](https://threejs.org/docs/#api/materials/LineBasicMaterial)
- [09-line-material.html](https://codepen.io/kesuiket/pen/gRrRBL?editors=0010)


### `THREE.LineDashedMaterial`

- `scale` - `dashSize` と `gapSize` を拡大縮小する
- `dashSize` - 点の長さ
- `gapSize` - 点の長さ

```js
lines.computeLineDistances()
var material = new THREE.LineDashdedMaterial({
  vertexColor: true,
  color: 0xffffff,
  dashSize: 10,
  gapSize: 1, 
  scale: 0.1,
})
```

- [three.js docs - LineDashedMaterial](https://threejs.org/docs/#api/materials/LineDashedMaterial)
- [10-line-material-dashed.html](https://codepen.io/kesuiket/pen/OgNjPx)

`THREE.LineBasicMaterial` との唯一の違いは `THREE.Geometry` オブジェクトの `computeLineDistances()` を呼び出す必要があるということです.
これを呼び出さなければ点間が正確に設定されません.

## まとめ

ライティングに影響を受けるマテリアルが必要なら, `THREE.MeshPhongMaterial`, `THREE.MeshLambertMaterial`, `THREE.meshStandardMaterial` のいずれかを使用しましょう.

マテリアルのプロパティのほとんどは実行時に変更できるということも忘れないでください.
ただし（例えば `side` など）いくつかの値は実行時には変更できません.
それらの値を変更した場合には, `needsUpdate` プロパティを `true` に設定する必要があります.
実行時になにが変更できて何が変更できないのか全体的に把握するには[How to update things](https://threejs.org/docs/#manual/introduction/How-to-update-things)を参照してください.
