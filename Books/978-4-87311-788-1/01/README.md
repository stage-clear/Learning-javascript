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

1つ目のパラメータは, コンポーネントに渡したいパラメーターを表します
```html
<script>
  ReactDOM.render(
    React.DOM.h1(
      {
        id: 'my-heading
      },
      'Hello world'
    ),
    document.getElementById('app')
  )
</script>
```

2つ目:



