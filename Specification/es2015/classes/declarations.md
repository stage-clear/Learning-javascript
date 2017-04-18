# Class declarations

- `class` キーワードを使って定義する
- 変数の巻き上げが発生しない

## Basic

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
> new Parent().print()
```

## External links
- [Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) - MDN
