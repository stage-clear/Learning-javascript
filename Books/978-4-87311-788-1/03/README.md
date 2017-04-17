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

## コンソールに表示された渓谷への対応
