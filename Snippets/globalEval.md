# GlobalEval.js

```js
function globalEval(data) {
  data = data.replace(/^\s|\s*$/g, '');
  if (data) {
    var head = document.getElementsByTagName('head')[0] || document.documentElement;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.text = data;
    
    head.appendChild(script);
    head.removeChild(script);
  }
  return ;
}


// test
;(function() {
  globalEval('var test = 5;');
})()

// work on global scope
console.log('test:', test); // => 5
```
