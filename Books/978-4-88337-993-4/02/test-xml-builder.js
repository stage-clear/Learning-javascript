// JavaScript のオブジェクトから XML を作成する
var xml2js = require('xml2js');

var obj = {
  item: {name: 'Banana', price: 150}
};

// XMLに変換
var builder = new xml2js.Builder();
var xml = builder.buildObject(obj);
console.log(xml);