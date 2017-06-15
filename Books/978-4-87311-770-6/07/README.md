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
