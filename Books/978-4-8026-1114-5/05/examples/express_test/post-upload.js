// Express を起動
const express = require('express')
const app = express()

// multerの準備
const multer = require('multer')
const path = require('path')

// どこにアップロードするか指定
const tmpDir = path.join(__dirname, 'tmp')
const pubDir = path.join(__dirname, 'pub')
const uploader = multer({dest: tmpDir})

// 待ち受け開始
app.listen(3000, (req, res) => {
  console.log('起動しました - http://localhost:3000')
})

// アップロードフォームを表示
app.get('/', (req, res) => {
  res.send(
    '<p>' +
    '<form method="POST" action="/" enctype="multipart/form-data">' +
    '<input type="file" name="aFile"/><br>' +
    '<input type="submit" value="アップロード"/>' +
    '</form>' +
    '</p>'
  )
})

// 静的ファイルは勝手に返すようになる
app.use('/pub', express.static(pubDir))

// アップロードを受け付ける
app.post('/', uploader.single('aFile'), (req, res) => {
  console.log('ファイルを受け付けました')
  console.log('オリジナルファイル名: ', req.file.originalname)
  console.log('保存したパス: ', req.file.path)

  // MIMEでファイル形式のチェック
  if (req.file.mimetype !== 'image/png') {
    res.send('PNG画像以外はアップロードしません')
    return
  }


  // TODO: 本当にPNGかここでチェックする
  // ファイルを移動する
  const fname = req.file.filename + '.png'
  const des = pubDir + '/' + fname
  const fs = require('fs')
  console.log('aaa', req.file.path, des)
  fs.renameSync(req.file.path, des)

  // HTMLを出力
  res.send('ファイルを受信しました<br/>' + `<img src="/pub/${fname}"/>`)
})

// あらかじめ pub ディレクトリを用意しておかないとエラーを吐く
