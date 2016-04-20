# サーバーサイドレンダリング

React はサーバーサイドレンダリング用に `React.renderToString` および `React.renderToStaticMarkup` というふたつの関数を提供する。
サーバーサイドレンダリングに対応する場合、あらかじめさまざまなことを考慮してコンポーネントを設計する必要があります。

- `renderToString` と `renderToStaticMarkup` のどちらの関数を用いるか
- コンポーネントで非同期データをどのように扱うか
- アプリケーションの初期値をどのようにしてクライアントに渡すか
- サーバーとクライアントにおける利用可能なライフサイクルメソッドの違い
- サーバーとクライアントにおいてルーティングをどのように共通化するか
- シングルトンオブジェクト使用時の注意点


## 12.1 サーバーサイドにおける描画関数

- サーバーサイドレンダリングでは、通常の `React.render` は使用できない

### 12.1.1 React.renderToString

- おそらくほとんどの場合、この関数を使う
- `React.render` との違いは、第2引数のターゲットDOMが不要であることと、戻り値としてHTML文字列を返すこと
- 同期呼び出しであり、非常に速く動作する

```js
var MyComponent = React.createClass({
  render: functeion() {
    return <div>Hello World!</div>;
  }
});

var world = React.renderToString(<MyComponent />);

// 出力結果 (実際は改行されず1行で出力される)
<div data-reactid=".fgvrzhg2yo" data-react-checksum="1663559667">
Hello World!
</div>
```

- `data-reactid` 属性は React がブラウザの環境でDOMノードを特定するために使用される
- `data-react-checksum` 属性はサーバーサイドレンダリングの場合にのみ追加される


### 12.1.2 React.renderToStaticMarkup

- `React.renderToString` と異なり、出力に独自データを含まない

```js
var MyComponent = React.createClass({
  render: function() {
    return <div>Hello World!</div>;
  }
});

var world = React.renderToStaticMarkup(<MyComponent />);

// 出力
<div>Hello World</div>
```


### 12.1.3 どちらの関数を使うべきか

__`React.renderToStaticMarkup`__

サーバーサイドで描画した React コンポーネントをブラウザで再描画しないことがわかっている場合にのみ使用する

- HTMLメールの作成
- 作成した HTML を後で PDF に変換する
- コンポーネントのテスト


__`React.renderToString`__

ほとんどの場合は、`React.renderToString` を使う
作成する React コンポーネントがサーバーとクライアントの間でまったく同じであることは特に重要です。


## 12.2 サーバーサイドにおけるコンポーネントのライフサイクル

コンポーネントを文字列として出力する場合、`render` より後のライフサイクルメソッドは呼び出されない。
特に注意しないといけないのは、`componentDidMount` と　`componentWillUnmount` はサーバーサイドでは呼び出されないということです。
一方、`componentWillMount` はサーバー/クライアントのいずれの場合でも呼び出される

イベントリスナーの定義において、コンポーネントの終了を通知するライフサイクルメソッドは存在しない前提で設計します。
この問題に対するベストプラクティスは、イベントリスナーやタイマーは常に `componentDidMount` で登録して、`componentWillUnmount` で解除することです。


## 12.3 クライアントとサーバーの両方で使えるコンポーネントの設計

同一の `props` と `state` が与えられた場合、常に同じ内容出力するようにコンポーネントを設計することで、
コンポーネントはテストしやすくなり、また、サーバーとクライアントで同じ出力結果を保証することが可能です。

例) ランダムな数値を表示するコンポーネント。
    出力結果が毎回異なるので、チェックサムが一致しない

```js
var MyComponent = React.creaetClass({
  render: function() {
    return <div>{Math.random()}</div>;
  }
});

var result = React.renderToStaticMarkup(<MyComponent />);
var result2 = React.renderToStaticMarkup(<MyComponent />);

// result
<div>0.5473843748392743</div>

// result2
<div>0.2332378392378217912</div>
```

ランダムな数値を外部から `props` として受け取るようにコンポーネントを変更する
サーバーサイドで使用した初期値をなんらかの方法でクライアントに渡せばサーバーとクライアントで同一の出力結果が得られる

```js
var MyComponent = React.createClass({
  render: function() {
    return <div>{this.props.number}</div>;
  }
});

var num = Math.random();

// サーバー
React.renderToString(<MyComponent number={num} />);

// クライアント
React.render(<MyComponent number={num}>, document.body);
```

サーバーからクライアントに初期値を渡す方法はたくさんあります。
最も簡単な方法は JavaScript のオブジェクトとして初期値を渡す方法です。

例) `initialProps` という変数に初期値を格納してクライアントに渡す

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>サーバーサイドレンダリングの例</title>
  <!-- bundoe.js は MyComponent と React を含む -->
  <script src="bundle.js"></script>
</head>
<body>
  <!-- MyCompontnt をサーバーサイドレンダリングした結果 -->
  <div data-reactid=".fgvrzhg2yo" data-react-checksum="-1663543543">
    0.43243243424343
  </div>

  <!-- サーバーサイドレンダリングに使用した初期値をクライアントへ渡す -->
  <script>
    var initialProps = {'num': 0.43243243424343};
  </script>

  <!-- クライアントで initialProps を参照する -->
  <script>
    var num = initialProps.num;
    React.render(<MyComponent number={num} />, document.body);
  </script>
</body>
```

## 12.4 非同期データ

```js
var Username = React.createClass({
  statics: {
    getAsyncState: function(props, setState) {
      User.findById(props.userid)
        .then(function(user) {
          setState({user: user});
        })
        .cache(function(error) {
          setState({error: error});
        });
    },
    // クライアント/サーバー両方でサポートされている
    componentWillMount: function() {
      if (this.props.initialState) {
        this.setState(this.props.initialState);
      }
    },
    // クライアントでのみサポートされている
    componentDidMount: function() {
      // get async state if not in props
      // データが props に存在しなければ非同期に取得する
      if (!this.props.initialProps) {
        this.updateAsyncState();
      }
      // データの変更を監視する
      User.on('change', this.updateAsyncState);
    },
    // クライアントでのみサポートされている
    componentWillUnmount: function() {
      // データの監視を止める
      this.constructor.getAsyncState(this.props, this.setState);
    },
    render: function() {
      if (this.state.error) {
        return <div>{this.state.error.message}</div>;
      }
      if (!this.state.user) {
        return <div>ロード中...</div>;
      }
    }
  }
});

// サーバーサイドレンダリング

var props = {
  userId: 124 // 通常はルーターから取得する
};

Username.getAsyncState(props, function(initialState) {
  props['initialState'] = initialState;
  var result = React.renderToString(<Username {...props}>);

  // result と　initialState をクライアントにわたす
});
```


## 12.5 Isomorphic ルーティング

__データが SEO の観点から需要な場合__

データはルーターのハンドラーで非同期に取得して、トップレベルのコンポーネントから末端のコンポーネントへ順番に渡してあげる必要がある

__データが SEO の観点から重要でない場合__

ルーターのハンドラではなく、コンポーネントの `componentDidMount` メソッドで AJAX でデータを取得すればよい。


## 12.6 シングルトンオブジェクト


## 12.7 まとめ
