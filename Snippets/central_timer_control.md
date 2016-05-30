# Central timer control

```js
/**
 * Central Timer Control
 * 複数のハンドラを管理する集中タイマーコントロール
 * @reference [JavaScript Ninja ]
 */

class Timers {
  constructor() {
    this.timerID = 0;
    this.timers = [];
    this.fps = 1000 / 60;
  }
  
  add(func) {
    this.timers.push(func);
  }
  
  start() {
    if (this.timerID) return ;
		let self = this;

    (function next() {
      if (self.timers.length > 0) {
        for (let i = 0; i < self.timers.length; i += 1) {
          if (self.timers[i]() === false) {
            self.timers.splice(i, 1);
            i--;
          }
        }
        self.timerID = setTimeout(next, self.fps);
      }
    })();
  }
  
  stop() {
    clearTimeout(this.timerID);
    this.timerID = 0;
  }
}


// test
const timers = new Timers();
let box = document.getElementById('box');
let x = 0;
let y = 20;
timers.add(() => {
  box.style.left = x + 'px';
  if (++x > 50) {
    return false;
  }
});

timers.add(() => {
  box.style.top = y + 'px';
  y += 2;
  if (y > 120) return false;
});

timers.start();
```

```js
class Timers {
  constructor() {
    this.timerID = 0;
    this.callbacks = []; // It can manage some callback functions.
    this.fps = 1000 / 60;
  }

  start() {
    // if It was started to "timerID", that do no operation.
    if (this.timerID) return ;
    let self = this;
    
    (function process() {
      for (var i = 0; i < self.callbacks.length; i += 1) {
        // if the "return values" is false, 
        if (self.callbacks[i]() === false) {
          self.callbacks.splice(i, 1);
          i--;
        }
      }
      // call to myself function by setTimeout
      self.timerID = setTimeout(process, self.fps);
    })();
  }
}

// test
const timer = new Timer();
let target = document.getElementById('box');
let left = 0;
let top = 0;

Timer.add(() => {
  target.style.left = (left + 2) + 'px';
  if (left > 200) {
    return false;
  }
});

Timer.add(() => {
  target.style.top = (top++) + 'px';
  if (top > 50) {
    return false;
  }
});


```
