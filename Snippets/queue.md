# Queue

キューとは、先に入力したデータが先に出力されるという特徴をもつ、データ構造の一種。  
ちょうど遊園地の乗り物待ちのような構造になっており、データを入れるときは新しいデータが最後尾につき、データを出すときは一番古いデータが優先して出てくる。

![キューの参考図](http://image.itmedia.co.jp/ait/articles/0809/01/r20algorithm0202.jpg)

```js
/**
 * Queue
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

## 参考

- [キュー 【 queue 】 待ち行列](http://e-words.jp/w/%E3%82%AD%E3%83%A5%E3%83%BC.html)
- [データ構造の選択次第で天国と地獄の差 (2/3)](http://www.atmarkit.co.jp/ait/articles/0809/01/news163_2.html)
