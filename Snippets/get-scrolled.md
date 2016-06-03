# getScrolled

```js
// import _getOffset from './getOffset.js';

/**
 * get scrolled
 * @reference https://github.com/jlmakes/scrollreveal.js/blob/master/scrollreveal.js#L759-L777
 *
 */
function getScrolled(container) {
  // Return the container scroll values, plus the its offset.
  if (container && container !== window.document.documentElement) {
    var offset = _getOffset(container);
    return {
      x: container.scrollLeft + offset.left,
      y: container.scrollTop + offset.top
    };
  } else {
    return {
      x: window.pageXOffset,
      y: window.pageYOffset
    }
  }
}
```
