# Queue

キューとは、先に入力したデータが先に出力されるという特徴をもつ、データ構造の一種。  
ちょうど遊園地の乗り物待ちのような構造になっており、データを入れるときは新しいデータが最後尾につき、データを出すときは一番古いデータが優先して出てくる。

![キューの参考図](http://image.itmedia.co.jp/ait/articles/0809/01/r20algorithm0202.jpg)

- [キュー 【 queue 】 待ち行列](http://e-words.jp/w/%E3%82%AD%E3%83%A5%E3%83%BC.html)
- [データ構造の選択次第で天国と地獄の差 (2/3)](http://www.atmarkit.co.jp/ait/articles/0809/01/news163_2.html)

__実装例1)__
```js
/**
 * Queue
 * @class
 * - first in, first out
 */

class Queue {
  constructor() {
    this.data = [];
  }
  enqueue(value) {
    this.data.push(value);
    return value;
  }
  dequeue() {
    return this.data.shift();
  }
  front() {
    return this.data[0]
  }
  size() {
    return this.data.length;
  }
  empty() {
    return this.data.length === 0;
  }
  dump() {
    return this.data;
  }
}
```

__実装例2)__
```js
/**
 * @class
 */
class Queue {
  constructor() {
    this.elements = new Array();
    this.length = 0;
  }
  enqueue(value) {
    this.elements.enqueue[this.length] = value;
    this.length++;
  }
  dequeue() {
    var value = this.elements[0];
    for (var i in this.elements) {
      if (i === 0) {
        continue;
      }
      this.elements[i - 1] this.elements[i];
    }
    delete this.elements[this.length];
    this.length--;
    return value;
  }
}
```

__実装例3)__
```js
/**
 * @constructor
 * @see http://d.hatena.ne.jp/otaks/20121220/1355993039
 */

function Queue() {
  this.data = [];
}
Queue.prototype.push = function(val) {
  this.data.push(val);
  return val;
};
Queue.prototype.pop = function() {
  return this.data.shift();
};
Queue.prototype.front = function() {
  return this.data[0];
};
Queue.prototype.size = function() {
  return this.length;
};
Queue.prototype.empty = function() {
  return this.data.length === 0;
};

// test
var q = new Queue();
q.push(1); // [] -> [1]
q.push(2); // [1] -> [1,2]
q.front(); // 1
q.push(3); // [1,2] -> [1,2,3]
q.pop(); // [1,2,3] -> [2,3]
q.pop(); // [2,3] -> [3]
q.size(); // 1
q.pop(); // [3] -> []
```
