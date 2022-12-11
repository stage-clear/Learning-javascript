# Observer

## Overview
オブザーバーパターンの実装方法には、プッシュとプルの2つがあります。 

- __プッシュメソッド__ - オブザーバーは監視対象オブジェクトをサブスクライブし、監視対象に注目すべき事象が発生した場合にオブザーバーに連絡して知らせます
  - DOMイベントの挙動
- __プルメソッド__ - 監視対象は、オブザーバーの持つサブスクリプションリスに追加されます。
定期的に、または指定された時に、オブザーバーは、監視対象内で変更が発生したかどうかをチェックし、変更があった場合はその変更に反応して何らかの処理を実行します。
  - デスクトップソフトウェアでのアップデート処理など

__よく使われるメソッド名__
|機能|メソッド名|
|:-|:-|
|subscribe|`subscribe` `observe` `on`|
|unsubscribe|`unsubscribe` `unobserve` `off` `remove`|
|publish|`publish` `broadcast` `emit` `fire`|

## 実装例
- [Adobe Developer Connection](https://github.com/stage-clear/Learning-javascript/blob/master/DesignPatterns/Adobe-Developer-Connection/observer.md)


```js
// Observable
class Observable {
  constructor() {
    this.subscribers = [];
  }

  subscribe(callback) {
    // Just add the callback to the subscribers list
    this.subscribers.push(callback);
  }

  unsubscribe(callback) {
    let i = 0;
    let len = this.subscribers.length;

    // Iterate through the array and if the callback is 
    // found, remove it from the list of subscribers. 
    for (; i < len; i += 1) {
      if (this.subscribers[i] === callback) {
        this.subscribers.splice(i, 1);
        // Once we've found it, we don't need to 
        // continue, so just return 
        return ;
      }
    }
  }

  publish(data) {
    let i = 0;
    let len = this.subscribers.length;

    // Iterate over the subscribers array and call each of 
    // the callback functions 
    for (; i < len; i += 1) {
      this.subscribers[i](data);
    }
  }
}
```

#### Use:
```js
// Observer
let Observer = function(data) {
  console.log(data);
};

// Usage:
// Here's where it gets used.
observable = new Observable();
observable.subscribe(Observer);
observable.publish('We published!');
// 'We published' will be logged in the console 
observable.unsubscribe(Observer);
observable.publish('Another publish');
// Nothing happens because there area no longer any subscribed observers
```


- [JavaScript Patterns](https://github.com/stage-clear/Learning-javascript/blob/master/DesignPatterns/JavaScript-Patterns/observer.md)


### Example 3) By __JavaScript Patterns__ that is using Push method.

```js
const publisher = {
  subscribers: {
    any: [],
  },
  
  on(type, fn, context) {
    type = type || 'any'
    fn = (typeof fn === 'function') ? fn : context[fn]
    if (typeof this.subscribers[type] === 'undefined') {
      this.subscribers[type] = []
    }
    this.subscribers[type].push({
      fn: fn,
      context: context || this,
    })
  },
  
  remove(type, fn, context) {
    this.visitSubscribers('unsibscribe', type, fn, context)
  },
  
  fire(type, publication) {
    this.visitSubscribers('publish', type, publication)
  }
  
  visitSubscribers(action, type, arg, context) {
    let pubtype = type || 'any'
    let subscribers = this.subscribers[pubtype]
    let i
    let max = subscribers ? subscribers.length : 0
    
    for (i = 0; i < max; i += 1) {
      if (action === 'publish') {
        subscribers[i].fn.call(subscribers[i].context, arg)
      } else {
        if (subscribers[i].fn === arg && subscribers[i].context === context) {
          subscribers.splice(i, 1)
        }
      }
    }
  }
}

function makePublisher(o) {
  let i
  for (i in publisher) {
    if (publisher.hasOwnProperty(i) && typeof publisher[i] === 'function') {
      o[i] = publisher[i]
    }
  }
  o.subscribers = {
    any: [],
  }
}
```

#### Use case

```js
function player(name, key) {
  this.points = 0
  this.name = name
  this.key = key
  this.fire('newplayer', this)
}

Player.prototype.play = function() {
  this.points += 1
  this.fire('play', this)
}

const scoreboard = {
  element: document.getElementById('result'),
  update(score) {
    let i 
    let msg = ''
    
    for (i in score) {
      msg += '<p><strong>'+ i +'</strong>:'
      msg += score[i]
      msg + = '<\/p>'
    }
  }
}

const game = {
  keys: {},
  
  addPlayer(player) {
    const key = player.key.toString().charCodeAt(0)
    this.keys[key] = player
  },
  
  handleKeypress(e) {
    e = e || window.event
    if (game.keys[e.which]) {
      game.keys[e.which].play()
    }
  },
  
  handlePlay() {
    let i
    let players = this.keys
    let score = {}
    
    for (i in players) {
      if (players.hasOwnProperty(i)) {
        score[players[i].game] = players[i].points
      }
    }
    
    this.fire('scorechange', score)
  }
}

// 発行設定
makePublisher(Player.prototype)
makePublisher(game)

// 購読設定
Player.prototype.on('newPlayer', 'addPlayer', game)
Player.prototype.on('play', 'handlePlay', game)
game.on('scorechange', scoreboard.update, scoreboard)
window.onkeypress = game.handleKeypress

// Player
let playername
let key

// Create a player by manual input
which(1) {
  playername = prompt('Add Player (Name)')
  if (!playername) {
    break
  }

  while(1) {
    key = prompt('Key for ' + playername + '?')
    if (key) {
      break
    }
  }

  new Player(playername, key)
}

// Create a player by auto
new Player('John', 'n')
```

### Example 4) Simply Observer by __Sitepoint.com__
- [JavaScript Design Patterns: The Observer Pattern](https://www.sitepoint.com/javascript-design-patterns-observer-pattern/)

```js
class EventObserver {
  constructor() {
    this.observers = []
  }
  
  subscribe(fn) {
    this.observers.push(fn)
  }
  
  unsubscribe(fn) {
    this.observers = this.observers.filter((subscriber) => {
      return subscriber !== fn
    })
  }
  
  broadcast(data) {
    this.observers.forEach((subscriber) => {
      subscriber(data)
    })
  }
}
```

```js
const observer = new EventObserver()
cosnt fn = data => console.log(data)

observer.subscribe(fn)

observer.broadcast(true)

observer.unsubscribe(fn)
```
