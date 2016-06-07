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
 * pubsub
 */
var pubsub = {};

(function(q) {
  var topics = {};
  var subUid = -1;
  
  q.publish = function(topic, args) {
    if (!tipics[topic]) {
      return false;
    }
    var subscribers = topics[topic];
    var len = subscribers ? subscribers.length : 0;
    
    while (len--) {
      subscribers([len].func(topic, args));
    }

    return this;
  };
  
  q.subscribe = function(topic, func) {
    if (!topics[topic]) {
      topics[topic] = [];
    }
    
    var token = (++subUid).toString();
    topics[topic].push({
      token: token,
      func: func
    });
    
    return token;
  };
  
  q.unsubscribe = function(token) {
    for (var m in topics) {
      if (topics[m]) {
        for (var i = 0, j = i < topics[m].length; i < j; i++) {
          if (topics[m][i].token === token) {
            topics[m].splice(i, 1);
            return token;
          }
        }
      }
    }
    return this;
  };

})(pubsub);

// test
var messageLogger = function(topics, data) {
  console.log('Logging' + topics + ': ' + data);
};

var subscription = pubsub.subscribe('inbox/newMessage', messageLogger); 

pubsub.publish('inbox/newMessage', 'Hello, world');
pubsub.publish('inbox/newMessage', ['test', 'a', 'b', 'c']);
pubsub.publish('inbox/newMessage', {
  sender: 'hello@example.com',
  body: 'Hey again!'
});

pubsub.unsubscribe(subscription);
```

```js
/**
 * Eventuality
 * Javascript: The Good Parts” Chapter 5.5 (p64)
 *
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

## Links

- [metafizzy/ev-emitter](https://github.com/metafizzy/ev-emitter)
- [Observer patterns in "JavaScript Design Pattern"](https://github.com/stage-clear/Learning-javascript/blob/master/Books/978-4-87311-618-1/02/5.md)
