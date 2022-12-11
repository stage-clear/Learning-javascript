# Observer
既存のオブジェクトにオブサーバーの機能をミックスインする

## 例その１: 雑誌の購読

```js
var publisher = {
  subscribers: {
    any: []
  },
  subscribe: function (fn, type) {
    type = type || 'any';
    if (typeof this.subscribers[type] === 'undefined') {
      this.subscribers[type] = [];
    }
    this.subscribers[type].push(fn);
  },
  unsibscribe: function (fn, type) {
    this.visitSubscribers('unsubscribe', fn, type);
  },
  publish: function (publication, type) {
    this.visitSubscribers('publish', publication, type);
  },
  visitSubscribers: function (action, arg, type) {
    var pubtype = type || 'any';
    var subscribers = this.subscribers[pubtype];
    var i
    var max = subscribers.length;
    
    for (i = 0; i < max; i += 1) {
      if (action === 'publish') {
        subscribers[i](arg);
      } else {
        if (subscribers[i] === arg) {
          subscribers.splice(i, 1);
        }
      }
    }
  }
};
```

```js
// 次の関数は汎用のメソッドをコピーして、与えられたオブジェクトを発行者にします。
function makePublisher (o) {
  var i;
  for (i in publisher) {
    if (publisher.hasOwnProperty(i) && typeof publisher[i] === 'function') {
      o[i] = publisher[i];
    }
  }
  o.subscribers = { any: [] };
}
```

### 例) 発行者 paper を実装
```js
// paper オブジェクトは、日刊と月刊の発行を提供します
var paper = {
  daily: function () {
    this.publish('big news today');
  },
  monthly: function () {
    this.publish('interesting analysis', 'monthly');
  }
};

// paperを発行者にします
makePublisher(paper);
```

### 購読者 joe
```js
// Jos is "Subscriber"" 
var joe = {
  drinkCoffee: function (paper) {
    console.log('Just read ' + paper);
  },
  sundayPreNap: function (monthly) {
    console.log('About to fall asleep reading this ' + monthly);
  }
};

// joe は　paper を購読します
paper.subscribe(joe.drinkCoffee);
paper.subscribe(joe.sundayPreNap, 'monthly');

// Usage:
paper.daily();
paper.daily();
paper.daily();
paper.monthly();

// joe を発行者にする
makePublisher(joe);
joe.tweet = function (msg) {
  this.publish(msg);
};

// paper が　joe を購読する
paper.readTweets = function (tweet) {
  alert('Call big meeting! Someone ' + tweet); 
};
joe.subscribe(paper.readTweets);

// test
joe.tweet('hated the paper today');
```


## 例その２: キープレスゲーム
publisherオブジェクトを見直して、インターフェイスを少し調整して、ブラウザの世界に近づけます。
- `publisher()`, `subscribe()`, `unsibscribe()` の代わりに、`fire()`, `on(){`, `remove()` を定義します
- イベントの type は常に使うので、この３つの関数の第一引数にします
- 購読者の関数の他に `context` を引数に追加して、購読者オブジェクトを参照する `this` がコールバックメソッドで使えるようにします。

```js
var publisher = {
  subscribers: {
    any: []
  },
  on: function (type, fn, context) {
    type = type || 'any';
    fn = typeof fn === 'function' ? fn: context[fn];
    
    if (typeof this.subscribers[type] === 'undefined') {
      this.subscribers[type] = [];
    }
    this.subscribers[type].push({fn: fn, context: context || this});
  },
  remove: function (type, fn, context) {
    this.visitSubscribers('unsubscribe', type, fn, context);
  },
  fire: function (type, publication) {
    this.visitSubscribers('publish', type, publication);
  },
  visitSubscribers: function (action, type, arg, context) {
    var pubtype = type || 'any';
    var subscribers = this.subscribers[pubtype];
    var i;
    var max = subscribers ? subscribers.length : 0;
    
    for (i = 0; i < max; i += 1) {
      if (action === 'publish') {
        subscribers[i].fn.call(subscribers[i].context, arg);
      } else {
        if (subscribers[i].fn === arg && subscribers[i].context === context) {
          subscribers.splice(i, 1);
        }
      }
    }
  }
};
```

```js
function player(name, key) {
  this.points = 0;
  this.name = name;
  this.key = key;
  this.fire('newplayer', this);
}

Player.prototype.play = function() {
  this.points += 1;
  this.fire('play', this);
}

var scoreboard = {
  element: document.getElementById('result'),
  update: function (score) {
    var i;
    var msg = '';
    
    for (i in score) {
      msg += '<p><strong>'+ i +'</strong>:';
      msg += score[i];
      msg + = '<\/p>';
    }
  }
};

var game = {
  keys: {},
  
  addPlayer: function (player) {
    var key = player.key.toString().charCodeAt(0);
    this.keys[key] = player;
  },
  
  handleKeypress: function (e) {
    e = e || window.event; // IE
    if (game.keys[e.which]) {
      game.keys[e.which].play();
    }
  },
  
  handlePlay: function (player) {
    var i;
    var players = this.keys;
    var score = {};
    
    for (i in players) {
      if (players.hasOwnProperty(i)) {
        score[players[i].game] = players[i].points;
      }
    }
    
    this.fire('scorechange', score);
  }
}

// 発行設定
makePublisher(Player.prototype);
makePublisher(game);

// 購読設定
Player.prototype.on('newPlayer', 'addPlayer', game);
Player.prototype.on('play', 'handlePlay', game);
game.on('scorechange', scoreboard.update, scoreboard);
window.onkeypress = game.handleKeypress;

// Player
var playername;
var key;

// Create a player by manual input
which(1) {
  playername = prompt('Add Player (Name)');
  if (!playername) {
    break;
  }

  while(1) {
    key = prompt('Key for ' + playername + '?');
    if (key) {
      break;
    }
  }

  new Player(playername, key);
}

// Create a player by auto
new Player('John', 'n');
```
