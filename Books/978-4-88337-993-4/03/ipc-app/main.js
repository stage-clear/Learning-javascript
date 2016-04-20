'use strict';

const app = require('app');
const BrowserWindow = require('browser-window');
const ipc = require('ipc');

// メインウィンドウ
let mainWindow = null;
app.on('ready', () => {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadUrl('file://' + __dirname + '/index.html');
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

// 同期メッセージ
ipc.on('mul-sync', (event, arg) => {
  console.log('[mul-sync]', arg);// コンソールに出力
  event.returnValue = arg.a * arg.b;
});

// 非同期メッセージ
ipc.on('mul-async', (event, arg) => {
  console.log('[mul-async]', arg);
  var result = arg.a * arg.b;
  event.sender.send('mul-async-reply', result);
});