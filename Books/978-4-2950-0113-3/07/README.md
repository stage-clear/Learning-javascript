# 7


**リスト7.3 関数呼び出しにメモ化を追加する**
```
/**
 * メモ化
 */
Function.prototype.memoized = function () {
  let key = JSON.stringify(arguments)
  this._cache = this._cache || {}
  this._cache[key] = this._cache[key] || this.apply(this, arguments)
  return this._cache[key]
}

/**
 * メモ化を有効にする
 * 単項関数のみメモ化を試みる
 * 関数インスタンスをメモ化した関数にラッピング
 */
Function.protoype.memoize = function () {
  let fn = this
  if (fn.length === 0 || fn.length > 1) {
    return fn
  }
  return function () {
    return fn.memoized.apply(fn, arguments)
  }
}
```

