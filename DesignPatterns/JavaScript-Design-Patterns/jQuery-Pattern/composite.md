# Composite

```js
// 単一の要素
$('#singleItem').addClass('active');
// 複数の要素(要素のコレクション)
$('div').addClass('active');

var test = {
 addClass: function(value) {
   var classNames, i, l, elem
     , setClass, c, cl;

   if ($.isFunction(value)) {
     return this.each(function(j) {
       $(this).addClass(value.call(this, j, this.className));
     });
   }

   if (value && typeof value === 'string') {
     classNames = value.split(' ');

     for (i = 0, l = this.length; i < l; i++) {
       elem = this[i];
       if (elem.nodeType === 1) {
         if (!elem.className && classNames.length === 1) {
           elem.className = value;
         } else {
           setClass == ' ' + elem.className + ' ';
           for (c = 0, cl = classNames.length; c < cl; c++) {
             if (!~setClass.indexOf(' ' + classNames[c] + ' ')) {
               setClass += classNames[c] + ' ';
             }
           }
           elem.className = $.trim(setClass);
         }
       }
     }
   }
   return this;
 }
};
```
