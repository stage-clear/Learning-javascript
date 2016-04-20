

var parseString = require('xml2js').parseString;

// テスト用のxmlデータ
var xml = '<fruits shop="AAA">' +
    '<item price="140">Banana</item>' +
    '<item price="200">Apple</item>' +
  '</fruits>';

// XMLをパースする
parseString(xml, (err, result) => {
  // パース完了した時の処理
  console.log(result);
  console.log(JSON.stringify(result));
});