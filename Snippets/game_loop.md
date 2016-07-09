# Game loop
## Code

```js
Game = {};
Game.fps = 60;
Game.stopped = false;

Game.draw = function() {
  // draw entries here...
};

Game.update = function() {
  // run game logic here...
};

Game.run = (function() {
  let loops = 0;
  let skipTicks = 1000 / Game.fps;
  let maxFrameSkip = 10;
  let nextGameTick = (new Date).getTime();
  
  return function loop() {
    loops = 0;
    
    while ((new Date).getTime() > nextGameTick && loops < maxFrameSkip) {
      Game.update();
      nextGameTick += skipTicks;
      loops++;
    }
    
    Game.draw();
  };
})();

(function() {
  const onEachFrame;
  
  if (window.webkitRequestAnimationFrame) {
    onEachFrame = function(cb) {
      const _cb = function() {
        cb();
        webkitRequestAnimationFrame(_cb);
      };
      _cb();
    };
  } else if (window.mozRequestAnimationFrame) {
    onEachFrame = function(cb) {
      const _cb = function() {
        cb();
        mozRequestAnimationFrame(_cb);
      };
      _cb();
    };
  } else {
    onEachFrame = function(cb) {
      setInterval(cb, 1000 / Game.fps);
    };
  }
  
  window.onEachFrame = onEachFrame;
})();

window.onEachFrame(Game.run);
```


## Links
- [Javascript Game Development - The Game Loop](http://nokarma.org/2011/02/02/javascript-game-development-the-game-loop/)
