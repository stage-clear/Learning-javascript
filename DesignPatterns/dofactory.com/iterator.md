# [Iterator](https://www.dofactory.com/javascript/design-patterns/iterator)

## 定義
Iteratorパターンは、クライアントがオブジェクトのコレクションを効率的にループすることを可能にします。

## 実装例
```js
var Iterator = function (items) {
  this.index = 0;
  this.items = items;
};

Iterator.prototype = {
  first: functiono () {
    this.reset();
    return this.next();
  },
  next: function () {
    return this.itmes[this.index++];
  },
  hasNext: function () {
    return this.index <= this.items.length;
  },
  reset: function () {
    this.index = 0;
  },
  each: function (callback) {
    for (var item = this.first(); this.hasNext(); item = this.next()) {
      callback(item);
    }
  }
}

function run () {
  var items = ['one', 2, 'circle', true, 'Applipie'];
  var iter = new Iterator(items);
  
  for (var item = iter.first(); iter.hasNext(); item = iter.next()) {
    console.log(item);
  }
  
  console.log('');
  
  iter.each(function (item) {
    console.log(item);
  });
}
```






