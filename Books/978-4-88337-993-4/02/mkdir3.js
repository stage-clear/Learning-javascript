var fs = require('fs');

if (!fs.existsSync('test3')) {
  fs.mkdirSync('test3');
  console.log('test3 を作成しました');
} else {
  console.log('test3 は既にあるので作成しません');
}