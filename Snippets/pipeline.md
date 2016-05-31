# Pipeline

```js

function pipeline(seed /*, some functions */) {
	const _reduce = Array.prototype.reduce;
  const _rest = (args) => {
    args = Array.from(arguments);
    return args.splice(2);
  };

	return _reduce.call(_rest(arguments), (l, r) => {
    r(l);
  }, seed);
}
```
