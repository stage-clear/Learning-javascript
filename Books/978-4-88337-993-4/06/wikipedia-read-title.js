'use strict';
// データベースを活用

// modules
let levelup = require('level');

// Database
let db = levelup('./wikidata');

// search key
let opt = {
  start: '猫',
  end: '猫\uFFFF'
}

// search
db.createReadStream(opt)
  .on('data', (data) => {
    console.log(data.key);
  })
  .on('end', () => {
    console.log('OK');
  });
