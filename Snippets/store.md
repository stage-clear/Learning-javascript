# Store

```js
class Store {
  constructor() {
    this.nextId = 1;
    this.cache = {};
  }
  
  add(func) {
    if (!func.id) {
      func.id = store.nextId++;
      return !!(store.cache[func.id] = func);
    }
  }
}

// test
function ninja() {
}

let store = new Store();

store.add(ninja); // It was added function.
store.add(ninja); // It cannot add "alraedy adding function".
```
