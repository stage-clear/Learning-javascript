# Orthographic camera 

```js
function initOrthCamera() {
  var camera = new THREE.OrthographicCamera(
    window.innerWidth / -2,
    window.innerWidth / 2,
    window.innerHeight / 2,
    window.innerHeight / -2,
    1,
    200,
  )
  camera.position.set(0, 0, -10)
  camera.lookAt(new THREE.Vector3(0, 0, 0))
  return camera
}
```

```js
function init() {
  ...
  var camera = initOrthCamera()
  scene.add(camera)
}
```
