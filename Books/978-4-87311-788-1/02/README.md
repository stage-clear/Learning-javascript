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

```js
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

```js
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

このコードは正しく機能し, パフォーマンスも良好ですが問題点もあります.

- UIのコンポーネントから離れた場所でイベントリスナーが宣言されており, コードを探したりデバッグしたりする際に面倒です
- イベントの発生元に応じて場合分けが必要になり, コードの量が不必要に増大します
- ここでは省略していますが, ブラウザごとの違いに対処するためのコードがさらに必要になります
  - `addEventListener` だけでなく `attachEvent` も必要です
  - イベントリスナーの先頭行で `var event = event || window.event` と記述します
  - button の宣言を `var button = event.target || event.srcElement` に変更します
  
### React でのイベント処理

React ではキャメルケース形式の名前でイベントハンドラを指定します. 
例えば `onclick` ではなく `onClick` のように指定します.

## プロパティとステート
プロパティとは, 外側の世界から<sup>（つまりコンポーネントのユーザー）</sup>コンポーネントの設定を行うための仕組みです.
ステートは, 内部のデータ構造です. オブジェクト指向プログラミングの用語を借りるなら, `this.props` はコンストラクタに渡す引数で,
`this.state` はプライベート変数です.

## 初期状態をプロパティとして渡す（アンチパターン）

`getInitialState()` の中で `this.props` にアクセスしている例がありましたが,
このようなコードはアンチパターンだとされています.

```js
getInitialState: function() {
  retun {
    text: this.props.text
  }
}
```

`render()` メソッドで UI を組み立てる際には, `this.state` と `this.props` を自由に併用できるのが理想です.

```
var TextAreaCounter = React.createClass({
  propTypes: {
    defaultValue: React.PropTypes.string,
  },

  //getDefaultProps: function() {
  //  defaultValue: this.props.defaultValue
  //}

  getInitialState: function() {
    return {
      text: this.props.defaultValue
    }
  }
})

var myTextAreaCounter = ReactDOM.render(
  React.createElement(TextAreaCounter, {
    defaultValue: 'Bob'
  })
)
```

## 外部からコンポーネントへのアクセス

コンポーネントへの参照を取得する: `React.render()` からの戻り値として参照を受け取り, コンポーネントを外から操作します.

```js
var myTextAreaCounter = ReactDOM.render(
  React.createElement(TextAreaCounter, {
    defaultValue: 'Bob',
  }),
  document.getElementById('app')
)
```

変数 `myTextAreaCounter` を使えば, コンポーネント内からの場合と同様にメソッドやプロパティにアクセスできます.

```js
myTextAreaCounter.setState({ text: 'Hello outside world!' })
```

```js
var reactAppNode = ReactDOM.findDOMNode(myTextAreaCounter)
reactAppNode.parentNode === document.getElementById('app') // true
```

```js
myTextAreaCounter.props // Object {defaultValue: 'Bob'}
myTextAreaCounter.state // Object {text: 'Hello outside world!'}
```

## プロパティの事後変更
プロパティはコンポーネントの初期設定のために使われます.

## ライフサイクルのメソッド

- `componentWillUpdate()`
  - 2回目以降にコンポーネントの描画が行われる前に呼び出されます
- `componentDidUpdate()`
  - `render()` メソッドの処理が完了し, DOMへの変更が適用された後に呼び出されます
- `componentWillMount()`
  - ノードがDOMに挿入される直前に呼び出されます
- `componentDidMount()`
  - ノードがDOMに挿入された直後に呼び出されます
- `componentWillUnmount()`
  - コンポーネントがDOMから削除される直前に呼び出されます
- `shouldComponentUpdate(newProps, newState)`
  - `componentWillUpdate()` の前に呼び出されます. ここで `false` を返すと更新がキャンセルされ, `render()` メソッドは呼び出されなくなります.

## ライフサイクルの例: すべてをログに記録する

```js
var TextAreaCounter = React.createClass({
  _log: function(methodName, args) {
    console.log(methodName, args)
  },
  componentWillUpdate: function() {
    this._log('componentWillUpdate', arguments)
  },
  componentDidUpdate: function() {
    this._log('componentDidUpdate', arguments)
  },
  componentWillMount: function() {
    this._log('componentWillMount', arguments)
  },
  componentDidMount: function() {
    this._log('componentDidMount', arguments)
  },
  componentWillUnmount: function() {
    this._log('componentWillUnmount', arguments)
  },
  
  // ...
  
})
```

無法者がコンポーネントの外から `setState()` を呼び出してしまう可能性もあります.
コンポーネントの一貫性と健全性を保つために, `componentDidUpdate()` の中でチェックを行うことにします.

```js
{
  componentDidUpdate: function(oldProps, oldState) {
    if (this.state.text.length > 3) {
      this.replaceState(oldState)
    }
  }
}
```

> ここでは `setState()` ではなく `replaceState()` を使っています.
> `setState()` では引数のオブジェクトの既存の `this.state` がマージされるのに対し, `replaceState()` では `this.state` が完全に置き換わります

## ライフサイクルの例: ミックスイン

> ミックスインとはJavaScriptのオブジェクトの一種で, メソッドやプロパティの集合が保持されています.
> 単体での利用は想定されておらず, 他のオブジェクトに取り込まれるのが目的です.

```js
var logMixin = {
  _log: function(methodName, args) {
    console.log(this.name + '::' + methodName, args)
  },
  componentWillUpdate: function() {
    this._log('componentWillUpdate', arguments)
  },
  componentDidUpdate: function() {
    this._log('componentDidUpdate', arguments)
  },
  componentWillMount: function() {
    this._log('componentWillMount', arguments)
  },
  componentDidMount: function() {
    this._log('componentDidMount', arguments)
  },
  componentWillUnmount: function() {
    this._log('componentWillUnmount', arguments)
  }
}
```

```js
var MyComponent = React.createClass({
  mixins: [obj1, obj2, obj3],

  // 他のメソッド
})
```

`TextAreaCounter` に `logMixin` を取り込むには, 以下のように記述します.
```js
var TextAreaCounter = React.createClass({
  name: 'TextAreaCounter',
  mixins: [logMixin],
  // 残りのプロパティ
})
```
`name` プロパティは呼び出し元を識別するために使われます.

## ライフサイクルの例: 子コンポーネントの使用

```js
var Counter = React.createClass({
  name: 'Counter',
  mixins: [logMixin],
  propTypes: {
    count: React.PropTypes.number.isRequired,
  },
  render: function() {
    return React.DOM.span(null, this.props.count)
  }
})
```
このコンポーネントは単なるカウンターでステートを保持しません.
親から与えられた `count` プロパティの値を, そのまま描画します

```js
// TextAreaCounter
{
  render: function() {
    var counter = null
    if (this.state.text.length > 0) {
      counter = React.DOM.h3(null,
        React.createElement(Counter, {
          count: this.state.text.length,
        })
      )
    }
    return React.DOM.div(null,
      React.DOM.textarea({
        value: this.state.text,
        onChange: this._textChange,
      }),
      counter,
    )
  }
}
```

テキストエリアの文字列を削除して, 長さがゼロになると子コンポーネントである `Counter` は `null` になり, 対応するDOMのノードはドキュメント木構造から削除されます.
その直前に, 削除を通知するためのコールバックとして `componentWillUnmount()` が呼び出されます.

## パフォーマンスの向上: コンポーネントの更新を阻止する

コンポーネントの中には, `render()` メソッドの中で `this.props` と `this.state` だけを利用し, 他の関数呼び出しを行わないものがあります.
このようなコンポーネントはピュアコンポーネントと呼ばれます.
ピュアコンポーネントには `shouldComponentUpdate()` を実装しましょう.

また, `props` も `state` も参照しないピュアかつ静的なコンポーネントも考えられます. このようなコンポーネントでは, 無条件に `false` を返すべきです.

```js
// render() が呼ばれるたびに console 出力するよう変更
var Counter = React.createClass({
  name: 'Counter',
  // mixins: [logMixin],
  propTypes: {
    count: React.PropTypes.number.isRequired
  },
  render() {
    console.log(this.name + '::render()')
    return React.DOM.span(null, this.props.count)
  }
})

var TextAreaCounter = React.createClass({
  name: 'TextAreaCounter',
  // mixins: [logMixin],

  // その他のメソッド

  render: function() {
    console.log(this.name + '::render()')
    // ...
  }
})
```

文字数が変わっていない場合に `false` を返すようにします.

```js
// Counter
var Counter = React.createClass({
  ...
  shouldComponentUpdate(nextProps, nextState_ignore) {
    return nextProps.count !== this.props.count
  }
})
```

## PureRenderMixin

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.5.4/react-with-addons.js"></script>
```

```
var Counter = React.createClass({
  ...
  mixins: [React.addons.PureRenderMixin],
  ...
})
```

全てのアドオンをインクルードしたくないという場合や, 自分でミックスインを定義したい場合の実装例:
```js
var ReactComponentWithPureRenderMixin = {
  shouldComponentUpdate: function(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) ||
           !shallowEqual(this.state, nextState)
  }
}
```
