# Flux

```js
/**
 * @reference [http://azu.github.io/slide/react-meetup/flux.html]
 */

class EventEmitter {
  constructor() {
    this._handlers = {};
  }
  on(type, handler)  {
    if (typeof this._handlers[type] === 'undefined') {
      this._handlers[type] = [];
    }
    this._handlers[type].push(handler);
  }
}

```
