# シーンの基本要素
この章で説明するのは以下のようなトピックです

- Three.js シーンで使用されるコンポーネント群
- `Three.Scene` オブジェクトを使用してできること
- ジオメトリとメッシュの関係
- 平行投影カメラと透視投影カメラの違い

## シーンの作成

シーンで何かを表示するには3つの種類のコンポーネントが必要でした.

- カメラ - シーンに何を描画するかを決定する
- ライト - マテリアルがどのように表示され, 影を作成するときにどのように使用されるかに影響を与える
- オブジェクト - カメラの視点で描画される主な物体群. 立方体, 球など

`THREE.Scene` はさまざまなオブジェクトすべてを保持するコンテナです.
このオブジェクト自身のオプションや機能はそれほど多くありません.

## シーンの基本機能

```js
var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(
  45, window.innerWidth / window.innerHeight, 0.1, 1000
)
scene.add(camera)
...

var planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1)
var planeMaterial = new THREE.MeshLambertMaterial({
  color: 0xffffff
})
var plane = new THREE.Mesh(planeGeometry, planeMaterial)
...
scene.add(plane)

var ambientLight = new THREE.AmbientLight(0x0c0c0c)
scene.add(ambientLight)
...
var spotLight = new THREE.SpotLight(0xffffff)
...
scene.add(spotLight)
```

コントロールエリア:

- シーンに立方体を追加
- 最後にシーンに追加した立方体を削除
- 現時点でシーンが保持しているすべてのオブジェクトをコンソールに表示
- 一番下にはシーン内に存在するオブジェクトの数

初めからシーンにオブジェクトが4つ存在します:
- 地面
- 環境光
- スポットライト
- カメラ

コントロールエリアの機能を見ていきます.
```js
var addCube = function() {
  var cubeSize = Math.ceil((Math.random() * 3))
  var cubeGeometry = new THREE.BoxGeometry(
    cubeSize, cubeSize, cubeSize
  )
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: Math.random() * 0xffffff
  })
  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
  cube.castShadow = true
  cube.name = 'cube-' + scene.children.length
  cube.position.x = -30 + Math.round((
    Math.random() * planeGeometry.parameters.width
  ))
  cube.position.y = Math.round((Math.random() * 5))
  cube.position.z = -20 + Math.round((
    Math.random() * planeGeometry.parameters.height
  ))
  scene.add(cube)
  this.numberOfObject = scene.children.length
}
```

- `THREE.Scene.add` - オブジェクトをシーンに追加します
- `THREE.Scene.remove` - オブジェクトをシーンから削除します
- `THREE.Scene.children` - シーンないのすべての子要素のリストを取得します
- `THREE.Scene.getObjectByName` - 名前を指定してシーンから特定のオブジェクトを取得します

これらがシーンに関するもっとも重要でもっともよく利用される関数です.

シーンを描画するためには `render` ループを使用します.

```js
function render() {
  stats.update()
  scene.traverse(function(obj) {
    if (obj instanceof THREE.Mesh && obj != plane) { // 地面は無視
      obj.rotation.x += controls.rotationSpeed
      obj.rotation.y += controls.rotationSpeed
      obj.rotation.z += controls.rotationSpeed
    }
  })
  
  requestAnimationFrame(render)
  renderer.render(scene, camera)
}
```

- `THREE.Scene.traverse` - シーンないのそれぞれの子要素を引数としてコールバック関数に渡す

### シーンにフォグを追加
`fog` プロパティ を使用するとシーン全体にフォグ効果を追加できます.

```js
scene.fog = new THREE.Fog(0xffffff, 0.015, 100)
// new THREE.Fog(<color>, <near>, <far>)
```

```js
scene.fog = new THREE.FogExp2(0xffffff, 0.015)
```

- [02-foggy-scene.html](https://codepen.io/kesuiket/pen/mwJQXB)


### `overrideMaterial` プロパティの利用
`overrideMaterial` プロパティを使用すると, シーンないのすべてのオブジェクトが `overrideMaterial` プロパティに設定されたマテリアルを使用するようになり, オブジェクト自身に設定されたマテリアルは無視されます.

```js
scene.overrideMaterial = new THREE.MeshLambertMaterial({
  color: 0xffffff
})
```

- [03-forced-materials.html](https://codepen.io/kesuiket/pen/bRdQOm)

`THREE.Scene` オブジェクトの重要な関数とプロパティをまとめます:

- `add(object:THREE.PerspectiveCamera|THREE.Mesh)` - 
- `children` - 
- `getObjectByName(name:string)`
- `remove(object:THREE.PerspectiveCamera|THREE.Mesh)`
- `traversion(callback:function)`
- `fog`
- `overrideMaterial`

## ジオメトリとメッシュ
オブジェクトの形状をジオメトリで定義して, オブジェクトがどう見えるかはマテリアルで定義し,
これら2つをメッシュでまとめることで, シーンに追加できるようになります.

### ジオメトリのプロパティと関数
ジオメトリとは基本的に頂点群と呼ばれる3D空間での座標の集合とそれらの点をつないでまとめた数多くの面のことです.

- 立方体には角が8つあります. 角はそれぞれ x, y, z 座標で定義できます. したがって立方体は3D空間内で点が8つあります.
  Three.js ではこれらの点は頂点群（vertices）, それぞれの点は頂点（vertex）と呼ばれます
- 立方体にはそれぞれ角を頂点とする面が6つあります. Three.js では面（face）は常に3つの頂点からなる三角形になります.
  したがって立方体の各面はそれぞれ2つの三角形で構成されます

vertices プロパティと faces プロパティを使用して完全に手作業でジオメトリを構築することもできます.

```
var vertices = [
  new THREE.Vector3(1, 3, 1),
  new THREE.Vector3(1, 3, -1),
  ...
]

var faces = [
  new THREE.Face3(0, 2, 1),
  new THREE.Face3(2, 3, 1),
  ...
]

var geom = new THREE.Geometry()
geom.vertices = vertices
geom.faces = faces
geom.computeFaceNormals()
```

> `THREE.Face3` を作成しるときには使用する頂点の順序に注意が必要です.
> 定義される際の順序によって, Three.js はその面が正面を向いた面か裏側を向いた面かを判断します.

- [04-geometries.html](https://codepen.io/kesuiket/pen/owXJXG)

パフォーマンス上の理由で, Three.js はメッシュのジオメトリがその生存期間中は変更されないことを仮定しています.
ほとんどのジオメトリのユースケースでこれは非常に妥当な仮定です.

```js
mesh.children.forEach(function(e) {
  for (var i = 0; i < 8; i++) {
    e.geometry.vertices[i].set(
      controlPoints[i].x,
      controlPoints[i].y,
      controlPoints[i].z
    )
    e.geometry.verticesNeedUpdate = true
    e.geometry.computeFaceNormals()
  }
})
```

更新された頂点座標を設定した後, ジオメトリに自身の頂点を更新する必要があることを伝えなければいけません.
これを行なっているのが, ジオメトリの `verticesNeedUpdate` プロパティを `true` に設定している部分です.
その後, 最後の `computeFaceNormals()` を使用して面の法線を再計算して, モデルの更新を完了します.

```js
var materials = [
  new THREE.MeshLambertMaterial({
    opacity: 0.6,
    color: 0x44ff44,
    transparent: true,
  }),
  new THREE.MeshBasicMaterial({
    color: 0x000000,
    wireframe: true,
  })
]
```

Three.js は複数のマテリアルを使用したメッシュの作成をサポートしています.
それには, `THREE.SceneUtils.createMultiMaterialObject()` を利用します.

```js
var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, materials)
```

実はこの関数では単に `THREE.Mesh` オブジェクトを1つ作成するのではなく,
指定されたマテリアル用にそれぞれひとつずつメッシュを作成してそれらのメッシュをグループ（`THREE.Group`）にまとめています.
このグループはこれまでつかってきたシーンオブジェクトとまったく同じように利用できます.
（メッシュを追加することや, 名前を指定してオブジェクトを取得することなど）

例えばグループのすべての子要素が影を落とすように設定するには次のようにします.

```js
mesh.children.forEach(function(e) {
  e.castShadow = true
})
```

```
this.clone = function() {
  var clonedGeometry = mesh.children[0].geometry.clone()
  var materials = [
    new THREE.MeshLambertMaterial({opacity: 0.6, color: 0xff44ff, transparent: true}),
    new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true})
  ]
  var mesh2 = THREE.SceneUtils.createMultiMaterialObject(
    clonedGeometry, materials
  )
  mesh2.children.forEach(function(e) {
    e.castShadow = true
  })
  mesh2.translateX(5)
  mesh2.translateZ(5)
  mesh2.name = 'clone'
  scene.remove(scene.getObjectByName('clone'))
  scene.add(mesh2)
}
```

- [05-custom-geometry](https://codepen.io/kesuiket/pen/VWLgvR)

> Three.js にはワイヤーフレームを追加する手段として他に `THREE.WireFrameHelper` もあります.
> このヘルパーを利用するにはヘルパーをインスタンス化します.<br>
>   `var helper = new THREE.WireFrameHelper(mesh, 0x000000)`<br>
> ワイヤーフレームを表示したいメッシュとワイヤーフレームの色を指定します.
> `scene.add(helper)` としてシーンに追加できます.
> これは内部的には単なる `THREE.LineSegments` オブジェクトなのでワイヤーフレームがどのように見えるかを自由に設定できます
> （`helper.material.linewidth = 2;` など）

### メッシュの関数とプロパティ

- `position` - 親要素からの相対位置を指定する
- `rotation` - 任意の軸周りの回転を設定する. 特定の軸周りに回転するための関数 `rotateX()` `rotateY()` `rotateZ()` もある
- `scale` - オブジェクト x, y, z 軸を基準に拡大縮小する
- `translateX(amount)` - x 軸上の指定した量だけ移動する
- `translateY(amount)` - y 軸上の指定した量だけ移動する
- `translateZ(amount)` - z 軸上の指定した量だけ移動する
- `visible` - `false` に設定すると, `THREE.Mesh` を描画しない

これらのプロパティを試すことができるサンプル:
- [06-mesh-properties](https://codepen.io/kesuiket/pen/qjdwYx)


#### `position`

```js
cube.position.x = 10
cube.position.y = 3
cube.position.z = 1
// or
cube.position.set(10, 3, 1)
```

#### `rotation`
完全な一回転の値は `2 * π` です.

```js
cube.rotation.x = 0.5 * Math.PI
// or
cube.rotation.set(0.5 * Math.PI, 0, 0)
```

ラジアンで指定します.
もし__度__を使いたければ, ラジアンから変換しなければいけません.

```
var degrees = 45
var inRadians = degrees * (Math.PI / 180)
```

#### `scale`

```
cube.x = 1
cube.y = 1.5
cube.z = 1
// or
cube.scale.set(1, 1.5, 1)
```

#### `translate`
移動したいオブジェクトを絶対座標ではなく, 現在の位置からの相対的な値として指定します.

```js
cube.translateX = 4
cube.translateY = 0
cube.translateZ = 0
// or
cube.translate.set(4, 0, 0)
```

#### `visible`

```
cube.visible = true
```

## タイプの異なる2つのカメラ
平行投影カメラと透視投影カメラという, 2つの異なるカメラがあります.

### 平行投影カメラと透視投影カメラ

- 平行投影カメラ（Orthographic）
- 透視投影カメラ（Perspective）

__平行投影カメラで__は, すべての立方体が同じサイズで描画されます.
オブジェクトとカメラ間の距離は描画されるサイズに影響を与えません.

これは「シムシティ4」や「シヴィリゼーション」の古いバージョンのような2Dゲームでよく利用されます.

```js
this.switchCamera = function() {
  if (camera instanceof THREE.PerspectiveCamera) {
    camera = new THREE.OrthographicCamera(
      widnow.innerWidth / -16, window.innerWidth / 16,
      window.innerHeight / 16, window.innerHeight / -16,
      -200, 500
    )
    camera.position.x = 120
    camera.position.y = 60
    camera.position.z = 180
    camera.lookAt(scene.position)
    this.perspective = 'Orthographic'
  } else {
    camera = new THREE.PerspectiveCamera(
      45, window.innerWidth / window.innerHeight, 0.1, 1000
    )
    camera.position.x = 120
    camera.position.y = 60
    camera.position.z = 180
    camera.lookAt(scene.position)
    this.perspective = 'Perspective'
  }
}
```

#### `THREE.PerspectiveCamera`

- `fov` - カメラの位置から見えるシーンの範囲（デフォルト値: `50`）
- `aspect` - 描画される出力領域の横幅と縦幅の比（推奨デフォルト値: `winodw.innerWidth / window.innerHeight`）
- `near` - カメラのどのくらい近くから描画を開始するか（推奨デフォルト値: `0.1`）
- `far` - カメラからどのくらい遠くまで見えるか（推奨デフォルト値: `2000`）
- `zoom` - ズームインまたはズームアウトする

<img src="https://www.packtpub.com/sites/default/files/Article-Images/6283OS_02_16.png">

最終的に Near と Far の間の領域が描画されます

#### `OrthographicCamera`

- `left`
- `right`
- `top`
- `bottom`
- `near`
- `far`
- `zoom`

<img src="http://apprize.info/javascript/threejs/threejs.files/image053.jpg">

### 特定の点を注視
カメラの視点は次のようにして簡単に変更できます.

```js
camera.lookAt(new THREE.Vector3(x, y, z))
```

- [08-cameras-lookat.html](https://codepen.io/kesuiket/pen/rwVEjg)

実際にはシーンは動いていません.
カメラの視点（中心の赤いドット）が移動し続け, それによってシーンが左右に動いているような錯覚を起こさせます.

> `lookAt()` を使用すると, カメラを特定の座標に向けることができます.
> これはシーン内のオブジェクトを追いかけさせるためにも利用できます.<br>
> すべての `THREE.Mesh` オブジェクトには `THREE.Vector3`型の `position` プロパティがあるので,
> `camera.lookAt(mesh.position)` のようにして特定のメッシュに視点を向けることができます.

## まとめ
