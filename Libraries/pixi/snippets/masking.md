# Masking

```js
var mask = new Graphics()
...
app.stage.addChild(mask)

var container = new PIXI.Container()
container.mask = mask // <-
app.stage.addChild(container)
```

__Remove mask__

 ```js
 container.mask = null
 ```
