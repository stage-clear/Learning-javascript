# 入力フィルタの値のバリデーション
## 郵便番号の入力コンポーネントを作ろう

### 郵便番号入力コンポーネント ZipInput 

- [input_zip/index.js](examles/input_zip/src/index.js)
- [input_zip/ZipInput.js](exmples/input_zip/src/ZipInput.js)

### 汎用的な入力コンポーネントを作ってみよう

- 不要な文字をフィルタリングする機能
- 入力値の妥当性をチェック機能

汎用的なコンポーネントなので、もしコンポーネントの使い方が間違っていた時には警告を表示するようにもしたいと思います.
そのために, コンポーネントに, propsTypes というオブジェクトを追加します

```js
// コンポーネントの定義
class FormInput extends Component { ... }

// PropTypes型を使うための宣言
import PropTypes from 'prop-types'

// プロパティの型を定義
FormInput.propTypes = {
  value: PropTypes.string, // 文字列型
  name: PropTypes.sring.isRequired, // 文字列型で指定が必須
  filter: PropTypes.object, // オブジェクト型
  onChange: PropTypes.func // 関数型
}

// プロパティの初期値を定義
FormInput.defaultProps = {
  filter: null,
  pattern: null,
  value: '',
  onChange: null
}
```

#### プログラムで確認しよう

- [input_compo/FormInput.js](input_compo/src/FormInput.js)
