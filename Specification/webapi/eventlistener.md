# イベントリスナー

## removeEventListener

```ja
var element = document.getElementById('button')
element.addEventListener('click', function () {
  console.log('Hello')
  element.removeEventListener('click', arguments.callee, false)
}, false)
```
