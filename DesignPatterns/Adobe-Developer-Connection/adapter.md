# [JavaScript Design Patterns: Adapter](https://www.joezimjs.com/javascript/javascript-design-patterns-adapter/)

ログをAjax で送信する `AjaxLogger` をアダプターを使って `window.console` に接続する

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
window.console = AjaxLoggerAdapter;
```

