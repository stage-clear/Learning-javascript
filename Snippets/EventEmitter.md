# EventEmitter.js


```js
/**
 * EventEmitter
 * https://github.com/changbenny/leopard/blob/master/build/leopard.js
 */

function EventEmitter() {
  this.uid = 0;
  this.handlers = [];
  
  for (var i = 0; i < 1000; i++) {
    this.handlers.push([]);
  }
}

EventEmitter.prototype.on = function(level, callback) {
  this.handlers[level].push({
    id: this.uid++,
    action: callback
  });
};

EventEmitter.prototype.emit = function(level) {
  for (var _len = arguments.length
         , args = Array(_len > 1 ? _len - 1 : 0)
         , _key = 1;
        _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  
  this.handlers[level].forEach(function(handler) {
    if (typeof handler.action === 'function') {
      handler.action.apply(handler, args);
    }
  });
};

EventEmitter.prototype.once = function(level, callback) {
  var _this = this;
  
  var id = this.id;
  
  this.on(level, function() {
    callback.apply(undefined, arguments); 
    var handler = _this.handlers[level].find(function(handler) {
      return handler.id === id;
    });
    _this.handlers[level].splice(_this.handlers[level].indexOf(handler), 1);
  });
};

var singletonEmitter = new Emitter();
```


```js
/**
 * EventEmitter
 * http://azu.github.io/slide/react-meetup/flux.html
 */

function EventEmitter() {
  this._handlers = {};
}

EventEmitter.prototype.on = function(type, handler) {
  if (typeof this._handlers[type] === 'undefined') {
    this._handlers[type] = [];
  }
  this._handlers[type].push(handler);
};

EventEmitter.prototype.emit = function(type, data) {
  var handlers = this._handlers[type] || [];
  for (var i = 0; i < handlers.length; i++) {
    var handler = handlers[i];
    handler.call(this, data);
  }
};

var emitter = new EventEmitter();

```


```js
/**
 * Eventuality
 * @reference [JavaScript The Good Parts (P64)]
 */

var eventuality = function(that) {
  var registry = {};
  
  that.fire = function(event) {
    var array, func, handler, i,
        type = typeof event === 'string' ? event : event.type;

    if (registry.hasOwnProperty(type)) {
      array = registry[type];
      for (var i = 0; i < array.length; i += 1) {
        handler = array[i];
        func = handler.method;
        
        if (typeof func === 'string') {
          func = this[func];
        }
        func.apply(this, handler.parameters || [event]);
      }
    }
    return this;
  };

  that.on = function(type, method, parameters) {
    var handler = {
      method: method,
      parameters: parameters
    };
    if (registry.hasOwnProperty(type)) {
      registry[type].push(handler);
    } else {
      registry[type] = [handler];
    }
    return this;
  };
  
  return that;
};

var evt = eventuality({});
```

