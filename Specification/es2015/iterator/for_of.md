# `for...of`

- `next()` を使った反復処理は最もプリミティブなAPIで、普通は `for...of` 文を使う。

```js
let iterable = [1,2,3];

for (let i of iterable) {
  console.log(i);
}
> 1
> 2
> 3
```

```js
for (let i of 'abc') {
  console.log(i);
}
> a
> b
> c
```
