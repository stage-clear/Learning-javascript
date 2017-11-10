# Electron を使ってみよう

## Electron を始めよう

```bash
# クイックスタートのリポジトリを取得
$ git clone https://github.com/electron/electron-quick-start
# 取得したディレクトリに入る
$ cd electron-quick-start
# 依存モジュールをインストールして開始
$ npm install && npm start
```

## Electron に React 開発環境を導入しよう

```bash
# プロジェクトのディレクトリを作成
$ mkdir electron_hello
$ cd electron_hello
# package.json を作成
$ npm init -y
```

```bash
# Electron をインストール
$ npm i --save-dev electron
# React をインストール
$ npm i --save-dev react react-dom
# Babel をインストール
$ npm i --save-dev babel-core babel-presets-es2015 babel-preset-react 
# Webpack をインストール
$ npm i --save-dev webpack babel-loader
```

``` txt
.
├── package.json
├── index.html
├── main.js
├── src
│   └── index.js
├── out
│   └── index.js
└── webpack.config.js
```

- [webpack.config.js](examples/electron_hello/webpack.config.js)

```bash
$ npm run build
$ npm start
```


## Electron の仕組みを理解しよう

```js
mainWindow = new BrowserWindow({
  width: 800,
  height: 600,
  webPreferences: { 
    nodeIntegration: false
  }
})
```

### Electron で利用できる API

- [Electron Documentation](https://electron.atom.io/docs/api/)

## クリップボード整形アプリを作ってみよう
