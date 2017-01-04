# Adapter
> アダプターパターンでは、ニーズに合うようにインターフェイスを変換（適応）させます。
> それには、必要なインターフェイスを備えたオブジェクトを別途作成し、そのオブジェクトを、
> インターフェイスを変更したいオブジェクトに接続します。

## 例) Adobe Developer Connection での実装
ログをAjax で送信する `AjaxLogger` をアダプターを使って `window.console` に接続する

- [JavaScriptデザインパターン – 第2部: アダプター, デコレーター, ファクトリ](http://www.adobe.com/jp/devnet/html5/articles/javascript-design-patterns-pt2-adapter-decorator-factory.html)

```js
AjaxLogger.sendLog(arguments);
AjaxLogger.sendInfo(arguments);
AjaxLogger.sendDebug(arguments);
// etc...
```

```js
var AjaxLoggerAdapter = {
  log: function() {
    AjaxLogger.sendLog(arguments);
  },
  info: function() {
    AjaxLogger.sendInfo(arguments);
  },
  debug: function() {
    AjaxLogger.sendDebug(arguments);
  }
};
```

```js
window.console = AjaxLoggerAdapter;
```

## Link
