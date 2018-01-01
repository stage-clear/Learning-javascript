// Wiki の Web サーバー
// データベースに接続
const path = require('path')
const NeDB = require('nedb')
const db = new NeDB({
  filename: path.join(__dirname, 'wiki.db'),
  autoload: true
})

// Webサーバーを起動
const express = require('express')
const app = express()
const portNo = 3001
// body-parser を有効にする
const bodyParser = require('body-parser')
app.user(bodyParser.urlencoded({extended: true}))
app.listen(portNo, () => {
  console.log('起動しました', `http://localhost:${portNo}`)
})

// APIの定義
app.get('/api/get/:wikiname', (req, res) => {
  const wikiname = req.params.wikiname
  
  db.find({name: wikiname}, (err, docs) => {
    if (err) {
      res.json({status: false, msg: err})
      return 
    }
    
    const body = req.body.body
    if (docs.length === 0) {
      // エントリーがなければ挿入
      db.insert({name: wikiname, body})
    } else {
      // 既存エントリーを更新
      db.update({name: wikiname}, {name: wikiname, body})
    }
    
    res.json({status: true})
  })
})

// public ディレクトリを自動で返す
app.use('/wiki/:wikiname', express.static('./public'))
app.use('/edit/:wikiname', express.static('./public'))
app.get('/', (req, res) => {
  res.redirect(302, 'wiki/FrontPage')
})
