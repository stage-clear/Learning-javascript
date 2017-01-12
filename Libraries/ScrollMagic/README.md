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
  container: '#container' // <- This element is with doing scroll.
})

new ScrollMagic.Scene({
  triggerElement: '#trigger-element', // <- This element is watched on scroll.
  duration: 1000
})
.setPin('#pin')
.setTween(/* tween */)
.addTo(container)
```

## Sites using ScrollMagic

- [Le Mugs](http://le-mugs.com/)
