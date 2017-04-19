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

```
_save: function(e) {
  e.preventDefault() // <- ページの再読み込みが発生しないよう
  var input = e.target.firstChild
  // `this.state` を直接変更しないよう, データをクローンします
  var data = this.state.data.slice()

  data[this.state.edit.row][this.state.edit.cell] = input.value
 
  this.setState({
    edit: null, // 編集は終了しました
    data: data,
  })
 
},
```

### まとめと仮想DOMの差分

- `this.state.edit` を使い, 編集対象のセルを管理ます
- ユーザーがダブルクリックしたセルについては, 表の描画の際に入力フィールドを表示します
- 入力フィールドの新しい値を使って, データの配列を更新します

React のパフォーマンスは良好です.
UIの更新の際に, 以下のような特徴が見られます.

- DOMへの操作を最小限にします
- ユーザーによる操作に応答する際に, イベントの委譲のしくみを利用します.


## 検索

検索の機能を追加します.

- 検索機能のオンとオフを切り替えるボタンを追加します
- オンの状態では, 検索条件を入力するための行を表示します. 条件が入力された列に対して検索が行われます
- ユーザーが検索条件を入力すると, 配列 `state.data` に対してフィルタリングを行い, 条件に合致した行だけが表示されます

### ステートとUI

`this.state` に `search` プロパティを追加します

```js
getInitialState: function() {
  return {
    data: this.props.initialData,
    sortby: null,
    descending: false,
    edit: null,
    search: false, // <-
  }
}
```

`render()` 関数を機能ごとに分割します.

```js
render: function() {
  return (
    React.DOM.div(null, 
      this._renderToolbar(),
      this._renderTable()
    )
  )
},

_renderToolbar: function() {
  // TODO
},

_renderTable: function() {
  // これまでの render() 関数と同じ
}
```

```js
_renderToolbar: function() {
  return React.DOM.button(
    {
      onClick: this._toggleSearch,
      className: 'toolbar',
    },
    '検索'
  )
}
```

`_renderSeatch`

```js
_renderSearch: function() {
  if (!this.state.search) {
    return null
  }
  return (
    React.DOM.tr({onChange: this._search},
      this.props.headers.map(function(_ignore, idx) {
        return React.DOM.td({key: idx},
          React.DOM.input({
            type: 'text',
            'data-idx': idx,
          })
        )
      })
    )
  )
}
```

### コンテンツのフィルタリング

元のデータを失わないように, 検索の前にデータをコピーしておきます.
このコピーされたデータ(への参照)を `_preSearchClass` と呼ぶことにします.

```js
var Excel = React.createClass({
  ...
  _preSearchData: null,
})
```

ユーザーが検索ボタンをクリックすると, `_toggleSerch()` メソッドが呼び出されます.
この関数の役目は, 検索機能のオンとオフを切り替えることです.

- `this.state.search` に `true` または `false` をセットします
- 検索機能を有効化する際に, 現時点のデータを記憶しておきます
- 検索機能を無効化する際に, データを記憶しておいたものに戻します

```js
_toggleSearch: function() {
  if (this.state.search) {
    this.setState({
      data: this._preSearchData,
      search: false,
    })
    this._preSearchData = null
  } else {
    this._preSearchData = this.state.data
    this.setState({
      search: true
    })
  }
}
```

`_search()` 関数を実装します. いずれかの入力フィールドの内容を変化するごとに, この関数が呼び出されます.

```js
_search: function(e) {
  var needle = e.target.value.toLowerCase()
  if (!needle) { // 検索文字列は削除されました
    this.setState({data: this._preSearchData})
    return 
  }
  var idx = e.target.dataset.idx
  var searchdata = this._preSearchData.filter(function(row) {
    return row[idx].toString().toLowerCase().indexOf(needle) > -1
  })
  this.setState({data: searchdata})
},
```

これで検索機能は完成です.
必要だったのは以下の3点です。

- 検索のUI
- 要求に応じて UI の表示と非表示を切り替える
- 検索の「ビジネスロジック」, つまり配列に対する `filter()` の呼び出し

### 検索への機能追加

ユーザーがある列で検索文字列を入力して, そのまま別の列の入力フィールドに入力した場合,
最後に入力された列についての検索しか行われないというのは不自然です

## 操作手順の再実行

今回の実装では, 実際にユーザーが操作を行った間隔については考慮せず, 全ての操作を1秒おきに「再生」することにします.

```js
// 変更前
this.setState(newState)
// 変更後
this._logSetState(newState)
```

```js
var Excel = React.createClass({
  _log: [],
  
  _logSetState: function(newState) {
    // ステートのクローンを作成して記録します
    this._log.push(JSON.parse(JSON.stringify(
      this._log.length === 0 ? this.state: newState
    )))
    this.setState(newState)
  },
  ...
})
```

キーボード操作を補足するイベントリスナーを用意して, この中で `_replay()` 関数を呼び出します

```js
componentDidMount: function() {
  document.onkeydown = function(e) {
    // Alt または Options + Shift + R 
    if (e.altKey && e.shiftKey && e.keyCode === 82) {
      this._replay()
    }
  }.bind(this)
}
```

`_replay()` メソッドを追加します.
`setInterval()` を使い, 記録されているステートを1秒ごとに1つずつ取り出して `setState()` に渡します.

```js
_replay: function() {
  if (this._log.length === 0) {
    console.warn('There are not states')
    return 
  }
  var idx = -1
  var interval = setInterval(funtion() {
    idx++
    if (idx === this._log.length - 1) { // 末尾に到達
      clearInterval(interval)
    }
    this.setState(this._log[idx])
  }.bind(this), 1000)
},
```

### 再生への機能追加

アンドゥやリドゥの機能も追加してみましょう. 例えば `Alt+Z` が押されたらオンドゥを行い
`Alt+Shift+Z`が押されたらリドゥを行うというのはどうでしょうか

### 別の実装方法

`setState()` への呼び出しを変更せずに, 再生やアンドゥなどの機能を実装する方法はないか考えてみましょう

## 表データのダウンロード

```js
_renderToolbar: function() {
  return React.DOM.div({className: 'toolbar'},
    React.DOM.button({
      onClick: this._toggleSearch
    }, '検索'),
    React.DOM.a({
      onClick: this._download.bind(this, 'json'),
      href: 'data.json'
    }, 'JSONで保存'),
    React.DOM.a({
      onClick: this._download.bind(this, 'csv'),
      href: 'data.csv'
    }, 'CSVで保存')
  )
}
```

JSONへのエクスポートはとても簡単ですが, CSVではやや複雑な処理が必要です.
すべての行のすべてのセルに対してループを実行し, 1つの長い文字列を生成します.
変換できたら, `window.URL` を使って生成したオブジェクトを `href` 属性にセットし, `download` 属性を指定してダウンロードを開始します.

```js
_download: function(format, ev) {
  var contents = format === 'json'
    ? JSON.stringify(this.state.data)
    : this.state.data.reduce(function(result, row) {
      return result
        + row.reduce(function(rowresult, cell, idx) {
          return rowresult
            + '"'
            + cell.replace(/"/g, '""')
            + '"'
            + (idx < row.length - 1 ? ',' : '')
        }, '')
        + '\n'
    }, '')
  var URL = window.URL || window.webkitURL
  var blob = new Blob([contents], {type: 'text/' + format})
  ev.target.href = URL.createObjectURL(blob)
  ev.target.download = 'data.' + format
}
```

- [サンプル](https://codepen.io/kesuiket/pen/aWOxox)
