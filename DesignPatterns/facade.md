# Facade
> ファサードは簡単なパターンです。オブジェクトに代替のインターフェイスを提供するだけです。
> メソッドの大きさを短く保ち、あまり多くの作業を詰め込まないのは、良いデザインプラクティスです。

## 例) "JavaScript patterns" での実装

```js
let myevent = {
  stop(e) {
    // modern browser + IE9~11
    if (typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    if (typeof e.stopPropagation === 'function') {
      e.stopPropagation();
    }

    // IE8
    if (typeof e.returnValue === 'boolean') {
      e.returnValue = false;
    }
    if (typeof e.cancelBubble === 'boolean') {
      e.cancelBubble = true;
    }
  }
};
```
