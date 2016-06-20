# Sleep

```js
function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      return resolve(ms);
    }, ms);
  });
}
```
