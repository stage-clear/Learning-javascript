# Decorator

> デコレーターパターンは、他の多くのパターンとはかなり異なります。デコレーターパターンを使用すれば、
> 機能の組み合わせごとにサブクラスを作成することなく、クラスへの機能の追加または変更という問題が解決されます。

## 例1) Adobe Developer Connection での実装
- [JavaScriptデザインパターン – 第2部：アダプター、デコレーター、ファクトリ](http://www.adobe.com/jp/devnet/html5/articles/javascript-design-patterns-pt2-adapter-decorator-factory.html)

```js
// Implementation: Concrete class
var Car = function() {
  console.log('Assemble: build frame, add core parts');
};

// The decorators will also need to implement this interface
// (デコレータには、実装のインターフェイスを必要となります)
Car.prototype = {
  start: function() {
    console.log('The engine starts with roar!');
  },
  drive: function() {
    console.log('Away we go!');
  },
  getPrice: function() {
    return 11000.00;
  }
};
```

```js
// Implementation: Abstract class
// これは抽象化クラスとなるのでクラス自体はインスタンス化しませんが
// 本格的なデコレータを作成するためにサブクラス化する必要があります
var CarDecorator = function(car) {
  // `CarDecorator` コンストラクターは `Car` と同じ
  // インターフェイスを実装するオブジェクトを取ります
  this.car = car;
};

// CarDecorator implements the same interface as Car
CarDecorator.prototype = {
  start: function() {
    this.car.start();
  },
  drive: function() {
    this.car.drive();
  },
  getPrice: function() {
    return this.car.getPrice();
  }
};
```

```js
// Implementation: Decorators
var PowerLocksDecorator = function(car) {
  // Call Parent Constructor
  // Override `this.car` from argument `car`
  CarDecorator.call(this, car);
  console.log('Assemble: add power locks');
};
PowerLocksDecorator.prototype = new CarDecorator();
PowerLocksDecorator.prototype.drive = function() {
  // You can either do this
  this.car.drive();
  // or you can call the parent's drive function:
  // CarDecorator.prototype.drive.call(this);
  console.log('The doors automatically lock');
};

var PowerWindowsDecorator = function(car) {
  CarDecorator.call(this, car);
  console.log('Assemble: add poser windows');
};
PowerWindowsDecorator.prototype = new CarDecorator();
PowerWindowsDecorator.prototype.getPrice = function() {
  return this.car.getPrice() + 200;
};

var AcDecorator = function(car) {
  CarDecorator.call(this, car);
  console.log('Assemble: add A/C unit');
};
AcDecorator.prototype = new CarDecorator();
AcDecorator.prototype.start = function() {
  this.car.start();
  console.log('The cool air starts blowing');
};
AcDecorator.prototype.getPrice = function() {
  return this.car.getPrice() + 600;
};
```

```js
// Usage:
var car = new Car();

// give the car some power windows
car = new PowerWindowsDecorator(car);

// now some power locks and A/C
car = new PowerLocksDecorator(car);
car = new AcDecorator(car);

car.start();
car.drive();
console.log( car.getPrice() );
```

## 例2) JavaScript pattens の実装 

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

## 例3) "JavaScript patterns" での実装 - リストを使った実装
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

## 例4) "JavaScript design patterns" での実装 - 新機能でコンストラクタを装飾

```js
function vehicle(vehicleType) {
  this.vehicleType = vehicleType || 'car';
  this.model = 'default';
  this.license = '0000-000';
}

// デコレートしない vehicle の確認
let testInstance = new vehicle('car');
console.log(testInstance);

// デコレートする vehicle を用意する 
let truck = new vehicle('truck');
// vehcle をデコレートする新機能
truck.setModel = function(modelName) {
  this.model = modelName;
};
truck.setColor = function(color) {
  this.color = color;
};

truck.setModel('CAT');
truck.setColor('blue');
console.log(truck);

// 元の vehicle は変更されない
let secondInstance = new vehicle('car');
console.log(secondInstance);
```

## 例4) "JavaScript design patterns" での実装 - 複数のデコレータでオブジェクトを装飾

```js
// Implementation: Concrete class
function MacBook() {
  this.cost = function() { return 997; }
  this.screenSize = function() { return 11.6; }
}

// Implementation: Decorators class
// Decorator 1
function Memory(macbook) {
  let v = macbook.cost();
  macbook.cost = function() {
    return v + 75;
  };
}

// Decorator 2
function Engraving(macbook) {
  let v = macbook.cost();
  macbook.cost = function() {
    return v + 200;
  };
}

// Decorator 3
function Insurance(macbook) {
  let v = macbook.cost();
  macbook.cost = function() {
    return v + 250;
  };
}

// Usage:
let mb = new MacBook();
Memory(mb);
Engraving(mb);
Insurance(mb);

// 
console.log(mb.cost());
console.log(mb.screenSize());
```

## Links
- [Learning JavaScript: decorator](https://github.com/stage-clear/Learning-javascript/blob/master/Books/978-4-87311-618-1/02/14.md)
