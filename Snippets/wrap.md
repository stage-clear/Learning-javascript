# Wrap

## 関数をラッピング

```js
function wrap(fn, wrapper, context) {
  return (...args) => {
  	args = [fn.bind(context)].concat(args);
    return wrapper.apply(context, args);
  };
}

// test
// source function
let a = str => str;

// a is wrapped
let b = wrap(a, function(origin, value, done) {
  let newVal = origin(value) + ' is wrapped';
  console.log('[before]', value);
  console.log('[after]', newVal);
  return done(newVal, value);
});

// b run
b('aaa', (newVal, oldVal) => {
  console.log('[b]', newVal);
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
