# Wrap

## 関数をラッピング

```js
function wrap(func, wrapper, context) {
  return (...args) => {
  	return wrapper.apply(context, [func.bind(context)].concat(args));
  };
}

// test
// source function
function a (str) {
	console.log('[a]', str);
  return str;
}

// a is wrapped
let b = wrap(a, function(origin, ...values) {
  let callback = values.pop();
  let value = values[0]
	console.log('[wrapper]', origin, values);
  console.log('[a work in wrapper]', origin(value));
  callback(value + '---');
});

// b run
b('aaa', function(a) {
	console.log('[b]', a);
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
