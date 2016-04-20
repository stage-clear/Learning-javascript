# パフォーマンスチューニング

## 11.1 `shouldComponentUpdate`

- `shouldComponentUpdate` は、ライフサイクル
- `shouldComponentUpdate` を定義して、`React` にコンポーネントの `render` メソッドを本当に呼び出す必要があるか教える
- `shouldComponentUpdate` は真偽値を返す (`false` の場合 `render` は呼び出されない)

```js
var SurverEditor = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return nextProp.id !== this.props.id;
  }
});
```

```js
var EditEssayQuestion = React.creatClass({
  mixins: [React.addons.PureRenderMixin],
  render: function() {
    var description = this.props.question.description || '';

    return (
      <EditQuestion type="essay" onRemove={this.handleRemove}>
        <label>説明</label>
        <input type="text" className="description"
          value={description} onChange={this.handleChange} />
      </EditQuestion>
    );
  }
});
```

## 11.2 イミュータビリティヘルパー関数

- イミュータブルなデータ構造を使用することで、 `shouldComponentUpdate` メソッドのオブジェクト比較処理の負荷が軽減される場合がある
- `React.addons.update` というヘルパー関数を使えば、簡単にイミュータブルなデータ構造を使用することができる

```js
var update = React.addons.update;

var SurverEditor = React.createClass({
  // ...

  handleDrop: function(ev) {
    var questionType = ev.dataTransfer.getData('questionType') ;
    var questions = update(this.state.questions, {
      $push: [{ type: questiontype}]
    });

    this.setState({
      questions: questions,
      dropZoneEnterd: false
    });
  },
  handleQuestionChange: function(key, newQuestion) {
    var questions = update(this.state.questions, {
      $splice: [[key, 1, newQuestion]]
    });

    this.setState({ questions: questions });
  },
  handleQuestionRemove: function(key) {
    var questions = update(this.state.questions, {
      $splice: [[key, 1]]
    });

    this.setState({ questions: questions });
  }

  // ...
});
```

- `React.addon.update` 関数は第1引数にオブジェクトもしくは配列を受け取る
- オプションで第2引数にハッシュオブジェクトを受け取る
- ハッシュのプロパティに指定できるコマンドは、`$splice`、`$push`、`$unshift`、`$set`、`$merge`、`$apply` です


## 11.3 ボトルネックを調べる方法

## 11.4 key 属性

- `key` 属性は不要な処理を避けるために使用される
- `<div key="foo">` の `key` 属性を `bar` に変更した場合、`React` は差分計算を行わず、即座に仮想DOMを破棄し一から描画し直します


```js
// 例) リストの要素をソートして表示するコンポーネント
var component = React.createClass({
  render: function() {
    var items = sortBy(this.state.sortingAlgorithm, this.props.items);

    return items.map(function(item) {
      return <img src={item.src} />;
    });
  }
});
```

これは、`items` の順番に変更があった場合、`src` 属性も設定し、`cache` に画像がなければ `http` の通信が発生するため非効率。

```js
    // これによりkey属性をもとにリストの要素の順番だけが変更されたことを知ることができるので
    // src 属性を設定する代わりにinsertBefore を実行して、単純にDOMノードを移動する
    return <img src={item.src} key={item.id} />;
```

### 11.4.1 制限事項

- `key` 属性は同一階層のコンポーネント（同一の親を持つコンポーネント）間でユニークでなければいけない
- `key` 属性は見た目は他の属性と同じだが、コンポーネント内部から `props` の値として参照できない


## 11.5 まとめ

- `shouldComponentUpdate` を使用してパフォーマンスを改善する方法
- `React.adons.Perf` を使用して不要な `render` 呼び出しを特定する方法
- `key` 属性を使用して `React` の処理を最小化する方法
