# Webpack でリソースファイルを変換する

## Webpack とは?

- [Webpack](https://Webpack.github.io/)

### Webpack をインストールしよう

```bash
$ npm install -g webpack
```

### JS のモジュール機能を Webpack で解決してみよう

```js
// calc.js
export function mul (a, b) {
  return a * b
}
```

```js
// main.js
import { mul } from './calc'
const a = mul(3, 5)
console.log(a)
```

```bash
$ mkdir out 
$ webpack maiin.js out/test.js
```

```bash
$ node out/test.js
15
```

### 変換指示書となる設定ファイルを作ろう

```js
// webpack.config.js
module.exports = {
  entry: './main.js',
  output: {
    filename: 'out/test.js'
  }
}
```

```bash
# Webpack を実行
$ webpack 
# 変換結果を確認する
$ node out/test2.js
15
```

設定ファイルに別のファイル名をつけたい場合には, `--config` オプションを付けて設定ファイルを指定できます.

```bash
$ webpack --config Webpack.config.js
```

```bash
# 開発用にビルド
$ webpack
# 本番用に最適かしてファイルをビルド
$ webpack -p
# 開発用に関しモードで差分ビルド
$ webpack --watch
```

## Webpack で React/JSX をビルドしてみよう

1. ソースディレクトリと出力ディレクトリなどを作っておく
2. `npm init` で package.json を作成する
3. 必要なモジュールをインストールする
4. webpack.config.js を作成する
5. ソースコードを作成し, webpack コマンドでコンパイルする
6. Web サーバー上でコンパイル結果を確認する

```bash
$ mkdir src out
```

```bash
$ npm init --force
```

```bash
# Webpack をインストール
$ npm i --save-dev webpack 
# React をインストール
$ npm i --save-dev react react-dom
# Babel と ES2015/React プリセットをインストール
$ npm i --save-dev babel-loader babel-core
$ npm i --save-dev babel-preset-es2015 babel-preset-react
```

```js
// webpack.config.js
module.exports = {
  entry: './src/main.js',
  output: {
    filename: './out/bundle.js'
  },
  module: {
    rules: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
```
