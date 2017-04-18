# \<Excel\>: 高機能な表コンポーネント

## まずはデータから

```js
var headers = [
  'タイトル', '著者', '言語', '出版年', '売り上げ部数'
]

var data = [
  ['The Lord of the Rings', 'J.R.R.Tolkien', 'English', '1954-1955', '150 million'],
  ['Le Petit Prince (The Little Prince)', 'Antonie de Saint-Exupery', 'French', '1943', '140 million'],
  ['Harry Potter and the Philosopher\'s Stone', 'J. K. Rowling', 'English', '1997', '140 million'],
  ['And Then There Were None', 'Agatha Chistie', 'English', '1939', '107 million'],
  ['Drem of the Red Chamber', 'Cao Xueqin', 'Chinese', '1754-1891', '100 million'],
  ['The Hobbit', 'J. R. R. Talkien', 'English', '1937', '100 million'],
  ['She: A History of Adventure', 'H. Rider Haggard', 'English', '1887', '100 million'],
]
```

## 表のヘッダーを描画するループ

```js
var Excel = React.createClass({
  render: function() {
    return (
      React.DOM.table(null,
        React.DOM.thead(null,
          React.DOM.tr(null,
            this.props.headers.map(function(title) { // <-
              return React.DOM.th(null, title)
            })
          )
        )
      )
    )
  }
})

ReactDOM.render(
  React.createElement(Excel, {
    headers: headers,
    initialData: data,
  }),
  document.getElementById('app')
)
```

> 以前のコードでは子コンポーネントを1つずつ親に渡していましたが, すべての子を含む1つの配列として渡すこともできます
```js
// 個別の引数
React.DOM.ul(
  null,
  React.DOM.li(null, 'one'),
  React.DOM.li(null, 'two')
)

// 配列
React.DOM.ul(
  null,
  [
    React.DOM.li(null, 'one'),
    React.DOM.li(null, 'two')
  ]
)
```

## コンソールに表示された警告への対応

```
Warning: Each child in an array or iterator should have a  unique "key" prop.
Check the render method of `Constructor`.
```

`Excel` というのは React の世界の外で名付けられた名前なので, React の内側からこのコンポーネントの名前を知ることはできません.
`displayName` プロパティを使うと, React 側に名前を伝えられます.

```js
var Excel = React.createClass({
  displayName: 'Excel', // <-
  render: function() {
    // ...
  }
})
```

値が重複しない key プロパティを持たせる.

```js
var Excel = React.createClass({
  ...
  render: function() {
    ...
    return (
      ...
      this.props.headers.map(function(title, idx) {   // <-
        return React.DOM.th({key: idx}, title)        //<-
      })
    )
  }
})
```

> JSX を使えば, `displayName` は自動で値がセットされる

## `<td>` のコンテンツの追加

```js
...
data.map(function(row) {
  return (
    React.DOM.tr(null,
      row.map(function(cell) {
        return React.DOM.td(null, cell)
      })
    )
  )
})
```

コンポーネントを呼び出すコードは, データを渡して表を初期化します.
一方, ユーザーは編集や並べ替えを行い, データは変化していきます. これはコンポーネントのステートが変わるということを意味します.

```
var Excel = React.createClass({
  ...
  getInitialState: function() {
    return {data: this.props.initialData}
  },
  
  render: function() {
    return (
      React.DOM.table(null,
        React.DOM.thead(null,
          React.DOM.tr(null,
            this.props.headers.map(function(title, idx) {
              return React.DOM.th({key: idx}, title)
            })
          )
        )
      ),
      React.DOM.tbody(null,
        this.state.data.map(function(row, idx) {
          return(
            React.DOM.tr({key: idx},
              row.map(function(cell, idx) {
                return React.DOM.td({key: idx}, cell)
              })
            )
          )
        })
      )
    )
  }
})
```

上のコードには `propTypes` を指定していません.必須ではありませんが, 指定するほうがよいでしょう.
`React.PropTypes` には, 配列を表す識別子として `array` が用意されています. これが指定されているプロパティには, 必ず配列がセットされるようになります.
さらに `arrayOf` を使えば配列に含まれる要素の型も指定できます.

```js
propTypes: {
  headers: React.PropTypes.arrayOf(
    React.PropTypes.string
  ),
  initialData: React.PropTypes.arrayOf(
    React.PropTypes.arrayOf(
      React.PropTypes.arrayOf(
        React.PropTypes.strng
      )
    )
  )
}
```

### コンポーネントへの機能を追加

## 並べ替え

まず, ヘッダー行にクリックのイベントハンドラを追加します.

```js
React.DOM.table(null,
  React.DOM.thead({onClick: this._sort},
    React.DOM.tr(null,)
    ...
  )
)
```

`_sort()` 関数を実装します.
並べ替えの基準になる列がどこなのかを知る必要があります.

```js
var column = e.target.cellIndex
```

並べ替えを行うために, `data` をコピーした配列も必要になります.
配列の `sort()` メソッドを使って直接並べ替えると, 配列の内容つまり `this.state` が変更されます.
以前にも述べたように `this.state` の変更には `setState()` を使うべきであり, 直接変更指定はいけません.

```js
// データをコピーします
React.createClass({
  ...
  _sort() {
    var data = this.state.data.slice() // ES6 では `Array.from(this.state.data)` も利用可
  },
  ...
})
...
```

実際の並べ替えは, 次のように `sort()` メソッドに渡したコールバック関数の中で行います.

```js
React.createClass({
  ...
  _sort: function() {
    ...
    data.sort(function(a, b) {
      return a[column] > b[column] ? 1 : -1
    })
  }
})
```

そして最後に, 並べ替えられた `data` を指定してステートを更新します.

```js
React.createClass({
  ...
  _sort: function() {
    ...
    ...
    this.setState({
      data: data
    })
  }
})
```

### コンポーネントの機能追加

## 並べ替えの矢印

```js
// this.state.sortby - 並べ替えの基準として使われている列のインデックス
// this.state.descending - 昇順か降順かを表す真偽値

getInitialState: function() {
  return {
    data: this.props.initialData,
    sortby: null,
    descending: false
  }
}
```

`_sort()` 関数の中で, 並べ替えの方向を知る必要があります.
新しい基準の列が現在の列と同じで, かつすでに昇順で並べ替えされている場合を除いて, デフォルトの並べ替え方向は昇順です.

```js
var descending = this.state.sortby === column && !this.state.descending
```

降順で並べ替えを行うために, コールバック関数を以下のように変更します.

```js
data.sort(function(a, b) {
  return descending
    ? (a[column] < b[column] ? 1 : -1)
    : (a[column] > b[column] ? 1 : -1)
})
```

最後に, `render()` 関数を変更して並べ替えの方向を表示させます.

```js
this.props.headers.map(function(title, idx) {
  if (this.state.sortby === idx) {
    title += this.state.descending ? '\u2191' : '\u2193'
  }
})
```

## データの編集

1. ユーザーはセルをダブルクリックします. Excel は対象のセルを識別し, 単なる文字列から入力フィールドに変更します. ここには編集前の文字列があらかじめ表示されています.
2. ユーザーは入力フィールドのコンテンツを編集します.
3. ユーザーは Enter キーを押します. すると入力フィールドは消え, 新しい文字列が表示されます.

### 編集可能なセル

イベントハンドラを用意します:

```js
React.DOM.tbody({onDoubleClick: this._showEditor}, ...)
```

> W3Cが規定した `nodblclick` ではなく, 読みやすく理解も容易な `onDoubleClick` というプロパティ名が使われています.

`_showEdotor` のコードは以下の通りです:

```js
_showEdotor: function(e) {
  this.setState({edit: {
    row: parseInt(e.target.dataset.row, 10),
    cell: e.target.cellIndex,
  }})
},
```

`getInitalState()` メソッドの中で `edit` プロパティを初期化します.

```js
getInitialState: function() {
  return {
    data: this.props.initialData,
    sortby: null,
    descending: false,
    edit: null, // {row: 行番号, cell: 列番号}
  }
},
```

`data-row` プロパティを追加し, 行番号を指定するためのコード:
```js
React.DOM.tbody({onDoubleClick: this._showEditor},
  this.state.data.map(function(row, rowidx) {
    return(
      React.DOM.tr({key: rowidx},
        row.map(funtion(cell, idx) {
          var content = cell
          
          // TODO
          
          return React.DOM.td({
            key: idx,
            'data-row': rowidx
          }, content)
        }, this)
      )
    )
  }, this)
)
```

### 入力フィールドのセル

```js
var edit = this.state.edit
```

```js
if (edit && edit.row === rowidx && edit.cell === idx) {
  //...
}
```

```js
content = React.DOM.form({onSubmit: this._save},
  React.DOM.input({
    type: 'text',
    defaultValue: content,
  })
)
```

### データの保存:

- [サンプル](https://codepen.io/kesuiket/pen/aWOxox)
