# 開発環境のセットアップ

## アプリケーションのひな型
### ファイルとフォルダ

```shell
 .
 ├── index.html
 ├── js/
 │   ├── build/
 │   └── source/
 │       ├── app.js
 │       └── components/
 │           └── Logo.js
 ├── css/
 │   ├── app.css
 │   └── components/
 │       └── Logo.css
 │
 ├── scripts/
 │
 └── images/
```

### `index.html`

- `bundle.css` への参照
- `bundle.js` への参照
- アプリケーションを配置するための `<div id="app">`

### CSS

### JavaScript 

### モダンな JavaScript

#### モジュール

```js
var React = require('react')
var Logo = React.createClass({/*...*/})
module.exports = Logo
```

#### ECMAScript モジュール

```js
import React from 'react'
var Logo = React.createClass({/*...*/})
export default Logo
```

#### クラス

```
class Logo extends React.component {/*...*/}
```

### 最終的なコード

```js
// app.js
'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import Logo from './components/Logo'

ReactDOM.render(
  <h1>
    <Logo />
  </h1>,
  document.getElementById('app')
)
```

```js
// Logo.js
import React from 'react'

class Logo extends React.compoent {
  render() {
    return <div className="Logo" />
  }
}
```

## 必要なソフトウェアのインストール

### Node.js

### Broserify

```sh
$ npm install --global browserify
$ browserify --version
```

### Babel

```sh
$ npm install --global babel-cli
$ babel --version
```

### React など

```sh
$ npm install --save-dev react
$ npm install --save-dev react-dom
$ npm install --save-dev babel-preset-react
$ npm install --save-dev babel-preset-es2015
```

## ビルドの実行

### JavaScript のトランスパイル

```sh
$ babel --presets react, es205 js/source -d js/build
```

### JavaScript のパッケージング

```sh
$ browderify js/build/app.js -o bundle.js
```

### CSSのパッケージング

```sh
$ cat css/*/* css/*.css | sed 's/..\/..\/images/images/g' > bundle.css
```

### ビルドの結果

### 開発と同時のビルド

ファイルを変更するたびにビルドの手順を実行しなければならないというのはとても面倒です

`scripts/build.sh` を作成します

`watch` をインストールします

```sh
$ npm install --global watch
```

`watch` を実行します

```sh
$ watch "sh scripts/build.sh" js/source css
```

これもスクリプトとして記述できます.

```
$ sh scripts/watch.sh
```

## デプロイ
