# イベント処理

- ユーザーインタフェースの半分は表示であり、残りの半分はユーザーの入力に反応すること。

## イベントハンドラの登録

```js
<button className="btn btn-save" onClick={this.handleSaveClicked}>保存</button>

// ファクトリーを使用する場合
React.DOM.button({
  className: 'btn btn-save',
  onClick: this.handleSaveClicked
}, '保存');

// ファクトリーを使用しない場合
React.createElement('button', {
  className: 'btn btn-save',
  onClick: this.handleSaveClicked
});
```

React はさまざまなタイプのイベントをサポートしています。
[React 公式ドキュメント/Event Ststem](http://facebook.github.io/react/docs/events.html)

* タッチイベントを利用するには、手動で有効にする必要がある

```js
React.initializeTouchEvents(true);
```


## イベントと `state`

```js
var SurveyEditor = React.createClass({
  render: function() {
    return (
      <div className="surver-editor">
        <div className="row">
          <aside className="sidebar col-md-3">
            <h2>サーベイの部品</h2>
            <DraggableQuestions />
          </aside>

          <div className="survey-canvas col-md-9">
            <div
              className={'drop-zone well-drop-zone'}
              onDragOver={this.handleDragOver}
              onDragEnter={this.handleDragEnter}
              onDragLeave={this.handleDragLeave}
              onDrop={this.handleDrop}
            >
              左側の納品をドラッグアンドドロップしてください
          </div>
        </div>
      </div>
    );
  }
});
```

### render メソッド内で state を参照する

通常は、`getInitialState` を用いて `state` の初期値を定義する

```js
  getInitialState: function() {
    return(
      dropZoneState: false,
      title: '',
      introduction: '',
      questions: []
    );
  }
```

```js
  render: function() {
    var questions = this.state.questions;

    var dropZoneEnterd = '';
    if (this.state.dropZoneEnterd) {
      dropZoneEnterd = 'drag-enter';
    }

    return(
      <div className="survey-editor">
        <aside className="sidebar col-md-3">
          <h2>サーベイの部品</div>
          <DragglableQuestions />
        </aside>

        <div className="survey-canvas col-md-9">
          <SurveyForm
            title={this.state.title}
            introduction={this.state.introduction}
            onChange={this.handleFormChange}
          />

          <Divider>質問</Divider>
          <ReactCSSTransitionGroup transitionName="question">
            {questions}
          </ReactCSSTransitionGroup>

          <div
            className={'drop-zone well well-drop-zone ' + dropZoneEnterd}
            onDragOver={this.handleDragOver}
            onDragEnter={this.handleDragEnter}
            onDragLeave={this.handleDragLeave}
            onDrop={this.handleDrop}
          >
          左側の部品をドラッグアンドドロップしてください
        </div>

        <div className="actions">
          <button className="btn btn-save"
            onClick={this.handleClicked}>保存</button>
        </div>
      </div>
    );
  }
```

`render` メソッドにおける `this.state` の扱い方は、大きく分けて2通り

- `this.state` の値によって、同じ要素を属性値を変えて表示する
- `this.state` の値によって、まったく異なった要素を表示する


### state の更新

`state` を更新すると、そのコンポーネントは再描画される

コンポーネントの `state` を更新するには2通りの方法がある

- `setState` : 与えられたオブジェクトの `state` オブジェクトにマージする
- `replaceState` : 与えられたオブジェクトで `state` オブジェクト全体を差し替える

たとえば、以下のように `state` を初期化する

```js
  getInitialState: function() {
    return {
      dropZoneEnterd: false,
      title: 'すばらしいサーベイ',
      introduction: 'このサーベイは素晴らしい',
      questions: []
    };
  }

// その後
this.setState({ title: '素晴らしいサーベイ 2.0'});
// を呼び出した場合
// this.state.title のみ変更され、他は変更なし

this.replaceState({ title: '素晴らしいサーベイ 2.0'});
// を呼び出した場合
// state オブジェクト全体が新規のオブジェクト {title: '素晴らしいサーベイ 2.0'} と差し替えられる
// 他は undefined となる
```

一連のハンドラメソッドを `this.setState` を使って実装してみる

```js
  handleFormChange: function(formData) {
    this.setState(formData);
  },
```
