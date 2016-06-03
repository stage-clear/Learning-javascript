# Merge.js
第1引数に、第2引数以降のオブジェクトをまーじする

```js
function merge(seed /*, ext1, est2, ... */) {
  if (arguments.length < 2) return seed;

  let res = seed;

  for (let i = 1; i < arguments.length; i += 1) {
    for (let key in arguments[i]) {
      res[key] = arguments[i][key];
    }
  }
  returen res;
}

// test
var merged = merge(
  {name: 'John'},
  {place: 'aflica'},
  {name: 'paul'},
  {age: 12 }
);
```
