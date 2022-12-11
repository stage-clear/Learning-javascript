# [Decorator](https://www.dofactory.com/javascript/design-patterns/decorator)
## 定義
Decoratorパターンは、オブジェクトの振る舞いを動的に拡張（デコレート）する。
実行時に新しい振る舞いを追加する機能は、元のオブジェクトを「包む」Decoratorオブジェクトによって実現されます。
複数のデコレーターは、元のオブジェクトに機能を追加したり、オーバーライドしたりすることができます。

## 実装例
```js
var User = function (name) {
  this.name = name;
  this.say = function () {
    console.log('User: ' + this.name);
  };
}

var DecoratedUser = function (user, street, city) {
  this.user = user;
  this.name = user.name;
  this.street = street;
  this.city = city;
  
  this.say = function () {
    console.log('Decorated User: ' + this.name + ', ' +
      this.street + ', ' + this.city);
  };
}

function run () {
  var user = new User('Kelly');
  user.say();
  
  var decorated = new DecoratedUser(user, 'Broadway',  'New York');
  decorated.say();
}
```
