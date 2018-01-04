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
[tegaki/2-conv2csv.js](examples/tegaki/2-conv2csv.js)

```bash
$ node 2-conv2csv.js
```

> バッチ処理を非同期で行う意味はそれほどないので, 同期関数(xxxSync)が用意されていれば,
> そちらを使うようにします.

> `Buffer.alloc()` で任意のバイト数をメモリ上に確保しておいて, その後, `fs.readSync()` でファイルからデータを読み出します.
> Buffer 内に読み込んでおけば, `readUInt32BE()` で符号なし32ビット整数を読み出すことができます.

### 2000件 / 500件 のデータを抽出しよう
[tegaki/3-split.js](examples/tegaki/3-split.js)

```bash
$ node 3-split.js
```

## 機械学習を実践しよう
node-svm という機械学習ライブラリを利用して, 手書き文字を認識してみましょう.
node-svm は, SVM(サポートベクターマシン)という機械学習のアルゴリズムを実装したライブラリです.

```bash
# プロジェクトを初期化
$ npm init -y
# node-svm をインストール
$ npm install node-svm@2.1.8
```

次のプログラムを実行して, node-svm でデータを学習し, 手書き文字の分類モデルを作成しましょう

[tegaki/4-train.js](examples/tegaki/4-train.js)

作成した学習モデルを元にして, テストデータで精度を確認してみましょう.
以下が, テストデータを用いてモデルを評価するプログラムです.

[tegaki/5-test.js](examples/tegaki/5-test.js)

以下のコマンドで, プログラムを実行できます

```bash
$ node 5-test.js
ng= 3 9
ng= 8 4
ng= 3 5
ng= 4 6
ng= 3 7
ng= 4 7
ng= 9 2
...
エラー率: 6.6000000000005
```

## 文字認識サーバーのプログラム

```bash
$ npm i --save express react react-dom superagent
$ npm i --save-dev webpack babel-core babel-loader
$ npm i --save-dev babel-preset-es205 babel-preset-react
```

[tegaki/6-server.js](examples/tegaki/6-server.js)

## 文字認識クライアント（React）のプログラム
[tegaki/src/index.js](examples/tegaki/src/index.js)
