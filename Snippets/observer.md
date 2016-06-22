# Observer

オブザーバーパターンの実装方法には、プッシュとプルの2つがあります。 

- __プッシュメソッド__ - オブザーバーは監視対象オブジェクトをサブスクライブし、監視対象に注目すべき事象が発生した場合にオブザーバーに連絡して知らせます
  - DOMイベントの挙動
- __プルメソッド__ - 監視対象は、オブザーバーの持つサブスクリプションリスに追加されます。
定期的に、または指定された時に、オブザーバーは、監視対象内で変更が発生したかどうかをチェックし、変更があった場合はその変更に反応して何らかの処理を実行します。
  - 多くのデスクトップソフトウェアで、アップデートはこのように動作します

## 例1) "Adobe Developer Connection" での実装
- [JavaScript design patterns – Part 3: Proxy, observer, and command](http://www.adobe.com/jp/devnet/html5/articles/javascript-design-patterns-pt3-proxy-observer-command.html)

```js
// Observable
class Observable {
  constructor() {
    this.subscribers = [];
  }

  subscribe(callback) {
    // Just add the callback to the subscribers list
    this.subscribers.push(callback);
  }

  unsubscribe(callback) {
    let i = 0;
    let len = this.subscribers.length;

    // Iterate through the array and if the callback is 
    // found, remove it from the list of subscribers. 
    for (; i < len; i += 1) {
      if (this.subscribers[i] === callback) {
        this.subscribers.splice(i, 1);
        // Once we've found it, we don't need to 
        // continue, so just return 
        return ;
      }
    }
  }

  publish(data) {
    let i = 0;
    let len = this.subscribers.length;

    // Iterate over the subscribers array and call each of 
    // the callback functions 
    for (; i < len; i += 1) {
      this.subscribers[i](data);
    }
  }
}
```

```js
// Observer
let Observer = function(data) {
  console.log(data);
};

// Usage:
// Here's where it gets used.
observable = new Observable();
observable.subscribe(Observer);
observable.publish('We published!');
// 'We published' will be logged in the console 
observable.unsubscribe(Observer);
observable.publish('Another publish');
// Nothing happens because there area no longer any subscribed observers
```
