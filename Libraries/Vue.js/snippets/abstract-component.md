
```js
export default {
  abstract: true,
  render () {
    try {
      return this.$slots.default[0]
    } catch (e) {
      throw new Error('This file can only render one, and exactly one child component.')
    }
    
    return null
  }
}
```

```js
export default {
  abstract: true,
  render () {
    try {
      return this.$slots.default[0]
    } catch (e) {
      throw new Error('Error message')
    }
    
    return null
  },
  mounted () {
    this.observer = new IntersectionObserver((entries) => {
      this.$emit(entries[0].isIntersectiong ? 'intersect-enter' : 'intersect-leave', [entries[0]])
    })
    
    this.$nextTick(() => {
      this.observer.observe(this.$slots.default[0].elm)
    })
  },
  destroyed () {
    this.observer.disconnect()
  }
}
```

```html
<intersection-observer @intersect-enter="handlerEnter" @intersect-leave="handleLeave">
  <my-honest-to-goodness-component/>
</intersection-observer>
```
__Thresholdを設ける__

```js
export default {
  abstract: true,
  props: {
    threshold: {
      type: Array
    }
  },
  render () {
    try {
      return this.$slots.default[0]
    } catch (e) {
      throw new Error('Error message')
    }
    
    return null
  },
  mounted () {
    this.observer = new IntersectionObserver((entries) => {
      this.$emit(entries[0].isIntersecting ? 'intersect-enter' : 'intersect-leave', [entries[0]])
    }, {
      thresshold: this.threshold || 0
    })
    
    this.$nextTick(() => {
      this.observer.observe(this.$slots.default[0].elm)
    })
  },
  destroyed () {
    this.observer.disconnect()
  }
}
```

```html
<intersection-observer @intersect-enter="handleEnter" @intersect-leave="handleLeave" :threshold="[0, 0.5, 1]">
  <my-honest-to-goodness-component/>
</intersection-observer>
```
