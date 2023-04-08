# 関数コンビネータ

## identity（Iコンビネータ）
```
identity :: (a) -> a
```

## tap（Kコンビネータ）
```
tap :: (a -> *) -> a -> a
```

- void型関数を、合成に対して橋渡しすrのに極めて便利な関数です。

## alternation（ORコンビネータ）
```ts
const alt = function (func1, func2) {
  return function (val) {
    return func(val) || func(val)
  }
}
```

## sequence（Sコンビネータ）

```ts
const seq = function (/* funcs */) {
  const funcs = Array.prototype.slice.call(arguments);
  return function (val) {
    funcs.forEach(function (fn) {
      fn(val)
    })
  }
}
```

## fork(join)コンビネータ

```ts
const fork = function (join, func1, func2) {
  return function (val) {
    return join(func1(val), func2(val))
  }
}
```
