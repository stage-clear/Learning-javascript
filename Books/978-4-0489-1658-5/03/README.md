# 3
### 3.2.2 CSSファイルをロードする
```js
function loadStylesheet (url) {
  var link = document.createElement('link')
  
  link.rel = 'stylesheet'
  link.type = 'text/css'
  link.href = url
  
  var entry = document.getElementsByTagName('script')[0]
  entry.parentNode.insertBefore(link, entry)
}

#### CSSファイルの読み込みが完了したタイミングを検知する
```css
#stork-css-ready {
  color: #bada55 !important;
}
```

```js
function isCssReady (callback) {
  var testElem = document.createElement('span')
  
  testElem.id = 'stork-css-ready'
  testElem.style = 'color: #fff'
  
  var entry = document.getElementsByTagName('script')[0]
  entry.parentNode.insertBefore(testElem, entry)

  ;(function poll() {
    var node = document.getElementById('css-ready')
    var value

    // 色を取得するためにW3Cスタイルのアクセサを利用する
    if (window.getComputedStyle) {
      value = document.defaultView
        .getComputedStyle(testElem, null)
        .getPropertyValue('color')
    } else if (node.currentStyle) { // IE
      value = node.currentStyle.color
    }

    // テスト要素がスタイルシートによって色が付けられたかを確認
    if (value && value === 'rgb(186, 218, 85)' || value.toLowerCase() === '#bada55') {
      callback()
    } else {
      setTimeout(poll, 500)
    }
  })();
}
```
[別の方法: `document.styleSheets`を利用する](https://github.com/SlexAxton/yepnope.js)
