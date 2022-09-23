# 第２章

### 2.4.1 JavaScriptファイル

**リスト 2-3 非同期のJavaScriptローダー関数**
```js
function loadScript (url, callback) {
  var script = document.createElement('script')
  
  script.async = true
  script.src = url
  
  var entry = document.getElementsByTagName('script')[0]
  entry.parentNode.insertBefore(script, entry)
  
  script.onload = script.onreadystatechange = function () {
    var rdyState = script.readyState
    
    if(!rdyState || /complete|loaded/.test(script.readyState)) {
      callback()
      
      script.onload = null
      script.onreadystatechange = null
    }
  }
}
```

** dom.js - DOM操作関数を含むCamera Storkライブラリファイル**
```js
Stork.dom = (function (window, undefined) {
  var document = window.document
  var dom = {}
  
  dom.get = function (selector) {
    return selector.charAt(0) === '#' ?
      document.getElementById(selector) :
      document.getElementsByTagName(selector)
  }
  
  return dom
})(window)
```

``` js
loadScript('http://camerastork.com/widget/dom.js', function () {
  // DOMヘルパー関数はcallback関数でアクセス可能になる
  Stork.dom('#some-id')
})
```

## 2.5 スクリプトの引数の解析
### 2.5.1 クエリ文字列を使う
```html
<script>
(function () {
  var script = document.createElement('script')
    
  script.async = true
  script.src = 'http://camerastork.com/widget.js?product=1234'
  var entry = document.getElementsByTagName('script')[0]
  entry.parentNode.insertBefore(script, entry)
})()
</script>
```

**リスト 2-6 スクリプトのURLを取得する**
```js
function getScriptUrl () {
  var scripts = document.getElementsByTagName('script')
  var elements
  var src
  
  for (var i = 0; i < scripts.length; i++) {
    element = scripts[i]
    src = element.src
    
    if (src && /camerastork\.com\/widget\.js/.test(src)) {
      return src
    }
  }
  return null
}
```

** リスト 2-7 クエリパラメータの抽出**
```js
function getQueryParameters (qurey) {
  var args = query.split('&')
  var params = {}
  var pair
  var key
  var value
  
  function decode (string) {
    return decodeURIComponent(string||'').replace('+', ' ')
  }
  
  for (var i = 0; i < args.length; i++) {
    pair = args[i].split('=')
    key = decode(pair[0])
    value = docode(pair[1])
    params[key] = value
  }
  return params
}
```

```
// 使用例
var url = getScriptUrl()
var params = getQueryParameters(url.replace(/^.*\?/, ''))
var productId = params.product
```

### 2.5.2 フラグメント識別子の利用
フラグメント識別子はURLの最後の部分であり、ドキュメントの一部ではあるが、クエリ文字列とは異なりブラウザによってはサーバに送信されない。
```
http://camerastork.com/widget.js**#product_id=1234**
```

```js
var params = getQueryParameters(url.replace(/^.*\#/, ''))
```
