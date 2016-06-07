# extend

```js
/**
 * extend
 * a のオブジェクトを b のオブジェクトで拡張します
 * @param {Object} a
 * @param {Object} b
 * @return {Object}
 * @referenct https://addyosmani.com/resources/essentialjsdesignpatterns/book/#decoratorpatternjavascript
 */

function extend(a, b) {
	for (let key of b) {
		if (b.hasOwnProperty(key)) {
			a[key] = b[key];
		}
	}
	return a;
}
```

```js
/*
 * deepExtend
 * 2つのオブジェクトを拡張します
 * @reference https://github.com/jakiestfu/Snap.js/blob/develop/snap.js
 */

function deepExtend(destination, source) {
  let property;
  for (property in source) {
    if (source[property] && source[property].constructor &&
      source[property].constructor === Object) {
      destination[property] = destination[property] || {};
      deepExtend(destination[property], source[property]);
    } else {
      destination[property] = source[property];
    }
  }
  return destination;
}

var extended = deepExtend(
  {name: 'John', birth: { y: '2009', m: '1', d: '10' }},
  {place: 'aflica', birth: { y: '1990' }},
  {name: 'paul'},
  {age: 12 }
);
```
