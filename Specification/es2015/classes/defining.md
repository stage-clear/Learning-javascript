# Defining Classes

- `class` キーワードを使って定義する
- 変数の巻き上げが発生しない

## Basic:

```js
class Parent {
  print() {
    console.log('I am a class')
  }
}

// Create an instance
const myParent = new Parent()

// NG! (You need to call with `new` keyword.)
const myParent = Parent()

// Calling a method
new Parent().print()
```

## Static method

```js
let count = 0

class Parent {
  constructor() {
    count += 1
  }
  
  // This is static!
  static count() {    // <-
    return count
  }
}

console.log( Parent.count() )
```

## Constructor 

```js
class Parent {
  constructor(name) {
    this.name = name
  }
}

const myParent = new Parent('John')
```

## Setter and getter

```js
class Parent {
  constructor(name) {
    this._name = name
  }
  
  set name(name) {
    this._name
  }
  
  get name() {
    return this._name
  }
  
  print() {
    return `My parent is ${this.name}.`
  }
}
```

## Extend 

- `extends` キーワード

```js
class Child extends Parent {
  print() {
    return `My name is ${this.name}`
  }
}

const myParent = new Parent('Goku')
console.log(muyParent.print()) // My parent is Goku.

const myChild = new Child('Gohon')
console.log(myChild.print()) // My name is Gohan.
```

## super

- `super` キーワード

```js
class Child extends Parent {
  constructor(parentName, myName) {
    super(parentName) // call the constructor of the Parent.
    this.myName = myName
  }
  
  print() {
    return `${super.print()} My name is ${this.myName}.`
  }
  
  static create(parentName, myName) {
    retur nnew Child(parentName, myName)
  }
}

const myParent = new Parent('Goku')
console.log(myParent.print()) // My parent is Goku

const myChild = new Child('Goku', 'Gohan')
console.log(myChild.print()) // My parent is Goku. My name is Gohan.

const myChild2 = new Child('Goku', 'Goten')
console.log(myChild2.print()) // My parent is Goku. My name is Goten.
```
