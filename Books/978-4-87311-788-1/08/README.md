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

```
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

```
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

