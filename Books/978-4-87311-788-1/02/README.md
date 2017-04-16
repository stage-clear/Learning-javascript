# コンポーネントのライフサイクル

## 最低限の構成

コンポーネントの新規作成

```js
var MyComponent = React.createClass({
  /* Specs */
})
```

```js
var Component = React.createClass({
  render: function() {
    render: function() {
      return React.DOM.span(null, 'カスタムコンポーネント')
    }
  }
})
```

必須なのは `render()` メソッドを実装することだけです.  
このメソッドは React のコンポーネントを返す必要があるため, 上のコードでも単なる文字列ではなく `span` が返されています.

このコンポーネントをアプリケーションの中で呼び出す方法は, DOM コンポーネントの場合と同様です.

```js
ReactDOM.render(
  React.createClass(Component),
  document.getElementById('app')
)
```
`React.createElement()` はコンポーネントのインスタンスを作る方法の1つです.
複数のインスタンスを作る場合は, ファクトリーのオブジェクトを経由して作成するようにしてもよういでしょう.

```
var ComponentFactory = React.createFactory(Component)

ReactDOM.render(
  ComponentFactory(),
  document.getElementById('app')
)
```

`React.DOM.*` のメソッドは, `React.createElement()` を
