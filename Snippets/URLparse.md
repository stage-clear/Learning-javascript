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

## Getting URL Parameters

```js
function getAllUrlParams(url) {
  // get query string from url (optional) or window
  // (引数もしくは window オブジェクトから query string を取得取得します)
  let queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  
  // we'll store the parameters here
  // (ここにパラメータを保存します)
  let obj = {};
  
  // if query string exsits
  // (query string が存在したら)
  if (queryString) {
    // stuff after # is not part of query string, so get rid of it
    // (# 以降の文字列は query string ではないので取り除いたものを保存します)
    queryString = queryString.split('#')[0];
    
    // split our query string into its component parts
    // (query string を組み合わせごとに分割します)
    let arr = queryString.split('&');
    
    for (let i = 0; i < arr.length; i++) {
      // separate the keys and the values
      // (キーとバリューに分割します)
      let a = arr[i].split('='); 
      
      // in case params look like: list[]=thing1&list[]=thisg2
      // (万一パラメータのキー値に [] が含まれていた場合に [] 内の数値を取り出し
      // [] は除外除外します)
      let paramNum = undefined;
      let paramName = a[0].replace(/\[\d*\]/, (v) => {
        paramNum = v.slice(1, -1);
        return '';
      });

      // set parameter value (use 'true' if empty)
      // (パラメータをセットセットします (値が空なら true を使用) )
      let paramValue = typeof(a[1]) === 'undefined'  ? true : a[1];

      // (optional) keep case consistent
      // (任意に) 小文字に統一統一します
      paramName = paramName.toLowerCase();
      paramValue = paramValue.toLowerCase();

      // if parameter name already exsits
      // (既にパラメータ名が存在する場合)
      if (obj[paramName]) {

        // convert value to array (if still string)
        // 値を配列に変換します (まだ変換されていないなら)
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
        }
        
        // if no array index number specified...
        // (もし配列のインデックス番号の指定ない場合)
        if (typeof paramNum === 'undefined') {
          // put the value on the end of the array
          // (配列の最後の追加します)
          obj[paranName].push(paramNum);
        } 
        // if array index number specified...
        // (もし配列インデックス番号の指定があれば)
        else {
          // put the value at that index number
          // (インデックス番号の位置に追加します) 
          obj[paramName][paramNum] = paramValue;
        }
      }
      // if param name doesn't exist yet, set it
      // (もしパラメータ名がまだ存在していなければ、セットします)
      else {
        obj[paranName] = paramValue;
      }
    }
  }

  return obj;
}
```


## References
- [Easy URL Parsing With Isomorphic JavaScript](https://www.sitepoint.com/url-parsing-isomorphic-javascript/)
- [Getting URL Parameters](https://www.sitepoint.com/get-url-parameters-with-javascript/)
