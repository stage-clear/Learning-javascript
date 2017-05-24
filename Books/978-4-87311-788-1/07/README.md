# 品質チェック, 型チェック, テスト, そして繰り返し
アプリケーションが進化そして大規模化してもコードの正しさを保つためのツールを3つ紹介します.
それは ESLint, Flow そして Jest です.

## package.json

```json
{
  "name": "Whinepad",
  "version": "2.0.0"
}
```
最低限必要なのはこれだけです.

### Babel の設定

```bash
$ babel --presets react,es2015 js/source -d js/build
```

このコマンドをもっとシンプルにしてみましょう.  
`presets` の部分は, package.json に移動できます.

```json
{
  ...
  "babel": {
    "presets": [
      "es2015",
      "react"
    ]
  }
}
```

こうすれば, コマンドを次のように短くできます.

```bash
$ babel js/source -d js/build
```

### スクリプト

```json
{
  ...
  "scripts": {
    "watch": "watch \"sh scripts/build.sh\" js/source css/"
  }
}
```

これからは, 以下のコマンドで開発と同時にビルドが可能になります.

```bash
# 従来のコマンド
$ sh ./scripts/watch.sh

# 新しいコマンド
$ npm run watch
```

## ESLint
- [ESLint](http://eslint.org/)

### セットアップ

```bash
$ npm i -save-dev eslint babel-eslint eslint-plugin-react eslint-plugin-babel
```

```json
{
  ...
  "eslintConfig": {
    "parser": "babel-eslint",
    "plugins": [
      "babel",
      "react"
    ]
  }
}
```

### 実行

```bash
$ eslint js/source/app.js
```

この状態では, チェックのためのルールが何も指定されていません.
ESLint でチェックを行うためにはルールが必要です.

```json
{
  "eslintConfig": {
    ...
    "extends": "eslint:recommended"
  }
}
```

この指定を行ってから再びチェックを行うと, 今度はエラーが発生します.

```
4:8   error  'React' is defined but never used     no-unused-vars
9:23  error  'localStorage' is not defined         no-undef
24:3   error  'document' is not defined             no-undef
```

ブラウザ特有の変数への対応:
```json
{
  "eslintConfig": {
    ...
    "env": {
      "browser": true
    }
  }
}
```

React 特有の対応:

```json
{
  "eslintConfig": {
    ...
    "rules": {
      "react/jsx-uses-react": 1
    }
  }
}
```

「ぶら下がりのカンマ」:

```json
{
  "eslintConfig": {
    ...
    "rules": {
      "comma-dangle": [2, "always-multiline"]
    }
  }
}
```

### ルール全体

- [reactbook/package.json](https://github.com/stoyan/reactbook/blob/master/whinepad2/package.json)

`build.sh` の中から ESLint を呼び出すようにします

```shell
# コードの品質を保証します
eslint js/source
# node_modules/.bin/eslint js/source
```

## Flow
- [Flow](https://flow.org/)

コードのチェックやユニットテストと同じように, こうした型チェックはコードにある程度の保証を与えてくれます.

### セットアップ
Flow をインストールして `.flowconfig` という空の設定ファイルを作成します.  
<sup>(\* Flowを実行するには64ビットのオペレーションシステムが必要です)</sup>

```
npm install --save-dev flow-bin
flow init
```

`init` コマンドによって, カレントディレクトリに `.flowconfig` という空の設定ファイルが生成されます.
このファイルを編集して, ignore(無視)と include(追加)のセクションに項目を追加します.

```
[ignore]
.*/react/node_modules/.*

[include]
node_modules/react
node_modules/react-dom
node_modules/classnames

[libs]

[options]
```

### 実行

```bash
$ flow
```

特定のファイルだけをチェックする

```bash
$ flow js/source/app.js
```

型チェックも品質管理の一環です. ビルドのスクリプトの中で呼び出すようにしましょう.

```sh
eslint js/source
flow
```

### 型チェックのための準備
型チェックを行いたいファイルでは, 先頭に `@flow` というコメントを記述する必要があります.
このコメントがないファイルを無視されます. つまりデフォルトでは型チェックは行われません.

```js
function sum(a, b) {
  return a + b
}

// With annotation
function sum(a: number, b: number): number {
  return a + b
}
```

### `<Button>` の修正

```js
const Button = (props: Object) =>
```

`Object` というアノテーションも機能はするのですが, さらに詳しい指定も可能です.
カスタムの型を定義して, オブジェクトに含まれるデータを指定します

```js
type Props = {
  href: ?string,
}
```

```js
const Button = (props: Props) => 
```

カスタムの型を使えば, React の `propTypes` が不要になります.

- 実行時の型チェックが不要になり, 処理速度が若干向上します
- コードのサイズが小さくなり, クライアントとの間の通信量を削減できます

### app.js

```
 11: let data = JSON.parse(localStorage.getItem('data'))
                           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^ null. This type is incompatible with the expected param type of
```

`JSON.parse()` では, 1つ目の引数に指定できるのは文字列だけのようです.
`localStorage` は `null` を返すこともあり, この場合にはシグネチャーに反することになります.

簡単な解決策としては, 次のようにデフォルト値を追加するというものが考えられます.

```js
let data = JSON.parse(localStorage.getItem('data') || '')
```

問題点

- `JSON.parse('')` を実行するとブラウザ上で問題が発生する

`data` は当初は配列として扱われますが, 値が空の場合にはオブジェクトが代入され, 最後に再び配列になります.
ブラウザの JavaScript エンジンは内部で, コードの最適化を意図して変数に型を割り当てています.
実行中に型を変えると, JavaScript エンジンは割り当てた型や最適化したコードを破棄しなければならないかもしれません.

より厳密に, `data` をオブジェクトの配列であると定義します.

```js
let data: Array<Object>
```

```js
const storage: ?string = localStorage.getItem('data')

if (!storage) {
  data = [{}]
} else {
  data = JSON.parse(storage)
}
```

### プロパティとステートの型チェックに関する補足

ステートを持たない関数としてReactコンポーネントを作成する場合, 次のようにして `props` にアノテーションを行えます.

```js
type Props = {/* ... */}
const Button = (props: Props) => {/* ... */}
```

クラスのコンストラクタについても同様です

```js
type Props = {/* ... */}
class Rating extends Component {
  constructor(props: Props) {/* ... */}
}
```

一方, 以下のようにコンストラクタが必要ないという場合にはどうなるでしょう.

```js
class Form extends Component {
  getData(): Object {}
  render() {}
}
```

ここでは, ECMAScript の新しい機能が役立ちます.
クラスにプロパティを追加できます.

```js
type Props = {/* ... */}
class Form extends Component {
  props: Props
  getData(): Object {}
  render() {}
}
```

同様に, コンポーネントのステートについてもアノテーションを記述できます.
型をチェックするというメリットだけでなく, 先頭に定義が記述されることによってコードがドキュメンんととして機能するという効果もあります.

```js
type Props = {
  defaultValue: number,
  readonly: boolean,
  max: number,
}

type State = {
  rating: number,
  tmpRating: number,
}

class Rating extends Component {
  props: Props,
  state: State,
  constructor(props: Props) {
    super(props)
    this.state = {
      rating: props.defaultValue,
      tmpRating: props.defaultValue,
    }
  }
  
  componentWillReceiveProps(nextProps: Props) {
    this.setRating(nextProps.defaultValue)
  }
}
```

### 型のインポートとエクスポート

```js
type FormInputFieldType = 'year' | 'suggest' | 'rating' | 'text' | 'input'

export type FormInputFieldValue = string | number

export type FormInputField = {
  type: FormInputFieldType,
  defaultValue?: FormInputFieldValue,
  id?: string,
  options?: Array<string>,
  label?: strng,
}

class FormInput extends Component {
  props: FormInputField
  getValue(): FormInputFieldValue {}
  render() {}
}
```

- カスタムの型(`FormInputFieldType`)を別のカスタムの型(`FormInputField`)で使うことも可能です
- 型はエクスポートもできます.1つのコンポーネントでエクスポートすれば, 別のコンポーネントでインポートできます

```
import type FormInputField from './FormInput'

type Props = {
  fields: Array<FormInputField>,
  initialData?: Object,
  readonly: boolean,
}
```

実際には `FormInputFieldValue` も必要になるので, 正しいコードは次のようになります.

```
import type {FormInputField, FormInputFieldValue} from './FormInput'
```

### 型変換
Flow が想定しているのとは異なる型を指定することも可能です.
たとえば, イベントハンドラに渡されたイベントのオブジェクトについて考えてみましょう.

```js
_showEditor(e: Event) {
  const target = e.target
  
  this.setState({eidt: {
    row: parseInt(target.dataset.row, 10),
    key: target.dataset.key,
  }})
}
```

このコードを Flow はお気に召さないようです.

[flow/lib/dom.js](https://github.com/facebook/flow/blob/master/lib/dom.js) で EventTarget の定義を調べると,
ここには `dataset` は含まれていません.
しかし, HTMLElement には確かに `dataset` が含まれています.
このような場合に役立つのが型変換です.

```js
const target = ((e.target: any): HTMLElement)
```

内側のカッコの中で指定された型の値が, 外側の型になります.  
上のコードでは, 任意の型を持つ `e.target` が, 値を変えずに `HTMLElement` 型になります.

### インバリアント

```
type EditState = {
  row: number,
  key: string,
}

type DialogState = {
  idx: number,
  type: string,
}

type state = {
  data: Data,
  sortby: ?string,
  descending: boolean,
  edit: ?EditState,
  dialog: ?DialogState,
}
```

値が `null` かもしれず, そうでないかもしれないという問題がここで発生します.
これは望ましくない状態であり, もちろん __Flow は見逃しません__ .
Flow は次のようなエラーを発生させます.

```bash
Property cannot be accessed on possibly null value
```

Flow にエラーを発生させず, かつ前提に反するコードを防ぐためには, 次のように値が `null` ではないことを確認するようにします.

```js
// Before:
data[this.state.edit.row][this.state.edit.key] = falue

//After:
if (!this.state.edit) {
  throw new Error('ステート edit が不正です')
}
```

これですべてが望ましい状態になります.
条件分岐や `throw` 文を何度も書くのは面倒だという場合には, `invariant()` 関数を使ってインバリアント（不変条件）を記述するというのもよいでしょう.

- [invariant](https://github.com/zertosh/invariant)

```bash
$ npm install --save-dev invariant
```

この場合, `.flowconfig` は次のようになります.

```
[include]
...
node_modules/invariant
```

そして, コードはこのようになります.

```js
invariant(this.state.edit, 'ステート edit が不正です')
data[this.state.edit.row][this.state.edit.key] = value
```

## テスト
問題を起こしにくい形でアプリケーションが成長を続けてゆくには, 自動化されたテストも必要です.
テストにはさまざまな選択肢が用意されています.
React では [Jest](https://facebook.github.io/jest/) を使ってテストを行っているため, 本書でもこのツールを使ってみることにしましょう.
React に含まれている `readt-addons-test-utils` パッケージも役立つでしょう.

### セットアップ

```bash
$ npm install -save-dev jest-cli
```

テストをECMAScript6スタイルで記述するための babel-jest` と, Reactのテスト用ユーティリティパッケージもインストールしてください.

```bash
$ npm install --save-dev babel-jest react-addons-test-utils
```

続いて, `package.json` を以下のように変更します.

```json
{
  ...
  "scripts": {
    "watch": "watch \"sh scripts/build.sh\" js/source js/__tests__ css/",
    "test": "jest"
  },
  "eslintConfig": {
    "env": {
      ...
      "jest": true
    }
  },
  ...
  "jest": {
    "unmockedModulePathPatterns": [
      "node_modules/react",
      "node_modules/react-dom",
      "node_modules/react-addons-test-utils",
      "node_modules/fbjs"
    ]
  },
  ...
}
```

```bash
$ jest テスト名.js
$ npm test テスト名.js
```

Jest では, テストコードが `__test__` ディレクトリにあると想定されています.
本書でも, まず, `js/__test__` ディレクトリに作成することにします.

そしてビルドのスクリプトの中で, テストのコードに対して構文チェックを行ってからテストを行うようにします.

```shell
# コードの品質を保証します
eslint js/source js/__test__
flow
npm test
```

`watch.sh` も修正し, テストのコードを監視対象に加えます.
なお, この機能は `package.json` からも利用できます.

```js
watch "sh scripts/build.sh" js/source js/__test__ css/
```

### 最初のテスト
