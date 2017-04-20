# JSX
## ハロー, JSX

```js
ReactDOM.render(
  <h1 id="my-heading">
    <span><em>Hell</em>o</span> world!
  </h1>,
  document.getElementById('app')
)
```

## JSX のトランスパイル

## Babel

```sh
$ mkdir ~/reactbook/babel
$ cd ~/reactbook/babel
$ curl https://cdnjs.cloudflare.com/ajax/libs/babel-core/6.1.19/browser.js > browser.js
```

## クライアント側でのトランスパイル

クライアント側でJSXを解釈できるようにするには, ページの中で2つのことを行う必要があります.

- JSXのトランスパイルを行うスクリプト browser.js をインクルード
- Babel による処理の対象であることを示すための `<script>` タグのマークアップ

```html
<script src="react/build/react.js"></script>
<script src="react/build/react-dom.js"></script>
<script src="babel/browser.js"></script>
```

トランスパイルが必要な `<script>` タグの `type` 属性に `text/babel`  という値を指定します.

```html
<script>
ReactDOM.render(/*...*/)
</script>

<script type="text/babel">
ReactDOM.render(/*...*/)
</script>
```

## JSXでのトランスパイル
