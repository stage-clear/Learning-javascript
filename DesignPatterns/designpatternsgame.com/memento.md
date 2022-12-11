# [Memento](https://designpatternsgame.com/patterns/memento)

## 定義
カプセル化に違反することなく、オブジェクトの内部状態をキャプチャして外部化し、後でこの状態に戻すことができるようにする。

## こんなときに
オブジェクトのスナップショットを撮りたいとき。

## 実装例
### ES6
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

### ES5
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

