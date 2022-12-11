# Facade

```js
let myevent = {
  stop(e) {
    // modern browser + IE9~11
    if (typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    if (typeof e.stopPropagation === 'function') {
      e.stopPropagation();
    }

    // IE8
    if (typeof e.returnValue === 'boolean') {
      e.returnValue = false;
    }
    if (typeof e.cancelBubble === 'boolean') {
      e.cancelBubble = true;
    }
  }
};
```
