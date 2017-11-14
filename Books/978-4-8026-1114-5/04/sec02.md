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
Electron はメインプロセスからレンダラープロセスが生成される仕組みです.
メインプロセスは, アプリを起動してすぐに実行される主となるプロセスであり, 
レンダラープロセスは, ブラウザ内の描画を行うためのプロセスです.<br>
メインプロセスとレンダラープロセスは並行して実行されますが, 相互に情報を交換するためには,
IPC通信をりようして通信をします.

Electron のプロセスが, メインプロセスとレンダラープロセスと分かれているのには理由があります.
メインプロセスとレンダラープロセスでは, 利用できるAPIが異なるのです.

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

macOSっぽい画面を構成するために, Photon Kit を使います.
```bash
$ npm install --save https://github.com/connors/photon
```

- [electron_clipfmt/index.html](examples/electron_clipfmt/index.html)
- [electron_clipfmt/index.js](examples/electron_clipfmt/src/index.js)

```bash
$ npm install 
$ npm run build 
$ npm start
```

## アプリを配布しよう

- [electron/asar](https://github.com/electron/asar)
- [electron-userland/electron-packager](https://github.com/electron-userland/electron-packager)

```bash
$ npm install -g asar
$ npm install -g electron-packager
```

まず, asar を使って, プロジェクトのファイルをアーカイブ化します.
これは複数のファイルを1つのファイルにまとめるツールです.

```bash
$ asar pack ./out ./clipfmt.asar
```

続いて, 次のコマンドを実行します

```bash
electron-packager ./ clipfmt --platform=darwin,win32 --arch=x64
```

すると, macOS であれば「clipfmt-darwin-x64」というフォルダが生成され（Windows であれば「clipfmt-win32-x64」）,
実行ファイルが作成されます.

## まとめ
- Electron を利用すれば, Windows/macOS/Linux 用のデスクトップアプリを開発できます
- Electron で React を使うには, Webpack で React のコンパイル環境を作ると便利です
- Electron では, 外部プログラムの実行やファイルダイアログなど, OS独自の機能を利用できます
- Electron では, メインプロセスでしか実行できないAPIもあり, メインプロセスとレンダラープロセスが相互に通信して処理を行うモデルとなっています


