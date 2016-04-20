xml2js
======

- Node.js で XML を扱う

記述
----

```javascript
// XML => JSON
var parseString = require('xml2js').parseString;
parseString(xml, (err, result) => {
  console.log(result);
  console.log(JSON.stringify(result));
});

// Object => XML
var xml2js = require('xml2js');
var builder = new xml2js().Builder();
var obj = { item: {name: 'Banana', price: 150}};
var xml = builder.buildObject(obj);
console.log(xml);
```

リンク
------

- [npm/xml2js](https://www.npmjs.com/package/xml2js)
