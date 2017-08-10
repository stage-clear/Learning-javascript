# Interaction
- [PixiJS API Document - PIXI.interaction.InteractionManager](http://pixijs.download/dev/docs/PIXI.interaction.InteractionManager.html)
- [supportsPointerEvents](https://www.w3.org/Submission/pointer-events/)
- [supportsTouchEvents](https://www.w3.org/TR/touch-events/)

```js
var button = new PIXI.Sprite(...)

button
  // Mouse & touch
  .on('pointerdown', onButtonDown)
  .on('pointerup', onButtonUp)
  .on('pointerupoutside', onButtonUp)
  .on('pointerover', onButtonOVer)
  .on('pointerout', onButtonOut)
  .on('pointermove', onButtonMove)
  
  // mouse-only
  .on('mousedown', onButtonDown)
  .on('mouseup', onButtonUp)
  .on('mouseupoutside', onButtonUp)
  .on('mouseover', onButtonOver)
  .on('mouseout', onButtonOut)
  .on('mousemove', onButtonMove)
  
  // touch-only
  .on('touchstart', onButtonDown)
  .on('touchend', onButtonUp)
  .on('touchendoutside', onButtonUp)
  .on('touchmove', onButtonMove)
```
