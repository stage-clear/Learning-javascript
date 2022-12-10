# コマンドパターン

## JavaScript Design Pattern
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

## [dofactory](https://www.dofactory.com/javascript/design-patterns/command)
```js
function add (x, y) { return x + y; }
function sub (x, y) { return x - y; }
function mul (x, y) { return x * y; }
function div (x, y) { return x / y; }

var Command = function (execute, undo, value) {
  this.execute = execute;
  this.undo = undo;
  this.value = value;
};

var AddCommand = function (value) {
  return new Command(add, sub, value);
};

var SubCommand = function (value) {
  return new Command(sub, add, value);
};

var MulCommand = function (value) {
  return new Command(mul, div, value);
};

var DivCommand = function (value) {
  return new Command(div, mul, value);
};

var Calculator = function () {
  var current = 0;
  var commands = [];
  
  function action (command) {
    var name = command.execute.toString().substr(9, 3);
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  return {
    execute: function (command) {
      current = command.execute(current, command.value);
      commands.push(command);
      console.log(action(command) + ': ' + command.value);
    },
    
    undo: function () {
      var command = commands.pop();
      current = command.undo(current, command.value);
      console.log('Undo ' + action(command) + ': ' + command.value);
    },
    
    getCurrentValue: function () {
      return current;
    }
  }
};

function run () {
  var calculator = new Calculator();
  
  // issue commands
  calculator.execute(new AddCommand(100));
  calculator.execute(new SubCommand(24));
  calculator.execute(new MalCommand(6));
  calculator.execute(new DivCommand(2));
  
  // reverse last two commands
  calculator.undo();
  calculator.undo();
  
  console.log('value: ' + calculator.getCurrentValue());
}
```



