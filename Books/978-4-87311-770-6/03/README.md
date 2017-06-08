# 光源

> WebGL自体にはライトのサポートは組み込まれていません.
> 本章で紹介するようなさまざまな種類のライトをシミュレートするWebGLのシェーダープログラムを個別に自分で書かなければいけなくなります.
> - [WebGL でのライティング](https://developer.mozilla.org/ja/docs/Web/API/WebGL_API/Tutorial/Lighting_in_WebGL)

## Three.js で利用可能なライティング

- `THREE.AmbientLight` - 基本的なライト. このライトの色がシーン内のすべてのオブジェクトの色に追加される
- `THREE.PointLight` - 光がすべての方向に発散する空間内の一点. このライトを使用して影を落とすことはない
- `THREE.SpotLight` - 卓上ライトや天井のスポットライト, たいまつのような円錐状の影響範囲を持つこのライトは影を落とすことができる
- `THREE.DirectionalLight` - 無限遠光源とも呼ばれる. 例えば太陽の光のようにそれぞれ平行であるように見える
- `THREE.HemisphereLight` - 特殊なライトで, 表面の反射と遠くに向かうに連れ徐々に輝きを失う空をシミュレートすることで, より自然な見た目の屋外での光を実現できる
- `THREE.LensFlare` - シーン内にレンズフレア効果を追加できる

## 基本的なライト
### `THREE.AmbientLight`
- [three.js docs - AmbientLight](https://threejs.org/docs/#api/lights/AmbientLight)
- [01-ambient-light.html](https://codepen.io/kesuiket/pen/zzvPvb)

```js
var ambiColor = '#0c0c0c'
var ambientLight = new THREE.AmbientLight(ambiColor)
scene.add(ambientLight)
...

var controls = new function() {
  this.ambientColor = ambiColor
}

var gui = new dat.GUI()
gui.addColor(controls, 'ambientColor').onChange(function(e) {
  ambientLight.color = new THREE.Color(e)
})
```

#### `THREE.Color` オブジェクトの利用
- [three.js docs - Color](https://threejs.org/docs/#api/math/Color)

### `THREE.PointLight`
- [three.js docs - PointLight](https://threejs.org/docs/#api/lights/PointLight)
- [02-point-light.html](https://codepen.io/kesuiket/pen/zzvPJY)

> この例には影が全くないことに気づいたでしょうか.
> Three.js の `THREE.PointLight` は影を落としません.
> `THREE.PointLight` は全方向に光を発するので, 影の計算がGPUにとって非常に重たい処理になるためです.

- `color` - ライトの色
- `decay` - ライトからの距離に応じて光が減衰する量.（デフォルト値: `1`）
- `distance` - ライトの光が届く距離.（デフォルト値: `0`）これは光の強さが距離によって弱められることがないことを意味する
- `intensity` - 単位面積あたりの光の輝きの強さ.（デフォルト値: `1`）
- `position` - `THREE.Scene` 内でのライトの位置
- `power` - 光源の発する光の強さ `intensity` の `4 * Math.PI`倍になり, 内部的には独自のプロパティを持たず, `intensity` から計算される
- `visible` - `true` に設定されていればライトは点灯し, `false` なら消灯する

```js
// Example:
var pointColor = '#ccffcc'
var pointLight = new THREE.PointLight(pointColor)
pointLight.position.set(10, 10, 10)
scene.add(pointLight)
```

```js
// Example:
pointLight.intensity = 2.4
```

`distance` プロパティは, `intensity` プロパティが0になるまでに光が光源からどのくらい遠くまで進めるかを決定します.

```js
// Example:
pointLight.distance = 15
```

### `THREE.SpotLight`
- [three.js docs - SpotLight](https://threejs.org/docs/#api/lights/SpotLight)
- [03-spot-light.html](https://codepen.io/kesuiket/pen/GEpyMX)

`THREE.SpotLight` は（影を使いたいと思った場合に特に）もっとも頻繁に使用することになるライトのひとつで,
効果の範囲が円錐状になります.<br>
つまり, 懐中電灯やランタンのようなものと考えるとよいでしょう.

- `angle` - 光線がどのくらいの幅を持つか.（単位: ラジアン）（デフォルト値: `Math.PI / 3`）
- `castShadow` - `true` にするとライトは影を落とす
- `color` - ライトの色
- `decay` - ライトからの距離に応じて光が減衰する量.（デフォルト値: `1`）
- `distance` - ライトの光がどこまで届くかを表す距離（デフォルト値: `0`）
- `intensity` - 単位面積当たりの光の輝く強さ（デフォルト値: `1`）
- `penumbra` - `THREE.SpotLight` では発せられる光の強さが光源から遠ざかるほど弱まる. `penumbra` はこの光の強さがどのくらい急速に減速するかを決定する
- `position`
- `power`
- `shadow.bias` - 指定される距離だけ影の位置を影が落ちるオブジェクトの奥または手前に移動する
- `shadow.camera.aspect`
- `shadow.camera.far`
- `shadow.camera.fov`
- `shadow.camera.near`
- `shadow.camera.width` `shadow.camera.height`
- `target` - `<THREE.Object3D>`
- `visible`

`THREE.SpotLight` の作成は非常に簡単です.
ただ色を指定し, 好きなプロパティを設定してシーンに追加するだけです.

```js
var pointColor = '#ffffff'
var spotLight = new THREE.SpotLight(pointColor)
spotLight.position.set(-40, 60, -10)
spotLight.castShadow = true
spotLight.target = plane
scene.add(spotLight)
```

```
// Example:
var target = new THREE.Object3D()
target.position = new THREE.Vector3(5, 0, 0)

spotlight.target = target

// `THREE.spotLight` の作成直後であれば target プロパティにはデフォルトで `THREE.Object3D`
// が設定されているので, 直接 position を設定しても構いません
spotlight.target.position.set(5, 0, 0)
```

`distance` と `angle` は光がどのような円錐形になるかを定義します.
`angle` は円錐の幅を定義し, `distance` で円錐の高さを指定します.

`penumbra` は円錐の頂点から円錐の底面まで, どのくらい早く光が減衰するかを決定します.
ここでは円錐の頂点から底面に向かって急速に暗くなる（大きな `penumbra`）非常に明るい光（大きな `intensity`）が使われています.

```
// Example:
spotlight.color = '#ffffff'
spotlight.angle = 0.1
spotlight.intensity = 1
spotlight.decay = 1
spotlight.distance = 0
spotlight.penumbra = 30
spotlight.castShadow = true
```

```
// Example 急速に暗くなる非常に明るい光の設定:
spotlight.angle = 4
spotlight.intensity = 5
spotlight.decay = 1
spotlight.distance = 10
spotlight.penumbra = 30
spotlight.castShadow = true
```

`THREE.CameraHelper` は次のように使用します.

```js
var cameraHelper = new THREE.Camerahelper(spotLight.shadow.camera)
scene.add(cameraHelper)
```

影に関する設定が多いのはそれだけ問題が起きやすいからです.

- `THREE.CameraHelper` を活用しましょう. ライトが影を表示するために影響を与えている領域を可視化してくれます
- 影がブロック状に見えるなら, `shadow.mapSize.width` と `shadow.mapSize.height` の両方を大きくするか, 影を計算するために使用される領域が対象のオブジェクトと比較して広すぎないことを確認してください. この領域を設定するには `shadow.camera.far` `shadow.camera.near` `shadow.camera.fov` が利用できます.
- 影を落とすようにライトを設定するだけでなく, ジオメトリに対しても影を受ける/落とすには `castShadow` `receiveShadow` を設定しなければいけないことを忘れないようにしてください.
- シーン内で厚みの薄いオブジェクトを使用しているなら, 影を描画した時に奇妙なアーチファクトを目にするかもしれません. この場合, `shadow.bias` を使用して影にわずかにオフセットを追加すると問題を解決できることがあります.
- 淡い影が欲しければ, `THREE.WebGLRenderer` の `shadowMap.type` をデフォルトの値から変更することもできます. デフォルトではこのプロパティは `THREE.PCFShadowMap` に設定されていますが, このプロパティを `PCFSoftShadowMap` に変更すると, より柔らかい影になります.

### `THREE.DirectionalLight`
- [three.js docs - DirectionalLight](https://threejs.org/docs/#api/lights/DirectionalLight)
- [04-directional-light.html](https://codepen.io/kesuiket/pen/BZorJm)

このライトは非常に遠くから届く光であると考えることができます.
発するすべての光線はお互いに平行です.<br>
太陽の光がよい例でしょう. 太陽は非常に遠くにあるので我々が地球上で受ける光線はお互いに（ほぼ）平行であると考えられます.

影を適用するには光の四角錐を定義する必要がありましたが,
すべての光線がお互いに平行なので光の四角錐はなく, 代わりに立方体状の領域が影を作成するために使用されます.

この立方体の中に存在するものはすべてライトによって影を落とし, また影を受けることができます.

```js
directionalLight.shadow.camera.near = 2
directionalLight.shadow.camera.far = 200
directionalLight.shadow.camera.left = -50
directionalLight.shadow.camera.right = 50
directionalLight.shadow.camera.top = 50
directionalLight.shadow.camera.bottom = -50
```

`THREE.SpotLight` では `shadow.camera` の実際の値は `THREE.PerspectiveCamera` でしたが,
`THREE.DirectionalLight` の場合は `THREE.OrthographicCamera` が設定されています.

## 特殊なライト
### `THREE.HemisphereLight`
- [three.js docs - HemisphereLight](https://threejs.org/docs/#api/lights/HemisphereLight)
- [05-hemisphere-light.html](https://codepen.io/kesuiket/pen/MoaGmw)

屋外にいるような見た目の自然なライティングを実現できます.

```js
var hemiLight = new THREE.HemisphereLight(0x0000ff, 0x00ff00, 0.6)
hemiLight.position.set(0, 500, 0)
scene.add(hemiLight)
```

- `groundColor` - 地面からの光の色
- `color` - 空からの光の色
- `intensity` - 光の強度
- `position` - 空からの光の向き.（デフォルト値: `[0,1,0]`）

### `THREE.LensFlare`
- [three.js docs - LensFlare](https://threejs.org/docs/#api/objects/LensFlare)
- [07-lensflare.html](https://codepen.io/kesuiket/pen/JJYZjL)

太陽やその他の明るい光源を直接写真に撮ると現れるあの光輪です.<br>
写真であれば基本的にレンズフレアは避けたいものですが, ゲームや3D画像でレンズフレアを使うと, 
シーンがより現実的に見えるという効果があります.

```js
flare = new THREE.LensFlare(texture, size, distance, blending, color)
```

```
var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
```
