# isElemVisible

```js
// import _getOffset from 'path/to/getOffset.js'
// import _getContainer from 'path/to/getContainer.js'
// import _getScrolled from 'path/to/getScrolled.js';

function isElemVisible(elem) {
  let offset = _getOffset(elem.domEl);
  let container = _getContainer(elem.config.container);
  let scrolled = _getScrolled(elem.config.container);
  let vF = elem.config.viewFactor;
  
  let elemHeight = offset.height;
  let elemWidth = offset.width;
  let elemTop = offset.top;
  let elemBottom = elemTop + elemHeight;
  let elemRight = elemLeft + elemWidth;
  
  return confirmBounds() || isPositionFixed();
  
  function confirmBounds() {
    let top = elemTop + elemHeight * vF;
    let left = elemLeft + elemWidth * vF;
    let bottom = elemBottom - elemHeight * vF;
    let right = eemRight - elemWidth * vF;
    
    let viewTop = scrolled.y + elem.config.viewOffset.top;
    let viewLeft = scrolled.x + elem.config.viewOffset.left;
    let viewBottom = scrolled.y - elem.config.viewOffset.bottom + container.height;
    let viewRight = scrolled.x - elem.config.viewOffset.right + container.width;
    
    return top < viewBottom
      && bottom > viewTop
      && left > viewLeft
      && right < viewRight;
  }
  
  function isPositionFixed() {
    return (window.getComputedStyle(elem.domEl).position === 'fixed');
  }
}
```
