// Express を起動
const express = require('express')
const app = express()
// body-parser を有効にする
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

app.listen(3000, () => {
  console.log('起動しました - http://localhost/3000')
})

// GETメソッドなら Web フォームを表示
app.get('/', (req, res) => {
  res.send(
    '<form method="POST">' +
    '<textarea name="memo">テスト</textarea><br>' +
    '<input type="submit" value="送信"/>' +
    '</form>'
  )
})

// POST メソッドを受け付ける
app.post('/', (req, res) => {
  const s = JSON.stringify(req.body)
  res.send('POSTを受信: ' + s)
})
