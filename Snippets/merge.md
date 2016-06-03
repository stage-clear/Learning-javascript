# Merge.js
第1引数に、第2引数以降のオブジェクトをまーじする

```js
function merge(distination /*, ext1, est2, ... */) {
  if (arguments.length < 2) return distination;

  for (let i = 1; i < arguments.length; i += 1) {
    for (let key in arguments[i]) {
      distination[key] = arguments[i][key];
    }
  }
  return distination;
}

// test
var merged = merge(
  {name: 'John'},
  {place: 'aflica'},
  {name: 'paul'},
  {age: 12 }
);
```
