# 4. Timers

## 4. Central Timer Control
```js
var timers = {
  timerID: 0,
  timers: [],
  start: function () {
    if (this.timerID) {
      return ;
    }
    
    (function () {
      for (var i = 0; i < timers.timers.length; i++) {
        if (timers.timers[i]() === false) {
          timers.timers.splice(i, 1);
          i--;
        }
      }
      
      timers.timerID = setTimeout(arguments.callee, 0);
    })();
  },
  stop: function () {
    clearTimeout(this.timerID);
    this.timerID = 0;
  },
  add: function (fn) {
    this.timers.push(fn);
    this.start();
  }
};

// Usecase
var box = document.getElementById('box), left = 0, top = 20;

timers.add(function () {
  box.style.left = left + 'px';
  if (++left > 50) {
    return false;
  }
});

timers.add(function () {
  box.style.top = top + 'px';
  box += 2;
  if (top > 120) {
    return false;
  }
});
```

## 5. Asynchronouse Testing

```js
(function () {
  var queue = [], timer;
  
  this.test = function (fn) {
    queue.push(fn);
    resume();
  };
  
  this.pause = function () {
    clearInterval(timer);
    timer = 0;
  };
  
  this.resume = function () {
    if (!timer) {
      return ;
    }
    
    timer = setInterval(function () {
      if (queue.length) {
        queue.shift();
      } else {
        pause();
      }
    }, 1);
  };
})();

test(function () {
  pause();
  setTimeout(function () {
    assert(true, 'First test completed');
    resume();
  }, 100);
});

test(function () {
  pause();
  setTimeout(function () {
    assert(true, 'Second test completed');
    resume();
  }, 200);
});
