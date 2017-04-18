# Constructor

```js
class Parent {
  constructor(name) {
    this.name = name
  }
  
  print() {
    return `My parent is ${this.name}`
  }
}

const myParent = new Parent('Goku')
> myParent.print() // My parent is Goku.
```
