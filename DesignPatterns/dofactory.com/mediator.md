# [Mediator](https://www.dofactory.com/javascript/design-patterns/mediator)
## 定義
Mediatorパターンは、オブジェクトのグループに対して、これらのオブジェクトがどのように相互作用するかをカプセル化することで、中央の権威を提供します。
このモデルは、すべてのオブジェクトがグループ内の他のオブジェクトの状態変化を認識するような、複雑な状態を管理する必要があるシナリオに有用である。

## 実装例
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
