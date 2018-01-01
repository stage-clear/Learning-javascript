// HTTPサーバーを作成（アプリを送信するため）
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const portNo = 3001

server.listen(portNo, () => {
  console.log('起動しました', 'http://localhost:' + portNo)
})

// public ディレクトリのファイルを自動で返す
app.use('/public', express.static('./public'))
app.get('/', (req, res) => {
  res.redirect(302, '/public')
})

// WebSocket サーバーを起動
const socketio = require('socket.io')
const io = socketio.listen(server)

// クライアント
io.on('connection', (socket) => {
  console.log('ユーザーが接続', socket.client.id)
  // メッセージ受信時の処理を記述
  socket.on('chat-msg', (msg) => {
    // 特定のメッセージを受信した時の処理をここに記述
    io.emit('chat-msg', msg)
  })
})
