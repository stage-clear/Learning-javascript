# [JavaScript Design Patterns: Observer](https://www.joezimjs.com/javascript/javascript-design-patterns-observer/)

```js
var Observable = function () {
  this.subscribers = [];
};

Observable.prototype = {
  subscribe: function (callback) {
    this.subscribers.push(callback);
  },
  unsubscribe: function (callback) {
    var i = 0;
    var len = this.subscribers.length;
    
    for (; i < len; i++) {
      if (this.subscribers[i] === callback) {
        this.subscribers.splice(i, 1);
        return ;
      }
    }
  },
  publish: function (data) {
    var i = 0;
    var len = this.subscribers.length;
    
    for (; i < len; i++) {
      this.subscribers[i](data);
    }
  }
};

var Observer = function (data) {
  console.log(data);
};

observable = new Observable();
obsrevable.subscribe(Observer);
observable.publish('We published!');
observable.unsubscribe(Observer);
observable.publish('Another publish!');
```
