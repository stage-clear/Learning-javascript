# 5. Function Prototype
## 1. Instantiation and Prototypes
### 1.1 Instantiation

```js
function Ninja () {}

Ninja.prototype.swingSword = function () {
  return true;
};

var ninja1 = Ninja();
// -> undefined

var ninja2 = new Ninja();
ninja2.swingSword();
// -> true
```
