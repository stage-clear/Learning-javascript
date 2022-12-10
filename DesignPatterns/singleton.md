# Singleton

> 同じコンストラクタを使って `new` でオブジェクトを作るとき、シングルトンの実装でやることは、
> まったく同じオブジェクトを指す新しいポインタを取得することだけです。

- [Singleton Desing Pattern](https://sourcemaking.com/design_patterns/singleton)

## 例1) "JavaScript Patterns" での実装

__静的プロパティにインスタンスをキャッシュする__

```js
function Universe() {
  // 既存のインスタンスがあるか?
  if (typeof Universe.instance === 'object') {
    return Universe.instance;
  }

  this.start_time = 0;
  this.bang = 'big';

  // cache
  Universe.instance = this;

  // return this
}

// test
var uni1 = new Universe();
var uni2 = new Universe();

uni1 === uni2 // true
```

__クロージャにインスタンスをキャッシュする__

```js
function Universe() {
  var instance = this;

  this.start_time = 0;
  this.bang = 'big';

  Universe = function() {
    return instance;
  };

  return this;
}

// test
var uni1 = new Universe();
var uni2 = new Universe();

uni1 === uni2 // true
```

クロージャを使った場合、`uni.constructor === Universe` は失敗します。   ちょっとした調整で、プロトタイプとコンストラクタのポインタを期待通りにすることができます。

```js
function Universe() {
  // chaced instance
  var instance = this;

  // rewrite the constructor
  Universe = function() {
    return instance;
  };

  // extend prototype
  Universe.prototype = this;

  // instance
  instance = new Universe();

  // reset the pointer of constructor
  instance.constructor = Universe;

  instance.start_time = 0;
  instance.bang = 'big';

  return instance;
}
```

もうひとつの解決方法として、コンストラクタとプロトタイプを即時関数で包むやり方もあります。

```js
var Universe;

(function() {
  var instance;

  Universe = function Universe() {
    if (instance) {
      return instance;
    }

    instance = this;

    this.start_time = 0;
    this.bang = 'big';
  }
})();
```

## 例2) "JavaScript Design Patterns" での実装

```js
const SingletonTester = (function() {

  function Singleton(options) {
    this.name = 'SingletonTester';
  }

  let instance;

  return {
    name: 'SingletonTester',
    getInstance(options) {
      if (!instance) {
        instance = new Singleton(options);
      }
      return instance;
    }
  }

})();

let sin = SingletonTester.getInstance();
let sin2 = SingletonTester.getInstance();

console.log(sin === sin2);
```

## [Adobe Developer Connection](https://github.com/stage-clear/Learning-javascript/blob/master/DesignPatterns/Adobe-Developer-Connection/singleton.md)
## [Design Patterns Game](https://github.com/stage-clear/Learning-javascript/blob/master/DesignPatterns/designpatternsgame.com/singleton.md)
## [dofactory](https://github.com/stage-clear/Learning-javascript/blob/master/DesignPatterns/dofactory.com/singleton.md)

## ES2015

```js
/**
 * @see https://gist.github.com/ilfroloff/76fa55d041b6a1cd2dbe
 */
const singleton = Symbol('singleton')
export default class Singleton {
  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new this
    }
    
    return this[singleton]
  }
  
  constructor() {
    let Class = new.target
    
    if (!Class[singleton]) {
      Class[singleton] = this
    }
    
    return Class[singleton]
  }
}
```

```js
import Singleton from 'Singleton'

class ClassA extends Singleton {
  constructor() {
    super()
  }
  
  singletonMethod1() {
    //...
  }
  
  singletonMethod2() {
    //...
  }
}

console.log(
  ClassA.instance === ClassA.instance,
  ClassA.instance === new ClassA,
  new ClassA === new ClassA
)
// true, true, true
```
