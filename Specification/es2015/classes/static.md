# Static

- インスタンスからではなく, クラスから使用するメソッド

```js
let count = 0

class Parent {
  constructor() {
    count += 1
  }
  
  static count() { // <-
    return count
  }
}

console.log(Parent.count())
```

## External links

- [static](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) - MDN
