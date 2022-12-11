# [Chain of responsibility](https://www.dofactory.com/javascript/design-patterns/chain-of-responsibility)
## 定義
Chain of Responsibilityパターンは、疎結合のオブジェクトの連鎖を提供し、そのうちの1つが要求を満たすことができます。このパターンは基本的に、特定のリクエストを処理することができるオブジェクトを直線的に探すものです。

```js
var Request = function (amount) {
  this.amount = amount;
  console.log('Requested: $' + amount + '\n');
}

Request.prototype = {
  get: function (bill) {
    var count = Math.floor(this.amount / bill);
    this.amount -= count * bill;
    console.log('Dispense ' + count + ' $' + bill + ' bills');
    return this;
  }
}

function run () {
  var request = new Request(378);
  
  request.get(100).get(50).get(10).get(5).get(1);
}
```
