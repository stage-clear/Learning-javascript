var parseString = require('xml2js').parseString;

var xml = '<item>Banana</item>';

parseString(xml, function(err, result) {
  console.log(result.item);//->banana
});