# 関数

## 4.1 背景

JavaScript の関数には2つの大きな特徴があります。
__第一級オブジェクト__ であることと、__スコープを提供する__ ことです。

関数とは次のようなオブジェクトです。

- プログラムの実行時に動的に作成できる
-  変数に代入できる。他の変数にコピーされた関数への参照を持てる。いくつかの例外状況を除いて、削除できる
- 他の関数に引数として渡せる。他の関数の戻り値にできる
- 独自のプロパティとメソッドを持てる


## 4.2 用語の整理

- __名前付き関数式__ - 省略可能な名前を定義している特殊な関数式
- __名前なし関数式__（いわゆる__無名関数__）
- __関数宣言__


```js
// 名前付き関数式
var add = function add(a, b) {
  return a + b;
};

// 名前なし関数式、いわゆる無名関数
var add = function(a, b) {
  return a + b;
};

// 関数宣言
function foo() {
  // do something...
}
```

名前付き関数式と無名関数との唯一の違いは、`name` プロパティが空文字になる点です。


### 4.1.2 宣言と式: 名前と巻き上げ

関数宣言と関数式のどちらを使うべきでしょうか？
関数宣言は「プログラムコード」でしか現れません。他の関数の本体の中にあるか、あるいはグローバル空間にある、という意味です。


### 4,1,3 関数の `name` プロパティ

関数宣言パターンでは読み取り専用の `name` プロパティが利用できる点も考慮すべきです。
このプロパティは標準ではありませんが、多くの環境で利用できます。

```js
function foo() {}   // 関数宣言
var bar = function() {}; // 名前なし関数式
var baz = function baz() {}; // 名前付き関数式

foo.name; // foo
bar.name; // ''
baz.name; // baz
```


### 4.1.4 関数の巻き上げ

関数宣言の振る舞いは__名前付き__関数式とほぼ等しいと思われたかもしれませんが、
これは正確ではなく、__関数の巻き上げ__ (hoisting) があるかどうかに違いがあります。

```js
// アンチパターン
// あくまで説明用です

// グローバル関数
function foo() {
  alert('global foo');
}
function bar() {
  alert('global bar');
}

function hoistMe() {
  console.log(typeof foo); // function
  console.log(typeof bar); // undefined

  foo(); // 'local foo'
  bar(); // TypeError: bar is not a function

  // 関数宣言
  function foo() {
    alert('local foo');
  }

  // 関数式
  // 変数bar だけが巻き上げられる
  // 実装は巻き上げられない
  var bar = function() {
    alert('local bar');
  };
}

hoistMe();
```

`bar()` は宣言だけが巻き上げられ、定義は巻き上げられません。

JavaScript の関数の2つの特徴は重要なので覚えておきましょう

- 関数はオブジェクトです
- 関数はローカルスコープを提供します


## 4.2 コールバックパターン

関数はオブジェクトなので、他の関数に引数として渡すことができます。

```js
function writeCode(callback) {
  // なにか処理する...
  callback();
}

function introduceBugs() {
  // バグを作る
}

writeCode(introduceBugs);
```

`introduceBugs()` を `writeCode()` に引数として渡すとき、括弧がない点に注意してください。
括弧があると関数は実行されてしまいます。


#### 4.2.1 コールバックの例

コールバックを使わない例

```js
var findNodes = function() {
  var i = 10000; // 果てしないループ
  var nodes = []; // ここに結果を収納
  var found; // 次のノード

  while(i) {
    i -= 1;
    // 複雑なロジック...
    nodes.push(found);
  }
  return nodes;
};
```

リファクタリング

```js
var hide = function(nodes) {
  var i = 0;
  var maz = nodes.length;

  for (; i < max; i += 1) {
    nodes[i].style.display = 'none';
  }
};

// この関数を実行
hide(findNodes());
```

この実装は非効率です。

```js
var findNodes = function(callback) {
  var i = 100000;
  var nodes = [];
  var found;

  // callback が呼び出しできるか検査
  if (typeof callback !== 'function') {
    callback = false;
  }

  while(i) {
    i -= 1;

    // 複雑なロジック

    // ここでコールバック
    if (callback) {
    callback(found);
    }

    nodes.push(found);
  }
  return nodes;
};

// コールバック関数
var hide = function(node) {
  node.style.display = 'none';
};

findNodes(hide);

// もしくは無名コールバックを渡す
findNodes(function(node) {
  node.style.display = 'none';
});
```

### 4.2.2 コールバックとスコープ

`myapp` というオブジェクトの `paint()` メソッドをコールバックとして使う状況を想定してみます。

```js
var myapp = {};
myapp.color = 'green';
myapp.paint = function(node) {
  node.style.color = this.color;
};

// findeNodes()
var findNodes = function(callback) {
  // ...
  if (typeof callback === 'function') {
    callback(found);
  }
  // ...
};
```

これは期待通りに動作しません。`this.color` が定義されていないからです。
この問題は、コールバック関数と一緒にこのコールバックが属しているオブジェクトを渡せば解決します。

```js
findNodes(myapp.paint, myapp);

var findNodes = function(callback, callback_obj) {
  if (typeof callback === 'function') {
    callback.call(callback_obj, found);
  }
};
```

メソッドを文字列で渡すやり方もあります。そうすれば、オブジェクトを二度書かずにすみます。

```js
findNodes('paint', myapp);

var findNodes = function(callback, callback_obj) {
  if (typeof callback === 'string') {
    callback = callback_obj[callback];
  }

  // ...

  if (typeof callback === 'function') {
    callback.call(callback_obj, found);
  }
};
```

### 4.2.3 非同期イベントリスナ

コールバックパターンは日常的に頻繁に使われています。

```js
document.addEventListener('click', console.log, false);
```

クライアント側でのプログラムングのほとんどはイベント駆動です。
JavaScript はコールバックパターンが使えるので、イベント駆動プログラミングに最適です。
コールバックを使うと、プログラムを__非同期__に実行させることができます。

### 4.2.4 タイムアウト

ブラウザの `window` オブジェクトが提供するタイムアウトメソッドはコールバックパターンのもうひとつの例です。

```js
var thePlotThickens = function() {
  console.log('after 500ms');
};
setTimeout(thePlotThickens, 500);
```

### 4.2.5 ライブラリで使うコールバック

コールバックは簡潔で強力なパターンなので、ライブラリを設計するときにも役立ちます。

コア機能に焦点を絞り、コールバックにおける「フック」を提供することで、ライブラリメソッドの組み立て、拡張、カスタマイズが
簡単にできるようにするのです。


## 4.3 関数を返す

関数はオブジェクトなので、戻り値として使うことができます。

```js
var setup = function() {
  alert(1);
  return function() {
    alert(2);
  };
};

// setup 関数を使う
var my = setup(); // アラートで 1 が表示される
my(); // アラートで 2 が表示される
```

```js
var setupt = function() {
  var count = 0;
  return function() {
    return (count += 1);
  };
};

var next = setup();
next(); // 1 が返る
next(); // 2
next(); // 3
```


## 4.4 自己定義関数

関数の定義を動的に行い、変数に代入することができます。
新しい関数を作成し、すでに別の関数を保持している変数にこの関数を代入すれば、古い関数は新しい関数で上書きされます。

```js
var scareMe = function() {
  alert('Boo!');

  scareMe = function() {
    alert('Double boo!');
  };
};

// 自己定義関数を使う
scareMe(); // Boo
scareMe(); // Double Boo
```


## 4.5 即時関数

- 関数を定義したすぐにその関数を実行するための構文です

```js
(function() {
  alert('watch me!');
}());
```

このパターンは以下の部品で構成されます。

- 関数式を使って関数を定義する（関数宣言はつかえません）
- 最後に一対の括弧を付加する。これによって関数が即座に実行されます。
- 関数全体を括弧で囲む（関数を変数に代入しないときしないときだけこれが必要です）

即時関数が必要とされるのは、コードをすべてそのローカルスコープに閉じ込め、グローバルスコープに
変数が漏れないようにするためです。

```js
(function() {
  var days = ['sun', 'mon', 'Tue', 'wed', 'thu', 'fri', 'sat'],
      today = new Date(),
      msg = 'Today is ' + days[today.getDay()] + ', ' + today.getDate();

  alert(msg);
}()); // 'Today is fri, 13'
```

### 4.5.1 即時関数のパラメータ

- 即時関数に引数雨を渡すこともできます
- 一般に、即時関数の引数にはグローバルオブジェクトを渡します。そうすれば `window` を使わずに
  関数の内部からアクセスできるからです
- 一般に、即時関数にはあまりに多くのパラメータを渡すべきではありません

```js
(function(glboal) {
  // global を介してグローバルオブジェクトにアクセス
}(this));
```


### 4.5.2 即時関数からの戻り値

即時関数も他の関数と同じように値を返すことができます

```js
var result = (function() {
  return 2 + 2;
}())
```

関数を囲む括弧を省略しても同じ結果が得られますが、誤読される可能性があります。
関数の最後にある `()` を見落としてしまうと `result` が関数を指していると誤解されるかもしれません

```js
var o = {
  message: (function() {
    // オブジェクト生成時に処理される
    var who = 'me',
        what = 'call';
    return what + ' ' + who;
  }()),
  getMsg: function() {
    return this.message;
  }
};
// usage
o.getMsg(); // 'call me'
o.message(); // 'call me'
```


### 4.5.3 利点と使い方


## 4.6 即時オブジェクト初期化

- グローバルスコープを汚染から保護する方法がもうひとつあります
- __即時オブジェクト初期化__ というパターン

```js
({
  // ここで設定値を定義できます
  // 定数を設定しています
  maxwidth: 600,
  maxheight: 400,

  // ユーティリティメソッドも定義できます
  gimmeMax() {
    return this.maxwidth + 'x' + this.maxheight;
  },

  // 初期化
  init() {
    console.log(this.gimmeMax());
    // その他の初期化作業
  }
}).init();
```

オブジェクトリテラルを括弧（グループ化演算子）で囲むと、JavaScript エンジンは波括弧を
コードブロッックとしてではなく、オブジェクトリテラルとして扱います。（ただし `if` や `for` ループは
別です。）

オブジェクトだけを包むかわりに、オブジェクトとto `init()` 呼び出しをグループ化の括弧で
包むこともできます。つまり、次のどちらでも動きます。

```js
({...}).init();
({...}.init());
```


## 4.7 初期化分岐

プログラムの動作中、まったく変更されない条件があることがわかっていれば、その条件の判断を
一度だけ行うのは意味があります。ブラウザの識別（あるいは機能の検出）が典型的な例です。

```js
var utils = {
  addListener: null,
  removeListener: null
};

// 実装
if (typeof window.addEventListener === 'function') {
  utils.addListener = function(el, type, fn) {
    el.addEventListener(type, fn, false);
  };
  utils.removeListener = function(el, type, fn) {
    el.removeEventListener(type, fn, false);
  };
} else if (typeof document.attachEvent === 'function') {
  utils.addListener = function(el, type, fn) {
    el.attachEvent('on' + type, fn);
  };
  utils.removeListener = function(el, type, fn) {
    el.detachEvent('on' + type, fn);
  };
} else {
  utils.addListener = function(el, type, fn) {
    el['on' + type] = fn;
  };
  utils.removeListener = function(el, type, fn) {
    el['on' + type] = null;
  };
}
```


## 4.8 関数プロパティによるメモ化パターン

- いつでも関数にカスタムのプロパティを追加できます。関数の結果（戻り値）をキャッシュする
のは、カスタムプロパティの用途の一つです。関数の結果をキャッシュすることをメモ化（memoization）
とも言います。

```js
var myFunc = function(param) {
  if (!myFunc.cache[param]) {
    var result = {};
    // 重たい処理
    myFunc.cache[param] = result;
  }
  return myFunc.cache[param];
};

// キャッシュの記憶領域
myFunc.cache = {};
```

パラメータを増やして複雑にするときは、それらをシリアライズするのが一般的な解です。
たとえば、引数オブジェクトをJSONデータにシリアライズし、`cache` オブジェクトのキーとして
そのデータを使うことができます。
（シリアライズするとオブジェクトの一意性が失われる点にも注意しましょう）

```js
var myFunc = function() {
  var cachekey = JSON.stringfy(Array.prototype.slice.call(arguments)),
      result;
  if (!myFunc.cache[cachekey]) {
    result = {};
    // 重たい処理...
    myFunc.cache[cachekey] = result;
  }
  return myFunc.cache[cachekey];
};

// キャッシュの記憶領域
myFunc.cache = {};
```

前の例では関数名をハードコーディングしましたが、`arguments.callee` を使って関数を参照
するように書くこともできます。（ECMAScript 5 の strict モードでは `arguments.callee`
が許されないので注意しましょう）


```js
var myFunc = function(param) {
  var f = arguments.callee,
      result;

  if (!f.cache[param]) {
    result = {};
    // 重たい処理...
    f.cache[param] = result;
  }
  return f.cache[param];
};

// キャッシュの記憶領域
myFunc.cache = {};
```


## 4.9 設定オブジェクト

- 設定オブジェクトパターンは、APIをきれいに提供する方法です
- 多数のパラメータを引数で渡すのは不便です。パラメータを一つにまとめてオブジェクトにするのが
良いアプローチです。

```js
var conf = {
  username: 'batman',
  first: 'Bruce',
  last: 'Wayne'
}
```

設定オブジェクトの利点

- パラメータの順序を覚える必要がありません
- オプションのパラメータを省略できます
- コードが読みやすく保守が楽になります
- パラメータの追加や削除が簡単になります

設定オブジェクトの欠点

- パラメータの名前を覚える必要があります
- プロパティはミニファイされません


## 4.10 カリー化

### 4.10.1 関数の適用

純粋な関数プログラミング言語においては、__関数は呼び出される__ ものとしてではなく、むしろ
__適用される__ ものとして説明されます。JavaScript においても同様で、メソッド `Function.prototype.apply()`
を使って関数を適用することができます

```js
// 関数を定義
var sayHi = function(who) {
  return 'Hello' + (who ? ', ' + who : '') + '!';
}

// 関数を呼び出し
sayHi(); // 'hello'
sayHi('world'); // 'Hello, world!'

// 関数を適用
sayHi.apply(null, ['hello']); // Hello, hello!
```

```js
var alien = {
  sayHi: function(who) {
    return 'Hello' + (who ? ', ' + who : '') + '!';
  }
};

alien.sayHi('world'); // Hello, world!
alien.sayHi.apply(alien, ['humans']); // Hello, humans!
```

関数の呼び出しはシンタックスシュガーにすぎず、関数の適用と等価であることがわかります
`Function.prototype` には `apply()` だけでなく `call()` メソッドもありますが、これは
`apply()` のシンタックスシュガーにすぎません。シンタックスシュガーを使ったほうが良い場合
もあります。パラメータを一つしかとらない関数については、`call()` を使えば要素が一つだけの
配列を作る作業が節約できます


### 4.10.2 部分適用

```js
var add = function(x, y) {
  return x + y;
};

// 完全適用
add.apply(null, [5, 4]);

// 部分適用（想像上の parialApply()を使って説明）
var newadd = add.partialApply(null, [5]);
// 引数を新しい関数に適用します
newadd.apply(null, [4]); // 9
```


### 4.10.3 カリー化

```js
// カリー化された add()
function add(x, y) {
  var oldx = x;
  var oldy = y;
  // 部分適用
  if (typeof oldy === 'undefined') {
    return function(newy) {
      return oldx + newy;
    };
  }

  // 完全適用
  return x + y;
}

// テスト
console.log(typeof add(5)); // function
add(3)(4); // 7

// 新しい関数を作成し格納します
var add2000 = add(2000);
add2000(10); // 2010
```

これと同じ変換をもっと一般的なやり方で実現できないでしょうか？
ある関数をその関数の一部の引数を受け取る新しい関数に変換できないでしょうか？
汎用のカリー化関数は次の通りです


```js
function schonfinkelize(fn) {
  var slice = Array.prototype.slice;
  var stored_args = slice.call(arguments, 1);

  return function() {
    var new_args = slice.call(arguments);
    var args = stored_args.concat(new_args);
    return fn.apply(null, args);
  };
}
```

## 4.11 まとめ

JavaScript で重要なのは、関数についての知識と正しい使い方です。

1. 関数は __第一級オブジェクト__ です。関数を値として渡すことができ、プロパティとメソッドを
拡張することができあmす
2. 関数はローカル __スコープ__ を提供します。波括弧はローカルスコープを提供しません。ローカル変数
を宣言するとローカルスコープの先頭に巻き上げられることを忘れないでください

関数を作成する構文には以下のパターンが含まれます

1. __名前付き関数式__
2. __関数式__ （名前付き関数式と同じですが名前がありません）、__無名関数__ とも呼ばれます
3. __関数宣言__ 。他の言語の関数構文と似ています

関数の背景と構文に続いて、幾つかの便利なパターンについて学びました。これらのパターンは
以下のカテゴリに分類できます。

1. __APIパターン__ : 関数のインターフェイスをきれいでより良いものにするのに役立ちます。
以下のパターンが含まれます
  - __コールバックパターン__ - 関数を引数として渡します
  - __設定オブジェクト__ - たくさんの引数をひとつの関数で制御します
  - __関数を返す__ - ある関数の戻り値を別の関数にします
  - __カリー化__ - 既存の関数とその引数の部分リストをもとに新しい関数を作ります
2. __初期化パターン__ : 初期化と設定作業（ウェブのページやアプリケーションでは頻繁に行われます）
をより綺麗に実行するのに役立ちます。グローバル名前空間を一時的な変数で汚染しない構成にします。
以下のパターンが含まれます
  - __即時関数__ - 定義されたら即座に実行されます
  - __即時オブジェクトを初期化__ - 初期化作業を無名オブジェクトで構成します。無名オブジェクトは即座に呼ばれるメソッドを提供します
  - __初期化時分岐__ - アプリケーションの動作中に何度も同じ分析コードを実行するのではなく、初回に実行される時分岐コードを1回だけ実行します
3. __性能パターン__ : コードの実行速度を向上させます。以下のパターンが含まれます
  - __メモ化__ - 計算値が何度も繰り返し計算されないように関数のプロパティを使います
  - __自己定義関数__ - 関数を新しい本体で上書きして、2回目以後の呼び出しで行う作業を減らします
