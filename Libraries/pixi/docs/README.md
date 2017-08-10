# Doc

## PIXI.loader
- [PixiJS API Documents - PIXI.loaders](http://pixijs.download/dev/docs/PIXI.loaders.html)

```js
PIXI.loader
  .add('spritesheet', 'path/to/json')
  .add('bunny', 'path/to/png')
  .load(onAssetsLoaded)

function onAssetsLoaded(loader, resources) {
  console.log(resource)
  // -> { spritesheet, bunny }
}
```

## Events
- [Pointer Events](https://www.w3.org/Submission/pointer-events/)

```js
var button = new PIXI.Sprite(...)

button
  // Mouse & touch
  .on('pointerdown', onButtonDown)
  .on('pointerup', onButtonUp)
  .on('pointerupoutside', onButtonUp)
  .on('pointerover', onButtonOVer)
  .on('pointerout', onButtonOut)
  
  // mouse-only
  .on('mousedown', onButtonDown)
  .on('mouseup', onButtonUp)
  .on('mouseupoutside', onButtonUp)
  .on('mouseover', onButtonOver)
  .on('mouseout', onButtonOut)
  
  // touch-only
  .on('touchstart', onButtonDown)
  .on('touchend', onButtonUp)
  .on('touchendoutside', onButtonUp)
```
