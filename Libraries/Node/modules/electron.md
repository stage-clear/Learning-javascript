Electron
========

__Electron の基本的な流れ__

1. Electron を起動
2. `package.json` に応じてメインプログラムが実行される
3. メインプログラムで、ブラウザウィンドウを作成
4. ブラウザウィンドウに任意のHTMLを表示する

記述
-----

__インストール__  

```bash
$ npm install -g electron-prebuilt
```

__簡単なサンプル__

```
// 構成
./test-app/
 ├── package.json
 ├── index.js
 └── index.html
```

```json
// package.json
{
  "name": "test-app",
  "version": "1.0.1",
  "main": "index.js"
}
```

```javascript
// index.js
var app = require('app');
var BrowserWindow = require('browser-window');

var mainWindow = null

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadUrl('file://' + __dirname + '/index.html');
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
```

```html
// index.html
<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>Test app</title>
</head>
<body>
  <h1>テストアプリ1</h1>
  <p id="info"></p>

  <script>
  window.onload = function() {
    var info = document.getElementById('info');
    info.innerHTML = '' +
      'Node.ver :' + process.version + '<br>' +
      'Atom.ver :' + process.versions['electron'];
  };
  </script>
</body>
</html>
```


```bash
$ electron /path/to/app
```

### IPC通信

__同期的なIPC通信__  

```html
// レンダラープロセス
<script>
var ipc = require('ipc');
var res = ipc.sendSync('mul-sync', {a: 30, b: 2});
alert('res=' + res);
</script>
```

```javascript
// メインプロセス
var ipc = require('ipc');
ipc.on('mul-sync', function(event, arg) {
  console.log(arg); // 受け取った値をコンソール出力
  event.returnValue = arg.a * arg.b;
});
```

__非同期的なIPC通信__  

```html
// レンダラープロセス
<script>
var ipc = require('ipc');
ipc.send('mul-async', {a: 30, b: 2});
ipc.on('mul-async-reply', function(arg) {
  alert('res='+arg);
});
</script>
```

```javascript
// メインプロセス
var ipc = require('ipc');
ipc.on('mul-async', function(event, arg) {
  console.log(arg); // 受け取った値をコンソールに出力
  // レンダラープロセスへの返信
  var result = arg.a * arg.b;
  event.sender.send('mul-async-reply', result);
});
```


### Electron でスクリーンキャプチャを撮る

```javascript
// ブラウザを作成
win = new BrowserWindow({width: 1024, height: 800});
// 指定ページ
// ブラウザ画面をキャプチャする
win.capturePage(function(img) {
 var png = img.toPng();
 fs.writeFileSync('screenshot.png', png);
});

// ページ読み込みが完了してからキャプチャする場合
win.loadUrl(TARGET_URL);
win.webContents.on('did-finish-load', captureFunc);
```

__キャプチャする範囲を指定する__  

```javascript
BrowserWindow.capturePage([rect, ] callback);
// rect = {
//   x: x座標,
//   y: y座標,
//   width: 領域の幅,
//   height: 領域の高さ
// }
```

リンク
------

- [Electron](http://electron.atom.io/)
- [atop/electron](https://github.com/atom/electron)
- [Electron/Browser-window](https://github.com/atom/electron/blob/master/docs/api/browser-window.md)


