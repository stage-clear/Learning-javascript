
```js
// with jQuery and Lethargy.js
const lethargy = new Lethargy()
let delta
let oldDelta = 0
const resetOldDelta = () => {
  oldDelta = 0
}

$(window).on('mousewheel DOMMouseScroll wheel MozMousePixelScroll', function(e) {
  e.preventDefault()
  e.stopPropagation()
  
  delta = lethargy.check(e)
  
  if (delta !== false && delta !== oldDelta) {
    oldDelta = delta
    // do something..
  }
})
```
