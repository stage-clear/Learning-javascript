# Constructor

```js
class Parent {
  constructor(name) {
    this.name = name
  }
  
  print() {
    return `My parent is ${this.name}`
  }
  
  set name(value) {
    this._name = value
  }
  
  get name() {
    return this._name
  }
}

const myParent = new Parent('Goku')
> myParent.print() // My parent is Goku.
```
