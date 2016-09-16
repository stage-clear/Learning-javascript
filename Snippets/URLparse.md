# URLparse

## work on browsers
```js
function URLparse(str) {
  let url = document.createElement('a');
  url.href = str;
  return url;
}
```

```html
<script src="./lib.js"></script>
<script>
let url = lib.URLparse('http://site.com:81/path/page?a=1&b=2#hash');
</script>
```

## work on ismorphic
```js
const isNode = (typeof module === 'object' && module.exports);
// or a similar approach
// const isNode = typeof window === 'undefined';

(function(lib) {
  'use strict';
  
  // require Node URL API
  let url = (isNode ? require('url') : null);
  
  // parse URL
  lib.URLparse = function(str) {
    if (isNode) {
      return url.parse(str);
    } else {
      url = document.createElement('a');
      url.href = str;
      return url;
    }
  };
  

})( isNode ? module.exports : this.lib = {} );
```

```html
let lib = require('./lib.js');
let url = lib.URLparse('http://site.com:81/path/page?a=1&b=2#hash');
```

## References
- [Easy URL Parsing With Isomorphic JavaScript](https://www.sitepoint.com/url-parsing-isomorphic-javascript/)
