# Classes 

1. [クラスの定義](defining.md)
2. コンストラクタと継承

## クラスの定義

- `class` キーワードで定義する
- 変数の巻き上げが発生しない

```js
class Parent {
  print() {
    console.log('I am a class');
  }
}

// Create Instance
let myParent = new Parent();

// NG!
let myParent = Parent(); 
//=> Error: Cannot call a class as a function


// Call method
new Parent().print();
```

__静的なメソッド__ - インスタンスを作らなくても呼べるメソッド

```js
let count = 0;

class Parent {
  constructor() {
    count += 1;
  }

  // 静的メソッド
  static count() {
    return count;
  }
}

console.log(Parent.count());//=> 0
```

## コンストラクタと継承

```js
// コンストラクタ
class Parent {
  constructor(name) {
    this.name = name;
  }
  set name(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
  print() {
    return `My parent is ${this.name}.`;
  }
}

// Parent クラスを継承して Childクラスを定義
class Child extends Parent {

  // メソッドを上書き
  print() {
    return `My name is ${this.name}.`;
  }
}

let myParent = new Parent('Goku');
console.log(myParent.print());//=> My parent is Goku.

let myChild = new Child('Gohan');
console.log(myChild.print());//=> My name is Gohan.
```

__継承元の呼び出し__

```js
class Child extends Parent {
  constructor(parentName, myName) {
    super(parentName);// Parent クラスの constructor を呼び出し
    this.myName = myName;
  }

  print() {
    return `${super.print()} My name is ${this.myName}.`;
  }
  
  // 静的メソッドを上書き
  static create(parentName, myName) {
    return new Child(parentName, myName);
  }
}

let myParent = new Parent('Goku');
console.log(myParent.print());//=> My parent is Goku

let myChild = new Child('Goku','Gohan');
console.log(myChild.print());//=> My parent is Goku. My name is Gohan.

let myChild2 = Child.create('Goku', 'Goten');
console.log(myChild2.print());//=> My parent is Goku. My name is Goten.
```

# Links
- [ECMAScript 2015 Language Specification – Class Definitions](http://www.ecma-international.org/ecma-262/6.0/#sec-class-definitions)
- [Classes - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Classes)
- [set - JavaScript | MDN](https://developer.mozilla.org/ja/docs/JavaScript/Reference/Operators/set)
- [get - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/get)
- [Method definitions - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions_and_function_scope/Method_definitions)


