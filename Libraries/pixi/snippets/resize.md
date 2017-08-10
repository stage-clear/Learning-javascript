# Resize

```js
var app = new PIXI.Application()
document.body.appendChild(app.view)

var onResize = () => {
  app.renderer.resize(window.innerWidth, window.innerHeight)
}

window.addEventListener('resize', onReisze, false)
```
