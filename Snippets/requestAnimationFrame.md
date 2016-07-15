# window.requestAnimationFrame - Polyfill

```js
/**
 * 
 * from 'ScrollTrigger.js'
 * @see https://github.com/terwanerik/ScrollTrigger/blob/master/ScrollTrigger.js#L219-L224
 */

var loop = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  function(callback) { setTimeout(callback, 1000 / 60); };
```
