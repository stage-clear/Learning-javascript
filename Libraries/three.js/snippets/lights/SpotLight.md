# Spot light

```js
function initSpotLight() {
  var camera = new THREE.SpotLight(0xffffff)
  light.position.set(0, 0, -10)
  light.castShadow = true
  light.shadow.camera.near = 10
  light.shadow.camera.far = 200
  light.shadow.mapSize.width = 2048
  light.shadow.mapSize.height = 2048

  return light
}
```

```js
function init() {
  ...
  var camera = initSpotLight()
  scene.add(camera)
}
```
