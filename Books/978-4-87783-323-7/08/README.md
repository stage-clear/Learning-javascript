# さまざまなレンダリング

## SVGレンダリング
### SVGレンダリングとは
SVG要素を用いて3次元グラフィックス描画を行う手法です.

### SVGRenderer クラス
- [SVGRenderer.js](https://github.com/mrdoob/three.js/blob/master/examples/js/renderers/SVGRenderer.js)
- [Projector.js](https://github.com/mrdoob/three.js/blob/master/examples/js/renderers/Projector.js) も読み込む必要があります

```js
var renderer = new THREE.SVGRenderer()
```

### SVGObject クラス

```js
var object = new THREE.SVGObject(node:<svg要素の子要素>)
```

## ソフトウェアレンダリング
### ソフトウェアレンダリングとは
描画に必要な演算を, GPUを利用せずにCPUのみで実現するレンダリングのことです

### SoftwareRenderer クラス
- [SoftwareRenderer.js](https://github.com/mrdoob/three.js/blob/master/examples/js/renderers/SoftwareRenderer.js)
- Projector.js を読み込む必要があります

```js
var renderer = new THREE.SoftwareRenderer(parameters)
```

### 各種レンダリングの比較
##### レンダリングの種類とシェーディング, テクスチャの適用状況

## CSS2Dレンダリング
### CSS2DRenderer クラス
- [CSS2DRenderer.js](https://github.com/mrdoob/three.js/blob/master/examples/js/renderers/CSS2DRenderer.js)

```js
var renderer = new THREE.CSS2DRenderer()
```

### CSS2DObject クラス

```js
var object = new THREE.CSS2DObject(element:domElement)
```

### CSS2D レンダリングの例

```js
function initThree() {
  ...
  // CSS2D対象レンダラーの生成
  labelRenderer = new THREE.CSS2DRenderer()
  labelRenderer.setSize(canvasFrame.clientWidth, canvasFrame.clientHeight)
  // スタイルの指定
  labelRenderer.domElement.style.position = 'absolute'
  labelRenderer.domElement.style.top = '0'
  labelRenderer.domElement.style.pointerEvents = 'none'
  // 親要素への追加
  canvasFrame.appnedChild(labelRenderer.domElement)
  ...
}

function initObject() {
  ...
  // div 要素の生成
  var text = document.createElement('div')
  text.style.fontSize = '20pt'
  text.style.color = 'rgb(255,0,255)'
  text.textContent = 'HTML要素による文字列の描画'
  // CSS2Dオブジェクトの生成
  var label = new THREE.CSS2DObject(text)
  label.position.set(0, 0, 30)
  // シーンへの追加
  scene.add(label)
}

function loop() {
  // トラックボールによるカメラオブジェクトのプロパティの更新
  trackball.update()
  // レンダリング
  renderer.render(scene, camera)
  labelRenderer.render(scene, camera)
  // loop() 関数の呼び出し
  requestAnimationFrame(loop)
}
```

## CSS3Dレンダリング
### CSS3DRenderer クラス
- [CSS3DRenderer.js](https://github.com/mrdoob/three.js/blob/master/examples/js/renderers/CSS3DRenderer.js)

```js
var renderer = new THREE.CSS3DRenderer()
```

### CSS3DObject クラス

```js
var object = new THREE.CSS3DObject(element:domElement)
```

### CSS3Dレンダリングの例

```js
function initThree() {
  ...
  // CSS2Dと同じ
}

function initObject() {
  ...
  // div 要素の生成
  var element = document.createElement('div')
  element.style.width = '100px'
  element.style.height = '100px'
  element.style.opacity = 0.8
  element.style.background = new THREE.Color(Math.random() * 0xffffff).getStyle()
  
  // CSS3Dオブジェクトの生成
  var css3DObject = new THREE.CSS3DObject(element)
  css3DObject.position.set(0, 0, 0)
  scene.add(css3DObject)
}

function loop() {
  ...
  // CSS2Dと同じ
}
```

## CSS3D ステレオレンダリング
ステレオレンダリングとは, 左目と右目に異なる画像を見せることで2次元平面に描画された図形を立体的に認識させるステレオグラム（裸眼立体視）を実現する描画方法です

ステレオグラムの簡単な原理を説明すると, 左目と右目の位置に置いたカメラでそれぞれ描画して
左右の画像とすることで実現することができます.

### CSS3DStereoRenderer クラス

```js
var renderer = new THREE.CSS3DStereoRenderer()
```

### CSS3DObject クラス

```js
var object = new THREE.CSS3DObject(element:domElement)
```

## レイトレーシングレンダリング
### レイトレーシングレンダリングとは
スクリーン上の各要素の描画色を, そこに到達する光線を光の反射, 屈折という光学法則に基づいて計算して決定するという手法です.

<img src="https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png?1500886950995" width="200">

Zバッファ法に比べて精密描画が可能な代わりに計算負荷が増大するため, リアルタイムレンダリングには向いていません.

- [three.js によるレイトレーシングレンダリング](https://threejs.org/examples/#raytracing_sandbox)

### RaytracingRenderer クラス
- [RaytracingRenderer](https://github.com/mrdoob/three.js/blob/master/examples/js/renderers/RaytracingRenderer.js)

```js
var renderer = new THREE.RaytracingRenderer(parameters)
```
