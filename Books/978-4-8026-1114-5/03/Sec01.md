# コンポーネントの生成から破棄まで
## コンポーネントのライフサイクル

```
constructor(props) // オブジェクトが生成される
 ↓
componentWillMount() // コンポーネントがDOMにマウントされる直前
 ↓
render() // コンポーネントが描画される
 ↓
componentDidMount() // コンポーネントがDOMにマウントされた直後
 ↓
---- コンポーネントを利用
 ↓
componentWillUnmount(nextProps) // コンポーネントのプロパティが変更された時
 ↓
---- コンポーネントの状態変化
 ↓
componentWillReceiveProps(nextProps, nextState) // コンポーネントのプロパティが更新された時
 ↓
shouldComponentUpdate() // コンポーネントの外観を更新して良いかどうか判断する時
 ↓
componentWillUpdate() // コンポーネントが更新される直前
 ↓
render() // コンポーネントの描画
 ↓
componentDidUpdate()
 ↓
----- DOMからのアンマウント
 ↓
componentWillUnmount()
```

### ライフサイクルを確認しよう
