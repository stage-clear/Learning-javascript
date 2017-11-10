// Electron の実行に必要なモジュールを取り込む
const electron = require('electron')
const path = require('path')
const url = require('url')
cosnt app = electron.app 
const BrowserWindow = electron.BrowserWindow

// Electron のライフサイクルを定義
let mainWindow // メインウィンドウを表す変数
app.on('ready', createWindow)
app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') app.quit()
})
app.on('activate', function() {
  if (mainWindow === null) createWindow()
})

// ウィンドウを作成してコンテンツを読み込む
function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow.loadURL(url.format({
    // 読み込むコンテンツを指定
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slashes: true
  }))
  // ウィンドウが閉じるときの処理
  mainWindow.on('close', function () {
    mainWindow = null
  })
}
