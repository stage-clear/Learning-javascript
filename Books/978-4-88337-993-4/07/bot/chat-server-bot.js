'use strict';
// chat bot

// db
let MONGO_DSN = 'mongodb://localhost:27017/bot';

// modules
let Mecab = require('mecab-lite');
let mecab = new Mecab();
let mongo_client = require('mongodb').MongoClient;

let mongo_db = null;
let keywords_co;

// exports
module.exports = {
  'getResponse': getResponse
};

// 会話ぼっとの応答を返す関数
function getResponse(msg, callback) {
  checkDB(() => {
    let bot = new Bot(msg, callback);
    bot.talk();
  });
}

// MongoDBへ接続
function checkDB(next_func) {
  // 既に接続していれば何もしない
  if (mongo_db) {
    next_func();
    return;
  }

  // MongoDBに接続
  mongo_client.connect(MONGO_DSN, (err, db) => {
    // check error
    if (err) {
      console.log('DB error', err);
      return ;
    }

    console.log('[checkDB 3]');

    // 接続情報を記録
    mongo_db = db;
    // コレクションを取得
    keywords_co = db.collection('keywords');
    // 次の処理を実行
    next_func();
    console.log('[checkDB 4]');
  });
}

// Bot クラス
class Bot {
  constructor(msg, callback) {
    this.callback = callback;
    this.msg = msg;
    this.results = [];
    this.words = [];
    this.index = 0;
  }

  talk() {
    mecab.parse(this.msg, (err, words) => {
      if (err) {
        console.log(err, words);
        this.callback('Error');
        return ;
      }

      // 単語を一つずつ確認する
      this.index = 0;
      this.words = words;
      this.nextWord();
    });
  }

  // 各単語を一語ずつ調べるメソッド
  nextWord() {
    // 単語を最後まで調べたか確認
    if (this.index >= this.words.length) {
      this.response();
      return ;
    }

    // データベースの検索
    let w = this.words[this.index++];
    // 活用のない単語 - 「頑張ら」なら「頑張る」を利用
    let org = (w.length >= 7) ? w[7] : w[0];

    keywords_co
      .find({key: org})
      .toArray((err, rows) => {
        // データベースに合致する語があったか?
        if (rows.length == 0) {
          this.nextWord();
          return ;
        }

        // パターンにマッチするか確認
        let keys = rows.filter((el, index, ary) => {
          if (el.pattern == '*') return true;
          if (this.msg.indexOf(el.pattern) >= 0) return true;
          return false;
        });

        if (keys.length > 0) {
          let r = Math.floor(Math.random() * keys.length);
          let key = keys[r];
          this.results.push(key.msg);
        }
        this.response();
      }
    );
  }

  response() {
    let res = 'もう少し噛み砕いて話してください';
    if (this.results.length > 0) {
      res = this.results.join('。');
    }
    this.callback(res);
  }
};


