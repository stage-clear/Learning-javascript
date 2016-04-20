'use strict';

// import
let levelup = require('level');
let db = levelup('./testdb');

// 値を設定
db.put('Apple', 'red', (err) => {
  if (err) {
    console.log('Error', err);
    return ;
  }
  testGet();
});

// 値を取得
function testGet() {
  db.get('Apple', (err, value) => {
    if (err) {
      console.log('Error: ', err);
      return ;
    }

    console.log('Apple=' + value);
    testBatch();
  });
}

// 一括設定
function testBatch() {
  db.batch()
    .put('Mango', 'yellow')
    .put('Banana', 'yellow')
    .put('Kiwi', 'green')
    .write(() => {
      testGet2()
    });
}

// 値を取得 2
function testGet2() {
  db.get('Banana', (err, value) => {
    console.log('Banana=' + value);
    //testKeys();
  });
}