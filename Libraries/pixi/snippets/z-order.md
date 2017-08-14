# zOrder

- [PIXI-Display](http://pixijs.github.io/examples/required/plugins/pixi-display.js)
  - `PIXI.DisplayList`
  - `PIXI.DisplayGroup`

```js
app.stage.displayList = new PIXI.DisplayList()

// PIXI.DisplayGroup(zIndex:Number, Sorting:Boolean)
// z-index = 0, sorting = true
var layer1 = new PIXI.DisplayGroup(0, true)
// A callback function on added.
layer1.on('add', sprite => {
  sprite.zOrder = -sprite.y
})

// PIXI.DisplayGroup(zIndex:Number, onAdded:Function)
// z-index = 1, (sorting = true)
var layer2 = new PIXI.DisplayGroup(1, sprite => {
  sprite.zOrder = +sprite.y
})

sprite.displayGroup = layer1

// Change the layer
function onSomething() {
  sprite.displayGroup = layer2
}
```
