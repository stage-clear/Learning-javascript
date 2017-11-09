# コンポーネント三大要素の使い分け

- 状態（state.xxx）
- プロパティ（props.xxx）
- イベント（onXxx）

## 状態とプロパティ
### 状態について

状態が変化すると, コンポーネントが再描画されます.<br>
状態として保持すべきなのは, コンポーネントの状態を表す値です.

- 状態とは状況に応じて変化するものである
- 状態とは書き換え可能である
- 状態が変更されると, コンポーネントの再描画が行われる
- 外部には非公開でコンポーネント自身が管理すべき

状態が変化すると次のメソッドが呼び出されます

- `shouldComponentUpdate(nextProps, nextState)`
- `componentWillUpdate()`
- `render()`
- `componentDidUpdate()`

### プロパティについて

プロパティは, 外部からコンポーネントへの窓口というべき役割を持っています.<br>
一度設定されたプロパティは, 基本的にコンポーネント内部で変更することはありません<br>
プロパティの初期値（defaultProps）の設定と型の検証（propTypes）を行うことができます.

- プロパティは読み取り専用
- プロパティは親要素から設定されるもの
- 初期値と型の検証を行うことがある

プロパティは外部（親要素）より変更されることがあり, その場合, 次のようなメソッドが呼ばれます

- `componentWillReceiveProps(nextProps)`

一般的に, プロパティの変更は, コンポーネントの状態の変更となります.
そのため, 上記メソッド内で `setState()` メソッドにより状態が変更されるなら, 以下のメソッドが呼び出されることになります

- `shouldComponentUpdate(nextProps, nextState)`
- `componentWillUpdate()`
- `render()`
- `componentDidUpdate()`

### イベントについての復習

React のイベントは, HTML/JavaScript のイベントとは異なります.
onclick イベントは onClick ですし, onchange イベントは onChange イベントと『onXxx』の形式でイベント名が利用できるようになっています

```jsx
<div>
  <MyComponent onChange={handleChange}/>
</div>
```

## 色選択コンポーネントを作ってみよう

- [st-color.html](examples/st-color.html)
