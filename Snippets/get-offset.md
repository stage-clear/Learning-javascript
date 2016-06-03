# getOffset


```js
/**
 * get offset by element
 * @reference https://github.com/jlmakes/scrollreveal.js/blob/master/scrollreveal.js#L781-L809
 */

function getOffset(el) {
  let offsetTop = 0;
  let offsetLeft = 0;

  // Grab the element's dimensions.
  let offsetHeight = el.offsetHeight;
  let offsetWidth = el.offsetWidth;
  
  // Now calculate the distance between the element and its parent, then
  // again for the parent to its parent, and again etc... until we have the
  // total distance of the element to the document's top and left origin.
  do {
    if (!isNaN(el.offsetTop)) {
      offsetTop += el.offsetTop;
    }
    if (!isNaN(el.offsetLeft)) {
      offset += el.offsetLeft;
    }
  } while (el = el.offsetParent);
  
  return {
    top: offsetTop,
    left: offsetLeft,
    height: offsetHeight,
    width: offsetWidth 
  };
}
```
