# Central timer control

```js
class Timer {
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
		let timers = this.timers;
    let fps = this.fps;
    let timerID = this.timerID;

    (function next() {
      if (timers.length > 0) {
        for (let i = 0; i < timers.length; i += 1) {
          if (timers[i]() === false) {
            timers.splice(i, 1);
            i--;
          }
        }
        timerID = setTimeout(next, fps);
      }
    })();
  }
  
  stop() {
    clearTimeout(this.timerID);
    this.timerID = 0;
  }
}


// test
const timers = new Timer();
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
