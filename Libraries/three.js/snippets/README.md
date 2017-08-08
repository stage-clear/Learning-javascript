# Snippets

```js
function init() {
  var scene = new THREE.Scene()
  var renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(new THREE.Color(0x000000))
  renderer.shadowMap.enabled = true

  var camera = initCamera()
  var light = initLight()
  var mesh = initMesh()
  
  scene.add(camera)
  scene.add(light)
  scene.add(mesh)

  document.body.appendChild(renderer.domElement)  
  window.addEventListener('resize', resize(camera, renderer), false)
  
  update()
}

function update(scene, camera, renderer) {
  window.requestAnimationFrame(function() {
    update(scene, camera, renderer)
  })
  renderer.render(scene, camera)
}

function resize(camera, renderer) {
  return function() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
}

window.addEventListener('load', init)
```
