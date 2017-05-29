# Flux
- [Flux](https://github.com/facebook/flux)

ここまでの例では, 親から子にプロパティを渡し, `onDataChange` などを使って子の側での変更を監視するという方法がとられています.  
しかしこうすると:

- コンポーネントが持つプロパティの数が増えすぎてしまいます
- すべてのプロパティの組み合わせの下での動作をテストするのが困難
- プロパティを子から孫そしてひ孫へとずっと渡してゆかなければならない

## 考え方の要点
Flux の根底にあるのは, アプリケーションはデータを扱うためのものだという考え方です.
データは Store と呼ばれる要素に保持されます.

React のコンポーネント（View と呼ばれます）は, Store からデータを読み込んで描画します.
そしてユーザーは, Action を行います.
Action が発生すると, Store のデータが更新されます.
その結果, View も更新されることになります.
そして, このサイクルが繰り返されてゆきます.
データは1方向にしか流れないため, 追跡やデバッグが容易です.

この考え方は大まかなものであり, 亜種や拡張も考えられます.
例えばより多くの Action が含まれたり, 複数の Store が使われたり, Dispatcher と呼ばれる要素が登場したりします

## Whinepad の見直し

アプリケーションでのデータ形式を表す `schema` が`<Whinepad>` から `<Excel>` へそのまま渡されています.
あまりにも定型的で, 冗長なコードです.
このような受け渡さなければならないプロパティが複数ある場合には, 事態はさらに悪化します.
コンポーネントの界面が, 得られるメリットに見合わないほどに膨張しています.

> ここでの「界面」とは, コンポーネントの受け取るプロパティのことです.
> 「API」や「関数のシグネチャー」とほぼ同義です.

## Store

```bash
mkdir js/source/flux
touch js/source/flux/CRUDStore.js
touch js/source/flux/CRUDAction.js
```

Flux のアーキテクチャでは, 複数の Store を配置することも可能です.
例えば, ユーザーのデータとアプリケーションの設定とで Store を別にするといった形態が考えられます.

これから実装する CRUDStore は, React とは全く関係がありません.

```js
/* @flow */

let data
let schema 

const CRUDStore = {
  getData(): Array<Object> {
    return data
  },
  
  getSchema(): Array<Object> {
    return schema
  }
}

export default CRUDStore
```

Store では, 信頼できる情報源が `data` と `schema` というモジュール内のローカル変数として保持されます.
次のような更新のメソッドも用意されています. 一方スキーマについては, アプリケーションのライフサイクル全体を通じて不変です.
そのため, 更新のメソッドはありません.

```js
{
  // ...

  setData(newData: Array<Object>, commit: boolean = true) {
    data = newData
    if (commit && 'localStorage' in window) {
      localStorage.setItem('data', JSON.stringify(newData))
    }
    emitter.emit('change')
  },
}
```

合計の行数と特定の行のデータを返すメソッドも Store に追加します

```js
{
  // ...

  getCount():number {
    return data.length
  },
  
  getRecord(recordId: number): ?Object {
    return recordId in data ? data[recordId] : null 
  },
}
```

アプリケーションの起動時に, Store を初期化する必要があります.
この処理は今まで `app.js` で行われてきましたが, 本来は Store が行うべきです.
こうすれば, データが扱われるコードを1ヶ所に集約できます.

```js
{
  // ...
  
  init(initialSchema: Array<Object>) {
    schema = initialSchema
    const storage = 'localStorage' in window
      ? localStorage.getItem('data')
      : null
    if (!storage) {
      data = [{}]
      schema.forEach(item => data[0][item.id] = item.sample)
    } else {
      data = JSON.parse(storage)
    }
  },
}
```

新しい app.js で行われるのは, 以下のような初期処理です.

```js
// ...
import CRUDStore from './flux/CRUDStore'
import Whinepad from './components/Whinepad'
import schema from './schema'

CRUDStore.init(schema)

ReactDOM.render(
  <div>
    {/* JSX のコード（中略） */}

    <Whinepad />

    {/* ... */}
  </div>
)
```

Store はすでに初期化sareteirunode, `<Whiepad>` にプロパティを渡す必要はありません.
データは `CRUDStore.getData()` を通じて取得でき, データについての説明は `CRUDStore.getSchema()` を使ってアクセスできます.

> Store は自分でデータを読み込んでいるけれども, スキーマについては外部から渡されているという点に違和感を覚えるかもしれません.
> もちろん, Store が schema をインポートしても構いませんが, アプリケーション本体がスキーマの読み込みに責任を持つ方が理にかなっています.
> スキーマはモジュールとして定義されているかもしれず, ハードコードされていることもユーザーが定義することもあるでしょう.

### Store でのイベント
関連するUIのモジュールがデータの変更について通知を受け取れるようにするためのしくみです.
通知を受けたUIモジュールは, Store から最新のデータを受け取って表示を更新します.

イベントへの登録（サブスクリプションとも呼ばれます）を実装するパターンは多数あります.
これらはいずれも, 特定のイベントに対して関心を持っているコンポーネント（サブスクライバ）のリストを管理し, イベントの発生時にはそれぞれのサブスクライバが持つコールバック関数を呼び出します.

このようなしくみを自分で実装する必要はありません.

- [fbemitter](https://www.npmjs.com/package/fbemitter)

```bash
$ npm i --save-dev fbemitter
```

インストールしたら `.flowconfig` を次のように変更します

```
[ignore]
.*/fbemitter/node_modules/.*
# ...

[include]
# ...
node_modules/fbemitter
# ...
```

EventEmitter のインポートと初期化は, Store のモジュールの先頭で行います.

```js
/* @flow */

import {EventEmitter} from 'fbemitter'

let data 
let schema 
const emitter = new EventEmitter()

// ...
```

emitter の役割は2tuarimasu.

- サブスクライバを登録すること
- サブスクライバにイベントを通知すること（たとえば, `setData()` の際の `emitter.emit('change')`）

サブスクライバを登録する処理を Store のメソッドとして公開すれば, サブスクライバは内部の実装に関知する必要がなくなります.

```js
CRUDStore = {
  // ...
  
  addListener(eventType: string, fn: Function) {
    emitter.addListener(eventType, fn)
  }
  // ...
}
```

これで CRUDStore の機能は完成です.

### `<Whinepad>` から Store を利用する

- 各機能の実装が `CRUDActions` へと移されるためシンプルになる
- `CRUDStore` も `<Excel>` に `this.state.data` を渡す必要がなくなるためシンプルかに貢献します
  - 新しい `<Excel>` は Store を通じてデータにアクセスします

以前のコードでは, `<Whinepad>` の `constructor()` でステートをセットしていました

```js
this.state = {
  data: props.initialData,
  addnew: false,
}
```

新しいコードでは, `data` は必要ありません.
しかし, 件数については次のようにして `Store` から取得します.

```js
/* @flow */

// ...
import CRUDStore from '../flux/CRUDStore'
// ...

class Whinepad extends Component {
  constructor() {
    super()
    this.state = {
      addnew: false,
      count: CURDStore.getCount() // <-
    }
  }
  /* ... */
}

export default  Whinepad
```

`constructor()` ではもう1つの処理が必要です.
Store での変更を監視し, `this.state` の中に保持されている件数を更新できるようにします.

```
class Whinepad extends Component {
  constructor() {
    super()
    this.state = {
      addnew: false,
      count: CRUDStore.getCount(),
    }
    
    CRUDStore.addListener('change', () => {
      this.setState({
        count: CRUDStore.getCount()
      })
    })
  }
  /* ... */
}

export default Whinepad
```

Store との間に必要なインタラクションはこれだけです.
なんらかの理由で Store を更新され, CRUDStore の `setData()` が呼び出されるたびに, Store は `change` イベントを発生させます.

- `<Whinepad>` はイベントを監視しており, イベントの発生のたびに自らのステートを変化させます
- ステートが変化すると, 再描画つまり `render()` メソッドが実行されます.

```jsx
render() {
  return (
    {/* ... */}
    <input 
      placeholder={`${this.state.count}件から検索`}
    />
  )
}
```

`<Whinepad>` のもう1つの工夫として, `shouldComponentUpdate()` メソッドを.
データへの変更の中には, 合計の件数に影響しないものもあります.
<sup>例えば, レコードやその中のフィールドを編集するだけでは件数は変化しません.</sup>
このような場合には, 再描画の必要はありません.
このことを表現したのが次のコードです.

```js
shouldComponentUpdate(newProps: Object, newState: State): boolean {
  return (
    newState.addnew !== this.state.addnew ||
    newState.count !== this.state.count
  )
}
```

新しい `<Whinepad>` では, データやスキーマを表すプロパティを `<Excel>` 渡す必要があり前sん.
また, すべての変更は Store からの `change` イベントとして伝達されるため, `onDataChange` イベントを監視する必要もありません.
`render()` メソッドの該当する部分は次のようになります.

```js
render() {
  return(
    {/* ... */}
    <div className="WhinepadDatagrid"}>
      <Excel />
    </div>
    {/* ... */}
  )
}
```

### `<Excel>` から Store を利用する
`<Whinepad>` と同様に, `<Excel>` でもプロパティは必要なくなりました.
コンストラクタは Store からスキーマを読み込み, `this.schema` として保持します.
`this.schema` ではなく `this.state.schema` に保持してもよいでのですが, `state` は変化するものという位置付けです.
変化しないスキーマの保存場所としてはふさわしくありません.

データについては, Store から `this.state.data` として読み込まれます.
そして, Store の `change` イベントを監視し, ステートとして保持しているデータを最新に保てるようにします.

```js
class Excel extends Component {
  constructor() {
    super()
    this.state = {
      data: CRUDStore.getData(),
      sortby: null, // schema.id
      descending: false,
      edit: null, // [ row index, cell index]
      dialog: null, // { type, idx }
    }
    this.schema = CRUDStore.getSchema()
    CRUDStore.addListener('change', () => {
      this.setState({
        data: CRUDStore.getData(),
      })
    })
  }
}
```

Store のデータを `this.state` にコピーしなければならないのはなぜかと思われたでしょうか.
`render()` メソッドの中で Store のデータを直接読み込むということも, 実は可能です.
しかしこうすると, コンポーネントの純粋さが失われてしまいます。
ここまでの「純粋」なコンポーネントでは, `props` と `state` だけに基づいて描画が行われていました.
一方, `render()` の中で外部の関数を呼び出すというのは「疑わしい」行為です.
外部から返されるデータは予測できません.

### `<Form>` から Store を利用する

```js
/* @flow */

import CRUDStore from '../flux/CRUDStore'

// ...

type Props = {
  readonly?: boolean,
  recordId: ?number,
}

class Form extends Component {
  fields: Array<Object>
  initialData: ?Object
  constructor(props: Props) {
    super(props)
    this.fields = CRUDStore.getSchema()
    if ('recordId' in this.props) {
      this.initialData = CRUDStore.getRecord(this.props.recordId)
    }
  }
  // ...
}
```

### Store とプロパティの使い分け

pro:
- Store には容易にアクセスでき, 必要なデータをすべて取得できます
- プロパティを多重に渡す必要がなくなります

con:
- コンポーネントの再利用性が低下します


ボタンや入力フィールドといった低階層のコンポーネントは, Store に関知しないように作成するのがよいでしょう.
プロパティを使っても特にデメリットはありません.

一方, シンプルなウィジェットと階層構造の頂点に位置するコンポーネントとの間には,
判断が難しいグレーゾーンが広がっています.
与えられた要件と, 今後の再利用の可能性を考慮した判断が求められます.

## Action
Action とは, Store のデータを変更するための方法です.
ユーザーが View 上でデータを変更すると, Store のデータを更新するための Action が実行され, 更新を監視しているビューにイベントが通知されます.

CRUDStore を更新する CRUDAction も, 次のようにシンプルな JavaScript のオブジェクトとして実装できます.

```
/* @flow */

import CRUDStore = from './CRUDStore'

const CRUDActions = {
  /* メソッド */
}
```

### CRUD の Action

```js
/* @flow */

const CRUDActions = {
  create(newRecord: Object) {
    let data = CRUDStore.getData()
    data.unshift(newRecord)
    CRUDStore.setData(data)
  },
  
  delete(recordId: number) {
    let data = CRUDStore.getData()
    data.splice(recordId: 1)
    CRUDStore.setData(data)
  },
  
  updateRecord(recordId: number, newRecord: Object) {
    let data = CRUDSsore.getData()
    data[recordId] = newRecord
    CRUDStore.setData(data)
  },
  
  /* ... */
}
```

> CRUD のうち R(read) の機能は, Store が提供しているためここでは必要ありません.

### 検索と並べ替え
以前の実装では, `<Whinepad>` が検索の機能を受け持っていました.
たまたま, このコンポーネントの `render()` の中で検索フィールドが描画されていたためです.
しかし本来は, もっとデータに近接させた形で実装するべきです.

並べ替えの機能は `<Excel>` に含めていましたが, これも表のヘッダーを描画していたからという理由にすぎません.
並べ替えについても, データに近い形での実装が望まれます.

検索や並べ替えを, Action と Store のどちらで行うべきかという点については議論の余地があります.
どちらでも, とくに大きな問題はありません.

今回の実装では, Store を可能なかぎりシンプルに保つことにします.
Store はゲッターとセッターそしてイベントの送出だけを受け持つようにします.

データへの加工を Action に担当させるという方針で, 検索と並べ替えの機能をUIのコンポーネントから CRUDActions に移動させます.

```js
/* @flow */

/* ... */

const CRUDActions = {
  /* ... */
  _preSearchData: null,
  
  startSearching() {
    this._preSearchData = CRUDStore.getData()
  },
  
  search(e: Event) {
    const target = ((e.target: any): HTMLInputElement)
    const needle: string = target.value.toLowerCase()
    if (!needle) {
      CRUDStore.setData(this._preSearchDtata)
      return 
    }
    const fields = CRUDStore.getSchema().map(item => item.id)
    if (!this._preSearchData) {
      return 
    }
    const searchdata = this._preSearchData.filter(row => {
      for (let f = 0; f < fields.length; f++) {
        if (row[fields[f]].toString().toLowerCase().indexOf(needle) > -1) {
          return needle
        }
      }
    })
    CRUDStore.setData(searchdata, /* commit */ false)
  },
  
  _sortCallback(
    a: (string|number), b: (string|number), descending: boolean
  ): number {
    let res: number = 0
    if (typeof a === 'number' && typeof b === 'number') {
      res = a -b
    } else {
      res = String(a).localeCompare(String(b))
    }
    return descending ? -1 * res : res
  },
  
  sort(key: string, descending: boolean) {
    CRUDStore.setData(CRUDStore.getData().sort(
      (a ,b) => this._sortCallback(a[key], b[key], descending)
    ))
  },

}
```

CRUDActions の機能を全て実装できました.
これらの機能を呼び出す `<Whinepad>` や `<Excel>` について見てみましょう

> `sort()` 関数のうち以下の部分は, CRUDActions で実装するべきではないという考え方もあります.

```js
search(e: Event) {
  const target = ((e.target: any): HTMLInputElement)
  const needle: string = target.value.toLowerCase()
  /* ... */
}
```

> つまり, Action のモジュールはUIについて関知するべきではなく, 検索文字列は次のようにしてモジュール外部から与えられるほうがよいという考え方です.

```js
search(needle: string) {
  /* ... */
}
```

> これは正当な考え方です. 実装するには, `<Whinepad>` での `<input>` で `CRUDActions.search()` を呼び出している部分を変更して, 検索文字列を渡すようにします.

### `<Whinepad>` から Action を利用する

```js
/* @flow */

/* ... */
import CRUDActions from '../flus/CRUDActions'
/* ... */

class Whinepad extends Component {/* ... */}

export default Whinepad
```

データの更新は Action のモジュールに任されます.
Store は信頼できる唯一の情報源としての役割を果たします.

```js
// Before:
_addNew(action: string) {
  if (action === 'dismiss') {
    this.state({addnew: false})
  } else {
    let data = Array.from(this.state.data)
    data.unshift(this.refs.form.getData())
    this.setState({
      addnew: false,
      data: data,
    })
    this._commitToStorage(data)
  }
}

// After:
_addNew(action: string) {
  this.setState({addnew: false})
  if (action === 'confirm') {
    CRUDActions.create(this.refs.form.getData())
  }
}
```

```jsx
render() {
  return (
    <input 
      placeholder={
        `${this.state.count}件から検索...`
      }
      onChange={CRUDActions.search.bind(CRUDActions)}
      onFocus={CRUDActions.startSearching.bind(CRUDActions)}
    /> 
  )
}
```

### `<Excel>` から Action を利用する

```js
// Before:
_deleteConfirmationClick(action: string) {
  if (action === 'dismiss') {
    this._closeDialog()
    return 
  }
  
  const index = this.state.dialog ? this.state.dialog.idx : null
  invariant(typeof index === 'number', 'ステートdialogが不正です')
  let data = Array.from(this.state.data)
  data.splice(index, 1)
  this.setState({
    dialog: null, 
    data: data,
  })
  this._fireDataChange(data)
}

// After:
_deleteConfirmationClick(action: stirng) {
  this.setState({dialog: null})
  if (action === 'dismiss') {
    return 
  }
  const index = this.state.dialog && this.state.dialog.idx
  invariant(typeof index === 'number', 'ステートdialogが不正です')
  CRUDActions.delete(index)
}
```


```
/* @flow */

/* ... */
import CRUDActions from '../flux-imm/CRUDActions'
/* ... */

class Excel extends Component {
  /* ... */
  
  _sort(key: string) {
    const descending = this.state.sortby === key && !this.state.descending
    CRUDActions.sort(key, descending)
    this.setState({
      sortby: key,
      descending: descending,
    })
  }
  
  _save(e: Event) {
    e.preventDefault()
    invariant(this.start.edit, 'ステート edit が不正です')
    CRUDActions.updateField(
      this.state.edit.row,
      this.state.edit.key,
      this.refs.input.getValue()
    )
    this.setState({
      edit: null,
    })
    
    _saveDataDialog(action: string) {
      this.setState({dialog: null})
      if (action === 'dismiss') {
        return 
      }
      cosnt index = this.state.dialog && this.state.dialog.idx
      invariant(type index === 'number', 'ステート dialog が不正です')
      CRUDActions.updateRecord(index, this.refs.form.getData())
    }
    
    /* ... */
  }
  
  export default Excel
}
```

## Flux のまとめ

View が Action を呼び出し, Action は Store を更新します.
そして, Store はイベントを発生させます.
View はイベントを受け取り, 表示を更新させます.
このように, 3者の関係は循環しています.

この概念を発展させたアーキテクチャも考えられています.
成長したアプリケーションでは, このアーキテクチャが役立つこともあるでしょう.

例えば, Action を呼び出すのは View だけとはかぎりません.
サーバーが Action を呼び出すこともあります.
あるいは, 時間の経過に起因する何らかの処理が必要になることもあるでしょう.

Action の呼び出し元が複数の場合, 単一の Dispatcher という考え方が役立ちます.
Dispatcher とは, すべての Action の呼び出しを Store へと受け渡す役割を担います.

さらに複雑で面白いアプリケーションでは, UIから呼び出される Action とサーバーなどから呼び出される Action が混在しています.
Store も複数あり, それぞれが異なるデータを扱っています.

## イミュータブル

```js
npm i --save-dev immutable
```

`.flowconfig` には以下の行を追加しましょう

```
# ...

[include]
# ...
node_modules/immutable

# ...
```

### イミュータブルな Store のデータ

```js
/* @flow */

import {EventEmitter} from 'fbemitter'
import {List} from 'immutable'

let data: List<Object>
let schema
const emitter = new EventEmitter()
```

これで, data の型はイミュータブルな `List` になりました.

```js
const CRUDStore = {
  init(initialSchema: Array<Object>) {
    schema = initialSchema
    const storage = 'localStorage' in window
      ? localStorage.getItem('data')
      : null
     
    if (!storage) {
      let initialRecord = {}
      schema.forEach(item => initialRecord[item.id] = item.sample)
      data = List([initialRecord])
    } else {
      data = List(JSON.parse(storage))
    }
  },
  
  /* ... */
}
```

`List` は配列を使って初期化されています.
以降は, `List` の API を使ってデータを操作してゆくことになります.
ただし, この `List` はイミュータブルなので変更はできません.

初期化処理と型のアノテーション以外には, Store に対して大きな必要はありません.

イミュータブルなリストには `length` プロパティがないため, `getCount()` を以下のように変更します.

```js
// Before:
getCount(): number {
  return data.length
}

// After:
getCount(): number {
  return data.count() // data.size でも可
}
```

添え字を使ったアクセスもできないため, `getRecord()` にも変更が必要です.

```js
// Before:
getRecord(recordId: number): ?Object {
  return recordId in data ? data[recordId] : null
}

// After:
getRecord(recordId: number): ?Object {
  return data.get(recordId)
}
```

### イミュータブルなデータの操作

```js
/* @flow */

import CRUDStore from './CRUDStore'
import {List} from 'immutable'

const CRUDStore = {
  /* ... */
  
  delete(recordId: number) {
    // Before:
    // let data = CRUDStore.getData()
    // data.splice(recordId, 1)
    // CRUDStore.setData(data)
    
    // After:
    let data: List<Object> = CRUDStore.getData()
    CRUDStore.setData(data.remove(recordId))
  },
  
  /* ... */
}

export default 
```

継ぎ合わせるという意味を持った JavaScript の `splice()` メソッドは, 元の配列を変更し, 削除された要素を返します.
そのため, 1行のコードで `delete()` を実装するのは不可能でした.
一方, イミュータブルな `List` では1行での処理が可能です.

```js
delete(recordId: number) {
  CRUDStore.setData(CRUDStore.getData().remove(recordId))
},
```

```js
create(newRecord: Object) {
  CRUDStore.setData(CRUDStore.getData().set(recordId, newRecord))
},

updateRecord(recordId: number, newRecord: Object) { // [] がないので `set()` を使います
  CRUDStore.setData(CRUDStore.getData().set(recordId, newRecord))
},

updateField(recordId: number, key: string, value: string|number) {
  let record = CRUDStore.getData().get(recordId)
  record[key] = value
  CRUDStore.setData(CRUDStore.getData().set(recordId, record))
},
```

以上で完成です.
このアプリケーションではさまざまなものが利用されています.

- UIを定義する React コンポーネント
- コンポーネントを組み立てるJSX
- データの流れを整理する Flux
- イミュータブルなデータ
- ECMAScript の最新の機能を利用するための Babel
- 型チェックなどのための Flow 
- 構文チェックのための ESLint 
- ユニットテストのための ESLint
