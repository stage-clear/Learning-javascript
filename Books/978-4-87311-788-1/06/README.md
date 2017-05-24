# アプリケーションのビルド
## Whinepad バージョン 0.0.1

### セットアップ

```bash
$ cd ~/reactbook/whinepad\ v0.0.1/
$ sh scripts/watch.sh
```

### コーディングの開始

## コンポーネント
__分割統治__ の考え方に従って、より小さく再利用可能なコンポーネントへと分解してみましょう.
また、コンポーネント一覧というヘルパーアプリケーションも作成します。

### セットアップ

```bash
$ cp -r ~/reactbook/whinepad\ v0.0.1 ~/reactbook/whinepad
$ cd ~/reactbook/whinepad
$ sh scripts/watch.sh
```

### コンポーネント一覧

```bash
$ cp index.html discovery.html
```

```html
<!doctype html>
<html>
  ...
  <body>
    ...
    <script src="discover-bundle.js"></script>
  </body>
</html>
```

```bash
$ browserify js/bundle/discover.js -o discover-bundle.js
```

```js
'use strict'

import Logo from './components/Logo'
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  <div style={ {padding: '30px'} }>
    <h1>コンポーネント一覧</h1>
    
    <h2>Logo</h2>
    <div style={ {display: 'inline-block', background: 'purple' } }>
      <Logo />
    </div>
    { /* その他のコンポーネント */ }
  </div>,
  document.getElementById('pad')
)
```

### `<Button>` コンポーネント
### Button.css
### Button.js
#### classnames パッケージ

```bash
$ npm install --save-dev classnames
```

```js
import classNames from 'classnames'
```

> 各コンポーネントは自分専用のクラスを定義して利用するというのが一般的ですが,
> 親から指定されたクラス名を使ってカスタマイズできるような柔軟さも求められます.

```js
const cssclasses = classNames('Button', props.className)
```

```js
<div className={classNames({
  'mine': true, // 無条件に指定される
  'highlighted': this.state.active, // コンポーネントのステートに応じて指定
  'hidden': this.props.hide, // プロパティによる場合分けも可能
})}>
```

#### 分割代入

```js
import React, { PropTypes } from 'react'

// 次のように書き換えできます
import React from 'react'
const PropTypes = React.PropTypes
```

#### ステートを持たない関数のコンポーネント

コンポーネントがシンプルで、ステートを保持する必要がない場合には、関数を使ってコンポーネントを定義できます.

```js
const Button = props => {
  //  ...
}
```

また, 完全に1つの文として処理を記述するなら, 下のように `{` と `}` そして `return` も不要になります.

```
const Button = props => 
  props.href
    ? <a {...props} className={classNames('Button', props.className)}/>
    : <button {...props} className={classNames('Button', props.className)}/>
```

#### `propTypes`

```js
var PropTypes = React.PropTypes
var Button = React.createClass({
  propTypes: {
    href: PropTypes.string
  },
  render: function() {
    /* 描画 */
  }
})
```

```js
import React, {Component, PropTypes} from 'react'

class Button extends Component {
  render() {
    /* 描画 */
  }
}

Button.propTypes = {
  href: PropTypes.string,
}
```

ステートのない関数のコンポーネントを使う場合も同様

```js
import React, {Component, PropTypes} from 'react'

const Button = props => {
  /* 描画 */
}

Button.propTypes = {
  href: PropTypes.string,
}
```

### フォーム

### `<Suggest>` コンポーネント

#### `ref`

```jsx
<input ref="domelement" id="hello"/>

console.log(this.refs.domelement.id === 'hello') // true
```

`ref`属性を使うと, Reactのコンポーネントに名前をつけることができます.
後でこの名前を使って、それぞれのコンポーネントを参照できます.

> `ref`を使うというのは応急処置であり, 通常は同じことをするための方法が他にもあります.

```js
class Suggest extends Component {
  constructor(props) {
    super(props)
    this.state = {value: props.defaultValue}
  }
  
  getValue() {
    return this.state.value // ref はもう必要ありません
  }
  
  render() {
    // ...
  }
}
```

`<input>` にも `ref` は必要なくなります

```js
<input
  list={randomid}
  defaultValue={this.props.defaultValue}
  onChange={e => this.setState({value: e.target.value})}
  id={this.props.id}/>
```

`constructor()` の中に記述されている `this.state = {...}` は, ECMAScript6以前のコードでの `getInitialState()` に相当します.

### `<Rating>` コンポーネント

この Whinepad は, 試してみたものについてメモを記録するためのアプリケーションです.

- 星の最大数 - デフォルトは5個ですが, たとえば11個でもかまいません
- 読み取り専用か否か - 星をクリックするだけでデータが書き換わってしまうのは避けたいという場合もあるでしょう

`this.reset.bind(this)` には必然性が感じられないかもしれません.
実は, これは ECMAScript でクラスを使う際に必須のものなのです. バインドつまり関連付けには3つの方法があります.

- 上のコードのように, `this.method.bind(this)` を使う
- `(event) => this.method()` のように, アロー関数を使って自動的にバインドを行う
- コンストラクタの中で定義する

コンストラクタの中での定義とは, 具体的には次のようなコードをさします.

```js
class Comp extends Component {
  constructor(props) {
    this.method = this.method.bind(this)
  }
  
  render() {
    return <button onClick={this.method}/>
  }
}
```

### ファクトリーとなる `<FormInput>` コンポーネント
### `<Form>` コンポーネント

これまでに用意できたもの

- カスタムの入力フィールド(`<Rating/>`など)
- 組み込みの入力フィールド(`<textarea>`など)
- `<FormInput>`(`type`プロパティの値に応じて入力フィールドを生成するファクトリー)

### `<Action>` コンポーネント
このコンポーネントの呼び出し側では, `onAction` プロパティを指定することによって操作の発生を監視できます.
子コンポーネントが親に対して変化の発生を伝える際に, このようなシンプルなパターンがよく使われます.

### `<Dialog>` コンポーネント

他の形式の実装も考えられます:

- `onAction` というメソッドを1つだけ定義するのではなく, OKがクリックされた場合とキャンセルがクリックされた場合とで個別のメソッドを用意します
- ユーザーが `Esc` キーを押した場合に, ダイアログを閉じるという改善が可能です. 実装方法については, 各自で考えてみましょう.
- ラッパーとなる `<div>` 要素には, 必ず指定されるクラスと条件に応じて指定されるクラスがあります. 次のように `classnames` モジュールを使うのも良いでしょう

```jsx
// Before: 
<div class={this.props.modal ? 'Dialog DialogModal' : 'Dialog'}>

// After: 
<div className={classNames({
  'Dialog': true,
  'DialogModal': this.props.modal,
})}>
```

## アプリケーションの設定
残る作業は, `Excel` の表の改善と, 最上位の親コンポーネント `Whinepad` だけです.
両者はともに, 対象とするデータの型を記述した「スキーマ」と呼ばれるオブジェクトを使って設定を行います.

入力候補が記録された別のモジュール `js/source/classification.js`

## `<Excel>` コンポーネント（改良版）
CRUDのうち R と U と D の部分がExcelによって実現されます.

Whinepad が受け持つのは検索と, CRUDのうち C(新規作成), そして localStorage へのデータの保存です. 
実際のアプリケーションでは, サーバーにもデータが保存されるでしょう.

## `<Whinepad>`

