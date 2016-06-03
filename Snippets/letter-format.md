# Capitalization

```js
function toCebab(str) {
  return str.replace(/([A-Z])/g, (all, letter) => {
    return '-' + letter.toLowerCase();
  });
}

function toCamel(str) {
  return str.replace(/(-[a-z])/ig, (all, letter) => {
    return letter.toUpperCase();
  });
}

// test

var camel = 'fontSize';
var cebab = 'font-size';
console.log('[-> cebab]', camel, toCebab(camel) );
console.log('[-> camel]', cebab, toCamel(cebab) );
```
