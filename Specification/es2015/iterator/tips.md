# Useful tips

```js
let num = [1,2,3,2,3,4,5]
let str = 'あいうえお'

console.log(...num)
> 1 2 3 2 3 4 5
console.log(...str)
> あ い う え お
console.log(Math.max(...num))
> 5
```

```js
let [a, b, c] = num
let [d, e, f] = str
console.log(a,b,c,d,e,f)
> 1 2 3 "あ" "い" "う"
```

```js
console.log(new Set(num))
> Set(5) {1, 2, 3, 4, 5}
```
