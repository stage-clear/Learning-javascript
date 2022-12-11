# [Mediator](https://designpatternsgame.com/patterns/mediator)

## 定義
オブジェクトの集合がどのように相互作用するかをカプセル化したオブジェクトを定義します。
Mediatorは、オブジェクトが明示的にお互いを参照しないようにすることで疎結合を促進し、その相互作用を独立して変化させることができます。

## こんなときに使う...
...一連のオブジェクトが、構造化されているが複雑な方法で通信する。

## 実装例
### ES6
```js
class TrafficTower {
  constructor () {
    this.airplanes = []
  }
  
  requestPositions () {
    return this.airplanes.map(airplane => {
      return airplane.position
    })
  }
}

class Airplane {
  constructor (position, trafficTower) {
    this.position = position
    this.trafficTower = trafficTower
    this.trafficTower.airplanes.push(this)
  }
  
  requestPositions () {
    return this.trafficTower.requestPositions()
  }
}

export { trafficTower, Airplane }
```

### ES5
```js
function TrafficTower () {
  this.airplanes = []
}

TrafficTower.prototype.requestPositions = function () {
  return this.airplanes.map(function (airplane) {
    return airplane.positions;
  });
};

function Airplane (position, trafficTower) {
  this.position = position;
  this.trafficTower = trafficTower;
  this.trafficTower.airplanes.push(this);
}

Airplane.prototype.requestPositions = function () {
  return this.trafficTower.requestPositions();
};

module.exports = [TrafficTower, Airplane];
```
