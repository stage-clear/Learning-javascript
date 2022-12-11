# [Memento](https://www.dofactory.com/javascript/design-patterns/memento)
## 定義
Mementoパターンは、オブジェクトの一時的な保存と復元を提供します。オブジェクトの状態を保存するメカニズムは、必要とされる永続性の期間によって異なり、それは様々な場合があります。

## 実装例
```js
var Person = function (name, street, city, state) {
  this.name = name
  this.street = street
  this.city = city
  this.state = state
}

Person.prototype = {
  hydrate: function () {
    var memento = JSON.stringify(this)
    return memento
  },
  
  dehydrate: function (memento) {
    var m = JSON.parse(memento)
    this.name = m.name
    this.street = m.street
    this.city = m.city
    this.state = m.state
  }
}

var CareTaker = function () {
  this.memento = {}
  
  this.add = function (key, memento) {
    this.memento[key] = memento
  },
  
  this.get = function (key) {
    return this.memento[key]
  }
}

function run () {
  var mike = new Person('Mike Foley', '1112 Main', 'Dallas', 'TX')
  var john = new Person('John Wang', '48th Street', 'San Jose', 'CA')
  var careTaker = new CareTaker()
  
  // save state
  caretaker.add(1, mike.hydrate())
  caretaker.add(2, john.hydrate())
  
  // mess up their names
  mike.name = 'King Kong'
  john.name = 'Superman'
  
  // restore original state
  mike.dehydrate(caretaker.get(1))
  john.dehydrate(caretaker.get(2))
  
  console.log(mike.name)
  console.log(john.name)
}
```
