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
- obujekuto - カメラの視点で描画される主な物体群. 立方体, 球nado

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
