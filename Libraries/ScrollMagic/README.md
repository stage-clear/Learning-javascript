# ScrollMagic.js
- [ScrollMagic](http://scrollmagic.io/)
- [ScrollMagic - GitHub](https://github.com/janpaepke/ScrollMagic)
- [ScrollMagic Documentation](http://scrollmagic.io/docs/index.html)

## Install

```html
<script src="//cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenMax.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/plugins/ScrollToPlugin.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/ScrollMagic.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/animation.gsap.min.js"></script>
```

## Use

```js
var controller = new ScrollMagic.Controller({
  globalSceneOptions: {
    triggerHook: 'onLeave'
  },
  // if in case of you don't use the window's scroll
  container: '#container'
})

new ScrollMagic.Scene({
  triggerElement: '#trigger', // <- This element is watched on scroll.
  duration: 1000
})
.setPin('#pin')
.setTween(/* tween */)
.addTo(container)
```

```html
<div id="container">
  <div id="trigger">
    <div id="pin">
      <!-- Contents -->
    </div>
  </div>
</div>
```

## Sites using ScrollMagic

- [Le Mugs](http://le-mugs.com/)
