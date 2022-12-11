# Iterator

## 実装例
```js
var agg = (function() {
  var index = 0;
  var data = [1, 2, 3, 4];
  var length = data.length;

  return {
    next: function() {
      var element;
      if (!this.hasNext()) {
        return null;
      }
      element = data[index];
      index = index + 2;
      return element;
    },

    hasNext: function() {
      return index < length;
    },

    rewind: function() {
      index = 0;
    },

    current: function() {
      return data[index];
    }
  };
})();

// test
while (agg.hasNext()) {
  console.log(agg.next());
}

// return the top
agg.rewind();
console.log(agg.current());
```
