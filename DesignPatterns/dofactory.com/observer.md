# [Observer](https://www.dofactory.com/javascript/design-patterns/observer)
## 定義
Observerパターンは、オブジェクトがイベントを購読し、イベントが発生したときに通知を受けるという購読モデルを提供します。
このパターンはJavaScriptを含むイベント駆動型プログラミングの基礎となるものです。
Observerパターンは、優れたオブジェクト指向設計を促進し、疎結合を促進します。

### 実装例
```js
function Click () {
  this.handlers = []; // observers;
}

Click.prototype = {
  subscribe: function (fn) {
    this.handlers.push(fn);
  },
  
  unsubscribe: function (fn) {
    this.handlers = this.handlers.filter(
      function (item) {
        if (item !== fn) {
          return item;
        }
      }
    );
  },
  
  fire: function (o, thisObj) {
    var scope = thisObje || window;
    
    this.handlers.forEach(function (item) {
      item.call(scope, o);
    });
  }
};

function run () {
  var clickHandler = function (item) {
    console.log('fired: ' + item);
  };
  
  var click = new Click();
  
  click.subscribe(clickHandler);
  click.fire('event #1');
  click.unsubscribe(clickHandler);
  click.fire('event #2');
  click.subscribe(clickHandler);
  click.fire('event #3');
}
```
