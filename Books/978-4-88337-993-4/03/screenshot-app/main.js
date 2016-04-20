'use strict';

let TARGET_URL = 'https://atom.io';

const app = require('app');
const BrowserWindow = require('browser-window');
const fs = require('fs');
let pwd = 'screenshot-app/';

// メインウィンドウ
let win = null;
app.on('ready', () => {
  win = new BrowserWindow({width: 1024, height: 800});
  win.loadUrl(TARGET_URL);
  win.webContents.on('did-finish-load', captureFunc);
});

// キャプチャ処理
function captureFunc() {
  win.capturePage((img) => {
    fs.writeFileSync(pwd + 'screenshot.png', img.toPng());
  });
}