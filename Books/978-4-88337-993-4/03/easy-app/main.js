// wikipedia を表示するだけのプログラム
var TARGET_URL = 'https://ja.wikipedia.org/';

// 必要なモジュールの取り込み
var app = require('app');
var BrowserWindow = require('browser-window');

// メインウィンドウを起動
var mainWindow = null;

// 準備ができたタイミングで呼ばれるイベント
app.on('ready', function() {
  // メインウィンドウを作成
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // 指定のURLを読み込み
  mainWindow.loadUrl(TARGET_URL);
});

