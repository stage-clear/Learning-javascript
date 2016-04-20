
var fs = require('fs');

// フォルダを同期的に作成する
console.log('mkdirSync 実行します');
fs.mkdirSync('test-sync');
console.log('mkdirSync を完了しました');