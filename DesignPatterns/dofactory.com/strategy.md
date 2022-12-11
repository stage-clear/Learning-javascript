# [Strategy](https://www.dofactory.com/javascript/design-patterns/strategy)
## 定義
Strategyパターンは、特定のタスクのための代替アルゴリズム（またはストラテジー）をカプセル化します。
これにより、クライアントに気づかれることなく、実行時にメソッドを他のメソッド（ストラテジー）と交換することができます。
基本的に、Strategyは交換可能なアルゴリズムのグループです。

## 実装例

```js
var Shipping = function () {
  this.company = '';
};

Shipping.prototype = {
  setStrategy: function (company) {
    this.company = company;
  },
  
  calculate: function (package) {
    return this.company.calculate(package);
  }
};

var UPS = function () {
  this.calculate = function (package) {
    return '$45.95';
  };
};

var USPS = function () {
  this.calculate = function (package) {
    return '';
  };
};

var Fedex = function () {
  this.calculate = function (package) {
    return '';
  };
};

function run () {
  var package = { from: '76712', to: '10012', weight: 'lkg' };
  
  var ups = new UPS();
  var usps = new USPS();
  var fedex = new Fedex();
  
  var shipping = new Shipping();
  
  shipping.setStrategy(ups);
  console.log('UPS Strategy: ' + shipping.calculate(package));
  shipping.setStrategy(usps);
  console.log('USPS Strategy: ' + shipping.calculate(package));
  shipping.setStrategy(fedex);
  console.log('Fedex Strategy: ' + shipping.calculate(package));
}
