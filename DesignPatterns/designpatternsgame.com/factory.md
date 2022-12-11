# [Factory](https://designpatternsgame.com/patterns/factory)

## 定義
オブジェクトを作成するためのインターフェースを定義し、どのクラスをインスタンス化するかはサブクラスに決定させる。ファクトリーメソッドは、クラスがインスタンス化をサブクラスに委ねることを可能にする。

## こんなときに使う
...クラスが、どのオブジェクトを作成するかをサブクラスで決定したい場合。

## 実装例
### ES6
```js
class TeslaPattern {
  create (type) {
    if (type === 'ModelX') return new Tesla(type, 108000, 300)
    if (type === 'ModelS') return new Tesla(type, 111000, 320)
  }
}

class Tesla {
  constructor (model, price, maxSpeed) {
    this.model = model
    this.price = price
    this.maxSpeed = maxSpeed
  }
}

export default TeslaPattern
```

### ES5
```js
function teslaPattern (type) {
  if (type === 'ModelX') return new Tesla(type, 108000, 300)
  if (type === 'ModelS') return new Tesla(type, 111000, 320)
}

function Tesla (model, price, maxSpeed) {
  this.model = model
  this.price = price
  this.maxSpeed = maxSpeed
}

module.exports = teslaPattern;
```
