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

### リモートプロキシ
> リモートプロキシは、仮想プロキシと基本的に同じですが、オリジナルオブジェクトのインスタンス化を遅延させるのではなく、オリジナルオブジェクトはインターネット上のリモートの場所に既に存在しています

```js
let VehicleListProxy = function() {
  this.url = 'http://example.com';
};

VechicleListProxy.prototype = {
  getCar() {
    // Skip the rest of the implementation to just show the
    // important stuff
    ajax(this.url + '/getCar/' + args);
    // Package up the data that you got back and return it
  }
  /*, ... */
}
```

### オリジナルオブジェクトに対するアクセス制御

```js
// Close it off in a function 
(function() {
  // we already know what the VehicleList looks like, so I 
  // won't rewrite it here
  let VehicleList = { /* */ };

  let VehicleListProxy = function() {
    // Don't initialize the VehicleList yet.
    this.vehicleList = null;
    this.date = new Date();
  };
  VehicleListProxy.prototype = {
    // this function is called any time any other
    // function gets called in order to initialize 
    // the VehicleList only when needed. The VehicleList will 
    // not be initalized if it isn't time to yet.
    _initIfTime() {
      if (this._isTime()) {
        if (!this.vehicleList) {
          this.vehicleList = new VehicleList();
        }
        return true;
      }
      return false;
    },

    // Check to see if we've reached the right date yet. 
    _isTime() {
      return this.date > plannedReleaseDate;
    },

    getCar() {
      // if _initIfTime returns a falsey value, getCar will 
      // return a falsey value, otherwise it will continue 
      // and return the expression on the right side of the 
      // && operator 
      return this._initIfTime() && this.vehicleList.getCar(/* ... */);
    }
    /*, ... */
  };

  // Make the VehicleListProxy publicly available
  window.VehicleListProxy = VehicleListProxy;

  // you could also do the below statement so people don't even
  // know the're using a proxy
  window.VehicleList = VechileListProxy;
})();
```
