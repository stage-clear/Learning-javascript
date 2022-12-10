# [JavaScript Design Patterns: Adapter](https://www.joezimjs.com/javascript/javascript-design-patterns-adapter/)

```js
AjaxLogger.sendLog(arguments);
AjaxLogger.sendInfo(arguments);
AjaxLogger.sendDebug(arguments);
```

```js
var AjaxLoggerAdapter = {
  log: function () {
    AjaxLogger.sendLog(arguments);
  },
  info: function () {
    AjaxLogger.sendInfo(arguments);
  },
  debug: function () {
    AjaxLogger.sendDebug(arguments);
  },
  ...
};
```

```js
var LoggerFactory = {
  getLogger: function () {
    return window.console;
  },
  ...
};

var logger = LoggerFactory.getLogger();
logger.log('something to log');
```

```js
var AjaxLogger = {
  sendLog: function () {
    var date = this.urlEncode(arguments);
    
    jQuery.ajax({
      url: 'http://example.com/log',
      data: data,
    });
  },
  
  urlEncode: function (arg) {
    ...
    return encodedData;
  },
  ...
};
```
