# アニメーションとカメラの移動

- 基本のアニメーション
- カメラの移動
- モーフィングとスキンメッシュアニメーション
- 外部アニメーションの読み込み

## 基本的なアニメーション

```js
render()

function render() {
  renderer.render(scene, camera)
  
  requestAnimationFrame(render)
}
```

### 単純なアニメーション
- [09-basic-animation.html](https://codepen.io/kesuiket/pen/WOReZK)

回転角, 拡大率, 位置, マテリアル, 頂点, 面, その他考えられるすべてのものを定期的に変更するだけで
非常に簡単にアニメーションを実現できます.

```js
function render() {
  cube.rotation.x += controls.rotationSpeed
  cube.rotation.y += controls.rotationSpeed
  cube.rotation.z += controls.rotationSpeed
  
  step += controls.bouncingSpeed
  
  sphere.position.x = 20 + (10 * (Math.cos(step)))
  sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)))
  
  scalingStep += controls.scalingStep
  var scaleX = Math.abs(Math.sin(scalingStep / 4))
  var scaleY = Math.abs(Math.cos(scalingStep / 5))
  var scaleZ = Math.abs(Math.sin(scalingStep / 7))
  cylinder.scale.set(scaleX, scaleY, scaleZ)
  
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}
```

### オブジェクトの選択
- [02-selecting-objects.html](https://codepen.io/kesuiket/pen/EXZxgZ)

マウスを使用して真の中のオブジェクトを選択する方法です.

```js
var projector = new THREE.Projector()

function onDocumentMouseDown(event) {
  var vector = new THREE.Vector3(
     (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1,
    0.5
  )
  vector = vector.unproject(camera)
  
  var raycaster = new THREE.Raycaster(
    camera.position,
    vector.sub(camera.position).normalize()
  )
  
  var intersects = raycaster.intersectObject([
    sphere, cylinder, cube,
  ])
  
  if (intersects.length > 0) {
    intersects[0].object.material.transparent = true
    intersects[0].object.material.opacity = 0.1
  }
}
```

特定のオブジェクトがクリックされたかどうかを判定するために, `THREE.Projecter` と `THREE.Raycaster` を
組み合わせて使用しています

1. 初めに, クリックされたスクリーン上の位置を元に `THREE.Vector3` が作成されます
2. 次に `vector.unproject()` を使用して, クリックされたスクリーン上の位置を Three.js シーン内の座標に変換します.
   言い換えると, スクリーン座標からワールド座標系に逆射影（unproject）します
3. `THREE.Raycaster` を作成します. `THREE.Raycaster` を使用するとシーンの中でレイを飛ばすことができます.
   今回はカメラの位置（`camera.position`）からシーン内のクリックされた位置までレイを飛ばします
4. 最後に, `raycaster.intersectObjects()` を使用して与えられたオブジェクトのいずれかが例に当たっているかどうかを確認します

レイが当たったオブジェクトの情報の例:

```js
distance: 49.904788522448 // カメラからクリックされたオブジェクトまでの距離
face: THREE.Face3         // 選択されたメッシュのどの面がクリックされたか
faceIndex: 4              // 同上
object: THREE.Mesh        // クリックされたメッシュ
point: THREE.Vector3      // クリックされたメッシュ上の正確な位置
uv: THREE.Vector2         // 
```
