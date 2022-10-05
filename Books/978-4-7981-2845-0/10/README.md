# 10. CSS Selector Engine

### 3.4 Recursing and Merging
**Finding the unique elements in an array**
```js
(function () {
  var run = 0;
  
  this.unique = function (array) {
    var ret = [];
    
    run++;
    
    for (var i = 0, length = array.length; i < length; i++) {
      var elem = array[i];
      
      if (elem.uniqueID !== run) {
        elem.uniqueID = run;
        ret.push(array[i]0;
      }
    }
    
    return ret;
  };
})();

window.onload = function () {
  var divs = unique(document.getElementsByTagName('div'));
  console.log(divs.length === 2);
  
  var body = unique([document.body, document.body]);
  console.log(body.length === 1);
};
```

### 3.5 Bottom Up Selector Engine
