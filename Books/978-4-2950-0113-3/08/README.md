### 8.4.1 オブザーバブルなシークエンスとしてのデータ

```js
Rx.Observable.range(1, 3)
  .subscribe(
    x => console.log(`Next: ${x}`),
    err => console.log(`Error: ${err}`),
    () => console.log('Completed')
  )
```

1. subscribeメソッドは、3つのコールバック関数をとる。それらの関数では、「各要素を順番に処理」「エラー処理」「終了処理」を行う

### 8.4.2 関数型プログラミングとリアクティブプログラミング
Rx.Observableオブジェクトは、関数型の世界とリアクティブプログラミングの世界を統合します。

```js
Rx.Observable.of(1, 2, 3, 4, 5)
  .filter(x => x%2 !== 0) // 偶数の番号を除去
  .map(x => x * x)
  .subscribe(x => console.log(`Next: ${x}`))
```

SSNを入力するテキストフィールドを読み込み、これを評価する例:
```js
document.querySelector('#student-ssn')
  .addEventListener('change', function (event) {
    let value = event.target.value
    value = value.replace(/^\s*|\-|\s*$/g, '')
    console.log(value.length !== 9 ? 'Invalid' : 'Valid')
  })
```

```js
Rx.Observable.fromEvent(
  document.querySelector('#student-ssn'), 'change')     // changeイベントをサブスクライブする
    .map(x => x.target.value)                           // イベントから値を取り出す
    .map(cleanInput)                                    // 入力値をSSNに合わせて整形する関数
    .map(checkLengthSan)
    .subscribe(ssn => ssn.isRight 
      ? console.log('Valid') : console.log('Invalid'))  // 評価の結果がEither.RightかEither.Leftを検査して、結果が有効かどうかを確認する
```

### 8.4.3 RxJSとPromise
ソートされた米国在住の学生リストを表示する例:
```js
Rx.Observable.fromPromise(getJSON('/students'))
  .map(R.sortBy(R.compose(R.toLower, R.prop('firstname'))))   // すべての学生オブジェクトを大文字と小文字を区別せずにファーストネームによりソート
  .flatMapLatest((student) => Rx.Observable.from(student))    // 学生オブジェクトの単一な配列をオブザーバブルな一連の学生に変換
  .filter(R.pathEq(['address', 'country'], 'US'))             // 米国在住でない学生を除去
  .subscribe(
    student => console.log(student.fullname),                 // 結果を出力
    err => console.log(err)
  )
```

[RxJSのチュートリアル](https://xgrommx.github.io/rx-book)

## 8.5 まとめ
