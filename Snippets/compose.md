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

可変長引数に対応 + 左から処理

```js
function compose(...funcs) {
  let len = funcs.length;

  return function(value) {
    if (len < 1 || value == null) {
      return value;
    }

    let res = value
			, index = 0;

    while(len > index) {
      let f = funcs[index];
      if (typeof f === 'function') {
        res = f.call(null, res);
      }
      index++;
    }
    return res;
  };
}
```

可変長引数 + 右から処理

```js
function composeRight(/* arguments */) {
  let args = Array.from(arguments);
  let length = args.length;
  let res = null;

  return function(value) {
    if (length < 1 || value == null) {
      return value;
    }
    res = value;
    while (length) {
      let arg = args[--length];
      if (typeof arg === 'function') {
        res = arg.call(null, res);
      }
    }
    return res;
  };
}
```
