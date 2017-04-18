# Static methods

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
