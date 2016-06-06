### 2.1 [コンストラクタパターン](1.md)
### 2.2 [モジュールパターン](2.md)
### 2.3 [リビーリングモジュールパターン](3.md)
### 2.4 [シングルトンパターン](4.md)
### 2.5 [オブザーバパターン](5.md)
### 2.6 [メディエータパターン](6.md)
### 2.7 [プロトタイプパターン](7,md)
### 2.8 [コマンドパターン](8.md)
### 2.9 [ファサードパターン](9.md)
### 2.10 [ファクトリパターン](10.md)

オブジェクトやコンポーネントを作成するメソッドがサブクラス化される ExtJS のようなUIライブライブラリに, このパターンの実例が見られます.

```javascript
// Type.js - 裏で使われるためのコンストラクタ

// 新しい車を定義するためのコンストラクタ
function Car(options) {
  // デフォルト
  this.doors = options.doors || 4;
  this.wheelSize = options.wheelSize || 'brand new';
  this.color = options.color || 'silver';
}

// 新しいトラックを定義するためのコンストラクタ
function Truck(options) {
  this.state = options.state || 'used';
  this.wheelSize = options.wheelSize || 'large';
  this.color = options.color || 'blue';
}
```

```javascript
// FactoryExample.js
function VehicleFactory() {}

// 新しいVehicleインスタンスを作成するためのファクトリメソッド
VehicleFactory.prototype.createVehicle = function(options) {
  if (options.vehicleType === 'car') {
    this.vehicleClass = Car;
  } else {
    this.vehicleClass = Truck;
  }
  return new this.vehicleClass(options);
};

// 車を作成するファクトリのインスタンスを作成
var carFactory = new VehicleFactory();
var car = carFactory.createVehicle({
  vehicleType : 'car',
  color: 'yellow',
  doors: 6
});
```
__ファクトリパターンを適用すべき状況__  

- オブジェクトやコンポーネントの設定がかなり複雑であるとき
- 状況に応じて異なる種類のオブジェクトのインスタンスを簡単に作成しなければならないとき
- 同じプロパティを共有する大量の小さなオブジェクトやコンポーネントを扱うとき
- API規約を満足させる（いわゆるダックタイピング）ためだけに必要なオブジェクトのインスタンスでオブジェクトを構成するとき（これは疎結合の実現に役立つ）

__ファクトリパターンを適用すべきではない状況__  

- オブジェクト生成のインターフェイスを作成することが開発中のライブラリやフレームワークの設計目標である場合を除き, 不要なオーバーヘッドが生じるのを避けるために, 明示的にコンストラクタを使うことをおすすめします.

__抽象ファクトリ__  

個々のファクトリを共通の目的でグループ化しカプセル化します. 

```javascript
var AbstractVehicleFactory = (function(){
  // 車種別の保存場所
  var types = {};

  return {
    getVehicle: function(type, customizations) {
      var Vehicle = types[type];

      return (Vehicle) ? return new Vehicle(customizations) : null;
    },

    registerVehicle: function(type, Vehicle) {
      var proto = Vehicle.prototype;

      // vehicle 規約を満足するクラスを登録する
      if (proto.drive && proto.breakDown) {
        types[type] = Vehicle;
      }
      return AbstractVehicleFactory;
    }
  }
})();

// 使用例
AbstractVehicleFactory.registerVehicle('car', Car);
AbstractVehicleFactory.registerVehicle('truck', Truck);

// 乗り物の抽象型をもとに新しい車のインスタンスを作成
var car = AbstractVehicleFactory.getVehicle('car', {
  color: 'lime green',
  state: 'like new'
});

// 同様に新しいトラックのインスタンスを作成
var truck = AbstractVehicleFactory.getVehicle('truck', {
  wheelSize: 'medium',
  color: 'neon yellow'
});
```

### サブクラス化

伝統的なオブジェクト指向言語では, クラスBは他のクラスAを拡張できます. 
このとき, AはBのスーパークラス, BはAのサブクラスと言います.

```javascript
// スーパークラス
var Person = function(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.gender = 'male';
};

// Person の新規インスタンスは以下のようにして簡単に作成できる
var clark = new Person('Clark', 'Kent');

// Superhero のためにサブクラスコンストラクタを定義
var Superhero = function(firstName, lastName, pwers) {
  // 新規オブジェクトでスーパークラスのコンストラクタを呼び出す
  // 次に .call() を使って, オブジェクトのメソッドとしてコンストラクタを呼び出し
  // オブジェクトを初期化する

  Person.call(this, firstName, lastName);

  // 最後に Person にはない特徴であるパワーを意味する新しい配列を保持する
  this.powers = powers;
};

Superhero.prototype = Object.create(Person.prototype);
var superman = new Superhero('Clack', 'Kent', ['flight', 'heat-vision']);
console.log(superman)

// Person の属性と同様にパワーも出力する
```

### 2.11 ミックスインパターン
### 2.13 ミックスイン
ミックスインにより, オブジェクトは複雑性を最小限に抑えて他オブジェクトから機能を借りる（または継承する）ことができます.

```javascript
// 標準的なオブジェクトリテラルの中でユーティリティ関数を含むミックスインを定義する
var myMixins = {
  moveUp: function() {
    console.log('move up');
  },
  moveDown: function() {
    console.log('move down');
  },
  stop: function() {
    console.log('stop! in the name of love!');
  }
};

// carAnimator コンストラクタのスケルトン（骨組み）
function carAnimator() {
  this.moveLeft = function() {
    console.log('move left');
  };
}

// personAnimatorコンストラクタのスケルトン
function personAnimator() {
  this.moveRandomly = function() {
    // ...
  }
}

// ミックスインで両方のコンストラクタを拡張
_.extend(carAnimator.prototype, myMixins);
_.extend(personAnimator.prototype, myMixins);

// 新しい carAnimator のインスタンスを作成
var myAnimator = new carAnimator();
myAnimator.moveLeft();
myAnimator.moveDown();
myAnimator.stop();

// 出力
// move left
// move down
// stop! in the name of love!

// このようにまったく平凡な方法で, 共通の振る舞いをオブジェクトコンストラクタに簡単に混ぜ入れる（ミックスインする）ことできます.
```

次の例では, すべてのコンスタラクタ関数についてこのプロセスを繰り返す必要なくコンストラクタを拡張して機能を取り込む方法を説明しています.

```javascript
// シンプルなCarコンストラクタを定義
var Car = function(settings) {
  this.model = settings.model || 'no model provided';
  this.color = settings.color || 'no color provided';
};

// ミックスイン
var Mixin = function() {};

Mixin.prototype = {
  driveForward: function() {
    console.log('drive forward');
  },
  driveBackward: function() {
    console.log('drive backward');
  },
  driveSideways: function() {
    console.log('drive sideways');
  }
};

// 既存オブジェクトを拡張して他のオブジェクトのメソッドを追加する
function augment(receivingClass, givingClass) {

  // 特定のメソッドだけを提供
  if (arguments[2]) {
    for (var i = 2, len = arguments.length; i < len; i++) {
      receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
    }
  }
  // すべてのメソッドを提供
  else {
    for (var methodName in givingClass.prototype) {
      // 現在処理中のものと同盟のメソッドを receiving class が持っているか確認
      if (!Object.hasOwnProperty(receivingClass.prototype, methodName)) {
        receivingClass.prototype[methodName] = givingClass.prototype[methodName];
      }

      // 代替案
      // if (!receivingClass.prototype[methodName]) {
      //   receivingClass.prototype[methodName] = givingClass.prototype[methodName];
      // }
    }
  }
}

// Carコンストラクタを拡張して dirvieForward と driveBackward を取り込む
augment(Car, Mixin, 'driveForward', 'driveBackward');

// 新しい Car を作成
var myCar = new Car({
  model: 'Ford Escort',
  color: 'blue'
});

// 今はメソッドにアクセスできることを確かめる
myCar.driveForward();
myCar.driveBackward();

// 取り込む対象の関数のリストを明示的に作成せずミックスインからすべての関数を取り込むように
// Car を拡張する
augment(Car, Mixin);

var mySportsCar = new Car({
  model: 'prsche',
  color: 'red'
});

mySportsCar.driveSideways();

// 出力
// drive sideways
```

#### 利点と欠点
- システム内での昨日の重複は減り, 関数の最良が進む
- オブジェクトの書くインスタンス感で共通の振る舞いをする必要がある場合に, 共通機能をミックスインの中で管理し, システム固有の機能の実装に集中することにより, 重複を簡単に防ぐことができます.
- 欠点には少し議論の余地があります. プロトタイプに機能を追加することを, プロトタイプ汚染や関数の出処が不明になることを理由に良くないと言う人もいます

### 2.14 デコレータパターン
デコレータはコードの再利用を目的とした構造に関するデザインパターンです.
ミックスインと同様に, デコレータもオブジェクトのサブクラス化の方法の1つと考えることができます.

デコレータパターンは, オブジェクトの作成の仕方には強く結びついていません.
代わりに機能を拡張する上での問題に注目します.

```javascript
// 新機能でコンストラクタを装飾
// vehicleコンストラクタ
function vehicle(vehicleType) {
  // デフォルトを設定
  this.vehicleType = vehicleType || 'car';
  this.model = 'default';
  this.license = '0000-000';
}

// 基本的な vehicle の確認
var testInstance = new vehicle('car');
console.log(testInstance);

// 出力
// vehicle: car, model:default, license: 0000-000

// vehicle のインスタンスを新に作成し, 装飾する
var truck = new vehicle('truck');

// vehicle を装飾する新機能
truck.setModel = function(modelName) {
  this.model = modelName;
};
truck.setColor = function(color) {
  this.color = color;
}

// セッターと代入が正常に動作するか確認
truck.setModel('CAT');
truck.setColor('blue');

console.log(truck);

// vehicleがまだ変更されていないことを示す
var secondInstance = new vehicle('car');
console.log(secondInstance);


// 復数のデコレータでオブジェクトを装飾
// 装飾されるオブジェクトのコンストラクタ
function MacBook() {
  this.cost = function() {
    return 997;
  };
  this.screenSize = function() {
    return 11.6;
  };
}

// デコレータ1
function Memory(macbook) {
  var v = macbook.cost();
  macbook.cost = function() {
    return v + 75;
  };
}

// デコレータ2
function Engraving(macbook) {
  var v = macbook.cost();
  macbook.cost = function() {
    return v + 200;
  };
}

// デコレータ3
function Insurance(macbook) {
  var v = macbook.cost();
  macbook.cost = function() {
    return v + 250;
  };
}

var mb = new MacBook();
Memory(mb);
Engraving(mb);
Insurance(mb);

// テスト
console.log(mb.cost());
console.log(mb.screenSize());
```
この例では, 実際には__インターフェイス__を定義せず, 作りてから受けてに移るときにオブジェクトがインターフェイスに適合するかを確かめる席にんを避けています.

### 2.15 擬古典的デコレータ

これまでの例とは違って, 他のプログラミング言語（JavaやC++など）での「インターフェイス」の概念を使ったデコレータの実装方法に忠実です.
PJDPではデコレータパターンを, 「オブジェクトを同じインターフェイスを持つ他のオブジェクトの中に透明にラップするために使うもの」と述べています.
インターフェイスとは, オブジェクトが備えるべきメソッドを定義する方法のこと.

```javascript
// ダックタイピングを使って JavaScript にインターフェイスを実装した例
// インターフェイス名と公開スケルトンメソッドを受け取る定義済みインターフェイス
// コンストラクタを利用してインターフェイスを作成する.

// Constructor.
var Interface = function (name, methods) {
  if (arguments.length != 2) {
    throw new Error("Interface constructor called with " + arguments.length + "arguments, but expected exactly 2.");
  }
  this.name = name;
  this.methods = [];
  for (var i = 0, len = methods.length; i < len; i++) {
    if (typeof methods[i] !== 'string') {
      throw new Error("Interface constructor expects method names to be " + "passed in as a string.");
    }
    this.methods.push(methods[i]);
  }
};


// Static class method.
Interface.ensureImplements = function (object) {
  if (arguments.length < 2) {
    throw new Error("Function Interface.ensureImplements called with " + arguments.length + "arguments, but expected at least 2.");
  }

  for (var i = 1, len = arguments.length; i < len; i++) {
    var interface = arguments[i];
    if (interface.constructor !== Interface) {
      throw new Error("Function Interface.ensureImplements expects arguments" + "two and above to be instances of Interface.");
    }
    for (var j = 0, methodsLen = interface.methods.length; j < methodsLen; j++) {
      var method = interface.methods[j];
      if (!object[method] || typeof object[method] !== 'function') {
        throw new Error("Function Interface.ensureImplements: object " + "does not implement the " + interface.name + " interface. Method " + method + " was not found.");
      }
    }
  }
};

// summary() と placeOrder() はインターフェイスがサポートすべき機能を表す
var reminder = new Interface('List', ['summary', 'placeOrder']);

var properties = {
  name: 'Remember to buy the milk',
  date: '05/06/2016',
  actions: {
    summary: function() {
      return 'Remember to buy the milk, we are almost out!';
    },
    placeOrder: function() {
      return 'Ordering milk from your local grocery store';
    }
  }
};

// ここで上記のプロパティとメソッドを実装するコンストラクタを作成する

function Todo(config) {
  // サポートを期待するメソッドを宣言する
  // Interface のインスタンスと同様にチェックされる.
  Interface.ensureImplements(config.actions, reminder);

  this.name = config.name;
  this.methods = config.actions;
  console.log(this.methods);
}

// Todo コンストラクタの新しいインスタンスを作成する

var todoItem = new Todo(properties);

// 最後に, これらの機能の正常性を確認する
console.log(todoItem.methods.summary() );
console.log(todoItem.methods.placeOrder() );
```

インターフェイスに関する最大の問題は, JavaScriptにはインターフェイスのサポートが組み込まれていない点です.
このため, 他の言語の機能を真似るときには, JavaScript では完全には適合しないかもしれないので, 危険があります.
とはいえ, 軽量インターフェイスを使うことで大きな性能コストを負わずに済みます. 

#### 2.15.2 抽象デコレータ

```javascript
var MacBook = function() {
  //...
};

// 次の例では,
// デコレータが構成要素を透過的に包み込み, 同じインターフェイスを使っているため,
// 面白いことに互いにやりとりできる
var Macbook = new Interface('Macbook', [
  'addEngraving',
  'addParallels',
  'add4GBRam',
  'add8GBRam',
  'addCase'
]);

// Macbook Pro は次のように表される
var MacbookPro = function() {
  // Macbook を実装
};

MacbookPro.prototype = {
  addEngraving: function() {
  },
  addParallels: function() {
  },
  add4GBRam: function() {
  },
  add8GBRam: function() {
  },
  addCase: function() {
  },
  getPrice: function() {
    // 基本価格
    return 900.00;
  }
};

// Macbook デコレータの抽象デコレータクラス
// Macbook デコレータがオブジェクトを取り構成要素として使う
var MacbookDecorator = function(macbook) {
  // 構成要素にある同じメソッドを呼び出す
  // Macbook デコレータを使うだけでオプションのクラスを作成できます.
  Interface.ensureImplements(macbook, macbook);
  this.macbook = macbook;
};

MacbookDecorator.prototype = {
  addEngraving: function() {
    return this.macbook.addEngraving();
  },
  addParallels: function() {
    return this.macbook.addParallels();
  },
  add4GBRam: function() {
    return this.macbook.add4GBRam();
  },
  add8GBRam: function() {
    return this.macbook.add8GBRam();
  },
  addCase: function() {
    return this.macbook.addCase();
  },
  getPrice: function() {
    return this.macbook.getPrice();
  }
};

var CaseDecorator = function(macbook) {
  // スーパークラスのコンストラクタを呼び出す
  this.supreclass.constructor(macbook);
  // (動作しない。どこで定義されているのか...)
};

// スーパークラスを拡張する
extend(CaseDecorator, MacbookDecorator);

CaseDecorator.prototype.addCase = function() {
  return this.macbook.addCase() + 'Adding case to macbook';
};

CaseDecorator.prototype.getPrice = function() {
  return this.macbook.getPrice() + 45.00;
};

// テスト
// Macbook のインスタンスを作成
var myMacbookPro = new MacbookPro();
// -> 900.00

// Macbook を装飾
myMacbookPro = new CaseDecorator(myMacbookPro);

console.log(myMacbookPro.getPrice());
// -> 945.00
```

### 2.16 jQueryを使ったデコレータ

__jQueryでのデコレータの実装例__  
`$.extend()` を使えば, 実行時もしくはある一点で動的に, 2つ以上のオブジェクト（とそれらのプロパティ）を1つのオブジェクトに拡張（またはマージ） することができます.

```javascript

// defaults, options, settings の3つのオブジェクトを定義
// defaults を装飾して options settiins にある機能を新に追加します
var decoratorApp = decoratorApp || {};

// これから仕様するオブジェクトを定義する
decoratorApp = {
  defaults: {
    validate: false,
    limit: 5,
    name: 'foo',
    welcome: function() {
      console.log('hello, world');
    }
  },
  options: {
    validate: true,
    name: 'bar',
    helloWorld: function() {
      console.log('hello world');
    }
  },
  settings: {},
  printObj: function(obj) {
    var arr = [];
    var next;
    $.each(obj, function(key, val) {
      next = key + ': ';
      next += $.isPlainObject(val) ? printObj(val) : val;
      arr.push(next);
    });
    return '{' + arr.join(', ') + '}';
  }
};

// defaults を明示的に変更することなく, defaults と options をマージする.
decoratorApp.settings = $.extend({}, decoratorApp.defaults, decoratorApp.options);

// ここでは, defaultを装飾して, 必要なプロパティや機能に
// （デコレータ[options]と同様に）アクセスできるようにした.
// default 自体は変更されていない
$('#log').append(
  decoratorApp.printObj(decoratorApp.settings) +
  decoratorApp.printObj(decoratorApp.options) +
  decoratorApp.printObj(decoratorApp.defaults)
);
```

### 2.17 デコレータパターンの利点と欠点
__利点__  

- 透過的に使用できて, かつかなり柔軟であるため, 開発者はこのパターンを好んで利用します.
- オブジェクトは新しい振る舞いで包まれ（装飾され）, 基底オブジェクトが変更されることを心配せず使い続けられる
- 多くのサブクラスに依存することを避けつつ, それと同じ恩恵を受けることができる

__欠点__  

- 小さく似通ったオブジェクトをたくさん名前空間に取り込むので, 下手扱うと設計が複雑化し管理しづらくなる
- なぜそのパターンが使われているのかをパターンに不慣れな開発者が把握するのに苦労するかもしれない

### フライウェイトパターン
フライウェイトパターンは, 構造に関する伝統的な解決策です.
繰り返される低速で非効率なデータ共有を行うコードを最適化します.

__目的__  

できるだけ多くのデータ（アプリケーションの設定, 状態など）を関連するオブジェクトと共有することにより,
アプリケーション内でのメモリ使用量を抑えることを目的としています.

フライウェイトでのデータ共有は, 実際には, 多くのオブジェクトで利用される類似のオブジェクトやデータ構造を特定し, これらのデータを1つの外部オブジェクトにまとめることで実現します.

1. データ層での実装

フライウェイトパターンには, intrinsic状態（本質的な状態）と, extrinsic状態（非本質的な状態）の2つの状態の概念があります.
オブジェクトの内部メソッドが intrinsicな情報を必要としていて, これなしでは全く機能しない場合があります.
一方 extrinsic な情報は削除や外部に保存することができます.

__フライウェイト__

フライウェイトはインターフェイスに相当します.
このインターフェイスを通して, フライウェイトは extrinsic 状態をもとに受信したり振る舞ったりできます

__具象フライウェイト__

具象フライウェイトは実際にフライウェイトインターフェイスを実装し, intrinsic 状態を保存します.
具象フライウェイトは共有可能かつ extrinsic 状態を操作できなければなりません.

__フライウェイトファクトリ__

フライウェイトファクトリはフライウェイトオブジェクトの管理, 作成を行います.
フライウェイトが共有されていることを確認し, 個々のインスタンスが必要なときには問い合わせることのできるオブジェクトの
グループとしてフライウェイトを管理します

- CoffeeOrder: フライウェイト
- CoffeeFlavor: 具象フライウェイト
- CoffeeOrderContext: ヘルパー
- CoffeeFlavorFactory: フライウェイトファクトリ
- CoffeeFlyWeight: フライウェイトを活用

#### 2.18.4 ダックパンチングによる実装

- implements は JavaScript に組み込まれていない
- Function.prototype.implementsFor はオブジェクトコンストラクタで動作し, 親クラス（関数）あるいはオブジェクトを受け取ります. そして, （関数に対しては）通常の継承の仕方で（オブジェクトに対しては）仮想継承によってこれを継承します.

```javascript

// 純粋仮想継承(JavaScript用の implement キーワード)をシミュレートする
Function.prototype.implementsFor = function(parentClassOrObject) {
  if (parentClassOrObject.constructor === Function) {
    // 通常の継承
    this.prototype = new parentClassOrObject();
    this.prototype.constructor = this;
    this.prototype.parent = parentClassOrObject.prototype;
  } else {
    // 純粋仮想継承
    this.prototype = parentClassOrObject;
    this.prototype.constructor = this;
    this.prototype.parent = parentClassOrObject;
  }

  return this;
};


// フライウェイトオブジェクト
var CoffeeOrder = {
  // インターフェイス
  serveCoffee: function(context) {},
  getFlavor: function() {}
};

// 具象フライウェイトオブジェクトを作成する具象フライウェイトオブジェクト
// CoffeeFlavor を実装する
function CoffeeFlavor(newFlavor) {
  var flavor = newFlavor;

  // 機能に対するインターフェイスが定義されていればその機能を実装する
  if (typeof this.getFlavor === 'function') {
    this.getFlavor = function(){
      return flavor;
    };
  }

  if (typeof this.serveCoffee === 'function') {
    this.serveCoffee = function(context) {
      console.log('Serving Coffee flavor' + flavor + ' to table number' + context.getTable());
    };
  }
}

// CoffeeOrder のためのインターフェイスを実装する
CoffeeFlavor.implementsFor(CoffeeOrder);

// コーヒーの注文を受けたテーブルの番号を扱う
function CoffeeOrderContext(tableNumber) {
  return {
    getTable : function() {
      return tableNumber;
    }
  };
}

// フライトウェイトファクトリオブジェクト
function CoffeeFlavorFactory() {
  var flavors = [];

  return {
    getCoffeeFlavor: function(flavorName) {
      var flavor = flavors[flavorName];
      if (flavor === undefined) {
        flavor = new CoffeeFlavor(flavorName);
        flavors.push([flavorName, flavor]);
      }
      return flavor;
    },
    getTotalCoffeeFlavorsMade: function() {
      return flavors.length;
    }
  };
}

// テスト
testFlyweight();

function testFlyweight() {
  // 注文されたコーヒーの種類
  var flavors = new CoffeeFlavor();

  // 注文があったテーブル
  var tables = new CoffeeOrderContext();

  // 注文数
  var ordersMade = 0;

  // CoffeeFlavorFactory インスタンス
  var flavorFactory;

  function takeOrders(flavorIn, table) {
    flavors[ordersMade] = flavorFactory.getCoffeeFlavor(flavorIn);
    tables[ordersMade++] = new CoffeeOrderContext(table);
  }

  flavorFactory = new CoffeeFlavorFactory();

  takeOrders('Cappuccino', 2);
  takeOrders('Cappuccino', 2);
  takeOrders('Frappe', 1);
  takeOrders('Frappe', 1);
  takeOrders('Xpresso', 1);
  takeOrders('Frappe', 897);
  takeOrders('Cappuccino', 97);
  takeOrders('Cappuccino', 97);
  takeOrders('Frappe', 3);
  takeOrders('Xpresso', 3);
  takeOrders('Frappe', 3);
  takeOrders('Xpresso', 3);

  for (var i=0; i<ordersMade; i++) {
    flavors[i].serveCoffee(tables[i]);
  }

  console.log('--- --- ---');
  console.log('total coffeeFlavor objects made: ' + flavorFactory.getTotalCoffeeFlavorsMade());
}
```

#### 2.18.5 コードを変換してフライウェイトを利用する

__図書館のすべての本を管理するシステムを実装__  

図書に関するメタデータ

- ID
- タイトル
- 著者
- ページ数
- 発行者ID
- ISBN
- checkoutDate
- checkoutMember
- dueReturnDate
- availability

```javascript
var Book = function(id, title, author, genre, pageCount, publisherID, ISBN, checkoutDate, checkoutMember, dueReturnDate, availability) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.pageCount = pageCount;
  this.publisherID = publicherID;
  this.ISBN = ISBN;
  this.checkoutDate = checkoutDate;
  this.checkoutMember = checkoutMember;
  this.dueReturnDate = dueReturnDate;
  this.availability = availability;
};

Book.prototype = {
  getTitle: function() {
    return this.title;
  },
  getAuthor: function() {
    return this.author;
  },
  getISBN: function() {
    return this.ISBN;
  },
  // 簡潔に表すため, 他のゲッターは省略
  updateCheckoutStatus: function(bookID, newStatus, checkoutDate, checkoutMember, newReturnDate) {
    this.id = bookID;
    this.availability = newStatus;
    this.checkoutDate = checkoutDate;
    this.checkoutMember = checkoutMember;
    this.dueReturnDate = newReturnDate;
  },
  extendCheckoutPeriod: function(bookID, newReturnDate) {
    this.id = bookID;
    this.dueReturnDate = newReturnDate;
  },
  isPastDue: function(bookID) {
    var currentDate = new Date();
    return currentDate.getTime() > Date.parse(this.dueReturnDate);
  }
};
```
このやり方は, おそらくはじめのうちは本の数が少なければいまくいくでしょうが, 蔵書が増えていくにつれて
管理システムの実行速度が徐々に遅く感じられるようになるかもしれません.
フライウェイトを利用することで, システムを最適化することができます.

```javascript
// データを intrinsic状態と extrinsic状態に分類します.
// title, authorなどはintrinsic状態, 貸出データはextrinsic状態とみなされます.
// 最適化されたバージョンのフライウェイト
var Book = function(title, author, genre, pageCount, publisherID, ISBN) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.pageCount = pageCount;
  this.publisherID = publisherID;
  this.ISBN = ISBN;
};

// Book Factory シングルトン
var BookFactory = (function(){
  var existingBooks = {};
  var existingBook;

  return {
    createBook: function(title, author, genre, pageCount, publisherID, ISBN) {
      // 注目した本のメタデータの組み合わせが以前に作成されたかを調べる
      // !!により強制的に真偽値を返す
      existingBook = exisringBooks[ISBN];
      if (!!existingBook) {
        return existingBook;
      } else {
        // 作成されていなければ, 新しい本のインスタンスを作成し保存する
        var book = new Book(title, author, genre, pageCount, publiserID, ISBN);
        existingBooks[ISBN] = book;
        return book;
      }
    }
  };
})();

// BookRecordManage シングルトン
var BookRecordManager = (function() {
  var bookRecordDatabase = {};

  return {
    // 図書館システムに新しい本の情報を追加
    addBookRecord: function(id, title, author, genre, pageCount, publisherID, ISBN, checkoutDate, checkoutMember, dueReturnDate, availability) {
      var book = bookFactory.createBook(title, author, genre, pageCount, publisherID, ISBN);
      bookRecordDatabase[id] = {
        checkoutMember: checkoutMember,
        checkoutDate: checkoutDate,
        dueReturnDate: dueReturnDate,
        availability: availability,
        book: book
      };
    },
    updateCheckoutStatus: function(bookID, newStatus, checkoutDate, checkoutMember, newReturnDate) {
      var record = bookRecordDatabase[bookID];
      record.availability = newStatus;
      record.checkoutDate = checkoutDate;
      record.checkoutMember = checkoutMember;
      record.dueReturnDate = newReturnDate;
    },
    extendCheckoutPeriod: function(bookID, newReturnDate) {
      bookRecordDatabase[bookID].dueReturnDate = newReturnDate;
    },
    isPastDue: function(bookID) {
      var currentDate = new Date();
      return currentDate.getTime() > Date.parse(bookRecordDatabase[bookID].dueReturnDate);
    }
  };

});
```

#### 2.18.8 フライウェイトとDOM

```html
<div id="container">
  <div class="toggle" href="#">
    More Info(Address)
    <span class="info">
      This is more information
    </span>
  </div>
  <div class="toggle" href="#">
    Even More Info (Map)
    <span class="info">
      <iframe src="http://www.map-generator.net/extmap.php?name=London&address=london%2C%20england&width=500...gt;"></iframe>
    </span>
  </div>
</div>
```

```javascript
// コンテナの中のどの子要素がクリックされるかをはっきりさせるために, target をチェックして
// 親要素に関わらず, クリックされた要素への参照を得ます
var stateManager = {
  fly: function() {
    var self = this;
    $('#container').unbind().on('click', function(e) {
      var target = $(e.originalTarget || e.srcElement);
      if (target.is('div.toggle')) {
        self.handleClick(target);
      }
    });
  },
  handleClick: function(elem) {
    elem.find('span').toggle('slow');
  }
};
```

1つのjQueryオブジェクトが作成されて, $.single を呼び出すときにいつもそのオブジェクトが
利用されるというものです.（実質的にはたった1つのjQueryオブジェクトが作成されるということを意味します）
復数のオブジェクトに関するデータをたった1つにまとめているので, これも形の上ではフライウェイトであると言えます.

```javascript
$.single = (function(o) {
  var collection = jQuery([1]);

  return function(element) {
    // コレクションに要素を渡す
    collection[0] = element;

    // コレクションを返す
    return collection;
  };
});

// 例
$('div').on('click', function() {
  var html = $.single(this).next().html();
  console.log(html);
});
```

- [76 bytes for faster jQuery](http://james.padolsey.com/javascript/76-bytes-for-faster-jquery/)
