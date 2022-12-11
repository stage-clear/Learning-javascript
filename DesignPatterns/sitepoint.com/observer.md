# [The Event Observer](https://www.sitepoint.com/javascript-design-patterns-observer-pattern/)

```js
class EventObserver {
  constructor() {
    this.observers = []
  }
  
  subscribe(fn) {
    this.observers.push(fn)
  }
  
  unsubscribe(fn) {
    this.observers = this.observers.filter((subscriber) => {
      return subscriber !== fn
    })
  }
  
  broadcast(data) {
    this.observers.forEach((subscriber) => {
      subscriber(data)
    })
  }
}

const observer = new EventObserver()
cosnt fn = data => console.log(data)

observer.subscribe(fn)

observer.broadcast(true)

observer.unsubscribe(fn)
```
