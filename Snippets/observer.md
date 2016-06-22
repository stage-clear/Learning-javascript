# Observer

## 例1) "Adobe Developer Connection" での実装

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
```
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
