# モジュールパターン
![IMG_772038B55344-1](https://user-images.githubusercontent.com/4797793/222317214-09817e84-1300-4751-92d9-c749048d5da9.jpeg)


```js
let basketModule = (function () {
  let basket = [];
  
  function doSomethingPrivate () {
    // ...
  }

  function doSomethingElsePrivate () {
    // ...
  }
  
  // Public methods
  return {
    addItem: function (value) {
      basket.push(value)
    },
    getItemCount: function () {
      return basket.length;
    },
    doSomething: doSomethingPrivate;
    getTotal: function () {
      let itemCount = this.getItemCount();
      let total = 0;

      while (itemCount--) {
        total += basket[itemCount].price;
      }
      return total;
    }
  };
})();
```

```js
basketModule.addItem({ item: 'bread', price: 0.5 });
basketModule.addItem({ item: 'rice', price: 1.5 });

console.log(basketModule.getTotal());
```
