# fixedEventObject

```js
function fixEvent(event) {
  // Predefines often used functions
  const returnTrue = () => true;
  const returnFalse = () => false;
  
  // Tests if fixing up is needed
  if (!event || !event.stopPropagation) {
    const old = event || window.event;
    
    event = {};
    
    // Clones existing properties
    for (let property in old) {
      event[property] = old[property];
    }
    
    if (!event.target) {
      event.target = event.srcElement || document;
    }
    
    event.relatedTarget = event.fromElement === event.target ? 
      event.toElement : event.fromElement;
    
    event.preventDefault = () => {
      event.returnValue = false;
      event.isDefaultPrevented = retrunTrue;
    };
    event.isDefaultPrevented = returnFalse;
    
    event.stopPropagation = () => {
      event.cancelBubble = true;
      event.isPropagationStopped = returnTrue;
    };
    event.isPropagationStopped = returnFalse;
    
    if (event.clientX != null) {
      let doc = document.documentElement;
      let body = document.body;
      
      event.pageX = event.clientX + 
        (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
        (doc && doc.clientLeft || body && body.clientLeft || 0);
      event.pageY = event.clientY + 
        (doc && doc.scrollTop || body && body.scrollTop || 0) -
        (doc && doc.clientTop || body && body.clientTop || 0);
    }
    
    // manage key press
    event.whick = event.charCode || event.keyCode;
    
    // modifies clicked mouse button
    if (event.button != null) {
      event.button = (event.button & 1 ? 0 :
        (event.button & 4 ? 1:
          (event.button & 2 ? 2: 0)
        )
      );
    }
  }

  // Returns fixed up instance
  return event;
}
```
