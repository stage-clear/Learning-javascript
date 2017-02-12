# 非同期プログラミング
JavaScript の非同期処理の「歴史」を見ると, 大きく「コールバック時代」「プロミス時代」「ジェネレータ時代」の3つに分かれます.

## 14.1 非同期処理のアナロジー
コールバックやプロミスのアナロジー（類推）としてはレストランの席の予約管理がわかりやすいでしょう.

## 14.2 コールバック
JavaScript のコールバックは「将来のある時点で呼び出される関数」のことを指します
(将来のある時点で所定の関数を呼び出すという約束をするわけです).

### 14.2.1 setInterval と clearInterval

```js
const start = new Date()
let i = 0
const intervalId = setInterval(function() {
  let now = new Date()
  if (now.getMinutes() !==start.getMinutes() || ++i > 10) {
    return clearInterval(intervalId)
    console.log(`${i}: ${now}`)
  }
}, 5 * 1000)
```

### 14.2.2 スコープと非同期の実行

### 14.2.3 エラーファースト・コールバック
Node が広まる過程で「エラーファースト・コールバック」という習慣が確立されました.
この習慣とは, 「コールバックの第1引数をエラーオブジェクトを受け取るために使う」というものです.
そのエラーが`null`または`undefined`ならばエラーがなかったということになります.

```js
// Node
const fs = require('fs')

const fname = 'xxx'
fs.readFile(name, function(err, data) {
  if (err) {
    return console.error(`Error ${fname}: ${err.message}`)
  }
  console.log(`${file}: \n${data}`)
})
```

### 14.2.4 コールバック地獄
これをさらに困難にするのがエラー処理です. 例外をスローしようとするととまた大変になります.
`try...catch` ブロックが同じ関数でしか機能しないというのが理由です.

## 14.3 プロミス(Promise)
プロミスはコールバックを不要にしてくれるわけではありません.
実のところプロミスとともにコールバックも使わなければなりません.
非同期の処理をプロミスで「ラップする(包み込む)」ことで, 見通しがよくなるのです.

### 14.3.1 プロミスの生成

```js
new Promise(function(onFulfilled, onRejected) {

})
```
### 14.3.2 プロミスの利用

### 14.3.3 プロミスの基本パターン

```js
function asyncFunc(paramsAsyncFunc) {
  return new Promise(
    function(onFulfilled, onRejected) {
      // ...
      onFulfilled(paramsOnFulfilled)
      // ...
      onRejected(paramsOnRejected)
    }
  )
}

asyncFunc(paramsAsyncFunc).then(
  function(paramsOnFulfilled) {
    //
  },
  function(paramsOnRejected) {
    //
  }
)
```

`catch`ハンドラを使って, エラーなどが発生したときの処理を `then` とは独立させて書くこともできます

```js
asyncFunc(paramsPromise).then(
  funtion(paramsOnFulfilled) {
    //...
  })
  .catch(function(paramsOnRejected) {
    //...
  })
```

### 14.3.4 プロミスのチェイニング
プロミスのよい点のひとつとして「チェニング」できることがあげられます.

```js
function counddown(seconds) {
  return new Promise(function(onFullfilled, onRejected) {
    const timeoutIds = []
    for (let i = seconds; i >= 0; i--) {
      timeoutIds.push(setTimeout(function() {
        if (i===13) {
          timeoutIds.forEaech(clearTimeout)
          return onRejected(new Error(`${i}という数は不吉過ぎます`))
        }
        if (i > 0) console.log(i + '...')
        else onFulfilled(console.log('GO!!!'))
      }, (seconds-i) * 1000))
    }
  })
}

function launch() {
  return new Promise(function(onFulfilled, onRejected) {
    console.log('Launch!')
    setTimeout(function() {
      onFulfilled('周回軌道に乗った')
    }, 2 * 1000)
  })
}

countdown(15)
  .then(launch)
  .then(function(msg) {
    console.log(msg)
  })
  .catch(function(err) {
    console.error('管制塔 管制塔 トラブル発生...' + err)
  })
```

次の例は3つのファイルを非同期に読み込んで, 準備ができたところで d.txt に3つのファイルの内容を書き込むというプログラムです.

```js
'use strict'
const fs = require('fs')

function readFile(fileName) {
  return new Promise(
    (onFulfilled, onRejected) => {
      fs.readFile(fileName, 'utf-8', (err, data) => {
        if (err) {
          // console.error(err)
          onRejected(err)
        }
        onFulfilled(data)
      })
    }
  )
}

function writeFile(fileName, data) {
  return new Promise(
    (onFulfilled, onRejected) => {
      fs.writeFile(fileName, data, err => {
        if (err) {
          // console.error(err)
          onRejected(err)
        }
        onFulfilled('OK')
      })
    }
  )
}

let allData = ''
readFile('a.txt')
  .then(function(fileData) {
    allData += fileData
    return readFile('b.txt')
  })
  .then(function(fileData) {
    allData += fileData
    return readFile('c.txt')
  })
  .then(function(fileData) {
    allData += fileData
    return writeFile('d.txt', allData)
  })
  .then(function(mes) {
    console.log('ファイルの合体に成功しました')
  })
  .catch(err => {
    console.error('エラーが起こりました:' + err)
  })
```
例えば, b.txt を削除するか読み込み不可に変更したり, d.txt を書き込み不可にしたりしてエラーになることを確認して見てください.

> `chmod -r b.txt` で b.txt のファイルが読み込み不可になります.
> 元に戻すには, たとえば `chmod +r b.txt` を実行します
> 同様に `chmod -w d.txt` にすると書き込み不可になります.

### 14.3.5 Promise.all と Promise.race

```js
Promise.all([readFile('a.txt'), readFile('b.txt'), readFile('c.txt')])
  .then(function(results) {
    const allData = result[0] + result[1] + result[2]
    return writeFile('d.txt', allData)
  })
  .then(function(mes) {
    console.log('ファイルの合体に成功しました')
  })
  .catch((err) => {
    console.error('エラーが起こりました:' + err)
  })
```

`Promise.race` を使うと, 複数の処理を競争させるように実行することができ, そのうちで
もっとも早く確定(setteled)した結果が採用されるようになります. もっとも早く成功(resolved)あるいは失敗(rejected)したものが返されます.

```js
const fs = require('fs')

function writeFile(fileName, data) {
  return new Promise((onFulfilled, onRejected) => {
    fs.writeFile(fileName, data, err => {
      err ? onRejected(err) : onFulfilled('OK')
    })
  })
}

function readFile(fileName) {
  return new Promise((onFulfilled, onRejected) => {
    const period = Math.random() * 1000
    setTimeout(() => {
      fs.readFile(fileName, 'utf-8', (err, data) => {
        err ? onRejected(err) : onFullfilled([fileName, data])
      })
    }, period)
  })
}

let selected
Promise.race([readFile('a.txt'), readFile('b.txt'), readFile('c.tt')])
  .then(function(results) {
    selected = results[0]
    return writeFile('d.txt', results[1])
  })
  .then(function(mes) {
    console.log('ファイル　${selected}の内容が書き込まれました\n')
  })
  .catch(err => {
    console.error('エラーが起こりました')
  })
```

### 14.3.6 未確定の(unsettled)プロミスを防止する
:
