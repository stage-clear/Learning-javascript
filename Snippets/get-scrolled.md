# getScrolled

```js
// import _getOffset from './getOffset.js';

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
