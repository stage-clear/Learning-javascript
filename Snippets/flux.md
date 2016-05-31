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

// Store
// import Emitter from './EventEmitter.js';
class Store extends EventEmitter {
  constructor(dispatcher) {
    super();
    this.count = 0;
    // <--- observe event
    dispatcher.on('countUp', this.onCountUp.bind(this));
  }
  getCount() {
    return this.count;
  }
  onCountUp(count) {
    this.count = count;
    // dispatcher が emit されると呼ばれる
    // emit "CHANGE" ---> self
    this.emit('CHANGE');
  }
}

// ActionCreator
class ActionCreator {
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }
  // "Emit" event ---> Store
  countUp(data) {
    this.dispatcher.emit('countUp', data);
  }
}

// Component 
class Button {
  constructor(trigger, view) {
    this.state = { count: store.getCount() };
    this.view = view;
    this.trigger = trigger;
    store.on('CHANGE', () => {
      this._onChange();
    });
    this.trigger.addEventListener('click', () => {
      this.tick();
      this.render();
    })
  }
  _onChange() {
    this.state.count = store.getCount();
    console.trace();
  }
  tick() {
    action.countUp(this.state.count + 1);
  }
  render() {
    this.view.innerHTML = this.state.count;
  }
}

const dispatcher = new EventEmitter();
const action = new ActionCreator(dispatcher);
const store = new Store(dispatcher);
const component = new Button(
  document.getElementById('button'),
  document.getElementById('res')
);
```

```html
<button id="button">CountUp</button>
<div id="res"></div>
```
