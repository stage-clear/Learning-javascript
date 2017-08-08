# Ambient Light

```js
function initAmbientLight() {
  var light = new THREE.AmbientLight(0x292929)
  return light
}
```

```js
function init() {
  ...
  var light = initAmbientLight()
  scene.add(light)
}
```
