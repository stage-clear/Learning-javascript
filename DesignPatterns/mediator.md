# Mediator

メディエータとは振る舞いのデザインパターンであり、システムのさまざまな部品が相互にコミュニケーションできるように統一インターフェイスを公開するものです。
<img src="https://user-images.githubusercontent.com/4797793/191047407-6aa6f77e-9df6-4a33-b5cd-2eef688c6fb0.jpeg" width="600px" height="auto" />

実装の用語で言うと、メディエータパターンは本質的にはオブザーバパターンにおける共有されたサブジェクトになります。

## 基本的な実装
```js
var mediator = (function () {
  // ブロードキャストやリスンされるトピックのための記憶領域
  var topics = {}
  
  // トピックの購読。トピックがブロードキャストされるときに実行されるコールバックを与える
  var subscribe = function(topic, fn) {
    if (!topics[topic]) {
      topics[topic] = []
    }
    
    topics[topic].push({ context: this, callback: fn })
    
    return this
  }
  
  // イベントをアプリケーションに発行/ブロードキャストする
  var publish = function (topic) {
    var args
    
    if (!topics[topic]) {
      return false
    }
    
    args = Array.prototype.slice.call(arguments, 1)
    for (var i = 0, l = topics[topic].length; i < l; i++) {
      var subscription = topics[topic][i]
      subscription.callback.apply(subscription.context, args)
    }
    return this
  }
  
  return {
    Publish: publish,
    Subscribe: subscribe,
    installTo: function (obj) {
      obj.subscribe = subscribe
      obj.publish = publish
    }
  }
}())
```

### より高度な実装
より高度な実装に興味のある方は、ジャック・ローソンの卓越した[Mediator.js](http://thejacklawson.com/Mediator.js/)を著者が簡略したバージョンを読まれるとよいでしょう。
このバージョンには、トピックの名前空間、サブスクライバの削除、メディエータのための発行/購読システムをより堅牢にするための改善が盛り込まれています。

## [Design Patterns Game](https://designpatternsgame.com/patterns/mediator)
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

## [dofactory](https://www.dofactory.com/javascript/design-patterns/abstract-factory)

```js
var Pariticipant = function (name) {
  this.name = name;
  this.chatroom = null;
};

Participant.prototype = {
  send: function (message, to) {
    this.chatroom.send(message, this, to);
  },
  receive: function (message, from) {
    console.log(from.name + ' to' + this.name + ': ' + message;
  }
};

var Chatroom = function () {
  var participants = {};
  
  return {
    register: function (participant) {
      participants[participant.name] = participant;
      participant.chatroom = this;
    },
    
    send: function (message, from, to) {
      if (to) {
        to.receive(message, from);
      } else {
        for (key in participants) {
          if (participants[key] !== from) {
            participants[key].receive(message, from);
          }
        }
      }
    }
  };
};

function run () {
  var yoko = new Participant('Yoko');
  var john = new Participant('John');
  var paul = new Participant('Paul');
  
  var chatroom = new Chatroom();
  chatroom.register(yoko);
  chatroom.register(jhon);
  chatroom.register(paul);
  
  yoko.send('All you need is love.');
  yoko.send('I love you John');
  john.send('Hey, no need to broadcast', yoko);
  paul.send('Ha, I heart that!');
  ring.send('Paul, what do you think?', paul);
}
```
