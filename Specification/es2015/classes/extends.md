# Extends

- `extends` キーワード

```js
class Parent {
  constructor(name) {
    this.name = name
  }
  
  print() {
    return `My parent is ${this.name}.`
  }
}

class Child extends Parent {
  print() {
    return `My name is ${this.name}.`
  }
}

const myParent = new Parent('Goku')
> myParent.print() // My parent is Goku.

const myChild = new Child('Gohan')
> myChild.print() // My name is Gohan.
```

## super _継承元の呼び出し_

- `super` キーワード

```js
class Child extends Parent {
  constructor(parentName, myName) {
    super(parentName) // Call a constructor of the Parent class.
    this.myName = myName
  }
  
  print() {
    return `${super.print()} My name is ${this.myName}.`
  }
  
  // Override to static method
  static create(parentName, myName) {
    return new Child(parentName, myName)
  }
}

const myParent = new Parent('Goku')
> myParent.print() // My parent is Goku.

const myChild = new Child('Goku', 'Gohan')
> myChild.print() // My parent is Goku. My name is Gohan.

const myChild2 = Child.create('Goku', 'Goten')
> myChild2.print() // My parent is Goku. My name is Goten.
```

## External links
- [extends](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends) - MDN
