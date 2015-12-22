# 関数

## 4.1 背景

JavaScript の関数には2つの大きな特徴があります。
__第一級オブジェクト__であることと、__スコープを提供する__ことです。

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

名前付き関数式と無名関数との唯一の違いは、`name` プロパティがから文字になる点です。


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

