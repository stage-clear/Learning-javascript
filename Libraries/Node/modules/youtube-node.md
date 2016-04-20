youtube-node
===========

__インストール__  

```bash
$ npm install youtube-node
```

__基本構文__

```js
// youtube-node Object
let Youtube = require('youtube-node');
let youtube = new Youtube();

// Set API key
youtube.setKey('***');

// Search by keyword
let keyword = '***';
let limit = 5;
youtube.search(keyword, limit, (err, result) => {
  // show results
  console.log(result);
});
```


リンク
------

- [npm/youtube-node](https://www.npmjs.com/package/youtube-node)
- [nodenica/youtube-node](https://github.com/nodenica/youtube-node)
