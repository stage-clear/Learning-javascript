
var fs = require('fs');

// ディレクトリを作成
fs.mkdir('./mkdir.txt', () => {
  console.log('maked');
});