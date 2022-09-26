```js
(function () {

  let CarManager = {
    requestInfo: function (model, id) {
      return 'The information for ' + model + ' with ID ' + id + ' is foobar.'
    },
   
    buyVehicle: function (model, id) {
      return 'You have successfully parchased Item ' + id + ' model.'
    },
    
    arrangeViewing: function (model id) {
      return 'You have successfully booked a viewing of ' + model + '(' + id + ')'
    }
  }
  
  CarManager.execute = function (name) {
    return CarManager[name] &&
      CarManager[name].apply(CarManager, [].slice.call(arguments, 1))
})();
```

```js
CarManager.execute('buyVehicle', 'Ford Escort', '45345')
```

