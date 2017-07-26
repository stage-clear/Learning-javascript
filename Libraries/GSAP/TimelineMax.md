# TimelineMax
- [TimelineMax](https://greensock.com/timelinemax)
- [Docs | TimelineMax](https://greensock.com/docs/TimelineMax)

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TimelineMax.min.js"></script>
```

```js
// TimelineMax configuration simply: 
const tl = new TimelineMax({
  delay: 1,
  onUpdate: () => console.log('onUpdate'),
  repeat: 300,
  yoyo: true,
})
```


```js
const tl = new TimelineMax({ repeat: 2, repeatDelay: 1 })
tl.add(TweenLite.to(element, 1, { left: 100 }))
tl.add(TweenLite.to(element, 1, { top: 50 }))
tl.add(TweenLite.to(element, 1, { opacity: 0 }))

tl.pause()
tl.resume()
tl.seek(1.5)
tl.reverse()
```

```js
const tl = new TimelineMax()
tl.to(element, 1, { left: 100 })
  .to(element, 1, { top: 50 })
  .to(element, 1, { opacity: 0 })
```
