# Flux の仕組みを理解しよう
## React に Flux が必要な理由
Flux では各機能ごとにアプリを分割します.
そして情報が上から下へと各機能に伝わるように, 流れをスッキリと定義したのものです。

## Flux に登場する役者たち

- Action（実行委員会）
- Dispatcher（連絡係）
- Store（記録係）
- View（表示係）

### Action 
Action の働きは, 必要に応じて, なにかしらの行動を起こすことです.
ただし, Action は続く各機能に行動するように命じるだけで, それを実際に処理することはしません.

### Dispatcher
Flux における Dispatcher は, Action から依頼された仕事を, 記録係である Store に伝達する役割を果たします.

### Store
Flux で Store はアプリの各状態を記録する役割を果たします.

### View
Store の状態に応じて画面を表示します.

## 役者同士の情報伝達の流れについて
Flux では, 常に情報の流れは一方通行と決まっています.

__Flax での情報伝達の流れ__ <br>
Action → Dispatcher → Store → View

### 具体的なプログラムで確認しよう

```bash
# package.json に基づいて必要なモジュールをインストール
$ npm install 
# flux をインストール
$ npm install --save flux
```

__Flux でクリックしてメッセージを表示するアプリの構造__<br>

- [flux_test/appDispatcher.js](examples/flux_test/src/appDispatcher.js)
- [flux_test/store.js](examples/flux_test/src/stores.js)
- [flux_test/actions.js](examples/flux_test/src/actions.js)
- [flux_test/index.js](examples/flux_test/src/index.js)

```bash
$ npm run build
$ npm start
```

## まとめ
- Flux を使うとプログラムを簡潔に保つことができます
- Flux では Action → Dispatcher → Store → View と情報を一方通行に流します
- Flux の核処理では, それぞれが, 役割を超えた処理をしないように実装します
