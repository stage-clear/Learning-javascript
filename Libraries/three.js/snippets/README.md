# Snippets

```js
var renderer 
var camera
function initScene() {
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(new THREE.Color(0x000000))
  renderer.shadowMap.enabled = true

  camera = initCamera()
  scene.add(camera)
  
  light = initLight()
  scene.add(light)

  document.getElementById('viewport').appendChild(renderer.domElement)
}
```

```js
function initCamera() {
  var camera = new THREE.PerspectiveCamera(
    35,
    window.innerWidth / window.innerHeight,
    1, 
    1000,
  )
  camera.position.set(90, 90, 90)
  camera.lookAt(new THREE.Vector3(30, 0, -20))
  
  return camera
}
```

```js
function initLight() {
  var light = new THREE.SpotLight(0xffffff)
  light.position.set(120, 70, 100)
  light.castShadow = true
  light.shadow.camera.near = 10
  light.shadow.camera.far = 200
  light.shadow.mapSize.width = 4096
  light.shadow.mapSize.height = 4096
  
  return light
}
```

```js
// Stats initialized.
// <script src="https://cdnjs.cloudflare.com/ajax/libs/stats.js/r16/Stats.min.js"></script>
var render_stats = initStats()

function initStats() {
  var stats = new State()
  var domElement = stats.domElement
  domElement.style.position = 'absolute'
  domElement.style.top = '1px'
  domElement.style.right = '1px'
  domElement.style.zIndex = 100
  document.getElementById('viewport').appendChild(domElement)
  return stats
}
```

```js
function update() {
  requestAnimationFrame(update)
  renderer.render(scene, camera)
  render_stats.update()
}
```

```js
var getTexture = () => {
  var data = 'data:image/jpeg;base64,/...'
  return data
}
var textureLoader = new THREE.TextureLoader()
var texture = textureLoader.load(getTexture())
someMaterial.map = texture
```
