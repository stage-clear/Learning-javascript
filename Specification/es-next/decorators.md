# Decorators

```js
/**
 * @param {Class} target
 * @param {String} name, is a method name of the source class)
 * @param {Object} `{ get, set, value }`
 */
const debug = (target, name, descriptor) => {
  if (descriptor.value) {
    const original = descriptor.value.bind(target)
    descriptor.value = (...args) => {
      const val = original(...args)
      console.log(`${debug: call ${name}}`, ...args)
      return val
    }
  }
  
  if (descriptor.get) {
    const originalGet = descriptor.get.bind(target)
    descriptor.get = () => {
      const val = originalGet()
      console.log(`debug: get ${name} - ${val}`)
      return val
    }
  }
  
  if (descriptor.set) {
    const originalSet = descriptor.set.bind(target)
    descriptor.set = () => {
      const r = originalSet(val)
      console.log(`debug: set ${name} - ${val}`)
      return r
    }
  }

  return descriptor
}

// Example:
class A {
  @debug
  get name() {
    return 'aaa'
  }
  ...
}
```


```js
// デコレータが引数をとる場合は, 関数を返す:
/**
 * @param {Any} pre
 * 
 */
const log = (pre) => {
  return (target, name, descriptor) => {
    // do something...
    return descriptor
  }
}

// Example:
class B {
  @log('In B class:')
  get name() {
    return 'bbb'
  }
  ...
}
```

## References:
- [Decorators proposal](https://tc39.github.io/proposal-decorators/)
- [Exploring EcmaScript Decorators](https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841)
- [Decorators進捗](http://azu.github.io/slide/typescript-sushi/decorators.html)
- [全力で ES Decorator使ってみた](http://qiita.com/mizchi/items/6bdf9d100f564a5c5b08)
