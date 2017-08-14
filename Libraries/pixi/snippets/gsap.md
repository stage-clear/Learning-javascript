# Using with GSAP

- [TweenMax](https://greensock.com/docs/TweenMax)
- [TimelineMax](https://greensock.com/docs/TimelineMax)

## Using with TweenMax
```js
const sprite = new PIXI.Graphics()
cosnt duration = 1

TweenMax.to(sprite, duration, {
  x: 100,
  y: 100,
})
```

## Using with TimelineMax

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
