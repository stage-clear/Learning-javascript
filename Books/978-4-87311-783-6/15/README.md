# 日時
## 15.1 タイムゾーン, タイムスタンプ, UNIXエポック
日時を秒で表すとき, 0はいつなのでしょうか?
それはキリストの誕生日ではなく, [協定世界時(UTC)」の1970年1月1日午前0時0分0秒になります.
これを「UNIXエポック」と呼びます.

```js
const d = new Date()
console.log(d)

console.log(d.valueOf()) // UNIXエポックからのミリ秒数
```

## 15.2 Dateオブジェクトの生成

```js
let d = new Date()
console.log(d) //

d = new Date(2017, 0) // 2017年1月1日午前0時0分
d = new Date(2017, 1) // 2017年2月1日午前0時0分
d = new Date(2017, 1, 14) // 2017年2月14日午前0時0分
d = new Date(2017, 1, 14, 13) // 2017年2月14日午後1時0分
d = new Date(2017, 1, 14, 13, 30) // 2017年2月14日午後1時30分
d = new Date(2017, 1, 14, 13, 30, 5) // 2017年2月14日午後1時30分5秒
d = new Date(2017, 1, 14, 13, 30, 5, 500) // 2017年2月14日午後1時30分5秒5

// UNIX エポックのタイムスタンプから経過した日時を生成
d = new Date(0)
d = new Date(1000) // 1970年1月1日午前0時0分1秒
d = new Date(14634432000000) // 2016年5月16日午後5時0分

// UNIX エポック以前の日時を取得するため, 負の日時を指定
d = new Date(-365 * 24 * 60 * 60 * 1000) // 1969年1月1日午前0時0分

// 日時を表す文字列
d = new Date('June 14, 1903') // 1903年6月14日午前0時0分
d = new Date('June 14, 1903 GMT-0000') //1903年6月14日午前0時0分UTC
d = new Date('2020年7月10日') // INvalid Date: 日本語の表記は使えない
```

## 15.3 Moment.js

```html
<script src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment.min.js"><script>
<script src="//cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.5.11/moment-timezone-with-data.min.js"></script>
```

```js
const moment = require('moment-timezone')
```

## 15.4 JavaScriptによる日時関連の処理

Dateオブジェクトについてさらに詳しく知りたい場合は, [MDNのページ](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Date)を参照してください.

## 15.5 日時の生成
### 15.5.1 サーバーにおける日時の生成

```js
const d = new Date(Date.UTC(2017, 1, 14)) // 2017年2月14日UTC
```

```js
const moment = require('moment-timezone')

const d = moment.tz([2017, 3, 27, 11, 30], 'Asia/Tokyo').toDate()
console.log(d) // 2017-04-27T02:30:00.000Z
```

## 15.6 日時の受け渡し
注意しなければならないのは日時の受け渡しです. つまり, サーバーがブラウザに(あるいはブラウザがサーバーに)日時を伝える場合です.

JavaScript で日時を安全に受け渡すもっとも確かな方法はJSONを使うことです.

```js
const before = { d: new Date() }
console.log(before.d) // Mon Feb 13 2017 11:24:20 GMT+0900 (JST)
console.log(before.d instanceof Date) // true
const json = JSON.stringify(before) // 文字列に変換
console.log(json) // {"d":"2016-08-18T03:16:16.512Z"}
const after = JSON.parse(json)
console.log(after.d instanceof Date) // false
console.log(typeof after.d) // string
after.d = new Date(after.d)
console.log(after.d) // 2017-02-13T02:24:20.669Z
console.log(after.d instanceof Date) // true
console.log(after.d) // Mon Feb 13 2017 11:24:20 GMT+0900 (JST)
```

クライアントとサーバー間で日時を安全に受け渡すための安全なもう一つの方法は, 単純に日時を表す数値を使うことです.

```js
const before = { d: new Date().valueOf() }
console.log(before.d) // 1486952898369
console.log(typeof before.d) // number
const json = JSON.stringify(before)
console.log(json) // {"d":1486952946952}
const after = JSON.parse(json)
console.log(after)
console.log(typeof after.d) // number
const d = new Date(after.d) // {"d":1486953010184}
console.log(d) // Mon Feb 13 2017 11:35:19 GMT+0900 (JST)
```

## 15.7 日時関連の文字列の表示

```js
const d = new Date(Date.UTC(1930, 4, 10, 10, 0))
console.log(d.toLocaleDateString()) // 1930/5/10
console.log(d.toLocaleTimeString()) // 19:00:00
console.log(d.toTimeString()) // 19:00:00 GMT+0900 (JST)
console.log(d.toUTCString()) // Sat, 10 May 1930 10:00:00 GMT

const moment = require('moment-timezone')
console.log(moment(d).format('YYYY-MM-DD')) // 1930-05-10
console.log(moment(d).format('YYYY-MM-DD HH:mm')) // 1930-05-10 09:00
console.log(moment(d).format('YYYY-MM-DD HH:mm Z')) // 1930-05-10 09:00 +09:00
console.log(moment(d).format('YYYY-MM-DD HH:mm [UTC]Z')) // 1930-05-10 09:00 UTC+09:00
console.log(moment(d).format('dddd, MMMM [the] Do, YYYY')) // Saturday, May the 10th, 1930
console.log(moment(d).format('h:mm a')) // 5:00 pm
console.log(moment(d).format('YYYY年M月D日 hh:mmA')) // 1930年5月10日 0700PM
```

- `M`: 月を表す1桁の数字. 1~12
- `MM`: 月を表す2桁の数字(01, 02, ..., 12)
- `MMM`: 月を表す英単語の省略形(3文字. Jan, Feb, Mar, ..., Dec)
- `D`: 日を表す数字(1, 2, ..., 12)
- `Do`: 日(序数. 1st, 2nd, 3rd, ... 31)

## 15.8 月, 日, 曜日, 時, 分の取得

```js
const d = new Date(Date.UTC(1815, 9, 10))
console.log(d.getFullYear()) // 1815
console.log(d.getMonth()) // 9 (→10月)
console.log(d.getDate()) // 10
console.log(d.getDay()) // 2 (→火曜日)
console.log(d.getHours()) // 9
console.log(d.getMinutes()) // 0
console.log(d.getSeconds()) // 0
console.log(d.getMilliseconds()) // 0

// UTCで出力
console.log(d.getUTCFullYear()) // 1815
console.log(d.getUTCMonth()) // 9
console.log(d.getUTCDate()) // 10
console.log(d.getUTCDay()) // 2
console.log(d.getUTCHours()) // 0
console.log(d.getUTCMinutes()) // 0
console.log(d.getUTCSeconds()) // 0
console.log(d.getUTCMilliseconds())// 0
```

## 15.9 日時の取得

```js
const d1 = new Date(1996, 2, 1)
const d2 = new Date(2009, 4, 27)
console.log(d1 > d2) // false
console.log(d1 < d2) // true
```

## 15.10 日時の演算

```js
const d1 = new Date(1996, 2, 1)
const d2 = new Date(2009, 4, 27)
const msDiff = d2 - d1
console.log(msDiff) // 
const daysDiff = msDiff / 100/ 60 / 60 / 24
console.log(daysDiff) // 4835
```

したがって, `Array.prototype.sort` を使い日時を簡単にソートできます.
```js
const dates = []
const min = new Date(2017, 0, 1).valueOf()
const delta = new Date(2020, 0, 1).valueOf() - min

for (let i = 0; i < 10; i++) {
  dates.push(new Date(min + delta * Math.random()))
}

printDates(dates)
console.log('-----')
dates.sort((a, b) => b - a) // 降順にソート
printDates()
console.log('-----')
dates.sort((a, b) => a -b) // 昇順にソート
printDates(dates)

function printDates(dates) {
  for (let i = 0; i < dates.length; i++) {
    const d = dates[i]
    console.log(i + '. ' + d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() +'日')
  }
}
```

Moment.js には日時の一般的な演算を行う多くの強力なメソッドがあります.

```js
const moment = require('moment-timezone')

let m = moment()
console.log(m.format())
m.add(3, 'days') // m は3日後になる
m.substract(2, 'years') // mは現在の3日後より2年前の日付となる

m = moment() // リセット
m.startOf('year') // m は今年の1月1日になる
m.endOf('month') // mは今年の1月31日になる

const m = moment()
  .add(10, 'hours')
  .substract(3, 'days')
  .endOf('month')
  // mは 10時間進んでから3日戻った日の月の末日になる
```

## 15.11 相対的な日時の利用
ある日の「3日前」のように, 日時の情報を相対的な形で表せたらありがたいということがあります.

```js
const moment = require('moment-timezone')
console.log( moment().fromNow() ) // a few seconds ago
console.log( moment().substract(1, 'year').format() )
console.log('-----')
console.log( moment().substract(10, 'seconds').fromNow() )
console.log( moment().substract(44, 'seconds').fromNow() )
console.log( moment().substract(45, 'seconds').fromNow() )
console.log( moment().substract(5, 'minutes').fromNow() )
console.log( moment().substract(44, 'minutes').fromNow() )
console.log( moment().substract(45, 'minutes').fromNow() )
console.log( moment().substract(5, 'hours').fromNow() )
console.log( moment().substract(21, 'hours').fromNow() )
console.log( moment().substract(22, 'hours').fromNow() )
console.log( moment().substract(320, 'days').fromNow() )
console.log( moment().substract(321, 'days').fromNow() )
```

## 15.12 まとめ
