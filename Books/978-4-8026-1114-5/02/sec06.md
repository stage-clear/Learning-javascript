# イベントの仕組みと実装
## React でクリックイベントを実装する方法

```js
// 一般的なJSでのクリックイベント
<div onclick="clickHandler(e)">Click Me</div>

// React でのクリックイベントの記述方法
<div onClick="{clickHandler}">Click Me</div>
```

- [st-click.html](examples/st-click.html)

### クリックしたらクラスのメソッドを呼ぶ方法

- [st-click2.html](examples/st-click2.html)

## 簡単なチェックボックスを実装してみよう

- [st-checkbox.html](examples/st-checkbox.html)

## React でイベントの記述方法
### 1. `render()` メソッド内でイベントハンドラを定義する
`render()` メソッド内で, アロー演算子を用いたイベントハンドラを書く方法が一番記述コストが少なくなります

```js
class コンポーネント名 extends React.Component {
  render () {
    const handler = (e) => alert('Hello')
    return <button onClick={handler}>Click</button>
  }
}
```

### 2. クラスのメソッドに `this` をバインドしておく
複数のイベントを記述する必要があったり, イベントの内容が複雑になってくると,
`render()` メソッドの中でイベントを記述するとプログラムが見づらくなってしまいます.
その場合, イベントハンドラをクラスのメソッドとして定義します.<br>
このとき, this が書き換わってしまい不便なので, そのメソッドと this を結びつけるよう `bind()` メソッドを使います.

```js
class コンポーネント名 extends React.Component {
  constructor () {
    this.classHandler = this.classHandler.bind(this)
  }
  
  classHandler () {
  
  }
  
  render () {
    return <button onClick={this.classHandler}>
      Click
    </button>
  }
}
```

### 3. アロー関数でクラスのメソッドを呼び出す

```js
class コンポーネント名 extends React.Component {
  classHandler () {
    alert('Hello')
  }
  
  render () {
    return <button onClick={e => this.classHandler(e)}>
      Click
    </button>
  }
}
```
