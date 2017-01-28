# スコープ

## 7.5 変数の隠蔽

```js
{
  let x = { color: 'blue' }
  let y = x
  let z = 3
  {
    let x = 5 // 外側のxを「マスク」される（隠されてしまう）
    console.log(x) // > 5
    console.log(y.color) // > blue
    y.color = 'red'
    console.log(z) // > 3 「マスク」されていない
  }
  console.log(x.color) // > red
  console.log(y.color) // > red
  console.log(z) // 3
}
```

> 変数のマスキングは変数の「隠蔽(shadowing)」とも呼ばれます.
> 変数がマスク(隠蔽)されると, 内側のブロックから外側にある変数にはアクセスできなくなります.
