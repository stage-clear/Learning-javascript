# 5. (function() {})()

## 5.1 Temporary Scope and Private Variables
```js
(function () {
  var numClicks = 0;
  
  document.addEventListener('click', function () {
    alert(++numClicks);
  }, false);
})();
```

```js
document.addEventListener('click', (function () {
  var numClicks = 0;
  
  return function () {
    alert(++numClicks);
  }
})(), false);
```

```js
(function () {
  Object.extend(v, {
    href: v._getAttr,
    src: v._getAttr,
    type: v._getAttr,
    action: v._getAttrNode,
    disabled: v._flag,
    checked: v._flag,
    readonly: v._flag,
    multiple: v._flag,
    onload: v._getEv,
    onunload: v._getEv,
    onclick: v._getEv,
    ...
  });
})(Element._attributeTranslations.read.values);
```

## 5.2 Loops
```js
var div = document.getElementsByTagName('div');

for (var i = 0; i < div.length; i++) {
  div[i].addEventListener('click', function () {
    alert('div #' + i + ' was clicked');
  });
}
```

```js
var div = document.getElementsByTagName('div');
for (var i = 0; i < div.length; i++) (function () {
  div[i].addEventListener('click', function () {
    alert('div #' + i + 'was clicked');
  }, false);
})(i);
```

## 5.3 Library Wrapping
```js
(function () {
  var jQuery = window.jQuery = function () {
    // initiali
  };
  
  // ...
})();
```

```js
var jQuery = (function () {
  function jQuery () {
    // initialize
  }
  
  //...
  return jQuery
})();
```

}
