# three.js の基礎
## three.js の準備
### three.js の特徴
1. __WebGLRenderer__ - WebGL
2. __CanvasRenderer__ - Canvas2D で 3次元グラフィックスを実現する
3. __SVGRenderer__ - SVG を用いた3次元グラフィックス
4. __SoftwareRenderer__ - 3次元グラフィックスに必要なすべての計算をGPUでなくCPUで計算する
5. __CSS2DRenderer__ - 
6. __CSS3Renderer__ - 
7. __CSS3StereoRenderer__ - 
8. __RaytracingRenderer__ - レイトレーシングとよばれるレンダリング法を仮想的に実現する

### three.js による Canvas 2D Context
### ダウンロードと環境設定

```error
Cross-origin image load denied by Cross-origin Resource Sharing policy.
```

##### 起動オプションの設定
```bash
~\chrome.exe --allow-file-access-from-file
```

## three.js の基本形
### 軸オブジェクトの描画

```html
<div id="canvas-frame"></div>
```

```js
window.addEventListener('load', () => {
  threeStart()
})

function threeStart() {
  initThree()
  initCamera()
  initObject()
  draw()
}

var renderer
var scene
var canvasFrame

function initThree() {
  canvasFrame = document.getElementById('canvas-frame')
  renderer = new THREE.WebGLRenderer()
  if (!renderer) alert('three.js の初期化に失敗しました')
  renderer.setSize(canvasFrame.clientWidth, canvasFrame.clientHeight)
  canvasFrame.appendChild(renderer.domElement)
  renderer.setClearColorHex(0x000000, 1.0)
  scene = new THREE.Scene()
}

var camera
function initCamera() {
  camera = new THREE.PerspectiveCamera(
    45, // カメラの視野角
    canvasFrame.clientWidth / canvasFrame.clientHeight, 
    1, 10000
  )
  // カメラの位置
  camera.position.set(50, 50, 100)
  // カメラの上ベクトル
  camera.up.set(0, 0, 1)
  // カメラの中心位置ベクトル
  camera.lookAt({ x: 0, y: 0, z: 0 })
}

var axis
function initObject() {
  axis = new THREE.Axishelper(50)
  scene.add(axis)
  axis.position.set(0, 0, 0)
}

function draw() {
  renderer.render(scene, camera)
}
```

##### canvas 要素は自動生成される

### HTML文書の準備
### three.js スタート関数の定義
### three.js 初期化の定義
### カメラ初期化関数の定義
OpenGL では  __透視投影__ と __正投影カメラ__ の2種類のカメラが用意されています.

##### 透視投影による性質を示すパラメータ
- 視野角: fov
- アスペクト（縦横比）: aspect = width / height
- カメラから視体積の手前までの距離: near
- カメラから視体積の奥までの距離: far

### オブジェクト初期化関数の定義
### 描画関数の定義

## レンダラーオブジェクトとシーンオブジェクト
### WebGLRenderer クラス
- [three.js docs - __WebGLRenderer__](https://threejs.org/docs/#api/renderers/WebGLRenderer)

```js
var renderer = new THREE.WebGLRenderer(parameters)
```

##### アンチエイリアスの有無

### Scene クラス
- [three.js docs - __Scene__](https://threejs.org/docs/#api/scenes/Scene)

```js
var scene = new THREE.Scene()
```

### CanvasRenderer クラス
- [three.js docs - __CanvasRenderer__](https://threejs.org/docs/#examples/renderers/CanvasRenderer)
- [CanvasRenderer.js](https://github.com/mrdoob/three.js/blob/dev/examples/js/renderers/CanvasRenderer.js)

```js
var renderer = new THREE.CanvasRenderer(parameters)
```

### Projector クラス
- [Projecter.js](https://github.com/mrdoob/three.js/blob/dev/examples/js/renderers/Projector.js)

3次元グラフィックスを目的とするOpenGLなどでは, コンピューター内に生成した3次元空間を
2次元平面であるディスプレイに射影するために必要な計算をGPUで実行します.
CanvasRenderer などでは, この計算をCPUで明示的に実行する必要があります.
これらの計算を行うのが Projector クラスです.

```js
var projector = new THREE.Projecter()
```

## 軸オブジェクトと矢印オブジェクト
### AxisHeper クラス
- [three.js docs - __AxisHelper__](https://threejs.org/docs/#api/helpers/AxisHelper)

```js
var axis = new THREE.AxisHelper(size)
```

### ArrowHelper クラス
- [three.js docs - __ArrowHelper__](https://threejs.org/docs/#api/helpers/ArrowHelper)

```js
var arrow = new THREE.ArrowHelper(dir, origin, length, color, headLength, headWidth)
```

### GridHelper クラス
- [three.js docs - __GridHelper__](https://threejs.org/docs/#api/helpers/GridHelper)

```js
var grid = new THREE.Gridhelper(size, step)
```

```js
grid = new THREE.GridHelper(50, 10)
grid.rotation.set(Math.PI / 2, 0, 0)
```

## 透視投影カメラと正投影カメラ
### Camera クラス
- [three.js docs - __Camera__](https://threejs.org/docs/#api/cameras/Camera)

```js
var camera = new THREE.Camera()
```

##### カメラ位置変更後の反映
> 一度設定したカメラ位置を変更する場合, position プロパティを変更するだけでは反映されません.
> lookAt メソッドを実行すると反映されます.

```js
camera.position.set(100, 200, 300)
camera.lookAt({ x: 0, y: 0, z: 0 })
```

### PerspectiveCamera クラス
- [three.js docs - __PerspectiveCamera__](https://threejs.org/docs/#api/cameras/PerspectiveCamera)

```js
var camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
```

### OrthographicCamera クラス
- [three.js docs - __OrthographicCamera__](https://threejs.org/docs/#api/cameras/OrthographicCamera)

```js
var camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far)
```

### Frustum クラス
- [three.js docs - __Frustum__](https://threejs.org/docs/#api/math/Frustum)

6面で構成される錐台を定義するオブジェクトを生成するクラスです.
カメラの視体積を表現するために利用されます.

```js
var frustum = new THREE.Frustum(p0, p1, p2, p3, p4, p5)
```


