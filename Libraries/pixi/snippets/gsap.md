# Using with GSAP

- [TweenMax](https://greensock.com/docs/TweenMax)
- [TimelineMax](https://greensock.com/docs/TimelineMax)

## TweenMax
```js
const sprite = new PIXI.Graphics()
sprite.beginFill(0xeeeeee, 1)
sprite.drawRect(0, 0, 100, 100)
sprite.endFill()

TweenMax.to(sprite, 1, {
  x: 100,
  y: 100,
})
```

## TimelineMax

```js
const sprite = PIXI.Sprite.fromImage(...)
const tl = new TimelineMax({
  repeat: -1,
  repeatDelay: 1,
})

tl.add(TweenMax.to(sprite, 1, {
  x: 100,
  y: 100,
}))

tl.add(TweenMax.to(sprite, 1, {
  x: 0,
  y: 0,
}))

tl.play()

sprite.interactive = true
sprite.on('pointerover', () => {
  tl.pause()
})
sprite.on('pointerout', () => {
  tl.resume()
})
```

## References
- [pixi-with-gsap](https://github.com/front-core/pixi-with-gsap/blob/master/scripts/main.js)
