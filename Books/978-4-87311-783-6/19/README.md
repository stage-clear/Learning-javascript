# 19章　jQuery
## 19.1 jQueryと「$」

## 19.2 jQueryの利用

## 19.3 DOMのロードを待つ

## 19.4 jQueryにラップされたDOM要素

## 19.5 要素の操作

## 19.6 jQueryオブジェクトのアンラップ

```js
const para2 = $('p').get(1)   // 2番目の<p>
```

## 19.7 Ajax

```js
$(function () {
  let TimeID = setInterval(refreshServerInfo, 200)
  
  function refreshServerInfo () {
    const $serverInfo = $('.serverInfo')
    $.get('http://localhost:7070').then(
      function (data) {
        Object.keys(data).forEach(p => {
          $(`[data-replace="${p}"]`).text(data[p])
        })
      },
      function (jqXHR, textStatus, err) {
        const $errorInfo = $('.error')
        $errorInfo.text('エラー: サーバーに接続できません')
        clearInterval(TimerID)
      }
    )
