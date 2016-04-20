# データフロー

## `props`

- コンポーネントのプロパティ
- コンポーネントが作成された後から `props` を変更するのは非推奨

```js
var surveys = [{ title: 'Superheroes' }];
<ListSurveys surveys={surveys} />
```

- オブジェクトをそのまま一組のプロパティとして指定する場合は、JSXのスプレッドシンタックスを使う

```js
var ListSurveys = React.createClass({
  render() {
    var props = {
      one: 'foo',
      two: 'bar'
    };

    return <SurveyTable {...props} />
  }
});
```

- プロパティはイベントハンドラを格納するためにも使用される

```js
var SaveButton = React.createClass({
  render: function() {
    return (
      <a className="button save" onClick={this.handleClick}>保存</a>
    );
  },
  handleClick: function() {
    // ...
  }
});
```


### `propTypes`

- バリデーションの手段
- propTypes で指定された条件を満たさない場合、`console.warn` で警告する

```js
var SurveyTableRow = React.propTypes.shape({
  propTypes: {
    survey: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired
    }).isRequired,
    onClick: React.PropTypes.func
  },
  // ...
});
```


### `getDefaultProps`

- プロパティのデフォルト値を定義する
- コンポーネント作成時にプロパティが指定されなかった場合に使用される
- `propTypes` で「任意」と指定したプロパティにのみ、デフォルト値を定義

```js
var SurveyTable = React.createClass({
  getDefaultProps: function() {
    return {
      surveys: []
    }
  }
});
```

## `state`

- 内部状態
- `state` はコンポーネントの内部でのみ使用される点が `props` と異なる
- 一般的に `state` は要素の表示内容を決定するために使用される

```js
var CountryDropdown = React.createClass({
  getInitialState: function() {
    return {
      showOptions: false
    };
  },
  render: function() {
    var options;

    if (this.state.showOptions) {
      options = <countryoptions></countryoptions>;
    }

    return {
      <div className="dropdown" onClick={this.handleClick}>
        <label>国を選択してください</label>
        {options}
      </div>
    };
  },
  handleClick: function() {
    this.setState({showOptions: true});
  }
});
```

- `getInitialState` で初期化され、`setState` で変更される
- `this.state` を直接変更するのは絶対にやってはいけない
- `state` を使用することでコンポーネントは確実に複雑になるので、なるべく一部のコンポーネントでのみ `state` を使用するようにする


## `state` と `props` の使い分け

- `state` : 機能に直接必要な単純なデータのみを `state` に持たせる
  * 他にも、オプションのリストがドロップダウン表示されているかどうかを保持するための真偽値や、入力フィールドの値など
- props の値を `state` にコピーするのは避ける
- 可能な限り `props` を単一の情報源として使用するようにする


## まとめ

1. プロパティ経由でコンポーネントにデータを渡し、ツリー全体に伝搬させることができる
2. `props` は不変として扱い、コンポーネント内で `this.props` の値を変更したり `this.setProps` を呼び出したりしてはいけない
3. 子コンポーネントとやりとりするために、イベントハンドラをプロパティに指定する
4. 表示内容を決定するための単純なデータのみを `state` に保存することができる
5. `this.state` を直接変更するのではなく、`this.setState` メソッドを使用しなければいけない
