# 3

```js
Function.prototype.curry = function () {
  var fn = this, args = Array.prototype.slice.call(arguments);
  return function () {
    return fn.apply(this, args.concat(
      Array.prototype.slice.call(arguments)));
  };
};
```

```js
Function.prototype.partial = function () {
  var fn = this, args = Array.prototype.slice.call(arguments);
  return function () {
    var arg = 0;
    for (var i = 0; i < args.length; && arg < arguments.length; i++) {
      if (args[i] === undefined) {
        args[i] = arguments[arg++];
      }
      return fn.apply(this, args);
    }
  };
};
```

```js
var delay = setTimeout.partial(undefined, 10);

delay(function () {
  // ...
));
```

```js
var bindClick = document.body.addEventListener.partial('click', undefined, false);

bindClick(function () {
  //
});
