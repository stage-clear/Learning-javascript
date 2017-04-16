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

`React.DOM.*` のメソッドは, `React.createElement()` をラップしたものです.
つまり, `React.createElement()` を使って DOM の要素を生成することもできます.

```js
ReactDOM.render(
  React.createElement('span', null, 'Hello'),
  document.getElementById('app')
)
```

## プロパティ

```js
var Component = React.createClass({
  render: function() {
    return React.DOM.span(null, '私は' + this.props.name + 'です')
  }
})

ReactDOM.render(
  React.createElement(Component, {
    name: 'Bob'
  }),
  document.getElementById('app')
)
```

> `this.props` は読み取り専用だと思ってください

## `propTypes`

```
var Component = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired
  },
  render: function() {
    return React.DOM.span(null, '私は' + this.props.name + 'です')
  }
})
```

`propTypes` は必須ではないが, 2つの点でメリットがあります.

- コンポーネントが期待しているプロパティをはっきり宣言できます.
- 実行時にプロパティの値に対して型チェックが行われるようになります.

```js
// PropTypes に指定できる値の一覧
Object.keys(React.PropTypes)
```

### プロパティのデフォルト値

```js
var text = 'text' in this.props ? this.props.text : ''
```

```js
var Component = React.createClass({
  propTypes: {
    firstName: React.PropTypes.string.isRequired,
    middleName: React.PropTypes.string,
    familyName: React.PropTypes.string.isRequired,
    address: React.PropTypes.string,
  },
  
  getDefaultProps: function() {
    return {
      middleName: '',
      address: 'なし'
    }
  },
  
  render: function() {
    /* */
  }
})
```

`getDefaultProps()` はオブジェクトを返します.

## ステート
静的で内部状態を持たないコードをステートレスであると言います.

`this.props` でプロパティにアクセスできるのと同じように, `this.state` を使うとステートにアクセスできます.
ステートを変更するには, `this.setState()` を使います.

## ステートを持ったテキストエリアのコンポーネント

```js
var TextAreaCounter = React.createClass({
  propTypes: {
    text: React.PropTypes.string,
  },
  
  getDefaultProps: function() {
    return {
      text: ''
    }
  },
  
  render: function() {
    return React.DOM.div(null, 
      React.DOM.textarea({
        defaultValue: this.props.text // <-
      }),
      React.DOM.h3(null, this.props.text.length)
    )
  }
})

ReactDOM.render(
  React.createElement(TextAreaCounter, {
    text: 'Bob'
  }),
  document.getElementById('app')
)
```
このコンポーネントがステートを持つように変更しましょう

```js
var TextAreaCounter = React.createClass({
  propTypes: {
    ...
  },

  getDefaultProps: {
    ...  
  },

  getInitialState: function() {
    return {
      text: this.props.text
    }
  },
  
  _textChange: function(ev) {
    this.setState({
      text: ev.target.value
    })
  },
  
  render: function() {
    return React.DOM.div(null,
      React.DOM.textarea({
        value: this.state.text,
        onChange: this._textChange,
      }),
      React.DOM.h3(null, this.state.text.length)
    )
  }
})
```

## DOM のイベント

```
onChange: this._textChange,
```

### 従来のイベント処理

```html
<button onclick="処理"></button>
```

イベントリスナーがUIとともに記述されているというのは便利で読みやすいのですが,
このようなイベントリスナーが何ヶ所にも散らばっていると非効率です.

DOMの世界では, `element.addEventListener` を使ってイベントリスナーを設定し, コードを複数箇所に記述できるようにしています.

```html
<div id="parent">
  <button id="ok">OK</button>
  <button id="cancel">キャンセル</button>
</div>

<script>
  document.getElementById('parent').addEventListener('click', function(event) {
    var button = event.target
    
    switch(button.id) {
      case 'ok':
        console.log('OK')
        break
      case 'cancel':
        console.log('Cancel')
        break
      default:
        new Error('Invalid ID')
    }
  })
</script>
```

このコードは正しく
