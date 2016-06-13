# extend

```js
/**
 * extend
 * `a` のオブジェクトを `b` のオブジェクトで拡張します
 * @param {Object} a
 * @param {Object} b
 * @return {Object}
 * @reference https://addyosmani.com/resources/essentialjsdesignpatterns/book/#decoratorpatternjavascript
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
 * @param {Object} destination
 * @param {Object} source
 * `destination` を `source` で拡張します
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

__"JavaScript Patterns" での実装__

```js
/**
 * extend
 *
 */
function extend(parent, child) {
  var i;
  child = child || {};

  for (i in parent) {
    if (parent.hasOwnProperty(i)) {
      child[i] = parent[i];
    }
  }
  return child;
}

/**
 * extendDeep
 * @param {Object} parent
 * @param {Object} child
 * `parent` で `child` を拡張します
 */
function extendDeep(parent, child) {
  var i;
  var toStr = Object.prototype.toString;
  var astr = '[object Array]';

  child = child || {};

  for (i in parent) {
    if (parent.hasOwnProperty(i)) {
      if (typeof parent[i] === 'object') {
        child[i] = (toStr.call(parent[i]) === astr) ? [] : {};
        extendDeep(parent[i], child[i]);
      } else {
        child[i] = parent[i];
      }
    }
  }
  return child;
}
```
