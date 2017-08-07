# Leaning Three.js

## Quick start

```html
<div id="webgl"></div>
```

```css
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
```

```js
function init() {
  var scene = new THREE.Scene()
  var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1, 
    1000,
  )
  camera.position.x = 0
  camera.position.y = 5
  camera.position.z = 20
  camera.lookAt(new THREE.Vector3(0, 0, 0))
  
  var sphere = getSphere(1)
  scene.add(sphere)

  var renderer = new THREE.WebGLRenderer()
  document.getElementById('webgl').appendChild(renderer.domElement)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.render(scene, camera)
}

function getSphere(radius) {
  var geometry = new THREE.SphereGeometry(radius, 24, 24)
  var material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
  })
  var sphere = new THREE.Mesh(geometry, material)
  return sphere
}

init()
```

## References: 
- [クリッピング座標](http://miffysora.wikidot.com/clip-coordinates)
