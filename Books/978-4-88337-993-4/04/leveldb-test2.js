'use strict';

// levelDB で検索

let levelup = require('level');
// データベースを開く(JSONで)
let opt = { valueEncoding: 'json' };
let db = levelup('./testdb2', opt);

// 一括で値を設定
db.batch()
  .put('fruits!apple', {
    name: 'Apple',
    price: 300,
    color: 'red'
  })
  .put('fruits!orange', {
    name: 'Orange',
    price: 180,
    color: 'orange'
  })
  .put('fruits!kiwi', {
    name: 'Kiwi',
    price: 220,
    color: 'green'
  })
  .put('snack!poteto', {
    name: 'Potato-Snack',
    price: 340,
    color: 'brown'
  })
  .put('snack!chico', {
    name: 'Choco-Snack',
    price: 340,
    color: 'black'
  })
  .write(getKeys);

function getKeys() {
  console.log('keys:');
  db.createKeyStream()
    .on('data', (key) => {
      console.log(`- ${key}`);
    })
    .on('end', getKeysAndValues)
}

function getKeysAndValues() {
  console.log('\nkey-value-list:');
  db.createReadStream()
    .on('data', (data) => {
      let key = data.key;
      let o = data.value;
      console.log(`+ key=${key}`);
      console.log(`| color=${o.color}`);
      console.log(`| price=${o.price}`);
    })
    .on('end', search);
}

// キーを範囲指定で取得する
function search() {
  console.log('\nrange-search');
  let opt = {
    start : 'fruits!',
    end   : 'fruits!\xFF'
  };
  db.createReadStream(opt)
    .on('data', (data) => {
      console.log(`+ key=${data.key}`);
    })
    .on('end', () => {
      console.log('ok');
    });
}
