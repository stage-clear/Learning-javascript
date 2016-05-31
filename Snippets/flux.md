# Flux

```js
/**
 * Flux
 * @reference [http://azu.github.io/slide/react-meetup/flux.html]
 */

// EventEmitter
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
  emit(type, data) {
    let handlers = this._handlers[type];
    for (let i = 0; i < handlers.length; i += 1) {
      let handler = handlers[i];
      handler.call(this, data);
    }
  }
}

```
