'use strict';

var parseString = require('xml2js').parseString;

var xml = '<fruits shop="AAA">' +
    '<item price="120">Banana</item>' +
    '<item price="400">Apple</item>' +
  '</fruits>';

parseString(xml, (err, result) => {
  // console.log(JSON.stringify(result));
  var shop = result.fruits.$.shop;
  console.log('shop = ', shop);
  var items = result.fruits.item;

  for (let item of items) {
    console.log('-- name=', item._);
    console.log('   price=', item.$.price);
  }
});