# Directional Light

```js
function initDirectionalLight() {
  var color = 0xffffff
  var light = new THREE.DirectionalLight(color)
  light.position.set(0, 100, -160)
  light.castShadow = true
  light.shadow.camera.near = 2
  light.shadow.camera.far = 500
  light.shadow.camera.left = -100
  light.shadow.camera.right = 100
  light.shadow.camera.top = 50
  light.shadow.camera.bottom = -50
  light.distance = 0
  light.intensity = 0.5
  light.shadow.mapSize.height = 1024
  light.shadow.mapSize.width = 1024
  
  return light
}
```

影が不自然だった場合は `light.shadow.camera` 以下のパラメータを調整する

```js
function init() {
  var light = new THREE.DirectionalLight(0xffffff)
  vat lightHelper = new THREE.DirectionalLightHelper(light)

  scene.add(light)
  scene.add(lightHelper)
}
```
