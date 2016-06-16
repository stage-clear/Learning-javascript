# Animation sequence

## use `Promise()`

```js
let el = document.querySelector('.animate');

let anim1 = () => {
  return new Promise(resolve => {
    el.style.animationName = 'anim-1';
    el.addEventListener('animationend', e => resolve, false);
  });
};

let anim2 = () => {
  return new Promise(resolve => {
    el.style.animationName = 'anim-2';
    el.addEventListener('animationend', e => resolve, false);
  });
};

let anim3 = () => {
  return new Promise(resolve => {
    el.style.animationName = 'anim-3';
    el.addEventListener('animationend', e => resolve, false);
  });
};

anim1().then(() => anim2()).then(() => anim3())
```
