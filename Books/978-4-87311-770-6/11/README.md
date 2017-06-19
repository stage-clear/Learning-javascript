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
1. 背景画像として使用されるシーンを作成する
2. 地球のような見た目をもつ球を含むシーンを作成する
3. 火星のような見た目をもつ球を含むシーンを作成する
4. EffectComposer を作成して, これら3つをひとつの画像として描画する
5. 火星として使用されている球に `colorify` エフェクトを適用する
6. 地球として使用されている球に `sepia` エフェクトを適用する

- [03-post-processing-masks.html](https://codepen.io/kesuiket/pen/zzZvWK)

まず描画するさまざまなシーンをセットアップする必要がありまs
```js
var sceneEarth = new THREE.Scene()
var sceneMars = new THREE.Scene()
var sceneBG = new THREE.Scene()
```

地球と火星を作成するには, 対応するマテリアルとテクスチャを持つ球を作成し, 適切なシーンにそれらを追加するだけです.
```js
var sphere = createEarthMesh(new THREE.SpehreGeometry(10, 40, 40))
sphere.rotation.x = -10

var sphere2 = createMarsMesh(new THREE.SphereGeometr(5, 40, 40))
sphere2.position.x = 10
sceneEarth.add(sphere)
sceneMars.add(sphere2)
```

背景画像を作成するには `THRE.OrthoGraphicCamera` を使用します.

```js
var cameraBG = new THREE.OrthographicCamera(
  -window.innerWidth, window.innerWidth,
   window.innerHeight, -window.innerHeight,
  -10000, 10000,
)
cameraBG.position.z = 50

var textureLoader = new THREE.TextureLoader()
var materialColor = new THREE.MeshBasicMaterial({
  map: textureLoader.load(
    '../assets/textures/starry-deep-outer-space-galaxy.jpg'
  ),
  depthTest: false,
})
var bgPlane = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1),
  materialColor,
)
bgPlane.position.z = -100
bgPlane.scale.set(
  window.innerWidth * 2,
  window.innerHeight * 2,
  1,
)
bgPlane.add(bgPlane)
```

まず背景に使用する画像をテクスチャとして設定したマテリアルを作成し,
そのマテリアルを単純な平面に適用します.
次にその平面をシーンに追加して画面全体をちょうど覆うサイズに変更simasu.

これで3つのシーンが準備できたので, パスと `THREE.EffectCompser` の設定に移れます.
```js
var composer = new THREE.EffectComposer(webGLRenderer)
composer.renderTarget1.stencilBuffer = true
composer.renderTarget2.stencilBuffer = true

composer.addPass(bgPass)
composer.addPass(renderPass)
composer.addPass(renderPass2)

composer.addPass(marsMask)
composer.addPass(effectColorify)
composer.addPass(clearMask)

composer.addPass(earthMask)
composer.addPass(effectSepia)
composer.addPass(clearMask)

composer.addPass(effectCopy)
```

今回は `THREE.WebGLRenderTarget` を新しく作成して内部的に使用される
`renderTarget` の `stencilBuffer` を `true` に設定しなければikemasenn.
ステンシルバッファは描画領域を制限するために使用する特殊なバッファです.
そのためマスクを利用するにはステンシルバッファを有効にする必要があります.

```js
var bgPass = new THREE.RenderPass(sceneBG, cameraBG)
var renderPass = new THREE.RenderPass(sceneEarth, camera)
renderPass.clear = false
var renderPass2 = new THREE.Renderpass(sceneMars, camera)
renderPass2.clear = false
```

地球と火星のパスに `.clear = false` が設定されています.
もし `clear` を `false` に設定しなければ, 描画開始前に画面がすべてクリアされてしまい,
結果的に `renderPass2` の出力だけが表示されることになります.

```js
var marsMask = new THREE.MaskPass(sceneMars, camera)
var clearMask = new THREE.ClearMaskPass()
var effectColorify = new THREE.ShaderPass(THREE.ColorifyShader)
effectColorify.uniforms['color'].value.setRGB(0.5, 0.5, 1)
```

### `THREE.ShaderPass` を使用して独自エフェクトを作成
##### Three.js で利用できるシェーダー
- `THREE.MirrorShader` - 画面の一部に対してミラーエフェクトを作成する
- `THREE.HueSaturationShader` - 色と色相と彩度を変更する
- `THREE.VignetteShader` - ビネットエフェクトを適用する. このエフェクトは画像の中心を囲むような暗い境界を表示する
- `THREE.ColorCorrectionShader` - 色の分布を変更できる
- `THREE.RGBShiftShader` - 色を赤, 緑, 青に分解する
- `THREE.BrightnessContrastShader` - 画像の明度とコントラストを変更する
- `THREE.ColorifyShader` - 画面に色の付いたオーバーレイを適用する
- `THREE.SepiaShader` - 画面にセピアのようなエフェクトを適用する
- `THREE.KaleidoShader` - シーンに万華鏡のようなエフェクトを追加して, シーンの中心に円状の反射を追加する
- `THREE.LuminosityShader` - シーンの明度が見えるようになるエフェクトを追加する
- `THREE.TechnicolorShader` - 古い映画のような見た目になる二色法テクニカラーエフェクトを模擬する

##### ブラーに関係するシェーダー
- `THREE.NorizontalBlueShader` `THREE.VerticalBlurShader` - シーン全体にブラーエフェクトを適用する
- `THREE.HorizontalTiltShiftShader` `THREE.VerticalTiltShiftShader` - ティルトシフトエフェクトを再生成する. ティルトエフェクトを使用すると, 画像の一部だけを鮮明に見せることでシーンがミニチュアであるかのように感じさせることができる
- `THREE.TriangleBlueShader` - 三角フィルタを使用したブラーエフェクトを適用する

##### 高度なエフェクトを実現するシェーダー
- `THREE.BleachBypassShader` - ブリーチバイパスエフェクトを作成する. 画像に銀残しのようなオーバーレイを適用する
- `THREE.EdgeShader` - 画像のエッジを検出してその部分をハイライトするために利用できる
- `THREE.FXAAShader` - ポストプロセッシングフェーズでアンチエイリアスエフェクトを適用する. 描画時にアンチエイリアスを適用する処理が高価な場合はこのシェーダーを使用する
- `THREE.FocusShader` - 中央をシャープに描画して周辺にブラーをかける

> Three.js にはシーンにボケエフェクトを適用する高度なポストプロセッシングエフェクトが2つあります.
> ボケエフェクトはシーンの一部にブラーエフェクトを適用する一方でメインの物体は非常に鮮明に描画するものです
> `THREE.BrokerPass` はボケエフェクトに利用できます.
> また `THREE.BokehShader2` と `THREE.DOFMipMapShader` は `THREE.ShaderPass` と組み合わせることでボケエフェクトを実現できます
> - [three.js webgl - postprocessing - depth-of-field](https://threejs.org/examples/webgl_postprocessing_dof2.html)
> - [three.js webgl - postprocessing - depth-of-field](https://threejs.org/examples/webgl_postprocessing_dof.html)

#### 単純なシェーダー
- [04-shaderpass-simple.html](https://codepen.io/kesuiket/pen/BZWKQR)

```js
// RGBShiftShader
this.changeRGBShifter = function() {
  rgbShift.uniforms.amount.value = controls.rgbAmount
  rgbShift.uniforms.angle.value = controls.angle
}
```

#### ブラーシェーダー
- [05-shaderpass-blur.html](https://codepen.io/kesuiket/pen/gRmMXj)

#### 高度なシェーダー
- [06-shaderpass-advanced.html](https://codepen.io/kesuiket/pen/xrqEZp)

