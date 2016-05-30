# Compose.js

```js
/**
 * Compose 
 * @param {Function} a
 * @param {Function} b
 * @reference [関数型プログラミング目覚めた(P105)]
 */
function compose(a, b) {
  return function(x) {
    return b.apply(null, a(x));
  }
}
```

```js
function compose(/* args */) {
  let args = Array.from(arguments);
  let length = args.length;
  
  return function(/* values */) {
    if (length < 1) return value;
    let counter = 0;
    let values = Array.from(arguments);
    while(length > counter++) {
      values = args[counter].apply(null, values);
    }
    return values;
  }
}
```
