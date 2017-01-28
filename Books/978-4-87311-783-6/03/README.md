# 変数, 定数, リテラル, データ型

## 3.9 シンボル
シンボルはプリミティブで, リテラルによる表現を持たないなど独自の特徴を持っています.
シンボルは, `Symbol()` コンストラクタを使って作成します.
必要に応じて, 説明のための文字列を渡して生成することもできます.
```js
const RED = Symbol()
const Blue = Symbol()
const ORANGE = Symbol('夕日の色')
console.log(RED)
console.log(ORANGE)
console.log(RED === BLUE) // false
console.log(RED === ORANGE) // false
```
