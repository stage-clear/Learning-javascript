# Kill the CPU process

```js
/**
 * kill
 * @see http://www.phpied.com/css-animations-off-the-ui-thread/
 * @param {Number} ms 
 * @return {Boolean} (always) true
 * Kill the CPU process in time.
 */
function kill(ms) {
  let start = Date.now();
  let delay = +(ms || 1000);
  while (Date.now() - start < delay) {}
  return true;
}
```
