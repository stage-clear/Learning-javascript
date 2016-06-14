# fablic.js


- [kangax/fabric.js](https://github.com/kangax/fabric.js)
- [Animated sprite](http://fabricjs.com/animated-sprite)
- [sprite.class.js](http://fabricjs.com/js/sprite.class.js)

```html
<script src="fabric.min.js"></script>
<script src="sprite.class.js"></script>
```

```html
<canvas id="c" width="500" height="500"></canvas>
```

```js
(function() {
  var canvas = this.__canvas = new fabric.Canvas('c');
  fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';
  fabric.Object.prototype.transparentCorners = false;

  fabric.Sprite.fromURL('sprite.png', function(sprite) {
    sprite.set({ left: 50, top: 50, angle: fabric.util.getRandomInt(-30, 30) });
    canvas.add(sprite);
    
    (function play() {
      setTimeout(function() {
        sprite.spriteIndex = 0;
        sprite.play();

        setTimeout(function() {
          sprite.stop();

          setTimeout(function() {
            play();
          }, 2000);
        }, 1000);
      }, fabric.util.getRandomInt(1, 10) * 100);
    })();
  });

  (function render() {
    canvas.renderAll();
    fabric.util.requestAnimFrame(render);
  })();
})();
```
