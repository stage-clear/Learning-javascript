# ミックスイン
![IMG_D4004FB4C8A3-1](https://user-images.githubusercontent.com/4797793/222318246-87db7733-4c68-465d-a3a0-0813a1bfc4a1.jpeg)

```js
var myMixins = {
  moveUp: function () {
    console.log('move up');
  },
  
  moveDown: function () {
    console.log('move down');
  },
  
  stop: function () {
    console.log('stop! in the name of love!');
  }
};
```

```js
function carAnimator () {
  this.moveLeft = function () {
    console.log('move left');
  };
}

function personAnimator () {
  this.moveRandomly = function () {};
}

_.extend(carAnimator.prototype, myMixins);
_.extend(personAnimator.prototype, myMixins);
```

```js
var myAnimator = newCarAnimator();
myAnimator.moveLeft();
myAnimator.moveDown();
myAnimator.stop();
```
