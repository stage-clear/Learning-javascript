# IntersectionObserver

```js
let ovserver = new IntersectionObserver(intersectionChanged, {
  // root: document.querySelector('.container'),
  // rootMargin: '500px',
  // threshold: [0, 1]
});

observer.observe(document.querySelector('.target'));

function intersectionChanged(chagnes, observer) {
  for (let change of changes) {
    console.log(change.time);
    console.log(change.rootBounds);
    console.log(change.intersectionRect);
    console.log(change.intersectionRatio);
    console.log(change.target);
    
    if (change.intersectionRatio > 0) {
      observer.unobserve( change.target );
    }
  }
}
```

## links 

- [WICG/IntersectionObserver](https://github.com/WICG/IntersectionObserver) 
- [WICG/IntersectionObserver/Polyfill](https://github.com/WICG/IntersectionObserver/tree/gh-pages/polyfill)
- [IntersectionObserver’s Coming into View | Web Updates - Google Developers](https://developers.google.com/web/updates/2016/04/intersectionobserver?hl=en) - Chrome 実装
- [1000ch/lazyload-image](https://github.com/1000ch/lazyload-image/blob/gh-pages/lazyload-image.html) - 実装例
