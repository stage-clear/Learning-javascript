# 例外とエラー処理
## 11.1 Error オブジェクト

## 11.2 例外処理 `try...catch`

## 11.3 例外のスロー
`throw`を呼び出すと現在実行中の関数は直ちに停止します.

## 11.4 例外処理とコールスタック

JavaScript のほとんどの実装では, Error のインスタンスには `stack` というプロパティがあり,
コールスタックの文字列による表現を見ることができます.

```js
try {
  a()
} catch(err) {
  console.log(err.stack)
}
```

## 11.5 `try...catch...finally`

`finally` ブロックを使うことで, エラーがあった場合でもなかった場合でも必ず処理をすることができます.

```js
try {
  throw new Error('Error 1')
} catch(err) {
  console.log('happened error')
} finally {
  console.log('always works')
}
```

## 11.6 例外処理は例外に限る
