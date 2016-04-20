
var xml2js = require('xml2js');
var parseString = xml2js.parseString;
var Builder = xml2js.Builder;

// テスト用のXMLデータ
var xml = '<fruits shop="AAA">' +
    '<item price="140">Banana</item>' +
    '<item price="400">Apple</item>' +
  '</fruits>';

// xml をパースする
parseString(xml, (err, r) => {
  // javascript のオブジェクトを表示
  console.log(JSON.stringify(r));
  // パースしたものをXMLを変換
  var xml new Builder().buildObject(r);
  console.log(xml);
});
