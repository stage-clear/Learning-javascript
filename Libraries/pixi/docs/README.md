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
