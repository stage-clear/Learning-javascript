# オブジェクト作成のパターン

## 5.1 名前空間パターン

```js
// グローバルオブジェクト
var MYAPP = {};

// コンストラクタ
MYAPP.Parent = function() {};
MYAPP.Child = function() {};

// 変数
MYAPP.come_var = 1;

// オブジェクトのコンテナ
MYAPP.modules = {};

// 入れ子になったオブジェクト
MYAPP.modules.module1 = {};
MYAPP.modules.module1.data = {a: 1, b: 2 };
MYAPP.modules.module2 = {};
```

名前空間パターンの利点

- プログラムで必要なグローバルの数を減らせると同時に、名前の衝突や長すぎる接頭辞を避けられます


名前空間パターンの欠点

- タイピングの量が少し増える。変数や関数ごとに接頭辞が付くのでダウンロードするコードのサイズも大きくなります
- グローバルのインスタンスがひとつだけということは、コードの一部を変更するとグローバルのインスタンスが変更されることを意味します。
変更したコード以外の残りの部分は更新された状態に置かれます
- 入れ子が深い名前は、それだけプロパティの解決に時間がかかることを意味します


### 5.1.1 汎用の名前空間関数

```js
// 安全ではない
var MYAPP = {};
// より良いやり方
if (typeof MYAPP === 'undefined') {
  var MYAPP = {};
}

// もっと短くする
var MYAPP = MYAPP || {};
```

```js
// 名前空間関数を使う
MYAPP.namespace('MYAPP.modules.module2');

// これは以下と等価です
// var MYAPP = {
//   modules: {
//     module2: {}
//   }
// };
```

名前空間関数の実装

```js
var MYAPP = MYAPP || {};

MYAPP.namespace = function(ns_string) {
  var parts = ns_string.split('.'),
      parent = MYAPP,
      i;

  // 先頭の冗長なグローバルを取り除く
  if (parts[0] === 'MYAPP') {
    parts = parts.slice(1);
  }

  for (var i = 0; i < parts.length; i += 1) {
    // プロパティが存在しなければ作成する
    if (typeof parent[parts[i]] === 'undefined') {
      parent[parts[i]] = {};
    }
    parent = parent[parts[i]];
  }
  return parent;
};
```


## 5.2 依存関係の宣言

この宣言では、ローカル変数だけを作成し、使いたいモジュールを指すようにします

```js
var myFunction = function() {
  // 依存するモジュール
  var event = YAHOO.util.Event;
  var dom = YAHOO.util.Dom;

  // 残りの関数で event と dom を使う
};
```

これは極端に単純なパターンですが、たくさんの利点があります

- 依存関係を明示することで、あなたのコードの利用者にページに取り込む必要があるスクリプトファイルをしらせることができます
- 関数の冒頭で宣言しておけば、依存関係を見つけ出し、それを解決するのが容易になります
- ローカル変数を使って処理すると、グローバルやグローバル変数のプロパティの入れ子を使うよりも処理が高速なので、性能が向上します。
この依存関係宣言パターンに従えば、グローバルシンボルの解決はこの関数の中で１回きり実行されるだけです。ローカル変数に代入された後はさらに高速になります
- ミニファイツールは、ローカル変数の名前を変更します。この結果コードは小さくなります。グローバル変数の名前を変更するのは安全ではないので、グローバル変数の名前は変更されません


## 5.3 プライベートなプロパティとメソッド

JavaScript にはプロパティやメソッドに対して Java などの言語で実現されているような
プライベート、プロテクテッド、パブリックで修飾する構文はありません。オブジェクトメンバは
すべてパブリックになります

```js
var myobj = {
  myprop: 1,
  getProp: function() {
    return this.myprop;
  }
};

console.log(myobj.myprop); // myprop はパブリックにアクセス可能
console.log(myobj.getProp()); // getProp() もパブリックです
```

## 5.3.1 プライベートメンバ

```js
function Gadget() {
  // プライベートメンバ
  var name = 'iPod';
  // パブリックメンバ
  this.getName = function() {
    return name;
  };
}
var toy = new Gadget();
// name はプライベートなので undefined
console.log(toy.name); // undefined
// パブリックメソッドjは name にアクセスできます
console.log(toy.getName()); // iPod
```

### 5.3.2 特権メソッド

__特権メソッド__ という概念に特別な構文はありません。
プライベートメンバにアクセスできるパブリックメソッドにつけた名称にすぎません。

### 5.3.3 プライバシーの侵犯

プライバシーに関してはいくつかきわどいケースがあります

- Firefox の古いバージョンでは `eval()` メソッドに第2パラメータを文脈オブジェクトとして渡すことができます
この場合、関数のプライベートスコープの中に忍び込むことができあm酢
- 特権メソッドからプライベート変数を直接返すとき、この変数がオブジェクトや配列である場合、
これは参照渡しになるので、外部のコードはこのプライベート変数を変更できます

```js
function Gadget() {
  // プライベート
  var specs = {
    screen_width: 320,
    screen_height: 480,
    color: 'white'
  };

  // パブリック関数
  this.getSpecs = function() {
    return spacs
  };
}
```

問題は `getSpecs()` が `specs` オブジェクトへの参照を返すところにあります

```js
var toy = new Gadget();
var specs = toy.getSpecs();

specs.color = 'black';
specs.price = 'free';

console.dir(toy.getSpecs());
```

解決法のひとつは、`getSpecs()` が返す新しいオブジェクトに含めるデータを、そのオブジェクト
の利用者が関心あるデータだけに限定することです。
これはPOLA（Principle Of Least Authority: 最小限の原則）として知られています。
POLAでは必要以上に権限を与えるべきではないとされています。

- 返す値をプリミティブにする
- オブジェクトは複製関数を作って、オブジェクトのコピーを作成する


### 5.3.4 オブジェクトリテラルとプライバシー

オブジェクトリテラルを使ったプライバシーの実現

```js
var myObj; // これがオブジェクトになります
(functin() {
  // プライベートメンバ
  var name = 'my, oh my';

  // パブリックな部分の実装
  // var がない点に注意
  myobj = {
    // 特権メソッド
    getName: function() {
      return name;
    }
  };
}());
myobj.getName(); // 'my, oh my'
```

同じ考え方で少し実装を変えたものが

```js
var myObj = (function() {
  // プライベート
  var name = 'my, oh my';

  // パブリック
  return {
    getName: function() {
      return name;
    }
  };
}());
myObj.getName(); // 'my, oh my'
```

### 5.3.5 プロトタイプとプライバシー

コンストラクタを使ってプライベートメンバを実現するとき、コンストラクタを読んで新しいオブジェクトを作るたびに毎回プライベートメンバが再作成されてしまうのが欠点です。
処理の重複と余計なメモリを避けるには、`prototype` を使います

```js
function Gadget() {
  // プライベートメンバ
  var name = 'iPod';
  this.getName = function() {
    return name;
  };
}

Gadget.prototype = {
  // プライベート
  var browser = 'Mobile Webkit';
  // prototype にあるパブリック
  return {
    getBrowser: fucntion() {
      return browser;
    }
  }
};
```

### 5.3.6 プライベート関数をパブリックメソッドとして開示する

開示パターン (revealing module pattern) とは、プライベートメソッドはそのままにして、同時にをれをパブリックメソッドにする方法です。

あるオブジェクトのすべての機能がそのオブジェクトの仕事にとって必要不可欠であり、できるだけそれを保護したいが、それと同時に、いくつかの便利な機能についてはパブリックなアクセスも提供したい、という場合にこのパターンが役に立ちます。

```js
var myarray;
(function() {
  var astr = '[objet Array]';
  var toString = Object.prototype.toString;

  // プライベート
  function isArray(a) {
    return toString.call(a) === astr;
  }

  // プライベート
  function indexOf(haystack, needle) {
    var i = 0;
    var max = haystack.length;
    for (; i < max; i += 1) {
      if (haystack[i] === needle) {
        return i;
      }
    }
    return -1;
  }

  // パブリック
  myarray = {
    isArray: isArray,
    indexOf: indexOf,
    inArray: indexOf
  };

})();
```

たとえば仮にパブリックの `indexOf` になにか予期せぬことが起きたとしても、プライベートの `indexOf` は安全なままなので `inArray` は本来の処理を続けられます。


## 5.4 モジュールパターン

機能ごとにそれぞれ完結したいくつかのコード群に分けるための道具を提供します。
モジュールパターンはこれまで解説してきたいくつかのパターンを組み合わせたものです。

- 名前空間
- 即時関数
- プライベートメンバと特権メンバ
- 依存関係の宣言

```js
MYAPP.namespace('MYAPP.utilities.array');

MYAPP.utilities.array = (function() {
  // 依存関係
  var uobj = MYAPP.utilities.object;
  var ulang = MYAPP.utilities.lang;

  // プライベートプロパティ
  var array_string = '[object Array]';
  var ops = Object.prototype.toString;

  // プライベート目sっど
  // ...

  // var の終わり

  // 1回きりの初期化手続き

  // パブリックAPI
  return {
    inArray: function(needle, haystack) {
      for (var i = 0, max = haystack.length; i < max; i += 1) {
        if (haystack[i] === needle) {
          return true;
        }
      }
    },
    isArray: function(a) {
      return ops.call(a) === array_string;
    }
    // ... その他のメソッドとプロパティ
  }
}());
```

### 5.4.1 モジュールパターンの開示

メソッドをすべてプライベートにしたまま、最後にパブリックAPIとして設定したいメソッドだけを開示します

```js
MYAPP.utilities.array = (function() {
  // プライベートプロパティ
  var array_string = '[object Array]';
  var ops = Object.prototype.toString;

  // プライベートメソッド
  var inArray = function(haystack, needle) {
    for (var i = 0, max = haystack.length; i < max; i += 1) {
      if (haystack[i] === needle) {
        return i;
      }
    }
    return -1;
  };

  var isArray = function(a) {
    return ops.call(a) === array_string;
  };

  // var の終わり

  //パブリックAPIを開示する
  return {
    isArray: isArray,
    indexOf: inArray
  };
}());
```

### 5.4.2 コンストラクタを作成するモジュール

モジュールが関数を返すようにモジュールを即時間数で包みます

```js
MYAPP.namespace('MYAPP.utilities.Array');

MYAPP.utilities.Array = (function() {
  // 依存関係
  var uobj = MYAPP.utilities.object;
  var ulang = MYAPP.utilities.lang;

  // プライベートのプロパティとメソッド
  var Constr;

  // var の終わり

  // 1回きりの初期化手続き
  // ...

  // パブリックAPI -- コンストラクタ
  Constr = function(o) {
    this.elements = this.toArray(o);
  };

  // パブリクkAPI -- プロトタイプ
  Constr.prototype = function() {
    constructor: MYAPP.utilities.Array,
    version: '2.0',
    toArray: function(obj) {
      for (var i = 0; a = []; len = obj.length; i < len; i += 1) {
        a[i] = obj[i];
      }
      return a;
    }
  };

  // 新しい名前空間に代入された
  // コンストラクタを返す
  return Constr;
}());

// usage
var arr = new MYAPP.utilities.Array(obj);
```


### 5.4.3 グローバル変数をモジュールに取り込む

グローバル変数を取り込むことで、即時関数の内部で行われるグローバルシンボルの解決が高速化されます。取り込まれた変数はこの関数にローカルになるからです。

```js
MYAPP.utilities.module = (function(app, global) {
  // グローバルオブジェクトへの参照と
  // グローバル名前空間オブジェクトへの参照が
  // ここでローカルになる
}(MYAPP, this));
```

## 5.5 サンドボックスパターン

サンドボックスパターンは、名前空間が持つ以下のような欠点を解決します。

- ひとつのグローバル変数がアプリケーションのグローバルになることを前提にしています。名前空間パターンを使うと、同じアプリケーションやライブラリの2つのバージョンを同じページで実行させることはできません。たとえば `MYAPP` という同じグローバルシンボル名をどちらも必要とするからです。
- `MYAPP.utilities.array` のように、ドットで区切られた長い名前を実行時に解決します。

サンドボックスパターンは、モジュールが他のモジュールとそのサンドボックスに影響を与えることなく動作できるような環境を提供します。


### 5.5.1 グローバルコンストラクタ

名前空間パターンにはひとつのグローバルオブジェクトがありました。
サンドボックスパターンでは、このひとつのグローバルがコンストラクタになります。コンストラクタにはコールバック関数を渡すことができ、このコールバック関数が隔離されたサンドボックス環境になって、あなたのコードを実行します。

```js
new Sandbox(function(box) {
  // code
});

// `new`を強制させ記述を省略し、さらに2つのモジュールを使う形
Sandbox(['ajax', 'event'], function(box) {
  // console.log(box);
});

// モジュール名を個々の引数で渡す形
Sandbox('ajax', 'dom', function(box) {
  // console.log(box);
});

// 引数にワイルドカードを使って「利用可能なすべてのモジュール」を
// 指定するのはどうでしょうか?
Sandbox('*', function(box) {
  // console.log(box);
});

// なにも指定されなかった場合は '*' と同じ動作にしてみましょう
Sandbox(function(box) {
  // console.log(box);
});
```

サンドボックスオブジェクトのインスタンスを入れ子にした場合でも、お互いに干渉されません

```js
Sandbox('dom', 'event', function(box) {
  // dom と event を使います

  Sandbox('ajax', function(box) {
    // もうひとつのサンドボックスになった box オブジェクト
    // この box はこの関数の外部にある box とは別物です

    // Ajax を使います
  });
});
```

必要となるモジュールの種類に応じて別々のインスタンスにすることもできます。
これらのインスタンスは互いに依存することなく動作できます。


### 5.5.2 モジュールの追加

`modules` という名前で静的プロパティを追加します。このプロパティは、キーと値の組で構成されたもう一つのオブジェクトです。キーはモジュールの名前、値はそれぞれモジュールに実装する関数になります。

```js
Snadbox.modules = {};

Sandbox.modules.dom = function(box) {
  box.getElement = function() {};
  box.getStyle = function() {};
  box.foo = 'bar';
};

Sandbox.modules.event = function(box) {
  // 必要なら Sandbox のプロトタイプにアクセスできます
  // box.constructor.prototype.m = 'mmm';
  box.attachEvent = function() {};
  box.dettachEvent = function() {};
};

Sandbox.modules.ajax = function(box) {
  box.makeRequest = function() {};
  box.getResponse = function() {};
};
```

### 5.5.3 コンストラクタの実装

`Sandbox()` コンストラクタの実装（このコンストラクタの名前は、あなたのライブラリやアプリケーションにふさわしい名前に変更してください）

```js
function Sandbox() {
  // 引数を配列に変換します
  var args = Array.prototype.slice.call(arguments);
  // 最後の引数はコールバック関数です
  var callback = args.pop();
  // モジュールは配列としても個々のパラメータとしても渡せます
  var modules = (args[0] && typeof arg[0] === 'String') ? args : args[0] ;
  var i;

  // この関数がコンストラクタとして呼ばれたか確認します
  if (!(this instanceof Sandbox)) {
    return new Sandbox(modules, callback);
  }

  // 必要なら this にプロパティを渡します
  this.a = 1;
  this.b = 2;

  // モジュールを this オブジェクトに追加します
  // モジュールの指定なしか `*` のとき、すべてのモジュールを使います
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
  callback(this);
}

// 必要に応じて `prototype` プロパティを設定します
Sandbox.prototype = {
  name: 'My Application',
  version: '1.0',
  getName: function() {
    return this.name;
  }
};
```

__この実装の要点__

- `this` が `Sandbox` のインスタンスであるかを検査します
- コンストラクタの内部では `this` にプロパティを追加できます
- 必要なモジュールはモジュール名の配列として、あるいは個々の引数として渡すことができます。またワイルドカードを使う（あるいは引数を省略する）ことで、利用できるすべてのモジュールが読み込まれます
- 必要なモジュールが分かった時点で、それらを初期化します。（各モジュールを実装している関数を呼びます）
- コンストラクタの最後の関数はコールバックです。コールバックは新しく作成されたインスタンスを使って最後に呼ばれます。このコールバックは実際にユーザにとってのサンドボックスであり、要求された機能を全て持つ `box` オブジェクトを受け取ります


## 5.6 静的メンバ

- 静的メンバは、インスタンスを作成せずに使うことができます

### 5.6.1 パブリックな静的メンバ

JavaScript には静的メンバのための特別な構文はありません

```js
/**
 * コンストラクタ `Gadget` を定義します。
 * 静的メソッド `isShany()` と正規のメソッド `setPrice()` を持ちます
 * `isShiny()` は特定のオブジェクトを必要としないので静的メソッドです
 * `setPrice()` はオブジェクトを必要とします
 */
// コンストラクタ
var Gadget = function() {};

// 静的メソッド
Gadget.isShiny = function() {
  return 'you bet';
};

// プロトタイプにメソッドを追加
Gadget.prototype.setPrice = function(price) {
  this.price = price;
};

// これらのメソッドを読んでみましょう
// 静的な isShiny() はコンストラクタから直接呼出せます
// プロトタイプに定義したメソッドはインスタンスが必要です
Gadget.isShiny(); // 'you bet'

// インスタンスを作成してメソッドを呼ぶ
var iphone = new Gadget();
iphone.setPrice(500);

// インスタンスメソッドを静的に呼び出そうとしても動作しません
// 同様にインスタンスを使って静的メソッドを呼び出すこともできません
typeof Gadget.setPrice;// undefined
typeof iphone.isShiny;// undefined

// インスタンスでも静的メソッドでも動くと便利な場合があります
// この場合、メソッドな内部で `this` の参照先に注意が必要です
Gadget.prototype.isShiny = Gadget.isShiny;
iphone.isShiny(); // 'you bet'
```

同じメソッドを静的呼び出しと静的でない呼び出しとで少し異なる動きにする

```js
// コンストラクタ
var Gadget = function(price) {
  this.price = price;
};

// 静的メソッド
Gadget.isShiny = function() {
  // これは常に動作します
  var msg = 'you bet';

  if (this instanceof Gadget) {
    // これは静的でない呼び出しのときだけ動作します
    msg += ', it costs $' + this.price + '!';
  }
  return msg;
}

// 通常のメソッドをプロトタイプに追加
Gadget.prototype.isShiny = function() {
  return Gadget.isShiny.call(this);
};

// 静的メンバの呼び出し
Gadget.isShiny();

// インスタンスからの呼び出し
var a = new Gadget('499.99');
a.isShiny(); // you bet, it costs $499.99!
```

### 5.6.2 プライベートな静的メンバ

プライベートな静的メンバとは以下のようなメンバを意味します

- 同じコンストラクタ関数で作成されたすべてのオブジェクトで共有されます
- コンストラクタの外部からはアクセスできません

```js
/**
 * コンストラクタ `Gadget` にある `counter` が
 * プライベートな静的メソッドです
 */
var Gadget = (function() {
  // 静的変数/プロパティ
  var counter = 0;

  // コンストラクタの新しい実装を返します
  return function() {
    console.log(counter += 1);
  };
}());

var g1 = new Gadget(); // ログ出力は1
var g2 = new Gadget(); // ログ出力は2
var g3 = new Gadget(); // ログ出力は3
```

静的なプロパティにアクセスする特権メソッド `getlastId()` を追加します。

```js
// コンストラクタ
var Gadget = (function() {
  // 静的変数/プロパティ
  var counter = 0;
  var newGadget;

  // これが新しいコンストラクタ実装になります
  NewGadget = function() {
    counter += 1;
  };

  // 特権メソッド
  NewGadget.prototype.getLastId = function() {
    return counter;
  };

  // コンストラクタを上書き
  return NewGadget;
}());

// テスト
var iphone = new Gadget();
iphone.getLastId(); // 1
var ipod = new Gadget();
ipod.getLastId(); // 2
var ipad = new Gadget();
ipad.getLastId();
```

- 静的プロパティはすごく手軽
- 静的プロパティはメソッドやデータを構成することができ、インスタンス固有ではないので、インスタンスごとに再生成されることはありません


## 5.7 オブジェクト定数

定数を作成するとき、値を変更してはいけないことを明示するため、変数名をすべて大文字にする命名作法が一般的です。この作法は組み込みオブジェクトで実際に使われています

```js
Math.PI; // 3.14159..
Math.SQRT2; // 1.4142..
Number.MAX_VALUE; // 1.7976..
```

独自に定数を作るときも同じ命名規則に従います

```js
// コンストラクタ
var Widget = function() {
  // 実装
};

// 定数
Widget.MAX_HEIGHT = 320;
Widget.MAX_WIDTH = 480;
```

どうしても変更不可な値が必要なときは、プライベートプロパティを作成し、これのゲッターメソッドを提供することができます。（多くの場合、簡単な作法ですませられるでしょうから、これはやりすぎかもしれません。こういう選択肢もあるということです）

- `set(name, value)` - 新しい定数を定義します
- `isDefined(name)` - 定数が存在するか検査します
- `get(name)`  - 定数の値を取得します

```js
/**
 * この実装では、プリミティブ値だけが定数として許可されます
 */
var constant = (function() {
  var constants = {};
  var ownProp = Object.prototype.hasOwnProperty;
  var allowed = {
    string: 1,
    number: 1,
    boolean: 1
  };
  var prefix = (Math.random() + '_').slice(2);

  return {
    set: function(name, value) {
      if (this.isDefined(name)) {
        return false;
      }
      if (!ownProp.call(allowed, typeof value)) {
        return false;
      }
      constants[prefix + name] = value;
      return true;
    },
    isDefined: function(name) {
      return ownProp.call(constants, prefix + name);
    },
    get: function() {
      if (this.isDefined(name)) {
        return constants[prefix + name];
      }
      return null;
    }
  }
}());

// テスト
// 定義されているでしょうか?
constant.isDefined('maxwidth'); // false
// 定義する
constant.set('maxwidth', 480); // true
// 再検査
constant.isDefined('maxwidth'); // true
// 再定義
constant.set('maxwidth', 320); // false
// 値が元のままか?
constant.get('maxwidth'); // 480
```


## 5.8 連鎖パターン

連鎖パターンを使うとあるオブジェクトのメソッドからメソッドへ、まとめて順に呼び出すことができます

```js
var obj = {
  value: 1,
  increment: function() {
    this.value += 1;
    return this;
  },
  add: function(v) {
    this.value += v;
    return this;
  },
  shout: function() {
    alert(this.value);
  }
}

// メソッド呼び出しの連鎖
obj.increment().add(3).shout();
```

### 5.8.1 連鎖パターンの利点と欠点

__利点__

- タイピングの量が節約される
- 文のように読める簡潔なコードが作れる
- ひとつの関数にたくさんの処理を詰め込むのではなく、関数を分割して、
より小さく、より特化した関数を練り上げるのに役立つ

__欠点__

- コードのデバッグは難しくなる
- 「電車の衝突」(train wreck) パターン


## 5.9 `method()` パターン

JavaScript をもっとクラス的にしようとする試み（JavaScript をクラス的にするアプローチは推奨されません）。
`prototype` へのメソッド追加のシンタックスシュガー。
`method()` はパラメータを2つとります

- 新しいメソッド名
- メソッドの実装

```js
var Person = function(name) {
  this.name = name;
}
.method('getName', function() {
  return this.name;
})
.method('setName', function(name) {
  this.name = name;
  return this;
});


// test
var a = new Person('Adam');
a.getName(); // 'Adam'
a.setName('Eve').getName(); // 'Eve'
```

`method()` の実装

```js
if (typeof Function.prototype.method !== 'function') {
  Function.prototype.method = function(name, implementaion) {
    this.prototype[name] = implementaion;
    return this;
  }
}
```


## 5.10 まとめ
