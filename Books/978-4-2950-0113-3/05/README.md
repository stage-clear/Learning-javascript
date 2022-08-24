# 第５章　複雑性を抑えるデザインパターン

### 5.2.2 ファンクターの詳細
ファンクターとは、本質的には、関数をマッピングできるデータ構造にすぎません。
その関数の目的は、値をラッパーから持ち上げて（リフトし）、変更してからラッパーに戻すことです。

```
fmap :: (A -> B) -> Wrapper(A) -> Wrapper(B)
```

```js
const plus = R.curry((a, b) => a + b)
const plus3 = plus(3)

// 数値2をWrapperファンクターに保存します
const two = wrap(2)

// fmapを呼び出し、plus3をコンテナにマッピングして、加算を実行します
const five = two.fmap(plus3) // -> Wrapper(5)
five.map(R.identity) // -> 5
```

__リスト5.2 ファンクターをつなげて、与えられたコンテキストに新しい振る舞い（処理）を適用する__
```js
const two = wrap(2)
two.fmap(plus3).fmap(R.tap(infoLogger)) // -> Wrapper(5)
```

- 副作用が存在してはならない
- 合成可能でなければならない
- ⚠️ ファンクターでは、例外を投げることやリストの要素を変異させること、そして関数の動作を変更することは禁止されています。
