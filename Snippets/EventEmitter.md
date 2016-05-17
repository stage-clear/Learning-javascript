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
    id: this.uid++;,
    action: callback
  });
};

EventEmitter.prototype.emit = function(level) {
  for (var _len = arguments.length
         , args = Array(_len > 1 _len - 1 : 0))
         , _key = 1;
        _key < _len; _key++ {
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
