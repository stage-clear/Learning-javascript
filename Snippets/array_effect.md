# Array Effects

## Reduce

```js
/**
 * Reduce 
 * @param {Array} values
 * @param {Function} func
 * @return {Arrat}
 * @reference [関数型プログラミング目覚めた(P89)]
 */
function reduce(values, func) {
  let res;
  for (let i = 0; i < values.length; i += 1) {
    if (i === 0) {
      s = values[i];
    } else {
      s = f(res, values[i]);
    }
  }
  return res;
}
```

## Map
```js
/**
 * @param {Array} values
 * @param {Function} func
 * @return {Array}
 * @reference [関数型プログラミング目覚めた(P97)]
 */
function map(values, func) {
  let tmp = [];
  for (let i = 0; i < values.length; i += 1) {
    tmp[i] = func(values[i]);
  }
  return tmp;
}
```

## Range
```js
/**
 * Range
 * @param {Number} n
 * @return {Array}
 * @reference [関数型プログラミング目覚めた(P106)]
 */

function range(n) {
  let = tmp = [];
  for (let i = 0; i < n; i += 1) {
    tmp[i] = i;
  }
  return tmp;
}
```


