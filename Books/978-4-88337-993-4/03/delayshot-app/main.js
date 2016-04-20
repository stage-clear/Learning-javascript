'use strict';

let DELAY_TIME = 1000 * 1;

let WORD = 'ネコ';
let TAEGET_URL = ['https://www.google.co.jp/search', '?source=lnms&tbm=isch&q=', encodeURIComponent(WORD)].join('');
let pwd = __dirname + '/';

let app = require('app');
let BrowserWindow = require('browser-window');
let fs = require('fs');

let win = null;
app.on('ready', () => {
  win = new BrowserWindow({width: 1024, height: 800});
  win.loadUrl(TAEGET_URL);

  win.webContents.on('did-finish-load', captureFunc);
});

function captureFunc() {
  setTimeout(() => {
    let fname = 'cat-' + (new Date().getTime()) + '.png';
    win.capturePage((img) => {
      fs.writeFileSync(pwd + fname, img.toPng());
      app.quit();// アプリを終了
    });
  }, DELAY_TIME);
}