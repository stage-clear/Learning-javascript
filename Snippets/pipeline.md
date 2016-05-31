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

// test
let a = pipeline(42, function(n) {
	return -n;
});
console.log(a);

function fifth(a) {
	return pipeline(a
		, _.rest
		, _.rest
		, _.first
	)
}

let b = fifth([1,2,3,4,5]);
console.log(b);
```
