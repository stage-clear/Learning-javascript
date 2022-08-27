# 第７章 高階関数を活用する

## 7.6 モナドを作る
もともとモナドは、参照透過性を維持したまま副作用を扱う手法としてHaskellに導入されました。

モナドの機能は、次の２点に要約されます。

- 値にコンテキストを付加すること
- コンテキストを付加したまま処理を合成すること

### モナドの基本
モナドの基本構造はとても単純で、次の2つの関数を備えていることが必須です。

- **Unit関数** - モナドのインスタンスを生成するための関数 （`unit:: T=> M[T]`）
- **flatMap関数** - 処理を合成するための関数 (`flatMap:: M[T] => FUN[T => MS[S]] => M[S]`)

```js
// 右単位元則
flatMap(instanceM)(unit) === instanceM
// 左単位元則
flatMap(unit(value))(f) === f(value)
//結合法則
flatMap(flatMap(instanceM)(f))(g) === flatMap(instanceM)((value) => flatMap(f(value))(g)
```

1. **右単位元則**: モナドのインスタンスから値を取り出して`unit`関数を適用した結果は、元モナドのインスタンスに等しい
2. **左単位元則**: ある値から作られたモナドのインスタンスに対して、`flatMap`関数を介して`f`関数を適用した結果は、元の値に対して`f`関数を適用した結果に等しい
3. **結合法則**: 

### 恒等モナド
恒等モナドは、値にコンテキストを付加することなく、そのままの値として扱います。

__7.85 恒等モナドの定義__
```js
var ID = {
  // unit:: T => ID[T]
  unit: (value) => { // 単なるidentity関数と同じ
    return value
  },
  // flatMap:: ID[T] => FUN[T => ID[T]] => ID[T]
  flatMap: (instanceM) => {
    return (transform) => {
      return transform(instanceM) // 単なる関数適用と同じ
    }
  }
}

// unit関数のテスト
expect(
  ID.unit(1)
).to.eql(1)
```

