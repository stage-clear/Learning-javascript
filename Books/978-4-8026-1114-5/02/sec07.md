# React のツールで自動ビルド

## React/JSX のコンパイル環境を作ろう

## create-react-app のインストール

```bash
$ npm install -g create-react-app
```

### create-react-app で hello プロジェクトを作ろう

```bash
$ create-react-app hello
```

```bash
$ cd hello
$ npm start
```

### プログラムを書き換えてみよう

- <node_modules> - インストールされたモジュールが入っている
- <src> - プログラムのソースコード
- <public> - ひな形用のファイル

```js
// hello/src/App.js
import React, { Component } from 'react'
import './App.css'

class App extends Component {
  render () {
    return <div className="App">
      <h2>塔を建てるときは、まず座って費用を計算しよう</h2>
    </div>
  }
}

export default App
```

### エラーがあるとわかりやすく表示してくれる

### プログラムを公開しよう 

```bash
$ npm run build
```

ローカル環境でうまくビルドされたかどうかを確認するには, Webサーバーが必要になります.
Node.js で書かれたサーバー利用するには, 以下のコマンドを実行して serve コマンドをインストールします

```bash
$ serve -s build -p 3000
```

```bash
$ serve -s build
```

## ひな形アプリの仕組みを読み解こう

`public/index.html` からメインファイル `src/index.js` が読み込まれるようになっています.

```js
// hello/src/index.js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
```
