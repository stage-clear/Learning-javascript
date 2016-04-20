# アニメーション

## 10.1 CSSを用いたアニメーション

```js
var React = require('react/addons');
// ...
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
// ...

<ReactCSSTransitionGroup transitionName="question">
  {questions}
</ReactCSSTransitionGroup>
```

このコンポーネントはトランジションの適用対象となるコンポーネントのグループを表し、
子コンポーネントが追加/削除されるたびに自動的にCSSスタイルを切り替えてアニメーションを実現します。

### 10.1.1 トランジションのクラスごとにスタイルを記述する

- `transitionName` 属性に基づいて、4つのCSSクラス名が作成される
  (`transitionName-enter`, `transitionName-enter-active`, `transitionName-leave`, `transitionName-leave-active`)

```css
.parent .transitionName-enter {
  transform: scale(1.2);
  transition: transform 0.2s cubic-bezier(.97, .84, .5, 1.21);
}
.parent .transitionName-enter-active {
  transition: scale(1);
}
.parent .transitionName-leave {
  transform: translateY(0);
  opacity: 0;
  transition: opacity 1.2s, transform 1s cubic-bezier(.52, -0.25, .52, .95);
}
.parent .transitionName-leave-active {
  opacity: 0;
  transform: translateY(-100%);
}
```

### 10.1.2 トランジションのライフサイクル

`transitionName-enter` は子コンポーネントが追加されたときに適用され、そのあとすぐに `transitionName-enter-active` が適用される

```js
<ReactCSSTransitionGroup transitionName="transtionName"
  transitionEnter={this.props.enableAnimations}
  transitionLeave={this.props.enableAnimations}>
  {transitions}
</ReactCSSTransitionGroup>
```

デフォルトでは追加/削除の両方のアニメーションが有効になっているが `transitionEnter={false}` もしくは `transitionLeave={false}` を設定することで、片方もしくは両方を無効にすることができます。


### 10.1.3 よくある過ち

1. `leave` のアニメーションが完了するまで子コンポーネントは削除されない
2. 子コンポーネントの `key` 属性はトランジションのグループ内でユニークでなければいけない


## 10.2 タイマーを用いたアニメーション

__CSSアニメーションが向いていないもの__

- 古いブラウザに対応したい場合
- CSSのプロパティ以外のもの（スクロールのアニメーションやCanvas描画）を扱いたい場合


### 10.2.1 requestAnimationFrame を使ったアニメーション

```js
var Positioner = React.createClass({
  getInitialState: function() {
    return {
      position: 0
    };
  },
  resolveAnimationFrame: function() {
    var timestamp = new Date();
    var timeRemaining = Math.max(0,
      this.props.animationCompleteTimestamp = timestamp);

    if (timeRemaining > 0) {
      this.setState({position: timeRemaining});
    }
  },
  componentWillUpdate: function() {
    if (this.props.animationCompleteTimestamp) {
      requestAnimationFrame(this.resolveAnimationFrame);
    }
  },
  render: function() {
    var divStyle = {left: this.state.position};
    return <div style={divStyle}>この要素が動きます</div>;
  }
});
```

### 10.2.2 setTimeout を使ったアニメーション

```js
var Positioner = React.createClass({
  getInitialState: function() {
    return {
      position: 0
    };
  },
  resolveSetTimeout: function() {
    var timestamp = new Date();
    var timeRemaining = Math.max(0,
      this.props.animationCompleteTimestamp - timestamp);

    if (timeRemaining > 0) {
      this.setState({position: timeRemaining});
    }
  },
  componentWillUpdate: function() {
    if (this.props.animationCompleteTimestamp) {
      setTimeout(this.resolveSetTimeout, this.props.timeoutMs);
    }
  },
  render: function() {
    var divStyle = {position: this.state.position};
    return <div style={divStyle}>この要素が動きます</div>;
  }
});
```

## 10.3 まとめ
