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

## JSX でのトランスパイル

- [Babel · The compiler for writing next generation JavaScript](https://babeljs.io/repl/)
- [HTML to JSX](http://magic.reactjs.net/htmltojsx.htm)

## JSX での JavaScript

JSX ではマークアップの中に JavaScript を記述できます.
必要なのは, JavaScript のコードを `{}` で囲むことだけです.

```js
var Excel = React.createClass({
  ...
  render: function() {
    var state = this.state
    return (
      <table>
        <thead onClick={this._sort}>
          <tr>{
            this.props.headers.map(function(title, idx) {
              if (state.sortby === idx) {
                title = state.descending ? '\u2192' : '\u2193'
              }
              return <th key={idx}>{title}</th>
            })
          }</tr>
        </thead>
      </table>
    )
  }
})
```

変数の値を出力したい場合には, 変数名を `{...}` で囲みます.

```js
<th key={idx}>{title}</th>
```

ループ処理についても, `map()` のコードを `{...}` で囲みます.

```js
<tr key={idx}>{
  row.map(function(cell, idx) {
    return <td key={idx}>{cell}</td>
  })
}</tr>
```

条件分岐が含まれていますが, 3項演算子を使えば1つの文にまとめられます.
```jsx
return (
  <th key={idx}>{
    state.sortby === idx
      ? state.descending
        ? title + ' \u2191'
        : title + ' \u2193'
       : title
  }</th>
)
```

## JSX での空白

## JSX でのコメント

## JSX での HTML エンティティ

これはエンコードされます
```jsx
<h2>
  {"詳しくはこちら &raquo;"}
</h2>
```

エンコードを防ぐには:

```jsx
<h2>
  {詳しくはこちら \u00bb}
<h2>
```

- [Character Entity Reference Chart](https://dev.w3.org/html5/html-author/charref)

なんども使う場合は, 定数として定義しておくとよいでしょう.

```js
const RAQUO = ' \u00bb'

<h2>
  {"詳しくはこちら" + RAQUO}
</h2>

<h2>
  {"詳しくはこちら"}{RAQUO}
</h2>
```

### XSS 対策

## スプレッド演算子

```jsx
var attr = {
  herf: 'http://example.org',
  target: '_blank'
}

//
return (<a 
  href={attr.href}
  target={attr.target}>
  Hello
</a>
)

// 
return <a {...attr}>Hello</a>
```

### 親から渡された属性とスプレッド演算子

```jsx
<FancyLink
  href="http://example.org"
  style={{color: 'red'}}
  target="_blank"
  size="medium">
  Hello
</FancyLink>
```

```js
var FancyLink = React.createClass({
  render: function() {
    switch(this.props.size) {
      // size プロパティに関する処理
    }
    return <a {...this.props}>{this.props.children}</a>
  }
})
```

不要なプロパティ以外を渡す

```js
var FancyLink = React.createClass({
  render: function() {
    switch(this.props.size) {
      // 
    }
    var attribs = Object.assign({}, this.props) // Shallow copy
    delete attribs.size
    return <a {...attribs}>{this.props.children}</a>
  }
})
```

```js
// use ES7:

var FancyLink = React.createClass({
  render: function() {
    var {size, ...attribs} = this.props
    switch(size) {
      //...
    }
    return <a {...attribs}>{this.props.children}</a>
  }
})
```


## 複数のノードの生成

- `render()` 関数は常に1つのノードを返します

```js
// Error
var Example = React.createClass({
  render: function() {
    return (
      <span>Hello</span>
      <span>world</span>
    )
  }
})

// Valid
var Example = React.createClass({
  render: function() {
    return (
      <div>
        <span>Hello</span>
        <span>world</span>
      </div>
    )
  }
})
```

複数のノードの配列を返すことはできませんが, 配列を元にノードを組み立てて返すことは可能です.
この場合, __配列内の各ノードに `key` 属性が指定されている必要があります.__

```
var Example = React.createClass({
  render: function() {
    var greeting = [
      <span key="greet">Hello</span>,
      ' ',
      <span key="world">World</span>,
      '!',
    ]
    return (
      <div>
        {greeting}
      </div>
    )
  }
})
```

ある意味で, これは任意の個数の子ノードを親から受け取って `render()` 関数に渡すようなものです.

```
var Example = React.createClass({
  render: function() {
    console.log(this.props.children.length) // 4
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
})

ReactDOM.render(
  <Example>
    <span key="greet">Hello</span>
    {' '}
    <span key="world">World</span>
    !
  </Example>,
  document.getElementById('app')
)
```

## JSXとHTMLの違い
### `class` と `for` は指定できない

```jsx
// Bad
var em = <em class="important" />
var label = <label for="thatInput" />

// Good
var em = <em className="important" />
var label <label htmlFor="thatInput" />
```

### style にはオブジェクトを指定する

```jsx
// Bad
var em = <em style="font-size: 2em; line-height: 1.6" />

// Good
var styles = {
  fontSize: '2em',
  lineHeight: '1.6'
}
var em = <em style={styles} />

// at the inline
var em = <em style={{fontSize: '2em', lineHeight: '1.6'}} />
```

### 閉じタグは必須

```
// Bad 
var gimmebreak = <br>
var list = <ul><li>Item</ul>
var meta = <meta charset="utf-8">

// Good
var gimmebreak = <br/>
var list = <ul><li>Item</li></ul>
var meta = <meta charSet="utf-8"/>

// Good too
var meta = <meta charSet="utf-8"></meta>
```

### キャメルケースの属性名

- `charset` → `charSet`
- `onclick` → `onClick`

など

### JSX とフォーム
### `onChange` ハンドラ

React では, 値の変化を監視するのに `onChange` 属性を使いいます.
イベントハンドラの中では, フィールドの値はその種類を問わず `value` にセットされます.

### `value` と `defaultValue`

`<input id="i" value="hello" />` というフィールドに, ユーザーが `bye` と入力して値を変更したとします

```js
// Pure JavaScript
> i.value // "bye"
> i.getAttribute('value') // "hello"
```

React では, `value` プロパティには常に最新の値がセットされます.
デフォルト値を指定したい場合には, `defaultValue` を使います.

```js
function log(event) {
  console.log('value: ', event.target.value)
  console.log('defalutValue: ', event.target.defalutValue)
}

ReactDOM.render(
  <input defaultValue="hello" onChange={log} />.
  document.getElementById('app')
)
```

> このような命名法は, 読者自身のコンポーネントにも適用するべきです.
> `value` や `data` のように, 最新の状態であることが期待されるようなプロパティを受け取るなら, 実際に最新に保ちましょう

### `<textarea>` の値

`<input>` との整合性のために, React での `<textarea>` nimo `value` と `defaultValue` の各プロパティが用意されています.

```js
function log(event) {
  console.log(event.target.value)
  console.log(event.target.defaultValue)
}

ReactDOM.render(
  <textarea defaultValue="hello\nworld" onChange={log}></textarea>,
  document.getElementById('app1')
)

ReactDOM.render(
  <textarea defaultValue="hello\nworld" onChange={log}></textarea>,
  document.getElementById('app2')
)

ReacDOM.render(
  <textarea onChange={log}>hello
world
  </textarea>,
  document.getElementById('app3')
)

ReactDOM.render(
  <textarea onChange={log}>{"hello\n\
world"}
  </textarea>,
  document.getElementById('app4')
)
```

### `<select>` の値

`<select>` 要素を使う場合, 従来のHTMLでは次のように `<option>` 要素の `selected` 属性を使ってデフォルトの選択肢を表します.

```html
<!-- 古くからの HTML -->
<select>
  <option value="stay">とどまるべきか</option>
  <option value="move" selected>さるべきか</option>
</select>
```

React では, `<select>` 要素でデフォルトの選択肢を指定できます.
`value` 属性も使えますが, `defaultValue` を使うのがよいでしょう.

```jsx
// React/JSX
<select defaultValue="move">
  <option value="stay">とどまるべきか</option>
  <option value="move">さるべきか</option>
</select>
```

複数選択が可能な場合

```jsx
<select defaultValue={['stay', 'move']} multiple={true}>
  <option value="stay">とどまるべきか</option>
  <option value="move">さるべきか</option>
  <option value="trouble">とどまれば災あり</option>
</select>
```

`<select>` 要素に `defalutValue` ではなく `value` を指定することもできますが, これは __推奨されていません__ .

## JSX版Excelコンポーネント


- [サンプル](http://codepen.io/kesuiket/pen/bWEPob)
