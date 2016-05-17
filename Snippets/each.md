# each

```js
/**
 * @param {Object} obj
 * @param {Function} iterator
 * @param {Object} context
 */
function each(obj, iterator, context) {
  var i;
  if (!obj) return ;
  if (obj.forEach) {
    obj.forEach(iterator, context);
  } else if (obj.length !== undefined) {
    i = 0;
    while (i < obj.length) {
      iterator.call(context, obj[i], i, obj);
      i++;
    }
  } else {
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        iterator.call(context, obj[i], i, obj);
      }
    }
  }
}

// test
var app = { data: [] };
each([1,2,3,4,5], function(value, index, array) {
  console.log('[each/test:1]', value, index, array);
  this.data.push(value);
}, app);
console.log('[each/test:2]', app);
```


## forEach

```js
/**
 * forEach
 * @param {Array} list
 * @param {Function} callback
 */
function forEach(list, callback) {
  for (var n = 0; n < list.length; n++) {
    callback.call(list[n], n);
  }
}

// test
forEach(app.data, function(index) {
	console.log('[forEach/test:1]', this, index);
});
```
