# Sleep

```js
function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      return resolve(ms);
    }, ms);
  });
}

// Usage
sleep(1000).then(value => console.log(value + 'ms later..'));

// use `asyn/await`
(async () => {
  await sleep(1000);
  console.log('1000ms later.');
})();
```
