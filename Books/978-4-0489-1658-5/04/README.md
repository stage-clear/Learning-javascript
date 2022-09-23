# 第４章 サーバとの通信
## 4.1
### 4.1.1 同一性元決定のためのルール
|URL|結果|理由|
|:-|:-|:-|
|`http://example.com`|成功|同じプロトコル、ドメイン、ポート（デフォルトは80）|
|`http://example.com:8080`|失敗|ポートが異なる|
|`https://example.com`|失敗|プロトコルが異なる|
|`http://sub.example.com`|失敗|ドメインが異なる|
|`http://google.com`|失敗|ドメインが異なる|

## 4.2 JSONP
JSONPは同一生成元ポリシーを回避してJavaScriptからクロスドメインHTTPリクエストを行うことができる。

### 4.2.1 script要素を使ったJSONの読み込み


### 4.2.2 動的なコールバック
``` js
jsonCallback({
  "title": "Third-party JavaScript",
  "authors": ["Anton", "Ben"],
  "publisher": "Manning"
})
``` 

```js
window.jsonpCallback = function (json) {
  alert('Weve got a response! The title is ' + json.title)
}

var script = document.createElement('script')
script.async = true
script.src = 'http://thirdpartyjs.com/info.js?callback=jsonCallback'

document.body.appendChild(script)
```

## 4.3 サブドメインプロキシ
### 4.3.1 `document.domain`を利用してドキュメント生成元を変更する
```js
document.domain = 'example.com'
```
`document.domain`を変更できるのは**ページあたり1回**だけである。

> `document.domain`を変更することで、生成元のポートは80にリセットされる

### 4.3.2 サブドメインプロキシを利用して生成元を超えてデータをやり取りする

**リスト 4-4 `Camera Stork Web**サイトから製品情報を取得する関数
```js
function getProductData (id) {
  $.ajax({
    type: 'GET',
    url: 'http://camerastork.com/api/products/',
    data: { product: id },
    success: function (data) {
      renderWidget(data)
    }
  })
}
```

```html
<!DOCTYPE html>
<html>
  <haed>
    <script>document.domain = 'publisher.com'</script>
    ...
```
