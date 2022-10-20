# Sandbox

## 実装(JavaScript パターン)
```js
function Sandbox () {
  var args = Array.prototype.slice.call(arguments);
  var callback = args.pop();
  var modules = (args[0] && typeof args[0] === 'string') ? args : args[0];
  var i;
  
  // new なしで呼び出されたときの対処
  if (!(this instanceof Sandbox)) {
    return new Sandbox(modules, callback);
  }
  
  // 必要なら this にプロパティを追加します
  this.a = 1;
  this.b = 2;
  
  // モジュールを this オブジェクトに追加します
  // モジュールの指定なしか * のとき、すべてのモジュールを使います
  if (!modules || modules === '*') {
    modules = [];
    for (i in Sandbox.modules) {
      if (Sandbox.modules.hasOwnProperty(i)) {
        modules.push(i);
      }
    }
  }
  
  // 必要なモジュールを初期化します
  for (i = 0; i < modules.length; i += 1) {
    Sandbox.modules[modules[i]](this);
  }
  
  // コールバックを呼び出します
  if (typeof callback === 'function') {
    callback(this);
  }
}

// 必要に応じて prototype プロパティを設定します
Sandbox.prototype = {
  name: 'My Application',
  version: '1.0',
  getName: function () {
    return this.name;
  }
};
```
