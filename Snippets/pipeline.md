# Pipeline

```js

function pipeline(seed /*, some functions */) {
  const _reduce = Array.prototype.reduce;
  const _rest = (args) => {
    args = Array.from(arguments);
    return args.splice(2);
  };
  
  return _reduce(_rest(arguments), (r, l) => {
    r(l);
  }, seed);
}
```
