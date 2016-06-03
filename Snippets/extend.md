# extend

```js
/*
 * deepExtend
 * 2つのオブジェクトを拡張します
 * @via https://github.com/jakiestfu/Snap.js/blob/develop/snap.js
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
