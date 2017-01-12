# Usage of ScrollMagic

## Basic

```js
var controller = new ScrollMagic.Controller({
  globalSceneOptions: {
    triggerHook: 'onLeave'
  }
})

new ScrollMagic.Scene({
  triggerElement: '#trigger', // <- This element is watched on scroll.
  duration: 1000
})
.setPin('#pin')
.setTween(/* tween */)
.addTo(container)
```

## In case you don't use window scroll

```html
<div id="container"><!-- この要素がスクロールを持ちます: { overflow-y: scroll } -->
  <div id="trigger">
    <div id="pin">
      <!-- Contents -->
    </div>
  </div>
</div>
```

```js
var controller = new ScrollMagic.Controller({
  globalSceneOptions: {
    triggerHook: 'onLeave'
  },
  container: '#container' // <- スクロール領域となる要素を指定します
})

new ScrollMagic.Scene({
  triggerElement: '#trigger',
  duration: 1000
})
.setPin('#pin')
.setTween(/* tween */)
.addTo(container)
```

## ScrollToPlugin

```html
<script src="//cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/plugins/ScrollToPlugin.min.js"></script>
```
