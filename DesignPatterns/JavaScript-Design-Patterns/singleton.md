# Singleton

## 実装例
```js
const SingletonTester = (function() {

  function Singleton(options) {
    this.name = 'SingletonTester';
  }

  let instance;

  return {
    name: 'SingletonTester',
    getInstance(options) {
      if (!instance) {
        instance = new Singleton(options);
      }
      return instance;
    }
  }

})();

let sin = SingletonTester.getInstance();
let sin2 = SingletonTester.getInstance();

console.log(sin === sin2);
```
