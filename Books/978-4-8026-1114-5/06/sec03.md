# 機械学習で手書き文字を判定しよう
## ここで作るアプリ - リアルタイム手書き文字認識ツール

```bash
# 必要なモジュールをインストール
$ npm i --save react react-dom
$ npm i --save express superagent
$ npm i --save node-svm
$ npm i --save-dev webpack babel-core babel-loader
$ npm i --save-dev babel-preset-es2015 babel-preset-react
```

```text
 .
 ├── 1-download.js
 ├── 2-conv2csv.js
 ├── 3-split.js
 ├── 4-train.js
 ├── 5-test.js
 ├── 6-server.js
 ├── database
 ├── package.json
 ├── public
 │   ├── bundle.js
 │   └── index.html
 ├── src
 │   ├── index.js
 │   └── styles.js
 └── webpack.config.js
```

## 手書き数字のデータベースをダウンロードしよう

> THE MNIST DATABASE of handwritten digits<br>
> [URL](http://yann.lecun.com/exdb/mnist/)

[tegaki/1-download.js](examples/tegaki/1-download.js)

```bash
$ mkdir database
$ node 1-download.js
```

## バイナリファイルを解析しよう
