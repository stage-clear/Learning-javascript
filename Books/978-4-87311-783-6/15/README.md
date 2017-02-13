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
