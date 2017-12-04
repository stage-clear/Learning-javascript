# 少し複雑なアプリを作るには React Router
## React Router とは？
Router とは, 発送係とか物を送る経路（道筋）を決める人を意味しています.

> **React Router**<br>
> [https://reacttraining.com/react-router/](https://reacttraining.com/react-router/)

### React-Router のインストール

```bash
$ npm install --save react-router-dom
```

サンプルではバージョン 4.1.1 を使用しています

```bash
$ npm install --save react-router-dom@4.1.1
```

### プロジェクトの準備をしよう

```bash
# create-react-app をインストール
$ npm install -g create-react-app
$ cd router_test
$ npm install
# React Router(web) をインストール
$ npm install --save react-router-dom
# 開発サーバを起動
$ npm start
```

## 最も簡単なサンプル
- [router_test/HelloApp.js](examples/router_test/src/HelloApp.js)

## 固定ヘッダーとフッターを利用しよう
- [router_test2/HelloApp2.js](examples/router_test2/src/HelloApp2.js)

## パラメータを利用しよう
React Router ではパスにパラメータを指定して, コンポーネント側で, パラメータを受け取ることができるようになっています.

```bash
$ create-react-app router_params
$ cd router_params
$ npm install --save react-router-dom
$ npm install
```

- [router_params/CustomerApp.js](examples/router_params/src/CustomerApp.js)

```bash
$ npm start
```

ここでは Switch を使っています.
Switch を利用すると, URLのパスがいずれにも当てはまらなかった時の挙動を指定できます.

```jsx
<Switch>
  <Route path="/about" component={About}/>
  <Route path="/memo" component={Memo}/>
  <Route component={NotFound}/>
</Switch>
```

各リンクを描画するとき, `<Link to="path">...</Link>` を利用して記述しています.
この部分を, `<a>` タグに置き換えても問題なく動かすことができます.
ただし, Link を使うと, ブラウザ履歴（history）に追加することなくURLの移動を可能にするなど細かい制御を行うことがdekimasu.

Route で `/user/:id` のパスにマッチしていれば, UserCard コンポーネントが表示されます.
このとき, `this.props.match.params.id` が React Router に設定されてますので, これを利用して, どの顧客を表示すべきなのかを特定できます.

## React Router の詳しいマニュアルについて

> **React Router のマニュアル**<br>
> [https://reacttraining.com/react-router/web/guildes/](https://reacttraining.com/react-router/web/guildes/)

## まとめ
- React Router を使うと, 手軽に画面切り替え（画面遷移）を記述することができます
- React Router では, 固定ヘッダーやフッターを指定することができます
- URLパラメータを指定することで, パラメータを元にして, コンポーネントの描画内容を変更できます



