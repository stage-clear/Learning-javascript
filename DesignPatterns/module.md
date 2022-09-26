# モジュールパターン

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
