# [JavaScript Design Patterns: Facade](https://www.joezimjs.com/javascript/javascript-design-patterns-facade/)

```js
function addEvent (element, type, func) {
  if (window.addEventListener) {
    element.addEventListener(type, func, false);
  } else if (window.attachEvent) {
    element.attachEvent('on' + type, func);
  } else {
    element['on' + type] = func;
  }
}
```

## SetStyle()
```js
var foo = document.getElementById('foo');
foo.style.color = 'red';
foo.style.width = '150px';

var bar = document.getElementById('bar');
bar.style.color = 'red';
bar.style.width = '150px';

var baz = document.getElementById('baz');
baz.style.color = 'red';
baz.style.width = '150px';
```

### 解決法
```js
function setStyle (elements, property, value) {
  for (var i = 0; length = element.length; i < length; i++) {
    document.getElementById(elements[i]).style[property] = value;
  }
}

setStyle(['foo', 'bar', 'baz'], 'color', 'red');
setStyle(['foo', 'bar', 'baz'], 'width', '150px');
```
