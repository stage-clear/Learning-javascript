# アプリケーションのビルド
## Whinepad バージョン 0.0.1

### セットアップ

```bash
$ cd ~/reactbook/whinepad\ v0.0.1/
$ sh scripts/watch.sh
```

### コーディングの開始

## コンポーネント
__分割統治__ の考え方に従って、より小さく再利用可能なコンポーネントへと分解してみましょう.
また、コンポーネント一覧というヘルパーアプリケーションも作成します。

### セットアップ

```bash
$ cp -r ~/reactbook/whinepad\ v0.0.1 ~/reactbook/whinepad
$ cd ~/reactbook/whinepad
$ sh scripts/watch.sh
```

### コンポーネント一覧

```bash
$ cp index.html discovery.html
```

```html
<!doctype html>
<html>
  ...
  <body>
    ...
    <script src="discover-bundle.js"></script>
  </body>
</html>
```

```bash
$ browserify js/bundle/discover.js -o discover-bundle.js
```

```js
'use strict'

import Logo from './components/Logo'
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  <div style={ {padding: '30px'} }>
    <h1>コンポーネント一覧</h1>
    
    <h2>Logo</h2>
    <div style={ {display: 'inline-block', background: 'purple' } }>
      <Logo />
    </div>
    { /* その他のコンポーネント */ }
  </div>,
  document.getElementById('pad')
)
```

### `<Button>` コンポーネント
