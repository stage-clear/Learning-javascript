# Perspective camera

```js
function initPerspectiveCamera() {
  var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1, 
    1000,
  )
  camera.position.set(0, 0, -10)
  return camera
}
```

```js
function init() {
  ...
  var camera = initPerspectiveCamera()
  scene.add(camera)
}
```
