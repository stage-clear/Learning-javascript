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
### 2.11 ミックスインパターン
ミックスインに相当します
### 2.12 [サブクラス化](12.md)
### 2.13 [ミックスイン](13.md)
### 2.14 [デコレータパターン](14.md)
### 2.15 [擬古典的デコレータ](15.md)
#### 2.15.2 [抽象デコレータ](15-2.md)
### 2.16 [jQueryを使ったデコレータ](16.md)

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
