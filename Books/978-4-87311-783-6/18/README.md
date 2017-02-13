# ウェブブラウザのJavaScript
## 18.1 ES5かES2015か
## 18.2 ドキュメントオブジェクトモデル(DOM)
> DOMのすべての構成要素は「ノード」です.
> そのうち, HTMLの「要素」となっているのは一部のノードです.

```js
console.log(document instanceof Node) // true
console.log(document.parentNode) // null
console.log(document.childNodes) // NodeList
console.log(document.nodeType) // 9
console.log(document.nodeName) // #document

const children = document.childNodes
console.log('子どもの数:' + children.length) // 子どもの数: 2
console.log(children[0]) // [object DocumentType]
console.log(children[0].nodeType) // 10
console.log(children[1]) // <html>
console.log(children[1].nodeType) // 1
console.log(children[2]) // undefined

console.log(Node.ELEMENT_NODE) // 1
console.log(children[1].nodeType === Node.ELEMENT_NODE) // true
console.log(Node.TEXT_NODE) // 3
```

```js
function printDOM(node, prefix) {
  console.log(prefix + node.nodeName)
  
  for (let i = 0; i < node.childNodes.length; i++) {
    printDOM(node.childNodes[i], prefix + '    ')
  }
}

printDOM(document, '')
```

- [document.createTreeWalker](https://developer.mozilla.org/ja/docs/Web/API/Document/createTreeWalker)

## 18.3 DOM の get メソッド

```js
document.getElementById('content') // <div id="content"></div>
document.getElementsByClassName('callout')
document.getElementsByTagName('p')

// spread operator
[...document.getElementsByTagName('p')]
```

## 18.4 DOM要素に関するクエリー

```js
document.querySelector('#content')
document.querySelectorAll('.callout')
```

- [セレクタ MDN](https://developer.mozilla.org/ja/docs/Web/Guide/CSS/Getting_Started/Selectors)

## 18.5 DOM要素の操作

```js
const para1 = document.getElementsByTagName('p')
console.log(para1.textContent) // 
console.log(para1.innerHTML) // 
alert('変更します')
para1.textContent = 'HTMLを修正しました'
console.log(para1.textContent) // 
alert('変更します')
para1.innerHTML = 'innerHTMLを使った<b>修正後</b>のHTML'
console.log(para1.innerHTML) //
```

```js
const body = document.getElementsByTagname('body')[0]
alert('変更します')
body.innerHTML = '<h1>新しい内容</h1>'
```

## 18.6 DOM要素の生成

```js
const p1 = document.createElement('p')
const p2 = document.createElement('p')
p1.textContent = 'この段落は動的に生成されました'
p2.textContent = 'この段落は動的に生成された2つ目の段落です'
const parent = document.getElementById('content')
const firstChild = parent.childNodes[0]
alert('変更します')
parent.insertBefore(p1, firstChild)
alert('変更します.第２段落')
parent.appendChild(p2)
```

## 18.7 要素のスタイル

```css
.highlight {
  background: #ff0;
  font-weight: bold;
}
```

```js
function highlightParas(containing) {
  if (typeof containing === 'string') {
    containing = new RegExp(`${containing}`)
  }
  const paras = document.getElementsByTagName('p')
  for (let p of paras) {
    if (!containing.test(p.textContent)) continue
    p.classList.add('highlight')
  }
}

highlightParas('ユニーク')

function removeParaHighlights() {
  const paras = document.getElementsByTagName('p')
  // const paras = document.querySelectorAll('p.highlight')
  for (let p of paras) {
    p.classList.remove('highlight')
  }
}
```

## 18.8 data属性

```js
const highlightActions = document.querySelectorAll('[data-action="highlight"]')
console.log(highlightActions[0].dataset)
// DOMStringMap {}

highlightActions[0].dataset.containing = 'giraffe'
```

## 18.9 イベント

```js
const highlightActions = 
  document.querySelectorAll('[data-action="highlight"]')
for (let a of highlightActions) {
  a.addEventListener('click', evt => {
    evt.preventDefault()
    highlightParasHighlights()
  })
}

const removeHighlightActions = 
  document.querySelectorAll('[data-action="removeHighlights"]')
for (let a of removeHighlightActions) {
  a.addEventListener('click', evt => {
    evt.preventDefault()
    removeParaHighlights()
  })
}
```

### 18.9.1 イベントのキャプチャリングとバブリング

- `preventDefault`
- `stopPropagation`
- `stopImmediatePropagation`

```js
function logEvent(handleName, type, cancel, stop, stopImmediate) {
  return function(evt) {
    if (cancel) evt.preventDefault()
    if (stop) evt.stopPropagation()
    if (stopImmediate) evt.stopImmediatePropagation()
    console.log(`${type}: ${handleName}` + 
      (evt.defaultPrevented ? '(キャンセルされた)' : ''))
  }
}

function addEventLogger(element, type, action) {
  const capture = type === 'capture'
  element.addEventListener(
    'click', 
    logEvent(element.tagName, type, 
      action === 'cancel', action === 'stop', action === 'stop!'
    ),
    capture
  )
}

const body = document.querySelector('body')
const div = document.querySelector('div')
const button = document.querySelector('button')

addEventLogger(body, 'capture')
addEventLogger(body, 'bubble')
addEventLogger(div, 'capture')
addEventLogger(div, 'bubble')
addEventLogger(button, 'capture')
addEventLogger(button, 'bubble')

// <div>のキャプチャリングでキャンセル
addEventLogger(body, 'capture')
addEventLogger(body, 'bubble')
addEventLogger(div, 'capture', 'cancel')
addEventLogger(div, 'bubble')
addEventLogger(button, 'capture')
addEventLogger(button, 'bubble')

// <button>のキャプチャリングで伝搬を停止
addEventLogger(body, 'capture')
addEventLogger(body, 'bubble')
addEventLogger(div, 'capture', 'cancel')
addEventLogger(div, 'bubble')
addEventLogger(button, 'capture', 'stop!')
addEventLogger(button, 'bubble')
```

### 18.9.2 イベントの種類
[DOMのイベント一覧](https://developer.mozilla.org/docs/Web/Events#Categories)

- drag
- focus
- submit
- input (mouse)
- media
- progress
- touch

## 18.10 Ajax

```js
const http = require('http')

const server = http.createServer(function(req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.end(JSON.stringify({
    platform: process.platform,
    nodeVersion: process.version,
    uptime: Math.round(process.uptime())
    // uptime: 連続稼働時間
  }))
})

const port = 7070
server.listen(port, function() {
  console.log(`Ajax server started on port ${port}`)
})
```

```js
function refreshServerInfo() {
  const req = new XMLHttpRequest()
  req.addEventListener('load', function() {
    //
    console.log(this.responseText)
  })
  req.open('GET', 'http://localhost:7070', true)
  req.send()
}

refreshServerInfo()
```

```js
function refreshServerInfo() {
  const req = new XMLHttpRequest()
  req.addEventListener('load', function() {
    // this.responseText がJSONデータを含む文字列
    // JSON.parse を使って, オブジェクトに変換する
    const data = JSON.parse(this.responseText)
    
    // <div>のテキストを置換する
    const serverInfo = document.querySelector('.serverInfo')
    
    // サーバーから返されたオブジェクトのすべてのキーについて処理を行う
    Object.keys(data).forEach(p => {
      // プロパティがマッチする要素を捜す
      const replacements = serverInfo.querySelectorAll(`[data-replace="${p}"]`)
      // 値を置換する
      for (let r of replacements) {
        r.textContent = data[p]
      }
    })
  })
  
  req.open('GET', 'http://localhost:7070', true)
  req.send()
}

refreshServerInfo()
// setInterval(refreshServerInfo, 200)
// これによって「サーバーが起動されたからの時間」が刻々と更新されるようになったはずです
```

- [Using XMLHttpRequest](https://developer.mozilla.org/ja/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest)

## 18.11 まとめ

- [Learning Web App Development](http://shop.oreilly.com/product/0636920030621.do)
