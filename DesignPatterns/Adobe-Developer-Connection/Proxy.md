# [JavaScript Design Patterns: Proxy](https://www.joezimjs.com/javascript/javascript-design-patterns-proxy/)

```js
var VehicleListProxy = function () {
  this.vehicleList = null;
};

VehicleListProxy.prototype = {
  _init: function () {
    if (!this.vehicleList) {
      this.vehicleList = new VehicleList();
    }
  },
  getCar: function (...) {
    this._init();
    return this.vehicleList.getCar(...);
  },
  ...
};
```
