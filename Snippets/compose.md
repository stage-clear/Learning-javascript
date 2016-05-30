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
  let counter = 0, res = null;

  return function(value) {
    if (length < 1 || value == null) {
      return value;
    }
		res = value;
    while(length > counter) {
    	let arg = args[counter];
    	if (typeof arg === 'function') {
      	res = arg.call(null, res);
      }
      counter++;
    }
    return res;
  }
}
```
