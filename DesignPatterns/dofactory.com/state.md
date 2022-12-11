# [State](https://www.dofactory.com/javascript/design-patterns/state)

## 定義
Stateパターンは、限られたオブジェクトの集合に状態固有のロジックを提供するもので、各オブジェクトは特定の状態を表します。
これは、例で説明するのが一番わかりやすい。

## 実装例
```js
var TrafficLight = function () {
  var count = 0;
  var currentState = new Red(this);
  
  this.change = function (state) {
    // limits number of changes
    if (count++ >= 10) return ;
    currentState = state;
    currentState.go();
  };
  
  this.start = function () {
    currentState.go();
  };
};

var Red = function (light) {
  this.light = light;
  
  this.go = function () {
    console.log('Red --> for 1 minutes');
    light.change(new Green(light));
  };
};

var Yellow = function (light) {
  this.light = light;
  
  this.go = function () {
    console.log('Yellow --> for 10 seconds');
    light.change(new Red(light));
  };
};

var Green = function (light) {
  this.light = light;
  
  this.go = function () {
    console.log('Green --> for 1minute');
    light.change(new Yellow(light));
  };
};

function run () {
  var light = new TrafficLight();
  light.start();
}
```
