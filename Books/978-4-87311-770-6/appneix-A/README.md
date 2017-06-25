# Google Cardboard を使用したモバイルVR

- 3D空間を Google Cardboard で立体視できる形式で表示する方法
- 実際の顔の向きと VR 空間内のカメラの向きを同期する方法
- VR空間内のオブジェクトを選択する方法

## Google Cardboard について
- [Google Cardboard](https://vr.google.com/intl/ja_jp/cardboard/get-cardboard/)

> __THREE.CardboardEffect__ は Three.js の __r76__ で削除されました

## サンプルVRアプリの概要
- [01-cardboard.html](https://codepen.io/kesuiket/pen/gRGwqj) - codepen
- [01-cardboard.html](https://kesuiket.github.io/samples/threejs/cardboard/) - raw
- [03-stereo.html](https://codepen.io/kesuiket/pen/zzEoWE)

## 立体視
- [THREE.StereoEffect](https://threejs.org/docs/#api/cameras/StereoCamera)
- [THREE.CardboardEffect](https://github.com/mrdoob/three.js/blob/r75/examples/js/effects/CardboardEffect.js)

```html
<script src="../libs/effects/CardboardEffect.js"></script>
```

```js
var effect = new THREE.CardbardEffect(webGLRenderer)
```

`THREE.WebGLRenderer` の `render()` を `THREE.CardboardEffect` の `render()` に書き換えます
```js
effect.render(scene, camera)
```

画面上のアドレスバー（オムニバー）やナブゲーションバーを表示しないように
フルスクリーンモードにする
```js
var canvas = webGLRenderer.domElement
canvas.addEventListener('click', function() {
  canvas.webkitRequestFullScreen()
})
```

```js
window.addEventListener('resize', onWindowResize, false)

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  effect.setSize(window.innerWidth, window.innerHeight)
}
```

フルスクリーンにする別の方法:

```html
<link rel="manifest" href="/manifest.json">
```

```js
{
  "short_name": "Debri Clearner",
  "name": "Debri Cleaner",
  "icons": [...],
  "start_url":  "/02-cardboard-webapp.html",
  "display": "fullscreen",
  "orientation": "landscape"
}
```

- [Web App Manifest](https://www.w3.org/TR/appmanifest/)

## ヘッドトラッキング
- THREE.DeviceOrientationControls

```html
<script src="../libs/controls/DeviceOrientationControls.js"></script>
```

```js
var controls = new THREE.DeviceOrientationControls(camera)
```

```js
controls.update()
```

## オブジェクトの選択と操作

```js
var raycaster = new THREE.Raycaster()
```

```js
function selectDebri() {
  reycaster.setFromCamera({x: 0, y: 0}, camera)
  var intersects = raycaster.intersectObjects(earthAndDebris)
  for (var i = 0; i < intersects.length; i++) {
    var debri = intersects[i].object
    if (debri === earth) break
    if (selectedDebri !== debri) {
      deselectDebri()
      selectedDebri = debri
      debri.material.emissive.setHex(0xff3333)
      debri.scale.set(2, 2, 2)
      break
    }
  }
}
```

クリックされたときにデブリを削除する
```js
var canvas = webGLRenderer.domElement
canvas.addEventListener('click', function() {
  if (!document.mozFullScreen && !document.webkitIsFullScreen) {
    ...
  } else {
    removeSelectedDebri()
  }
}.bind(this))
```

### 本格的なVRヘッドマウントディスプレイ対応
- [WebVR](https://w3c.github.io/webvr/)
- [02-webvr.html]()

サンプルの変更点:
- `THREE.CardboardEffect` → `THREE.VREffect`
- `THREE.DeviceOrientationControls` → `THREE.VRControls`

```html
<script src="../libs/WebVR.js"></script>
<script src="../libs/VREffect.js"></script>
<script src="../libs/VRControls.js"></script>
```

はじめに WebVR の実装状況を確認し, 問題がある場合は状況に応じた警告メッセージを表示します
```js
if (WEBVR.isLatestAvailable(9 === false) {
  document.body.appendChild(WEBVR.getMessage())
}
```

コントロールエフェクトを作成します
```js
var controls = new THREE.VRControls(camera)
var effect = new THREE.VREffect(webGLRenderer)
var clock = new THREE.Clock()
if (WEBVR.isAvailable() === true) {
  document.body.appendChild(WEBVR.getButton(effect))
}
```

最後に描画ループ内でコントロールを更新します
```js
var delta = clock.getDelta()
controls.update(delta)
```
