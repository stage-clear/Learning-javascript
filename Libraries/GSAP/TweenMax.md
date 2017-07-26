# TweenMax
- [Doc | TweenMax](https://greensock.com/docs/TweenMax)

```js
// 
const element = document.getElementById('element')
TweenMax.to(element, 2, { width: '200px', height: '150px' })

// with ID
TweenMax.to('#myID', 2, {
  backgroundColor: '#ff0000', 
  width: '50%', 
  top: '100px',
  ease: Power2.easeInOut,
})

// with class
TweenMax.to('.myClass', 2, {
  boxShadow: '0 0 20 red',
  color: '#fc0',
})

// multiple elements
TweenMax.to([obj1, obj2, obj3], 1, {
  opacity: .5,
  rotation: 45,
})
```

