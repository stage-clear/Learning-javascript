# パーティクル, スプライト, ポイントクラウド

- `THREE.SpriteMaterial` を使用したパーティクルの作成と見た目の変更
- ポイントクラウドを使用したパーティクルのグループ化
- 既存のジオメトリを基にしたポイントクラウドの作成
- パーティクルとパーティクルシステムのアニメーション
- テクスチャを使用したパーティクルの見た目の変更
- `THREE.SpriteCanvasMaterial` と canvas 要素を使用したパーティクルの見た目の変更

ここで使用する `THREE.Points` は, 以前は `THREE.PointCloud` と呼ばれていました.
同様に `THREE.Sprite` も以前ha `THREE.Particle` と呼ばれていました。

## パーティクルを理解
- [three.js docs - __Geometry__](https://threejs.org/docs/#api/core/Geometry)
- [three.js docs - __Sprite__](https://threejs.org/docs/#api/objects/Sprite)
- [three.js docs - __Points__](https://threejs.org/docs/#api/objects/Points)
- [three.js docs - __PointsMaterial__](https://threejs.org/docs/#api/materials/PointsMaterial)
- [01-particles.html](https://codepen.io/kesuiket/pen/LLRoKz)

```js
function createSprites() {
  var material = new THREE.SpriteMaterial()
  
  for (var x = -5; x < 5; x++) {
    for (var y = -5; y < 5; y++) {
      var sprite = new THREE.Sprite(material)
      sprite.position.set(x * 10, y * 10, 0)
      scene.add(sprite)
    }
  }
}
```

`THREE.Sprite` を使用すると, オブジェクト群を作成してそれらをシーン内で動かすことが簡単にできます.<br>
オブジェクトの数が少ない時はうまく動作しますが,　大量の `THREE.Sprite` を扱おうとするとすぐにパフォーマンス上の問題が発生します.<br>
`THREE.Points` を使用すると, `THREE.Sprite` を個別に管理する必要がなくなり, その `THREE.Points` を管理するだけで済みます.

```js
function createParticles() {
  var geom = new THREE.Geometry()
  var material = new THREE.PointsMaterial({
    size: 4,
    vertexColor: 0xffffff,
  })
  
  for (var x = -5; x < 5; x++) {
    for (var y = -5; y < 5; y++) {
      var particle = new THREE.Vector3(x * 10, y * 10, 0)
      geom.vertices.push(particle)
      geom.colors.push(new THREE.Color(Math.random() * 0x00ffff))
    }
  }
  
  var cloud = new THREE.Points(geom, material)
  scene.add(cloud)
}
```

- [02-particles-webgl.html](https://codepen.io/kesuiket/pen/qjazZp)

## パーティクル, `THREE.Points`, `THREE.PointsMeterial`
ジオメトリを定義するために使用された頂点がそれぞれパーティクルとして表示されます.

- [03-basic-point-cloud.html](https://codepen.io/kesuiket/pen/PjGrWg)

15,000パーティクルが含まれている `THREE.Points` を作成しています.
それらのパーティクルの見た目はすべて `THREE.PointsMaterial` を使用して設定しています.

```js
function createParticles(size, transparent, opacity, vertexColors, sizeAttenuation, color) {
  var geom = new THREE.Geometry()
  var material = new THREE.PointsMaterial({
    size: size,
    transparent: transparent,
    opacity: opacity,
    vertexColors: vertexColors,
    sizeAttenuation: sizeAttenuation,
    color: color,
  }}
  var range = 500
  
  for (var i = 0; i < 15000; i++) {
    var particle = new THREE.Vector3(
      Math.random() * range - range / 2,
      Math.random() * range - range / 2,
      Math.random() * range - range / 2,
    )
    geom.vertices.push(particle)
    var color = new THREE.Color(0x00ff00)
    color.setHSL(
      color.getHSL().h, 
      color.getHSL().s, 
      Math.random() * color.getHSL().l
    )
    geom.colors.push(color)
  }
  
  cloud = new THREE.Points(geom, material)
  cloud.name = 'particles'
  scene.add(cloud)
}
```


##### `THREE.PointsMaterial` のプロパティ

- `color`
- `map`
- `size`
- `sizeAttenuation`
- `vertexColors`
- `opacity`
- `transparent`
- `blending`
- `fog`

次のような方法でパーティクルの見た目を変更することもできます

- `THREE.SpriteCanvasMaterila` を適用すると(`THREE.CanvasRenderer`でのみ) canvas要素の結果をテクスチャとして使用できます
- `THREE.WebGLRenderer`を使用している時に canvas要素の出力を使用するには `THREE.SpreiteMaterial`とHTML5ベースのテクスチャが使用できます
- `THREE.Points`のすべてのパーティクルの見た目を変更するには `THREE.PointsMaterial`の `map`プロパティの値に画像を（またはcanvas要素の結果を）設定します

## canvas要素を使用してパーティクルの見た目を変更
### `THREE.CanvasRenderer`でcavas要素を使用
- [04-program-based-sprites.html](https://codepen.io/kesuiket/pen/PjGrWg)

`THREE.SpreiteCanvasMaterial` は `ligs/renderer/CanvasRenderer`を読み込んでいなければ利用できません

##### `THREE.SpriteCanvasMaterial`のプロパティ
- `color`
- `program`
- `opacity`
- `transparent`
- `blending`
- `rotation`

```js
function createSprite() {
  var material = new THREE.SpriteCanvasMaterial({
    program: getTexture,
    color: 0xffffff,
  })
  material.rotation = Math.PI
  
  var range = 500
  
  for (var i = 0; i < 1500; i++) {
    var sprite = new THREE.Sprite(material)
    sprite.position.set(
      Math.random() * range - range / 2,
      Math.random() * range - range / 2,
      Math.random() * range - range / 2,
    )
    sprite.scale.set(0.1, 0.1, 0.1)
    scene.add(sprite)
  }
}
```

`THRE.CanvasRenderer` を使用しているので `THREE.Points` を使う代わりに `THREE.Sprite` を直接作成しています.

```js
var getTexture = function(ctx) {
  ctx.translate(-81, -84)
  ctx.fillStyle = 'orange'
  ctx.beginPath()
  ...
  
  ctx.arc(89, 102, 2, 0, Math.PI * 2, true)
  ctx.fill()
}
```

### WebGLRenderer で canvas 要素を使用

`THREE.WebGLRenderer` で canvas要素を使用する方法は2つあります.<br>
`THREE.PointsMaterial`を使用して `THREE.Points`を作成するか,
`THREE.Sprite` と `THREE.SpriteMaterial`の `map` プロパティを使用するかです.

- [05a-program-based-point-cloud-webgl.html](https://codepen.io/kesuiket/pen/EXgqGB) - `THREE.PointsMaterial` + `THREE.Points`

```js
var getTexture = function() {
  var canvas = document.createElement('canvas')
  canvas.width = 32
  canvas.height = 32
  
  var ctx = canvas.getContext('2d')
  ...
  
  ctx.fill()
  
  var texture = new THREE.Texture(canvas)
  texture.needsUpdate = true
  return texture
}

function createPoints(size, transparent, opacity, sizeAttenuation, color) {
  var geom = new THREE.Geometry()
  var material = new THREE.PointsMaterial({
    size: size,
    transparent: transparent,
    opacity: opacity,
    depthWrite: false,
    map: getTexture(),
    sizeAttenuation: sizeAttenuation,
    color: color,
  })
  var range = 500
  for (var i = 0; i < 5000; i++) {
    var partcle = new THREE.Vector3(
      Math.random() * range - range / 2,
      Math.random() * range - range / 2,
      Math.random() * range - range / 2,
    )
    geom.vertices.push(particle)
  }
  
  cloud = new THREE.Points(geom, material)
  cloud.name = 'pointcloud'
  scene.add(cloud)
}
```

`depthWrite`の値を`false`に設定することで, パーティクルは深度バッファに影響を与えなくなります.
パーティクルが部分的に重なっていたり半透明部分が正しく表示されない場合は, このプロパティを `false` に
設定すると（ほとんどの場合）問題が解決します.

`THREE.Points` には（実際は `THREE.Object3D`）`frustumCulled`というプロパティがあり,
これを `true` に設定すると, パーティクルがカメラに映る範囲外に出た時は描画を試みなくなります.
これによりパフォーマンスが向上しフレームレートが上がることがあります.

- [05b-program-based-sprites-webgl.html](https://codepen.io/kesuiket/pen/owYvMw) - `THREE.Sprite` + `THREE.SpriteMaterial`

```js
function createSprite() {
  var material = new THREE.SpriteMaterial({
    map: getTexture(),
    color: 0xffffff,
  })
  var range = 500
  for (var i = 0; i < 1500; i++) {
    var sprite = new THREE.Sprite(material)
    sprite.position.set(
      Math.random() * range - range / 2,
      Math.random() * range - range / 2,
      Math.random() * range - range / 2,
    )
    sprite.scale.set(4, 4, 4)
    scene.add(sprite)
  }
}
```

いずれの方法にもそれぞれ長所と短所があります.<br>
`THREE.Sprite`ではここのパーティクルを細かく制御できますが, 大量のパーティクルを使用する時に
パフォーマンス上の問題が起きやすく複雑です.<br>
`THREE.Points`では大量のパーティクルでも簡単に扱えますが, パーティクルそれぞれ個別に制御する必要が
ある場合には向いていません.

## テクスチャを使用してパーティクルの見た目を変更
- [three.js docs - __TextureLoader__](https://threejs.org/docs/#api/loaders/TextureLoader)
- [06-rainy-scene.html](https://codepen.io/kesuiket/pen/WOoNjb)

パーティクルの見た目を変えるために画像を使用するのであればもう少し直接的な方法があります.
`THREE.TextureLoader`の`load()`を使用して画像を `THREE.Texture`として読み込むことができるので,
この `THREE.Texture` をマテリアルの `map` の値として設定してください.

```js
var textureLoader = new THREE.TextureLoader()
var texture = textureLoader.load('path/to/texutre/sprite')

var material = new THREE.PointsMaterial({
  size: 3,
  transparent: true,
  opacity: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  sizeAttenuation: true,
  color: 0xffffff,
})
```

`THREE.AdditiveBlendin` は背景にあるピクセルの色と新しいピクセルの色を足し合わせて新しいピクセルを描画します.

`depthWrite`プロパティを `false` に設定すると今回の雨粒のテクスチャでは黒い背景が表示されなくなります.

`velocityX` で水平方向にどの程度動くかを指定し, `velocityY` で落ちる速さを指定しています.
それぞれ独自の速度をもつことで, 描画ループ内でパーティクルを個別に動かすことができます.

```js
var vertices = cloud.geometry.vertices

vertices.forEach(function(v) {
  v.y = v.y - (v.velocityY)
  v.x = v.x - (v.velocityX)
  
  if (v.y <= 0) v.y = 60
  if (v.x <= -20 || v.x >= 20) v.velocityX = v.velocityX * -1
})
```

ループ内の最後の2行でパーティクルの位置が範囲内に収まっていることを保証しています.
`v.y`がゼロに以下になると再び一番上に追加し, `v.x`が端に到達すると水平方向の速度を逆にして反対方向に跳ね返しています.

- [07-snowy-scene.html](https://codepen.io/kesuiket/pen/mwOyaO)

テクスチャを1種類でなく4種類の画像を使用します

```js
function createMultiPoints(size, transparent, opacity, sizeAttenuation, color) {
  var textureLoader = new THREE.TextureLoader()
  var texture1 = textureLoader.load('path/to/image1')
  var texture2 = textureLoader.load('path/to/image2')
  var texture3 = textureLoader.load('path/to/image3')
  var texture4 = textureLoader.load('path/to/image4')
  
  scene.add(createPoints('system1', texture1, size, transparent, opacity, sizeAttenuation, color))
  scene.add(createPoints('system2', texture2, size, transparent, opacity, sizeAttenuation, color))
  scene.add(createPoints('system3', texture3, size, transparent, opacity, sizeAttenuation, color))
  scene.add(createPoints('system4', texture4, size, transparent, opacity, sizeAttenuation, color))
}
```

```js
function createPoints(name, texture, transparent, opacity, sizeAttenuation, color) {
  var geom = new THREE.Geometry()
  var color = new THREE.color(color)
  color.setHSL(
    color.getHSL().h,
    color.getHSL().s,
    Math.random() * color.getHSL().l
  )
  
  var material = new THREE.PointsMaterial({
    size: size,
    transparent: transparent,
    opacity: opacity,
    map: texture,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: sizeAttenuation,
    color: color,
  })
  var range = 40
  for (var i = 0; i < 50; i++) {
    var particle = new THREE.Vector3(
      Math.random() * range - range / 2,
      Math.random() * range * 1.5,
      Math.random() * range - range / 2,
    )
    particle.velocityY = 0.1 + Math.random() / 5
    particle.velocityX = (Math.random() * 0.5) / 3
    particle.velocityZ = (Math.random() * 0.5) / 3
    geom.vertices.push(particle)
  }
  
  var system = new THREE.Points(geom, material)
  system.name = name
  system.sortParticles = true
  return system
}
```

```js
scene.children.forEach(function(child) {
  if (child instanceof THREE.Points) {
    var vertices = child.geometry.vertices
    vertices.forEach(function(v) {
      v.y = v.y - (v.velocityY)
      v.x = v.x - (v.velocityX)
      v.z = v.z - (v.velocityZ)
      
      if (v.y <= 0) v.y = 60
      if (v.x <= -20 || v.x >= 20) v.velocityX = v.velocityX * -1
      if (v.z <= -20 || v.z >= 20) v.velocityZ = v.velocityZ * -1
    })
    child.verticesNeedUpdate = true
  }
})
```

## スプライトマップの利用
- [08-sprite.html](https://codepen.io/kesuiket/pen/awBOxp?editors=0010)

`THREE.Sprite` のオブジェクトのまた別の利用法として, `THREE.OrthographicCamera` インスタンスを
もうひとつ使用して作成した3Dコンテンツ上に表示されるヘッドアップディスプレイ（HUD）のような
レイヤーを`THREE.Sprite`を使用して作成する方法を紹介します.

さらにスプライトマップを使用して `THREE.Sprite` オブジェクトの画像を選択する方法を紹介します.

```js
var sceneOrtho = new THREE.Scene()
var cameraOrthio = new THREE.OrthographicCamera(
  0, window.innerWidth, window.innerHeight, 0, -10, 10
)

var getTexture = function() {
  var textureLoader = new THREE.TextureLoader()
  var texture = new textureLoader.load('path/to/sprite-sheet')
  return texture
}

function createSprite(size, transparent, opacity, color, spriteNumber) {
  var spriteMaterial = new THREE.SpriteMaterial({
    opacity: opacity,
    color: color,
    transparent: transparent,
    map: getTexture(),
  })
  
  // 1行にスプライトは5つ
  spriteMaterial.map.offset = new THREE.Vector2(0.2 * spriteNumber, 0)
  spriteMaterial.map.repeat = new THREE.Vector2(1 / 5, 1)
  // オブジェクトは必ず前面に表示
  spriteMaterial.depthText = flse

  spriteMaterial.blending = THREE.AdditiveBlending
  
  var sprite = new THREE.Sprite(spriteMaterial)
  sprite.scale.set(size, size, size)
  sprite.position.set(100, 50, -10)
  sprite.velocityX = 5
  
  sceneOrtho.add(sprite)
}
```

`map.offset` プロパティと `map.repeat`プロパティを使用して画面に表示するスプライトを設定します.
`map.offset` プロパティでは読み込んだテクスチャ画像のx軸（u）とy軸（v）のオフセットを指定します.
これらのプロパティは0から1の範囲の値を取ります.

#### `THREE.SpriteMaterial`のプロパティ
- `color`
- `map`
- `rotation`
- `opacity`
- `blending`
- `fog`

3D内で `THREE.Sprite`を配置する時にスプライトマップももちろん利用できます.
- [09-sprite-3D.html](https://codepen.io/kesuiket/pen/awBvaY)

```js
function createSprites() {
  group = new THREE.Group()
  var range = 200
  for (var i = 0; i < 400; i++) {
    group.add(createSprite(10, false, 0.6, 0xffffff, i % 5, range))
  }
  scene.add(group)
}

function createSprite(size, transparent, opacity, color, spriteNumber, range) {
  var spriteMateril = new THREE.SpriteMaterial({
    opacity: opacity,
    color: color,
    transparent: transparent,
    map: getTexture()
  })
  
  spriteMaterial.map.offset = new THREE.Vector2(0.2 * spriteNumber, 0)
  spriteMaterial.map.repeat = new THREE.Vector2(1/ 5, 1)
  spriteMaterial.depthTest = false
  spriteMaterial.blending = THREE.AdditiveBlending
  
  var sprite = new THREE.Sprite(spriteMaterial)
  sprite.scale.set(size, size, size)
  sprite.position.set(
    Math.random() * range - range / 2,
    Math.random() * range - range / 2,
    Math.random() * range - range / 2,
  )
  sprite.velocityX = 5
  
  return sprite
}
```

次のようにすると全体を簡単に回転できます.

```
group.rotation.x += 0.1
```

## 高度なジオメトリから `THREE.Points`を作成
- [10-create-particle-system-from-model.html](https://codepen.io/kesuiket/pen/jwVWqw)

```js
function generateSprite() {
  var canvas = document.createElement('canvas')
  canvas.width = 16
  canvas.height = 16
  
  var context = canvas.getContext('2d')
  var gradient = context.createRadialGradient(
    canvas.width / 2, canvas.height / 2, 0,
    canvas.width / 2, canvas.height / 2, canvas.width / 2
  )
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
  gradient.addColorStop(0.2, 'rgba(0, 255, 255, 1)')
  gradient.addColorStop(0.6, 'rgba(0, 0, 64, 1)')
  gradient.addColorStop(1, 'rgba(0, 0, 0, 1)')
  
  context.fillStyle = gradient
  context.fillRect(0, 0, canvas.width, canvas.height)
  
  var texture = new THREE.Texture(canvas)
  texture.needsUpdate = true
  return texture
}

function createPoints(geom) {
  var material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 3,
    transparent: true,
    blendiing: new THREE.AdditiveBlending,
    map: generateSprite(),
    depthWrite: false,
  })
  
  var cloud = new THREE.Points(geom, material)
  cloud.sortParticles = true
  return cloud
}

var geom = new THREE.TorusKnotGeometry(...)
var knot = createPoints(geom)
```

## まとめ
大量のパーティクルを作成したいのであれば `THREE.Points`を使うべきです.
`THREE.Points`を使用するとすべてのパーティクルが同じマテリアルを共有します.<br>
個別のパーティクルごとに変更が可能な唯一のプロパティはその色で, マテリアルの
`vertexColors`プロパティを`THREE.VertexColors`に設定し, `THREE.Points`を作成するのに使用した
`THREE.Geometry`の `colors`配列に色を与えるとパーティクルごとに個別の色を使用できます.

