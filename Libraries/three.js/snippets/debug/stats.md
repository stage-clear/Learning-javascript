# Stats

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/stats.js/r16/Stats.min.js"></script>
```

```js
function initStats() {
  var stats = new Stats()
  stats.setMode(0)
  stats.domElement.style.position = 'absolute'
  stats.domElement.style.left = '0px'
  stats.domElement.style.top = '0px'
  document.body.appendChild(stats.domElement)
  return stats
}
```

```js
function init() {
  ...
  var stats = initStats()
  ...
  render()
}

function render() {
  requestAnimationFrame(render)
  ...
  stats.update()
}
```
