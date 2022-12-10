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

```js
var VehicleListProxy = function () {
  this.url = 'http://www.welistallcarmodels.com';
};

VehicleListProxy.prototype = {
  getCar: function (...) {
    ajax(this.url + '/getCar/' + args);
  },
  ...
};
```

```js
(function () {
  var VehicleList = ...
  
  var VehicleListProxy = function () {
    this.vehicleList = null;
    this.date = new Date();
  };

  VehicleListProxy.prototype = {
    _initIfTime: function () {
      if (this._isTime()) {
        if (!this.vehicleList) {
          this.vehicleList = new VehicleList();
        }
        return true;
      }
      return false;
    },
    
    _isTime () {
      return this.date > plannedReleaseDate;
    },
    
    getCar: function () {
      return this._initIfTime() && this.vehicleList.getCar(...);
    },
    ...
  };

  window.vehicleListProxy = VehicleListProxy;
  
  window.VehicleList = VehicleListProxy;
})();





