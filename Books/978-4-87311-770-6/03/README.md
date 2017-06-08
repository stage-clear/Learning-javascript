# 光源

> WebGL自体にはライトのサポートは組み込まれていません.
> 本章で紹介するようなさまざまな種類のライトをシミュレートするWebGLのシェーダープログラムを個別に自分で書かなければいけなくなります.
> https://developer.mozilla.org/ja/docs/Web/API/WebGL_API/Tutorial/Lighting_in_WebGL

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

`THREE.SpotLight` は（影を使いたいと思った場合に特に）もっとも頻繁に使用することになるライトのひとつで,
効果の範囲が円錐状になります.<br>
つまり, 懐中電灯やランタンのようなものと考えるとよいでしょう.

- `angle`
- `castShadow`
- `color`
- `decay`
- `distance`
- `intensity`
- `penumbra`
- `position`
- `power`
- `shadow.bias`
- `shadow.camera.aspect`
- `shadow.camera.far`
- `shadow.camera.fov`
- `shadow.camera.near`
- `shadow.camera.width` `shadow.camera.height`
- `target`
- `visible`
