# Memento

## dofactory
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

## Design Patterns Game
```js
class Pattern {
  constructor (value) {
    this.value = value
  }
}

const originator = {
  store: function (val) {
    return new Pattern(val)
  },
  restore: function (pattern) {
    return pattern.value
  }
}

class Caretaker {
  constructor () {
    this.values = []
  }
  
  addPattern () {
    this.values.push(pattern)
  }
  
  getPattern () {
    return this.values[index]
  }
}

export { originator, Caretaker }
```

```js
function Pattern (value) {
  this.value = value;
}

var originator = {
  store: function (val) {
    return new Pattern(val);
  },
  restore: function (pattern) {
    return pattern.value;
  }
};

function Caretaker () {
  this.values = [];
}

Caretaker.prototype.addPattern = function (pattern) {
  this.values.push(pattern);
};

Caretaker.prototype.getPattern = function (index) {
  return this.values[index];
};

module.exports = [originator, Caretaker];
```

