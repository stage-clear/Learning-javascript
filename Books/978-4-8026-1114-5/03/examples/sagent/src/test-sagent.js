// 機能を取り込み
const request = require('superagent')

// 指定のURLからデータを取得する
const URL = 'http://localhost:3000/fruits.json'

request.get(URL)
  .end(callbackGet)

// データを取得した時の処理
function callbackGet (err, res) {
  if (err) {
    // 取得できなかった時の処理
    return 
  }
  
  // ここで取得した時の処理
  console.log(res.body)
}
