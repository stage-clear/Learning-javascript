# mixin

```js
function mixin(...funcs) {
  let i = 0, prop, child = {};

  for (len = funcs.length; i < len; i += 1) {
    for (prop in funcs[i]) {
      if (funcs[i].hasOwnProperty(prop)) {
        child[prop] = funcs[i][prop];
      }
    }
  }
}
```

## "JavaScript Patters" の実装

```js
/**
 * mix
 * @param {Object} ...
 * 複数のオブジェクトからコピーし、それらをすべて混ぜ合わせて新しいオブジェクトを作成します
 */
function mix(/* some objects */) {
  var arg, prop, child = {};
  
  for (arg = 0; arg < arguments.length; i += 1) {
    for (prop in arguments[arg]) {
      if (arguments[arg].hasOwnProperty(prop)) {
        child[i] = artuments[arg][prop];
      }
    }
  }
  return child;
}
```
