# カスタムシェーダーとポストプロセス

- ポストプロセッシングに必要な Three.js の設定
- Three.js で利用できる `THREE.BloomPass` や `THREE.FilmPass` といった基本的なポストプロセッシングパス
- マスクを利用してシーンの一部だけエフェクトを適用する方法
- `THREE.TexturePass` を利用した描画結果の保存
- `THREE.ShaderPass` を利用したセピアフィルタ, 鏡面効果, 色調整などの基本的なポストプロセッシングエフェクトの追加
- 単純なシェーダーの作成と独自ポストプロセッシングの作成

## ポストプロセッシングに必要な設定

1. ポストプロセッシングパスを追加するための `THREE.EffectComposer` を作成する
2. シーンを描画した後でさらにポストプロセッシングを適用できるように `THREE.EffectComposer` を設定する
3. 描画ループ内で `THREE.EffectComposer` を使用してシーンを描画し, パスが適用された結果を表示する

- [01-basic-effect-composer.html](https://codepen.io/kesuiket/pen/BZpMvr)

`THREE.EffectComposer` を動作させるために必要な最低限のファイル
```html
<script src="../libs/postprocessing/EffectComposer.js"></script>
<script src="../libs/postprocessing/MaskPass.js"></script>
<script src="../libs/postprocessing/RenderPass.js"></script>
<script src="../libs/shaders/CopyShader.js"></script>
<script src="../libs/postprocessing/ShaderPass.js"></script>
```

```html
<script src="../libs/postprocessing/FilmPass.js"></script>
<script src="../libs/shaders/FilmShader.js"></script>
```

まず `THREE.EffectComposer` を作成します

```js
var webGLRenderer = new THREE.WebGLRenderer()
var composer = new THREE.EffectComposer(webGLRenderer)
```

#### `THREE.EffectComposer` をポストプロセッシングのために設定
初めに追加するのは `THREE.RenderPass` で, このパスはシーンを描画しますが,
スクリーンにはまだ出力しません.

```js
var renderPass = new THREE.RenderPass(scene, camera)
composer.addPass(renderPass)
```

```js
var renderPass = new THREE.RenderPass(scene, camera)
var effectFilm = new THREE.FilmPass(0.8, 0.325, 256, false)
effectFilm.renderToScreen = true

var composer = new THREE.EffectComposer(webGLRenderer)
composer.addPass(renderPass)
composer.addPass(effectFilm)
```

`THREE.FilmPass` を作成した後で, `renderToScreen = true` を設定しています.
これによって描画内容が画面に表示されます.

#### 描画ループの更新

```js
var clock = new THREE.Clock()
function render() {
  stats.update()
  
  var delta = clock.getDelta()
  orbitControls.update(delta)

  sphere.rotation.y += 0.002
  
  requestAnimationFrame(render)
  composer.render(delta)
}
```

## ポストプロセッシングパス
##### Three.js 付属のポストプロセッシングパス
- `THREE.BloomPass` - 光が暗い部分に漏れ出るようなエフェクトを発する. これはカメラが極端に明るい光にさらされた時のようなエフェクトをシミュレートしている
- `THREE.DotScreenPass` - 画面全体を黒いドットの重なりで表現する
- `THREE.FilmPass` - 捜査線や歪みを適用してテレビの画面をシミュレートする
- `THREE.GlitchPass` - ランダムな間隔で電子的なグリッチをスクリーンに表示する
- `THREE.MaskPass` - 現在の画像にマスクを適用できるようにする
- `THREE.RenderPass` - 流されたシーンとカメラに基づいてシーンを描画する
- `THREE.SavePass` - 現在の描画内容のコピーが作成されて後で利用できる（実際のところあまり有用ではなく, 使いたいと思える場所はなかった）
- `THREE.ShaderPass` - 独自シェーダーを渡して高度なもしくは独自のポストプロセッシングパスを使えるようにする
- `THREE.TexturePass` - 現在のコンポーザーの状態をテクスチャに保存して, 他のEffectComposer インスタンスの入力として使用できるようにする

### 単純なポストプロセッシング
- [02-post-processing-simple-passes.html](https://codepen.io/kesuiket/pen/bRgZBO)

```js
var renderPass = new THREE.RenderPass(scene, camera)
var effectCopy = new THREE.ShaderPass(THREE.CopyShader)
effectCopy.renderToScreen = true
var composer = new THREE.EffectComposer(webGLRenderer)
composer.addPass(renderPass)
composer.addPass(effectCopy)

var renderScene = new THREE.TexturePass(composre.renderTarget2)
```

### `THREE.FilmPass` を使用してテレビのようなエフェクトを作成

```js
var effectFilm = new THREE.FilmPass(0.8, 0.325, 256, false)
effectFilm.renderToScreen = true

var composer4 = new THREE.EffectComposer(webGLRenderer)
composer4.addPass(renderScene)
composer4.addPass(effectFilm)
```

##### `THREE.FilmPass`のプロパティ
- `noiseIntensity` - 画像粒子がどのくらい粗いかを制御できる
- `scanlinesIntensity` - 走査線がどの程度はっきりと表示されるかを定義できる
- `scanlinesCount` - 表示される走査線の数を制御できる
- `grayscale` - `true` にすると出力がグレースケールに変換される

```js
effectFilm.uniforms.grayscale.value = controls.grayscale
effectFilm.uniforms.nIntensity.value = controls.noiseIntensity
effectFilm.uniforms.sIntensity.value = controls.scanlinesIntensity
effectFilm.uniforms.sCount.value = controls.scanlinesCount
```

#### `THREE.BloomPass` を使用してブルームエフェクトを作成

```js
var effectCopy = new THREE.ShaderPass(THREE.CopyShader)
effectCopy.renderToScreen = true
...
var bloomPass = new THREE.BloomPass(3, 25, 5.0, 256)
var composer3 = new THREE.EffectComposer(webGLRenderer)
composer3.addPass(renderScene)
composer3.addPass(bloomPass)
composer3.addPass(effectCopy)
```
##### `THREE.BloomPass` のプロパティ
- `strength` - ブルームエフェクトの強さ
- `kernelSize` - ブルームエフェクトのオフセットを指定する
- `sigma` - ブルームエフェクトの鮮明さ. 値が大きければ, よりぼやけて見える
- `resolution` - 正確さ. 値が小さすぎるとブロックノイズが発生する

#### ドットを組み合わせてシーンを出力

```js
var dotScreenPass = new THREE.DotScreenPass()
var composer1 = new THREE.EffectComposer(webGLRenderer)
composer1.addPass(renderScene)
composer1.addPass(dotScreenPass)
composer1.addPass(effectCopy)
```

##### `THREE.DotScreenPass`のプロパティ
- `center` - ドットのオフセットについて細かく指定できる
- `angle` - ドットは特定の規則に沿って整列している. この並び方を変更できる
- `scale` - ドットの大きさ. 小さいほどドットは大きくなる

#### 複数のレンダラの出力を同じ画面に表示

```js
function render() {
  stats.update()
  
  var delta = clock.getDelta()
  orbitControls.update(delta)
  
  sphere.rotation.y += 0.002
  
  requestAnimationFrame(render)
  
  webGLRenderer.autoClear = false
  webGLRenderer.clear()
  
  webGLRenderer.setViewport(0, 0, 2 * halfWidth, 2 * halfHeight)
  composer.render(delta)

  webGLRenderer.setViewport(0, 0, halfWidth, halfHeight)
  composer1.render(delta)

  webGLRenderer.setViewport(halfWidth, 0, halfWidth, halfHeight)
  composer3.render(delta)

  webGLRenderer.setViewport(0, halfHeight, halfWidth, halfHeight)
  composer3.render(delta)

  webGLRenderer.setViewport(halfWidth, halfHeight, halfWidth, halfHeight)
  composer4.render(delta)
}
```

- [03-glitch-pass.html](https://codepen.io/kesuiket/pen/vZgMmM) - GlitchPass を使用

```html
<script src="../libs/postprocessing/GlitchPass.js"></script>
<script src="../libs/shaders/DigitalGlitch.js"></script>
```

```js
var effectGlitch = new THREE.GlitchPass(64)
effectGlitch.renderToScreen = true
```

### EffectComposer にマスクを設定

