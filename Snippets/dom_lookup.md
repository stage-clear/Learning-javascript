# DOM Look up

```js
function up(el) {
  while (el) {
    el = el.parentNode;
  }
}
```

```js
function lookUp(el, targetSelector) {
  let found = false;

  while (!found && el) {
    el = el.parentNode;
    if ( check(el) ) {
      // truthy
      found = true;
      return el;
    }
  }
  
  return undefined;
  
  function check(target) {
    // Check  
    if (!target || !target.classList) return false;
    return target.classList.contains(targetSelector);
  }
}
```
