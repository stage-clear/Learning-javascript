# Decorator

```js
// Implementation:
function Sale(price) {
  this.price = price || 100;
}
Sale.prototype.getPrice = function() {
  return this.price;
};

// Implementation: decorators
Sale.decorators = {};
Sale.decorators.fedtax = {
  getPrice: function() {
    var price = this.uber.getPrice();
    price += price * 5 / 100;
    return price;
  }
};
Sale.decorators.quedec = {
  getPrice: function() {
    var price = this.uber.getPrice();
    price += price * 7.5 / 100;
    return price;
  }
}
Sale.decorators.money = {
  getPrice: function() {
    return `$${this.uber.getPrice().toFixed(2)}`;
  }
};
Sale.decorators.cdn = {
  getPrice: function() {
    return `CDN$${this.uber.getPrice().toFixed(2)}`;
  }
};

// Implementaion: decorate method
Sale.prototype.decorate = function(decorate) {
  var F = function() {};
  var overrides = this.constructor.decorators[decorator];
  var i, newobj;
  
  F.prototype = this;
  newobj = new F();
  newobj.uber = F.prototype;
  
  for (i in overrides) {
    if (overrides[i].hasOwnProperty(i)) {
      newobj[i] = overrides[i];
    }
  }
  return newobj;
};

// Usage:
var sale = new Sale(100); // 価格は 100ドル
sale = sale.decorate('fedtax'); // 連邦税を追加
sale = sale.decorate('quedec'); // 地方税を追加
sale = sale.decorate('money'); // 金額を書式化
sale.getPrice(); // "$112.88"

var sale = new Sale(100); // 価格は100ドル
sale = sale.decorate('fedtax'); // 連邦税を追加
sale = sale.decorate('cdn'); // CDN で書式化
sale.getPrice(); // "CDN$ 105.00"
```

## リストを使った実装
JavaScript の動的性質を利用すれば、継承をいっさい使わずにすみます。
```js
// Implementation: Concrete class
// Sale() コンストラクタはデコレータのリストを持ちます
function Sale(price) {
  this.price = price || 100;
  this.decorators_list = [];
}

// Implementation: Decorators
Sale.decorators = {};
Sale.decorators.fedtax = {
  getPrice: function(price) {
    return price + price * 5 / 100;
  }
};
Sale.decorators.quedec = {
  getPrice: function(price) {
    return price + price * 7.5 / 100;
  }
};
Sale.decorators.money = {
  getPrice: function(price) {
    return `$${price.toFixed(2)}`
  }
};

// Implementation: #decorate()
Sale.prototype.decorate = function(decorator) {
  this.decorators_list.push( decorator );
};

// Implementation: #getPrice()
Sale.prototype.getPrice = function() {
  var price = this.price;
  var i, max = this.decorators_list.length;
  var name;

  for (i = 0; i < max; i += 1) {
    name = this.decorators_list[i];
    price = Sale.decorators[name].getPrice(price);
  }
  return price;
};

// Usage:
var sale = new Sale(100); // 価格は100ドル
sale.decorate('fedtax'); // 連邦税を追加
sale.decorate('quedec'); // 地方税を追加
sale.decorate('money'); // 金額用の書式に設定
console.log(`> ${sale.getPrice()}`);
```
