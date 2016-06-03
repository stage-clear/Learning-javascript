# GlobalEval.js

```js
function globalEval(data) {
  data = data.replace(/^\s|\s*$/g, '');

  if (data) {
    let head = document.getElementsByTagName('head')[0] || document.documentElement;
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.text = data;

    head.appendChild(script);
    head.removeChild(script);
  }
  return ;
}


// test 1:
;(function() {
  globalEval('var test = 5;');
})()

// work on global scope
console.log('test:', test); // => 5

// test 2:
// <script type="x/onload">
//   do something
// </script>
window.addEventListener('load', () => {
  let scripts = document.getElementsByTagName('script');

  for (let i = 0; i < scripts.length; i += 1) {
    if (scripts[i].type === 'x/onload') {
      globalEval(scripts[i].innerHTML);
    }
  }
});
```
