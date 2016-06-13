# デザインパターン

## 7.1 シングルトン

シングルトンパターンの発想は、あるクラスのインスタンスをひとつだけにすることです。つまり、同じクラスを使って新しいオブジェクトを再び作成すると、最初に作成したのと同じオブジェクトにならなければいけません。

JavaScript にはクラスがなく、新しいオブジェクトを作成するとき、それに似たオブジェクトは存在しないので、その新しいオブジェクトはすでにシングルトンです。オブジェクトリテラルを使って作成したオブジェクトはそのままシングルトンの例になります。

```js
var obj = {
  myprop: 'my value'
};
```

### 7.1.1 new を使ってシングルトンを作る

同じコンストラクタを使って `new` でオブジェクトを作るとき、シングルトンの実装でやることは、まったく同じオブジェクトを指す新しいポインタを取得することだけです。

期待する振る舞いは以下の通りです。
（多元宇宙の考えは捨てて、宇宙は単一であると考えてください）

```js
var uni = new Universe();
var uni2 = new Universe();
uni === uni2; // true
```

Universe コンストラクタは、作成したオブジェクトのインスタンスである `this` をキャッシュし、コンストラクタの2回目以降の呼び出しでは、キャッシュしておいたインスタンスを返す必要があります。


### 7.1.2 静的プロパティにインスタンスをキャッシュする

```js
function Universe() {
  // 既存のインスタンスがあるか?
  if (typeof Universe.instance === 'object') {
    return Universe.instance;
  }

  // 通常の処理
  this.start_time = 0;
  this.bang = 'big';

  // キャッシュする
  Universe.instance = this;

  // 暗黙の return;
  // return this;
}

// test
var uni = new Universe();
var uni2 = new Universe();
uni === uni2; // true
```

これは率直な実装ですが、`instance` がパブリックなのが欠点です。


### 7.1.3 クロージャにインスタンスをキャッシュする

```js
function Universe() {
  // キャッシュされたインスタンス
  var instance = this;

  // 通常の処理
  this.start_time = 0;
  this.bang = 'big';

  // コンストラクタを書き換える
  Universe = function() {
    return instance;
  };
}

// test
var uni = new Universe();
var uni2 = new Universe();
uni === uni2; // true
```

`uni.constructor === Universe` は失敗します。
これは `constructor` が依然として元のコンストラクタを指すのに対して、再定義されたコンストラクタは元のコンストラクタを指さないからです。
ちょっとした調整で、プロトタイプとコンストラクタのポインタを期待通りにすることができます。

```js
function Universe() {
  // キャッシュされたインスタンス
  var instance;

  // コンストラクタを書き換える
  Universe = function() {
    return instance;
  };

  // プロトタイププロパティを引き継ぐ
  Universe.prototype = this;

  // インスタンス
  instance = new Universe();

  // コンストラクタのポインタを再設定
  instance.constructor = Universe;

  // 機能のすべて
  instance.start_time = 0;
  instance.bang = 'big';

  return instance;
}
```

もうひとつの解決方法として、コンストラクタとインスタンスを即時関数でつつむやり方もあります

```js
var Universe;

(function() {
  var instance;

  Universe = function Universe() {
    if (instance) {
      return instance;
    }

    instance = this;

    // 機能のすべて
    this.start_time = 0;
    this.bang = 'big';
  };
}());
```


## 7.2 ファクトリ

ファクトリの目的はオブジェクトを作ることです。
通常はクラスあるいはクラスの静的メソッドで実装されます。
以下の目的があります

- 似たようなオブジェクトを設定するとき繰り返される操作を実行する
- ファクトリの利用者に、コンパイル時の型（クラス）を知らなくてもオブジェクトを作成できる手段を提供する

```js
// 親コンストラクタ
function CarMaker() {}

// 親メソッド
CarMaker.prototype.driver = function() {
  return 'Vroom, I have ' + this.doors + ' doors';
};

// 静的ファクトリメソッド
CarMaker.factory = function(type) {
  var constr = type;
  var newcar;

  // コンストラクタが存在しなければエラー
  if (typeof CarMaker[constr] !== 'function') {
    throw {
      name: 'Error',
      message: constr + ' dosent exist'
    };
  }

  // この時点でコンストラクタの存在がわかる
  // 一度だけ親から継承します
  if (typeof CarMaker[constr].prototype.drive !== 'function') {
    CarMaker[constr].prototype = new CarMaker();
  }
  // 新しいインスタンスの作成
  newcar = new CarMaker[constr]();
  // ここでいくつかのメソッドを読んでもかまわない...
  return newcar;
};

// 車ごとに個別に定義
CarMaker.Compact = function() {
  this.doors = 4;
};
CarMaker.Convertible = function() {
  this.doors = 2;
};
CarMaker.SUV = function() {
  this.doors = 17;
};
```

### 7.2.1 組み込みのオブジェクトファクトリ

「天然の工場」の例として、組み込みのグローバル `Object()` コンストラクタを考えてみましょう。入力に応じてさまざまなオブジェクトを作成するので、ファクトリとしても振る舞います。

```js
var o = new Object(),
    n = new Object(1),
    s = Object(),
    b = Object(true);
```

`Object()` はファクトリでもあると言ったところで、ほとんど実践的価値はありません。ファクトリパターンはいたるところで使われている例として取り上げただけです。


## 7.3 イテレータ

イテレータパターンでは、オブジェクトは `next()` メソッドを提供する必要があります。

```js
/**
 * `agg` というオブジェクトがあるとします。
 * 次のようにループで `next()` を呼び出せば、データの各要素に
 * アクセスできます
 */
var elemnt;
while (element = agg.next()) {
  // 要素に対して何か処理を行う
  console.log(element);
}
```

イテレータパターンでは、集約オブジェクトは `hasNext()` という便利なメソッドも提供します。このためオブジェクトの利用者はデータの終わりに達したかどうかを判断することができます。

```js
/**
 * `hasNext()` を使ってすべての要素に順にアクセスする
 */
while (agg.hasNext()) {
  console.log(agg.next());
}
```

このようなユースケースを実現する集約オブジェクトの実装方法

```js
var agg = (function() {
  var index = 0;
  var data = [1, 2, 3, 4];
  var length = data.length;

  return {

    /**
     * 順番に次の要素を返す
     */
    next: function() {
      var element;
      if (!this.hasNext()) {
        return null;
      }
      element = data[index];
      index = index + 2;
      return element;
    },

    /**
     * データの終わりに達したかどうか
     */
    hasNext: function() {
      return index < length;
    },

    /**
     * ポインタを先頭に戻します
     */
    rewind: function() {
      index = 0;
    },

    /**
     * 現在位置の要素を返します。`next()` を使うと
     * ポインタが前進してしまいます
     */
    current: function() {
      return data[index];
    }
  };
}());

// test
while (agg.hasNext()) {
  console.log(agg.next());
}
// 1
// 3
// 5

// 先頭に戻す
agg.rewind();
console.log(agg.current()); // 1
```


## 7.4 デコレータ

デコレータパターンでは、実行時に動的に機能をオブジェクトに追加できます。

デコレータパターンで便利な機能は、期待された振る舞いに調整できることです。
いくつかの基本機能を持つ単純なオブジェクトから始めます。次にこの単純なオブジェクトを強化するのに使いたいデコレータを利用可能なデコレータのプールから選択します。デコレータの順序が重要なときは、順序も考慮します。

### 7.4.1 使い方

```js
var Sale = new Sale(100);       // 価格は100ドル
sale = sale.decorate('fedtax'); // 連邦勢を追加
sale = sale.decorate('quedec'); // 地方税を追加
sale = sale.decorate('money');  // 金額を書式化
sale.getPrice();                // $112.88
```

別なシナリオとして、地方税がかからない州の顧客であれば、カナダドルでの価格表示を希望するでしょう。

```js
var sale = new Sale(100);       // 価格は100ドル
sale = sale.decorate('fedtax'); // 連邦勢を追加
sale = sale.decorate('cdn');    // CDNで書式化
sale.getPrice();                // CDN$ 105.00
```

### 7.4.2 実装

```js
function Sale(price) {
  this.price = price || 100;
}
Sale.prototype.getPrice = function() {
  return this.price;
};
```

デコレータオブジェクトはすべて、コンストラクタプロパティとして実装されます

```js
Sale.decorators = {};
```

デコレータの例。カスタマイズされた `getPrice()` メソッドを実装するオブジェクトです。

```js
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
};
Sale.decorators.money = {
  getPrice: function() {
    return '$' + this.uber.getPrice().toFixed(2);
  }
};
Sale.decorators.cdn = {
  getPrice: function() {
    return 'CDN$' + this.uber.getPrice().toFixed(2);
  }
};
```

最後に `decorate()` という魔法のメソッドを見てみましょう。
拡張機能をひとつにつなぎます。

```js
Sale.prototype.decorate = function(decorator) {
  var F = function() {};
  var overrides = this.constructor.decorators[decorator];
  var i;
  var newobj;

  F.prototype = this;
  newobj = new F();
  newobj.uber = F.prototype;

  for (i in overrides) {
    if (overrides.hasOwnProperty(i)) {
      newobj[i] = overrides[i];
    }
  }
  return newobj;
}
```


### 7.4.3 リストを使った実装

連鎖上の前のメソッドを修飾されたメソッドから呼ぶ代わりに、直前のメソッドの結果をパラメータとして次のメソッドに渡すだけにします。

```js
function Sale(price) {
  this.price = price || 100;
  this.decorators_list = [];
}
```

今回もまた、利用可能なデコレータを `Sale.decorators` のプロパティとして持ちます

```js
Sale.decorators = {};
Sale.decorators.fedtax = {
  getPrice: function(price) {
    return price + price * 5 / 100;
  }
};
// ...
```

前の実装では、`decorate()` はいくらか複雑で、`getPrice()` は簡潔でした。
この実装では逆になっています。`decorate()` はリストに追加するだけなのに対して、`getPrice()` がすべて担当します

```js
Sale.prototype.decorate = function(decorator) {
  this.decorators_list.push(decorator);
};

Sale.prototype.getPrice = function() {
  var price = this.price;
  var i;
  var max = this.decorators_list.length;
  var name;

  for (i = 0; i < max; i += 1) {
    name = this.decorators_list[i];
    price = Sale.decorators[name].getPrice(price);
  }
  return price;
}
```


## 7.5 ストラテジー

ストラテジーパターンでは、実行時にアルゴリズムを選択します。

ストラテジーパターンの使用例としては、妥当性の検証があります。`validate()` メソッドを持つバリデータオブジェクトをひとつ作ります。


### 7.5.1 データ検証の例

次のようなデータがあり、それが妥当であるか確認したいとします。

```js
var data = {
  first_name: 'Super',
  last_name: 'Man',
  age: 'unknown',
  username: 'o_O'
};
```

`last_name` は省略可能で、`first_name` はなんであれ受け入れる。ただし `age` は数字、`username` は英数字のみで特殊文字は受け付けないとします。
設定は次のようになるでしょう。

```js
validator.config = {
  first_name: 'isNonEmpty',
  age: 'isNumber',
  username: 'isAlphaNum'
};
```

検査に利用できるアルゴリズムごとに、あらかじめ定義されたインターフェイスでオブジェクトを作ります。

```js
// 空の値ではないか検査
validator.types.isNonEmpty = {
  validate: function(value) {
    return value != '';
  },
  instructions: 'the value cannot be empty'
};

// 値が数字か検査
validator.types.isNumber = {
  validate: function(value) {
    return !isNaN(value);
  },
  instructions: 'the value can only be a valid number, e.g. 1, 3.14 or 2010'
};

// 値が英数字か検査
validator.types.isAlphaNum = {
  validate: function(value) {
    return !/[^a-z0-9]/i.test(value);
  },
  instructions: 'the value can only contain characters and numbers, no special symbols'
};
```

次は `validator` オブジェクトのコア部分です。

```js
var validator = {
  // 利用できるすべての検査
  types: {},

  // 現在の検証セッションでのエラーメッセージ
  message: [],

  // 現在の検証の設定
  // 名前:検証の種類
  config: {},

  // インターフェイスメソッド
  // data はキー => 値の組
  validate: function(data) {
    var i, msg, type, checker, result_ok;

    // メッセージをすべてリセット
    this.message = [];

    for (i in data) {
      if (data.hasOwnProperty(i)) {
        type = this.config[i];
        checker = this.types[i];

        if (!type) {
          continue; // 検証する必要はない
        }
        if (!checker) { // これは変だ
          throw {
            name: 'validationError',
            message: 'No handler to validate type ' + type
          };
        }

        result_ok = checker.validate(data[i]);
        if (!result_ok) {
          msg = 'Invalid value for *' + i + '*, ' + checker.instructions;
        }
      }
    }
    return this.hasErrors();
  },

  // ヘルパー
  hasErrors: function() {
    return this.message.length !== 0;
  }
};
```


## 7.6 ファサード

ファサードは簡単なパターンです。オブジェクトに代替のインターフェイスを提供するだけです。メソッドの大きさを短く保ち、あまり多くの作業を詰め込まないのは、良いデザインプラクティスです。


```js
/**
 * 目的が異なる2つのメソッドですが、この2つは一緒に呼ばれることが
 * 少なくありません。そこで呼び出しを重複させるかわりに、2つのメソッドを
 * 呼び出すひとつのファサードメソッドを作ることができます
 */
var myevent = {
  stop: function(e) {
    // IE以外 / IE9+
    if (typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    if (typeof e.stopPropagation === 'function') {
      e.stopPropagation();
    }

    // IE8-
    if (typeof e.returnValue === 'boolean') {
      e.returnValue = false;
    }
    if (typeof e.cancelBubble === 'boolean') {
      e.cancelBubble = true;
    }
  }
}
```

## 7.7 プロキシ

プロキシパターンでは、あるオブジェクトは別のオブジェクトのインターフェイスとして動作します。
プロキシはオブジェクトのクライアントとオブジェクトそれ自体の間に立ってオブジェクトへのアクセスを保護します。

### 7.7.1 事例

ウェブアプリケーションでは、最もコストのかかる処理のひとつがネットワークリクエストなので、できるだけ HTTP リクエストをまとめるのは意味があります。
まさにこの処理だけを行う例をもとに、プロキシパターンの動作を解説しましょう。


#### 7.7.1.1 ビデオエクスバンド

- [sample](http://www.jspatterns.com/book/7/proxy.html)


#### 7.7.1.2 プロキシがない場合

プロキシがない場合は、ビデオごとに毎回リクエストを呼びます。
プロキシを追加すると、 `proxy` という新しいアクターが登場し、`videos` と `http` の間に立ってリクエストの呼び出しを代理で受け取り、可能であればリクエストをまとめます

#### 7.7.1.3 HTML

#### 7.7.1.4 イベント処理

#### 7.7.1.5 videos オブジェクト

#### 7.7.1.6 http オブジェクト

#### 7.7.1.7 proxy の出番です

```js
var proxy = {
  ids: [],
  delay: 50,
  timeout: null,
  callback: null,
  context: null,
  makeRequest: function(id, callback, context) {
    // キューに追加
    this.ids.push(id);
    this.callback = callback;
    this.context = context;

    // タイムアウトの設定
    if (!this.timeout) {
      this.timeout = setTimeout(function() {
        proxy.flush();
      }, this.delay);
    }
  },
  flush: function() {
    http.makeRequest(this.ids, 'proxy.handler');

    // タイムアウトとキューをクリア
    this.timeout = null;
    this.ids = [];
  },
  handler: function(data) {
    var i, max;

    // ビデオがひとつ
    if (parseInt(data.query.count, 10) === 1) {
      proxy.callback.call(proxy.context, data.query.result.Video);
      return;
    }

    // ビデオが複数
    for (i = 0; max = data.query.results.Video.length; i < max; i += 1) {
        proxy.callback.call(proxy.context, data.query.results.Video[i]);
    }
  }
};
```

### 7.7.2 キャッシュとしてのプロキシ

過去のリクエストの結果を新しい cache プロパティにキャッシュすることができます。
proxy はキャッシュから情報を引き出し、ネットワークでの無駄な往復をなくします


## 7.8 メディエータ

メディエータパターンは、疎結合を促進し、保守性を向上することで、こうした状況を緩和します。このパターンでは、オブジェクトは直接でなく mediator オブジェクトを介して情報のやり取りを行います


### 7.8.1 メディエータの例

- [sample](http://jspatterns.com/book/7/mediator.html)

`Player` オブジェクト

```js
function Player(name) {
  this.points = 0;
  this.name = name;
}

Player.prototype.play = fucntion() {
    this.points += 1;
    mediator.played();
};
```

`sroreboard` オブジェクト

```js
var scoreboard = {
  // 更新するHTML要素
  element: document.getElementById('results'),

  // 特典表示を更新
  update: function(score) {
    var i, msg = '';

    for (i in score) {
      if (score.hasOwnProperty(i)) {
        msg += '<p><strong>'+ i +'</strong>:';
        msg += score[i];
        msg += '<\/p>';
      }
    }
    this.element.innerHTML = msg;
  }
};
```

`mediator` オブジェクト

```js
var mediator = {
  // プレイヤー全員
  players: [],

  // 初期化
  setup: function() {
    var players = this.players;
    players.home = new Player('Home');
    players.guest = new Player('Guest');
  },

  // プレイヤーの特典を更新
  played: function() {
    var players = this.players;
    var score = {
      Home: players.home.points,
      Guest: players.guest.points
    };
    scoreboard.update(score);
  },

  // ユーザの操作を処理
  keypress: function(e) {
    e = e || window.event; // IE
    if (e.which === 49) { // key: "1"
      mediator.players.home.play();
      return ;
    }
    if (e.which === 48) { // key: "0"
      mediator.players.guest.play();
      return ;
    }
  }
};

// ゲームの開始処理と終了処理
// 開始
mediator.setup();
window.onkeypress = mediator.keypress;

// 30秒したらゲーム終了
setTimeout(function() {
  window.onkeypress = null;
  alert('Game over!');
}, 30000);
```


## 7.9 オブザーバ

オブザーバパターンは、疎結合を促進させます。
あるオブジェクトが別なオブジェクトのメソッドを呼び出すかわりに、あるオブジェクトは別のオブジェクトの特別な機能を購読し、そのオブジェクトからの通知を受けます。

### 7.9.1 例その1 : 雑誌の購読

発行者 `paper` は日刊の新聞と月刊の雑誌を発行します。購読者 `joe` はその通知を受け取ります。

発行者オブジェクト(`paper`)には以下のメンバが必要です

- `subscribers` - 購読者を格納する配列
- `subscribe()` - 購読者の配列に追加
- `unsubscribe()` - 購読者の配列から削除
- `publish()` - 購読者をループで処理し、申し込み時に提供したメソッドを呼び出す

これらのメンバは、どんな発行者オブジェクトであれもっているので、独立したオブジェクトの一部として実装するのがよいでしょう。そうすれば（ミックスインパターンを使って）これらのメンバを与えられたオブジェクトにコピーし、そのオブジェクトを発行者にすることができます。

```js
var publisher = {
  subscribers: {
    any: []   // イベントの型: 購読者の配列
  },
  subscribe: function(fn, type) {
    type = type || 'any';
    if (typeof this.subscribers[type] === 'undefined') {
      this.subscribers[type] = [];
    }
    this.subscribers[type].push(fn);
  },
  unsubscribe: function(fn, type) {
    this.visitSubscribers('unsubscribe', fn, type);
  },
  publish: function(publication, type) {
    this.visitSubscribers('publish', publication, type);
  },
  visitSubscribers: function(action, arg, type) {
    var pubtype = type || 'any';
    var subscribers = this.subscribers[pubtype];
    var i;
    var max = subscribers.length;

    for (i = 0; i < max; i += 1) {
      if (action === 'publish') {
        subscribers[i](arg);
      } else {
        if (subscribers[i] === arg) {
          subscribers.splice(i, 1);
        }
      }
    }
  }
};
```

次の関数は汎用の発行者のメソッドをコピーして、与えられたオブジェクトを発行者にします

```js
function makePublisher(o) {
  var i;
  for (i in publisher) {
    if (publisher.hasOwnProperty(i) && typeof publisher[i] === 'function') {
      o[i] = publish[i];
    }
  }
  o.subscribers = { any: [] };
}
```

`paper` オブジェクトの実装。日刊と月刊の発行を提供します

```js
var paper = {
  daily: function() {
    this.publish('big news today');
  },
  monthly: function() {
    this.publish('interesting analysis', 'monthly');
  }
};

// paper を発行者にします
makePublisher(paper);
```

購読者 `joe` を見てみましょう

```js
var joe = {
  drinkCoffee: function(paper) {
    console.log('Just read ' + paper);
  },
  sundayPreNap: function(monthly) {
    console.log('About to fall asleep reading this ' + monthly);
  }
};
```

次のコードで `joe` は `paper` を購読します

```js
paper.subscribe(joe.drinkCoffee);
paper.subscribe(joe.sundayPreNap, 'monthly');


// 発行テスト
paper.daily();
paper.daily();
paper.daily();
paper.monthly();
```

`joe` を発行者にする

```js
makePublisher(joe);
joe.tweet = function(msg) {
  this.publish(msg);
};
```

`paper` が `joe` を購読する

```js
paper.readTweets = function(tweet) {
  alert('Call big meeting! Someone ' + tweet);
};
joe.subscribe(paper.readTweets);

// test
joe.tweet('hated the paper today');
```

### 7.9.2 例その2: キープレスゲーム

インターフェイスを少し調整して、ブラウザの世界に近づけます

- `publish()` `subscribe()` `unsubscribe()` のかわりに、`fire()` `on` `remove()` を定義します
- イベントの `type` は常に使うので、この3つの関数の第一引数にします
- 購読者の関数の他に `context` を引数に追加して、購読者オブジェクトを参照する `this` がコールバックメソッドで使えるようにします

```js
var publisher = {
  subscribers: {
    any: []
  },
  on: function(type, fn, context) {
    type = type || 'any';
    fn = typeof fn === 'function' ? fn : context[fn];
    if (typeof this.subscribers[type] === 'undefined') {
      this.subscribers[type] = [];
    }
    this.subscribers[type].push({
      fn: fn,
      context: context || this
    });
  },
  remove: function(type, fn, context) {
    this.visitSubscribers('unsubscribe', type, fn, context);
  },
  fire: function(type, publication) {
    this.visitSubscribers('publish', type, publication);
  },
  visitSubscribers: function(action, type, arg, context) {
    var pubtype = type || 'any';
    var subscribers = this.subscribers[pubtype];
    var i;
    var max = subscribers ? subscribers.length : 0;

    for (i = 0; i < max; i += 1) {
      if (action === 'publish') {
        subscribers[i].fn.call(subscribers[i].context, arg);
      } else {
        if (subscribers[i].fn === arg && subscribers[i].context === context) {
          subscribers.splice(i, 1);
        }
      }
    }
  }
};
```

新しい `Player()` コンストラクタ

```js
function Player(name, key) {
  this.points = 0;
  this.name = name;
  this.key = key;
  this.fire('newplayer', this);
}

Player.prototype.play = function() {
  this.points += 1;
  this.fire('play', this);
};
```

`game` オブジェクト

```js
var game = {
  keys: {},

  addPlayer: function(player) {
    var key = player.key.toString().charCodeAt(0);
    this.keys[key] = player;
  },

  handleKeypress: function(e) {
    e = e || window.event; // IE
    if (game.keys[e.which]) {
      game.keys[e.which].play();
    }
  },

  handlePlay: function(player) {
    var i;
    var players = this.keys;
    var score = {};

    for (i in players) {
      if (players.hasOwnProperty(i)) {
        score[players[i].name] = players[i].points;
      }
    }
    this.fire('scorechange', score);
  }
};
```

発行設定

```js
makePublisher(Player.prototype);
makePublisher(game);
```

購読設定

```js
Player.prototype.on('newplayer', 'addPlayer', game);
Player.prototype.on('play', 'handleplay', game);
game.on('scorechange', scoreboard.update, scoreboard);
window.onkeypress = game.handleKeypress;
```

プレイヤー

```js
var playername, key;
while (1) {
  playername = prompt('Add player (name)');
  if (!playername) {
    break;
  }
  while (1) {
    key = prompt('key for ' + playername + '?');
    if (key) {
      bbreak;
    }
  }
  new Player(playername, key);
}
```

## 7.10 まとめ
