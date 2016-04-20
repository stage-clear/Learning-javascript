# コンポーネントのライフサイクル

```js
var MyComponent = React.createClass({
  /**
   * getDefaultProps() - コンポーンネント作成時
   * - 2度目以降は呼ばれない
   * - オブジェクトや配列など非スカラー値を返した場合は
   *   インスタンスごとに複製されず、すべてのインスタンスで共有される
   */
  getDefaultProps() {
    return {
      date: new Date(),
      initialValue: 'some-default-value'
    };
  },

  /**
   * getInitialState()
   * - インスタンス作成時に状態を初期化するために呼ばれる
   * - getDefaultProps と違いインスタンス作成のたびに呼び出される
   * ! 加工された props を state に保存すべきではない
   *   (それらは描画時に行うべき加工であり、決して state ではない)
   */
  getInitialState() {
    // 例) props の値を state の初期値として使う
    return {
      value: this.props.initialValue;
    }
  },

  /**
   * componentWillMount()
   * - 初回の描画の直前に呼ばれる
   * - render が呼び出される前にコンポーネントの状態を変更したいとき、
   *   これが最後の機会となる
   */
  componentWillMount() {
  },

  /**
   * Render()
   * - メソッド内でアクセスできるのは this.props と this.state だけ
   * - 戻り値として null, false, もしくは React コンポーネントを返す
   * - 単一のトップレベルコンポーネントしか返すことができない
   * - ピュアでなければいけない
   * ! render 内で state を変更したり DOM を直接更新してはいけない
   */
  render() {
    return {
      var day = this.props.date.getDay();
      return (
        <div>
          <div>Day: {day}</div>
          <div>{this.state.value}</div>
        </div>
      );
    }
  },

  /**
   * componentDidMount()
   * - 描画が成功して実際のDOMが表示されると、componentDidMount のなかで
   *   React.findDOMNode(this) 経由で実際の DOM にアクセスできる
   * - このメソッドの目的は DOM ノードにアクセスすること
   *   * 要素の高さを調べたり、タイマーを設定したり、jQuery プラグインを利用したり..
   * ! componentDidMount はサーバーサイドレンダリング時は呼び出されない
   */
  componentDidMount() {
    $(React.findDOMNode(this)).autocomplete({
      sources: datasource
    });
  },

  /**
   * componentWillReceiveProps()
   * - コンポーネント作成後
   * - この時点でコンポーネントは描画されユーザーはそれを操作できる
   * - コンポーネントの props は親コンポーネントにより任意のタイミングで変更される
   * - props を参照して、state を変更したり、その他の処理を行うことが可能
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== undefined) {
      this.setState({
        checked: nextProps.checked
      });
    }
  },

  /**
   * - shouldComponentUpdate で最適化することで速く動作するようになる
   * - props や state が変更されても、それがコンポーネントもしくはその子ノード
   *   の表示に影響しないことがわかっている場合、このメソッドで false を返す
   * ! 開発時にこのメソッドを使用する必要はほとんどない
   * ! 早期に使用することで、原因不明のバグを注入してしまう恐れがある
   */
  shouldComponentUpdate() {
  },

  /**
   * - componentWillMount と似ている
   * - props と state の更新による描画が起こる直前に呼び出される
   * - このメソッドないで props や state の更新はできない。変更したい場合は
   *   componentWillReceiveProps を使う
   */
  componentWillUpdate: function() {
  },

  /**
   * componentDidUpdate()
   * - componentDidMount と似ている
   * - 実際に表示された DOM の参照へアクセスするために使う
   */
  componentDidUpdate() {
  },

  /**
   * componentWillUnmount()
   * コンポーネント破棄時
   * - コンポーネントが削除されるときに呼ばれる
   * - ここで必要な後片付けをする
   * - componentDidMount の中でタイマーを作成したりイベントリスナーを追加
   *   したりした場合は、ここでリセットしなければいけない
   */
  componentWillUnmount() {
  }
});
```
