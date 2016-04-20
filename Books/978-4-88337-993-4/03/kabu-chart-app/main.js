'use strict';

// 東京証券取引所の株価指数グラフのページ
let TAEGET_URL = 'http://quote.jpx.co.jp/jpx/template/quote.cgi?F=tmp/hist_index&basequote=151&mode=D';

// モジュールの取り込み
let app = require('app');
let BrowserWindow = require('browser-window');
let fs = require('fs');
let pwd = __dirname + '/';

// メインウィンドウ
let win = null;
app.on('ready', () => {
  win = new BrowserWindow({width: 800, height: 800});
  win.loadUrl(TAEGET_URL);
  win.webContents.on('did-finish-load', captureFunc);
});

// キャプチャ
function captureFunc() {
  // 日付つきのファイル名を保存する
  let t = new Date();
  let fname = (['kabu', t.getFullYear(), (1 + t.getMonth()), t.getDate()].join('-')) + '.png';
  console.log(fname);

  win.capturePage((img) => {
    fs.writeFileSync(pwd + fname, img.toPng());
    app.quit(); // アプリを自動終了
  });
}