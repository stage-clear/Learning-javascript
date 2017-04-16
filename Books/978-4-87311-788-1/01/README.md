# Hello world

## セットアップ

```bin
$ mkdir ~/reactbook
$ mv ~/Downloads/rect-15.5.0 ~/reactbook/react
```

## ハロー, React ワールド

```html
<!doctype html>
<html>
  <head>
    <title>Hello React</title>
    <meta charset="utf-8">
  </head>
  <body>
    <div id="app">
      <!-- アプリケーションはここに描画されます-->
    </div>
    <script src="react/build/react.js"></script>
    <script src="react/build/react-dom.js"></script>
    <script>
      // アプリケーションのコード
    </script>
  </body>
</html>
```

```html
<script>
  ReactDOM.render(
    React.DOM.h1(null, 'Hello world!'),
    document.getElementById('app')
  )
</script>
```

## 内部で起こっている処理

## `React.DOM.*`

```js
// コンポーネントの一覧を表示
console.log( Object.keys(React.DOM) )
```

1つ目のパラメータは, コンポーネントに渡したいパラメーターを表します.
```html
<script>
  ReactDOM.render(
    React.DOM.h1(
      {
        id: 'my-heading'
      },
      'Hello world'
    ),
    document.getElementById('app')
  )
</script>
```

2つ目のパラメーターは子コンポーネントを定義するのに使われます.

```html
<script>
  ReactDOM.render(
    React.DOM.h1(
      { id: 'my-heading' },
      React.DOM.span(null, 'Hello'),
      ' world'
    ),
    document.getElementById('app')
  )
</script>
```

```html
ReactDOM.render(
  React.DOM.h1(
    {id: 'my-heading'},
    React.DOM.span(null,
      React.DOM.em(null, 'Hell'),
      'o'
    ),
    ' world!'
  ),
  document.getElementById('app')
)
```

```jsx
React.DOM.render(
  <h1 id="my-heading">
    <span><em>Hell</em></span> world!
  </h1>,
  document.getElementById('app')
)
```

## 特別な DOM の属性
`class`, `for`, `style` の3つについては, 注意が必要です.
`class` と `for` は, JavaScript での予約語なので利用できません.
代わりに `className` と `htmlFor` を指定する必要があります.

```
// Bad
React.DOM.h1(
  {
    class: 'pretty',
    for: 'me'
  },
  'Hello world!'
)

// Good
React.DOM.h1(
  {
    className: 'pretty',
    htmlFor: 'me'
  },
  'Hello world!'
)
```

`style` は属性値として文字列を指定することはできません.
JavaScript のオブジェクトとしてスタイルを指定する必要があります.

```
// Bad
React.DOM.h1(
  {
    style: 'background: black; color: white; font-family: Verdana',
  },
  'Hello world'
)

// Good
React.DOM.h1(
  {
    style: {
      background: 'black',
      color: 'white',
      fontFamily: 'Verdana'
    },
  },
  'Hellow world!'
)
```

## ブラウザの拡張機能(React Developer Tools)

- [React Developer Tools](https://facebook.github.io/react/blog/2015/09/02/new-react-developer-tools.html)

## 予告: カスタムコンポーネント

- React ライブラリのインストールとセットアップそして利用
- DOM 上の指定された位置にReactコンポーネントを描画する方法. `React.render(Component, position)` を使用.
- DOM の要素がラップされた, 組み込みのコンポーネントの利用方法. `React.DOM.div(Property, ChildComponent)`
