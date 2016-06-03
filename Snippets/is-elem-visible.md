# isElemVisible

```js
// import _getOffset from 'path/to/getOffset.js'
// import _getContainer from 'path/to/getContainer.js'
// import _getScrolled from 'path/to/getScrolled.js';

/**
 * is elem visible
 * @param {HTMLElement} el
 * @param {HTMLElement} viewport - Usualy, It is window object
 * @param {Obmect} _viewOffset - { top, left, bottom, right }
 * @return {Booean} True is visibled elem.
 * @reference 
 *   - https://github.com/jlmakes/scrollreveal.js/blob/master/scrollreveal.js#L813-L855,
 *   - https://scrollrevealjs.org/assets/viewoffset.png (viewOffset visual aid)
 */

function isElemVisible(el, viewport, _viewOffset) {
  let offset = _getOffset(el);
  let container = _getContainer(viewport);
  let scrolled = _getScrolled(viewport);
  let vF = 0.2; // viewFactor

  let elemHeight = offset.height;
  let elemWidth = offset.width; 
  let elemTop = offset.top;
  let elemLeft = offset.left;
  let elemBottom = elemTop + elemHeight;
  let elemRight = elemLeft + elemWidth;

  let viewOffset = { top: 0, left: 0, bottom: 0, right: 0 };

  if (_viewOffset) {
    for (let key in _viewOffset) {
      if (_viewOffset[key] && _viewOffset[key] !== 0) {
        viewOffset[key] = _viewOffset[key];
      }
    }
  }

  return confirmBounds();

  function confirmBounds() {
    let top    = elemTop    + elemHeight * vF;
    let left   = elemLeft   + elemWidth  * vF;
    let bottom = elemBottom - elemHeight * vF;
    let right  = elemRight  - elemWidth  * vF;
    
    viewTop    = scrolled.y + viewOffset.top;
    viewLeft   = scrolled.x + viewOffset.left;
    viewBottom = scrolled.y - viewOffset.bottom + container.height;
    viewRight  = scrolled.x - viewOffset.right  + container.width;
    
    return top  < viewBottom
      && bottom > viewTop
      && left   > viewLeft
      && right  < viewRight;
  }
}



// test
let elem = document.getElementById('elem');
let viewport = document.documentElement;
window.addEventListener('scroll', () => {
	if (isElemVisible(elem, viewport, { top: 200 })) {
		console.log('[I\'m in!]');
	}
});
```
