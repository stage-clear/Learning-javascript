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
