const express = require('express')
const app = express()

// 待ち受け開始
app.listen('/', (req, res) => {
  console.log('起動しました - http://localhost:3000')
})

/// 静的ファイルを自動的に返すように設定
app.use('/', express.static('./html'))

