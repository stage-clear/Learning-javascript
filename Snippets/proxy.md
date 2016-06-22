# Proxy

## 例1) "Adobe Developer Connection" での実装
### 仮想プロキシ
> 本当に必要になるまで、大きなオブジェクトのインスタンス化を遅らせる
```js
let VehicleList = {
  // Origin object
};

let VehicleListProxy = function() {
  this.vehicleList = null;
};

VehicleListProxy.prototype = {
  _init() {
    if (!this.vehicleList) {
      that.vehicleList = new VehicleList(); // <-
    }
  },
  getCar() {
    this._init(); // <-
    return this.vehicleList.getCar(arguments);
  }
  /* ... */
};
```
