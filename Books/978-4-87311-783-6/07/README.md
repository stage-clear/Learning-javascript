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

- 隠蔽(shadowing)

> 変数のマスキングは変数の「隠蔽(shadowing)」とも呼ばれます.
> 変数がマスク(隠蔽)されると, 内側のブロックから外側にある変数にはアクセスできなくなります.


## 7.8 関数のスコープと巻き上げ

- 巻き上げ(hosting)

> `var` を使った方が `let` を使ったよりもわかりやすく書けるという例を思いつきません.
> `let` を使えるならば `var` を使う理由はないと言ってもよいでしょう.
