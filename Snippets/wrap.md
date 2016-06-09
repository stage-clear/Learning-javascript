# Wrap

## 関数をラッピング

```js
function wrap(func, wrapper) {
  let callback = (function() {});
  let args = [];

  return function(/* ...values, callback */) {
  	args = Array.from(arguments);

    if (typeof args[args.length - 1] === 'function') {
    	callback = args.splice(args.length - 1, 1);
    }
  	values = func.apply(null, args);
    return wrapper.apply(null, [func, values].concat(callback));
  }
}

// test
// target function
let a = (x, y) => {
  console.log('[a]', x, y);
  return [x + y + 10, y];
};

// wrapped function
let a2 = wrap(a, (origin, value, done) => {
  console.log('[b 1]', value + 20);
  return done(value);
});

a2(10, 1, (value) => {
	console.log('[done]', value);
});
```

## オブジェクトのメソッドをラッピング

```js
function wrap(object, method, wrapper) {
  var fn = object[method];

  return object[method] = (...args) => {
    return wrapper.apply(object, [fn.bind(object)].concat(
      args
    ));
  };
}

// test 
/*
wrap(Element.Methods, 'readAttribute', function(original, elem, attr) {
  return attr == 'title' ?
    elem.title :
    original(elem, attr);
})
*/

wrap(document, 'write', function(original, elem, attr) {
//  console.log('[test]', original, elem, attr);
  return attr(elem);
});

document.write('aaa', function(a) {
//	console.log('[aaa]');
  var div = document.createElement('div');
  div.innerHTML = a;
  document.body.appendChild(div);
});
```
