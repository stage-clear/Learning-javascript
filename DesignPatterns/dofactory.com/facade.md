# [Facade](https://www.dofactory.com/javascript/design-patterns/facade)

## 定義
Façadeパターンは、1つまたは複数のサブシステムの複雑な機能からクライアントを保護するインターフェイスを提供します。
これは単純なパターンであり、些細なことに思えるかもしれないが、強力で非常に有用である。
これは、多層アーキテクチャで構築されたシステムでよく見られます。

```js
var Mortgage = function (name) {
  this.name = name;
};

Mortgage.prototype = {
  applyFor: function (amount) {
    // access multiple subsystem...
    var result = 'approved';
    if (!new Bank().verify(this.name, amount) {
      rersult = 'denied';
    } else if (!new Credit().get(this.name)) {
      result = 'denied';
    } else if (!new Background().check(this.name)) {
      result = 'denied';
    }
    return this.name + ' has been ' + result + 
      ' for a ' + amount + ' mortgage';
  }
}

var Bank = function () {
  this.verify = function (name, amount) {
    // complex logic...
    return true;
  };
};

var Credit = function () {
  this.get = function (name) {
    // complex logic...
    return true;
  };
};

var Background = function () {
  this.check = function (name) {
    // complex logic...
    return true;
  };
};

function run () {
  var mortgage = new Mortgage('Joan Templeton');
  var result = mortgage.applyFor('$100,000');
  
  console.log(result);
}
```
