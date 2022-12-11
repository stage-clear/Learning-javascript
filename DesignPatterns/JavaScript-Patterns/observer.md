# Observer
既存のオブジェクトにオブサーバーの機能をミックスインする

## 実装例

```js
const publisher = {
  subscribers: {
    any: [] // イベントの型: 購読者の配列
  },

  subscribe(fn, type) {
    type = type || 'any';
    if (typeof this.subscribers[type] === 'undefined') {
      this.subscribers[type] = [];
    }
    this.subscribers[type].push(fn);
  },

  unsubscribe(fn, type) {
    this.visitSubscribers('unsubscribe', fn, type);
  },

  publish(publication, type) {
    this.visitSubscribers('publish', publication, type);
  },

  visitSubscribers(action, arg, type) {
    let pubtype = type || 'any';
    let subscribers = this.subscribers[pubtype];
    let i;
    let max = subscribers.length;

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

// o に publisher のプロパティを継承します
function makePublisher(o) {
  let i ;
  for (i in publisher) {
    if (publisher.hasOwnProperty(i) && typeof publisher[i] === 'function') {
      o[i] = publisher[i];
    }
  }
  o.subscribers = { any: [] };
}
```

### 2
```js
// paper オブジェクトは、日刊と月刊の発行を提供します
let paper = {
  daily() {
    this.publish('big news today');
  },
  monthly() {
    this.publish('interesting analysis', 'monthly');
  }
};

// paper will be became "Publisher".
makePublisher(paper);
```

### 3
```js
// Jos is "Subscriber"" 
let joe = {
  drinkCoffee(paper) {
    console.log('Just read ' + paper);
  },
  sundayPreNap(monthly) {
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
joe.tweet = function(msg) {
  this.publish(msg);
};

// paper が　joe を購読する
paper.readTweets = function(tweet) {
  alert('Call big meeting! Someone ' + tweet); 
};
joe.subscribe(paper.readTweets);

// test
joe.tweet('hated the paper today');
```
