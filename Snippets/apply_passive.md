# Apply Passive on eventListener
## Define
```js
function applyPassive() {
  let isSupported = false;

  try {
    document.addEventListener('test', null, {
      get passive() {
        isSupported = true;
      }
    });
  } catch(e) {
    isSupported = false;
  }

  return isSupported ? { passive : true } : false;
}
```

## Usage

```js
element.addEventListener('click', handler, applyPassive());
```


