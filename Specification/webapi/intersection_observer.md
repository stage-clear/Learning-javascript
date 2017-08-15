# IntersectionObserver

__Options:__

- `root` - 監視対象となる Viewport
- `rootMargin` - 交差を計算するときにルートの論理サイズを縮小・拡大する量
- `threshold` - しきい値.
  - `0`: 部分的に表示されるか完全に非表示にされるたびにハンドラを呼び出します
  - `1`: 完全に可視と部分可視の間で反転するたびにハンドラが呼び出されます
  - `0.5`: いずれかの方向に50%の可視性のポイントを通過すると呼び出されます

```js
let ovserver = new IntersectionObserver(intersectionChanged, {
  // root: document.querySelector('.container'), /* Browser viewport */
  // rootMargin: '500px', /* 0px 0px 0px 0px */
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

## Example

```js
var ob
var obSelector = '.image'
var obSettings = {
  rootMargin: '-100px 0px',
  threshold: 0.01,
}
var onIntersection = (entries, ob) => {
  for (let i = 0; i < entries.length; i++) {
    let el = entries[i]
    if (el.intersectionRatio > 0) {
      ob.unobserve(el)
    }
  }
}
var ob = new IntersectionObserver(onIntersection, obSettings)
var targets = Array.from(document.querySelectorAll(obSelector))
targets.forEach(el => ob.observe(el))
```

## links 

- [WICG/IntersectionObserver](https://github.com/WICG/IntersectionObserver) 
- [WICG/IntersectionObserver/Polyfill](https://github.com/WICG/IntersectionObserver/tree/gh-pages/polyfill)
- [IntersectionObserver’s Coming into View | Web Updates - Google Developers](https://developers.google.com/web/updates/2016/04/intersectionobserver?hl=en) - Chrome 実装
- [1000ch/lazyload-image](https://github.com/1000ch/lazyload-image/blob/gh-pages/lazyload-image.html) - 実装例
