# Web life cycle

```js
document.addEventListener('DOMContentLoaded', () => {
  // Created DOM tree
});

document.addEventListener('beforeunload', () => {
  // out
});
```

```js
window.addEventListener('hashchange', () => {
  // changed hash
});

window.addEventListener('load', () => {
  // loaded resources.
});
```
