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

## Error

```js
class Parent {
  set name(value) {
    this.name = value
  }
  get name() {
    return this.name
  }
}

> Parent.name
Uncaught RangeError: Maximum call stack size exceeded
    at Parent.get area [as area] ((index):49)
    at Parent.get area [as area] ((index):50)
    at Parent.get area [as area] ((index):50)
    at Parent.get area [as area] ((index):50)
    at Parent.get area [as area] ((index):50)
    at Parent.get area [as area] ((index):50)
    at Parent.get area [as area] ((index):50)
    at Parent.get area [as area] ((index):50)
    at Parent.get area [as area] ((index):50)
    at Parent.get area [as area] ((index):50)
```
