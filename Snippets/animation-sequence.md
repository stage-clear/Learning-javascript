# Animation sequence

## Use `Promise()`

[Sample](https://jsfiddle.net/walfo/07xphesh/)

```js
let el = document.querySelector('.element');

let animStart = () => {
	return new Promise(resolve => {
    setTimeout(() => {
      el.classList.add('animate'); 
      resolve();
    }, 3000);
  });
};

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

animStart()
  .then(() => anim1())
  .then(() => anim2())
  .then(() => anim3());
```

## Use `Generator`

```js
```

## Use `async/await`


## Links
- [Promiseについて](http://js-next.hatenablog.com/entry/2013/11/28/093230)
- [JavaScriptは如何にしてAsync/Awaitを獲得したのか](http://gao-tec.seesaa.net/article/427643074.html)
