# Flatten
ネストした配列を平坦な配列に変換する

```js
function flatten(arr) {
  if (!Array.isArray(arr)) {
    return [arr];
  }
  
  var array = [];
  for (var i = 0; i < arr.length; i++) {
    array = array.concat(flatten(arr[i]));
  }

  return array;
}
```

```js
function flatten(arr) {
  var array = [];
  while (arr.length) {
    var value = arr.shift();
    if (!Array.isArray(value)) {
      arr = value.concat(arr);
    } else {
      array.push(value);
    }
  }
  return array;
}
```

## References
- [Flattening arrays in JavaScript](http://blog.benoitvallon.com/tips/flattening-arrays-in-javascript/)
