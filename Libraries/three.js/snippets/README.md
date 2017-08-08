# Snippets

```js
function init() {
  var scene = new THREE.Scene()
  var renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(new THREE.Color(0x000000))
  renderer.shadowMap.enabled = true
  
  var update = function() {
    window.requestAnimationFrame(update)
    renderer.render(scene, camera)
  }

  var resize = function() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  var camera = initCamera(scene)
  var light = initLight(scene)

  document.getElementById('viewport').appendChild(renderer.domElement)
  
  update()
  
  window.addEventListener('resize', resize, false)
  
  return { scene, camera, renderer }
}

window.addEventListener('load', init)
```
