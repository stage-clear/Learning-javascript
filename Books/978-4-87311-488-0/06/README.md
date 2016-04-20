# コード再利用パターン

コードの再利用にアプローチするときは、GoF本でオブジェクト作成について述べられている「クラス継承よりオブジェクトコンポジションが好ましい」というアドバイスをwスレないようにしましょう。

## 6.1 クラシカルとモダンの継承パターン対決

__クラシカル__ - 何かを実現する適切なやり方として確立している、広く受け入れられている、古典という意味では使っていない

JavaScript にはクラスがないので、クラスのインスタンスという概念は意味をなしません。
JavaScript におけるオブジェクトはキーと値の組にすぎないので、作成や変更が簡単にできます。
その一方で、JavaScript にはコンストラクタ関数があり、new 演算子の構文はクラスを使う構文にかなり似ています


## 6.2 クラシカルな継承を使ったとき期待される結果

クラシカルな継承の実装が目指すゴールは、コンストラクタ関数 `Child()` が別のコンストラクタ `Parent()` からプロパティを取得できるようにすることです。

```js
/**
 * Parent() と Child() という2つのコンストラクタを定義します
 */
// 親コンストラクタ
function Parent(name) {
  this.name = name || 'Adam';
}

// プロトタイプに機能を追加
Parent.prototype.say = function() {
  return this.name;
};

// 空の子コンストラクタ
function Child(name) {}
// ここで継承の魔法がかかります
inherit(Child, Parent);
```

## 6.3 クラシカルなパターンその1: デフォルトパターン

```js
function inherit(C, P) {
  C.prototype = new P();
}

var kid = new Child();
kid.say(); // 'Adam'
```

__`prototype` プロパティは関数ではなくオブジェクトを指すようにすべきです__

### 6.3.1 プロトタイプ連鎖をたどる

### 6.3.2 パターンその1を使うときの欠点

- 追加した固有のプロパティとプロトタイププロパティの両方が継承される（再利用可能なメンバをプロトタイプに追加すべき、というのがコンストラクタの大原則です）
- 子コンストラクタに渡したパラメータを、さらに子から親に渡せない

```js
var s = new Child('Seth');
s.say(); // 'Adam'
// これは期待する結果ではありません
```

### クラシカルなパターンその2: コンストラクタ拝借

子から親に引数を渡す問題を解決します。
親コンストラクタを借りて、子オブジェクトに束縛された `this` を渡します

```js
function Child(a, c, b, d) {
  Parent.apply(this, arguments);
}
```

```js
// 親コンストラクタ
function Article() {
  this.tags = ['js', 'css'];
}
var article = new Article();

// クラシカルパターンその1 を使用して
// article オブジェクトから継承
function BlogPost() {}
BlogPost.prototype = article;
var blog = new BlogPost();


// コンストラクタ拝借パターンを使って
// article から継承
function StaticPage() {
  Article.call(this);
}
var page = new StaticPage();

alert(article.hasOwnProperty('tags'));
// true
alert(blog.hasOwnProperty('tags'));
// false : 親の参照
alert(page.hasOwnProperty('tags'));
// true  : 親のコピーにより隔離されている
```


### 6.4.1 プロトタイプ連鎖

- `new Child` と `Parent` の間にリンクはありません


### 6.4.2 コンストラクタを拝借して多重継承

複数のコンストラクタから拝借するだけです

```js
function Cat() {
  this.legs = 4;
  this.say = function() {
    return 'meaowww' ;
  };
}

function Bird() {
  this.wings = 2;
  this.fly = true;
}

function CatWings() {
  Cat.apply(this);
  Bird.apply(this);
}

var jane = new CatWings();
console.log(jane);
```

### 6.4.3 コンストラクタ拝借パターンの利点と欠点

__欠点__

- プロトタイプから何も継承されません

__利点__

- 親の固有のメンバの本物のコピーが得られる


## 6.5 クラシカルなパターンその3: プロトタイプを拝借して設定する

まずコンストラクタを拝借し、次にこのプロトタイプがコンストラクタの新しいインスタンスを指すようにします


```js
function Child(a, c, b, d) {
  Parent.apply(this, arguments);
}
Child.prototype = new Parent();
```

__利点__

- 親の固有のメンバのコピーと親の再利用可能な機能への参照を持つことができる

__欠点__

- 親コンストラクタが二度呼ばれるため非効率。


```js
// テスト

// 親コンストラクタ
function Parent(name) {
  this.name = name || 'Adam' ;
}

// プロトタイプに機能を追加
Parent.prototype.say = function() {
  return this.name;
};

// 子コンストラクタ
function Child(name) {
  Parent.apply(this, arguments);
}
Child.prototype = new parent();

var kid = new Child('Patrick');
console.log(kid.name);  // Patrick
console.log(kid.say());  // Patrick
delete kid.name;
console.log(kid.say()); // Adam
```


## 6.6 クラシカルなパターンその4: プロトタイプを共有する

```js
function inherit(C, P) {
  C.prototype = P.prototype;
}
```

__利点__

- どのオブジェクトも実際には同じプロトタイプを共有するので、プロトタイプ連鎖が短くなり探索も速くなります

__欠点__

- 継承の連鎖のどこかにある子や孫がプロトタイプを変更してしまうと、すべての親や祖先に影響してしまいます


## 6.7 クラシカルなパターンその5: 一時的コンストラクタ

同一プロトタイプの問題を解決します。
親と子のプロトタイプの直接のリンクを切りつつ、同時にプロトタイプ連鎖の利点を残します。

```js
function inherit(C, P) {
  var F = function() {};
  F.prototype = P.prototype;
  C.prototype = new F();
}
```

### 6.7.1 スーパークラスを格納する

```js
function inherit(C, P) {
  var F = function() {};
  F.prototype = P.prototype;
  C.prototype = new F();
  C.uber = P.prototype;
}
```

### 6.7.2 コンストラクタのポインタを再設定する

コンストラクタへのポインタを再設定しないと、どの子オブジェクトであってもそのコンストラクタは `Parent()` であると報告されるので不便です。
`(kid.constructor === Parent) // true`

このクラシカルな継承パターンの最終的な聖杯バージョンは次のようになります

```js
function inherit(C, P) {
  var F = function() {};
  F.prototype = P.prototype;
  C.prototype = new F();
  C.uber = P.prototype;
  C.prototype.constructor = C;
}
```

継承が必要となるたびに、プロキシ関数が作成されるので、これを避ける

```js
var inherit = (function() {
  var F = function() {}; // proxy function
  return function(C, P) {
    F.prototype = P.prototype;
    C.prototype = new F();
    C.uber = P.prototype;
    C.prototype.constructor = C;
  }
}());
```


## 6.8 Klass

JavaScript ライブラリの多くは、新しいシンタックスシュガーを導入してクラスを真似ています

- あるメソッドをクラスのコンストラクタとしてみなすための命名の作法があります。たとえば `initilize` `_init` などでこれらは自動的に呼ばれます
- クラスは他のクラスから継承します
- 子クラスの内部から親クラス（スーパークラス）にアクセスできます


```js
/**
 * 実装の例
 */
var Man = Klass(null, {
  __construct: function(what) {
    console.log('Mans constructor');
    this.name = what;
  },
  getName: function() {
    return this.name;
  }
});

/**
 * Man クラスを拡張して SuperMan クラスを作成する
 */
var SuperMan = Klass(Man, {
  __construct: function(what) {
    console.log('SuperMants constructor');
  },
  getName: function() {
    var name = SuperMan.uber.getName.call(this);
    return 'I am ' + name;
  }
});
```

`Klass()` 関数の実装

```js
var klass = function(Parent, props) {
  var Child, F, i;

  // 1.
  // 新しいコンストラクタ
  Child = function() {
    if (Child.uber && Child.uber.hasOwnProperty('__construct')) {
      Child.uber.__construct.apply(this, arguments);
    }
    if (Child.prototype.hasOwnProperty('__construct')) {
      Child.prototype.__construct.apply(this, arguments);
    }
  };

  // 2
  // 継承
  Parent = Parent || Object;
  F = function() {};
  F.prototype = Parent.prototype;
  Child.prototype = new F();
  Child.uber = Parent.prototype;
  Child.prototype.constructor = Child;

  // 3.
  // 実装したメソッドを追加
  for (i in props) {
    if (props.hasOwnProperty(i)) {
      Child.prototype[i] = props[i];
    }
  }

  // クラスを返す
  return Child;
}
```

JavaScript に存在しないクラスという概念は混乱のもとになるので、使わないですむに越したことはありません。


## 6.9 プロトタイプによる継承

クラスを使わない「モダンな」パターン。

まず再利用したいオブジェクトがあり、このオブジェクトから機能を得る2番目のオブジェクトを作りたいとします。

```js
// 継承元のオブジェクト
var parent = {
  name: 'Papa'
};

// 新しいオブジェクト
var child = object(parent);

// テスト
alert(child.name); // 'Papa'


/**
 *
 */
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
```

### 6.9.1 解説

親を作成するのにリテラルでなく、コンストラクタ関数を使うことで、固有のプロパティだけでなくコンストラクタのプロトタイプにあるプロパティも継承されます

```js
// 親コンストラクタ
function Person() {
  // 固有のプロパティ
  this.name = 'Adam';
}
// プロトタイプに追加したプロパティ
Person.prototype.getName = function() {
  return this.name;
};

// 新規作成
var papa = new Person();
// 継承
var kid = object(papa);

// 固有のプロパティとプロトタイププロパティの
// 両方が継承されているかテスト
kid.getName(); // 'Adam'
```

既存のコンストラクタの __プロトタイプだけを継承__ することもできます

```js
// 親コンストラクタ
function Person() {
  // 固有のプロパティ
  this.name = 'Adam';
}

// プロトタイプに追加されたプロパティ
Person.prototype.getName = function() {
  return this.name;
};

// 継承
var kid = object(Person.prototype); // <-

typeof kid.getName; // プロトタイプにあるので function
typeof kid.name; // プロトタイプだけしか継承していないので undefined
```


### 6.9.2 ECMAScript 5 に追加されたもの

ES5 では、プロトタイプ継承パターンは公式に言語の一部担っています。

```js
var child = Object.create(parent);
```

```js
var child = Object.create(parent, {
  age: { value: 2 }
});
child.hasOwnProperty('age'); // true
```


## 6.10 プロパティのコピーによる継承

別のオブジェクトの機能をコピーすることで、継承を実現します。

```js
function extend(paret, child) {
  var i;
  child = child || {};
  for (i in parent) {
    if (paren.hasOwnProperty(i)) {
      child[i] = parent[i];
    }
  }
  return child;
}

// test
var dad = { name: 'Adam' };
var kid = extend(dad);
kid.name; // 'Adam'
```

`extend` の深いコピーバージョン

```js
function extendDeep(parent, child) {
  var i;
  var toStr = Object.prototype.toString;
  var astr = '[object Array]';

  child = child || {};

  for (i in parent) {
    if (parent.hasOwnProperty(i)) {
      if (typeof parent[i] === 'object') {
        child[i] = (toStr.call(parent[i]) === astr) ? [] : {};
        extendDeep(parent[i], child[i]);
      } else {
        child[i] = parent[i];
      }
    }
  }
  return child;
}

// test
var dad = {
  counts: [1,2,3],
  reads: { paper: true }
};
var kid = extendDeep(dad);

kid.counts.push(4);
kid.counts.toString(); // 1,2,3,4
dad.counts.toString(); // 1,2,3

dad.reads === kid.reads; // false
kid.reads.paper = false;
kid.reads.web = true;
dad.reads.paper; // true;
```


## 6.11 ミックスイン

ひとつのオブジェクトからコピーするかわりに、複数のオブジェクトからコピーし、それらをすべて混ぜ合わせて新しいオブジェクトにすることができます。
実装は簡単で、引数をループで順に処理し、引数で渡された各オブジェクトのすべてのプロパティをコピーします

```js
function mix() {
  var arg, prop, child = {};
  for (arg = 0; arg < arguments.length; arg += 1) {
    for (prop in arguments[arg]) {
      if (arguments[arg].hasOwnProperty(prop)) {
        child[prop] = arguments[arg][prop];
      }
    }
  }
  return child;
}

// test
var cake = mix(
  {eggs: 2, large: true},
  {butter: 1, salted: true},
  {flour: '3 cups'},
  {sugar: 'sure!'}
);
```

ミックスインが公式機能である言語からミックスインという概念を学んだ方は、親のひとつまたは複数を変更すると、子にも影響があると思われるかもしれません。しかし、この実装ではそうはなりません。固有のプロパティを順にコピーしているだけなので、親とのリンクは切れています。


## 6.12 メソッドを拝借する

既存のオブジェクトのメソッドのうち、ひとつかふたつだけ裁量したいけれども、そのオブジェクトとの親子関係は作りたくないことがあります。

```js
// call
notmyobj.doStuff.call(myobj, param1, p2, p3);
// apply
notmyobj.doStuff.apply(myobj, [param1, p2, p3]);
```

### 6.12.1 例: 配列から拝借

このパターンは、配列のメソッドを拝借するとき、よく使われます。

```js
function f() {
  var args = [].slice.call(arguments, 1, 3);
  return args;
}
f(1,2,3,4,5,6); // [2,3]
```

### 6.12.2 拝借と束縛

```js
/**
 * one というオブジェクトは say() メソッドを持っています
 */
var one = {
  name: 'object',
  say: function(greet) {
    return greet + ', ' + this.name;
  }
};

// test
one.say('hi'); // hi, object

/**
 * 別のオブジェクト two は say() メソッド持っていませんが
 * one から借りることができます
 */
var two = {
  name: 'another object'
};

one.say.apply(two, ['hello']); // hello, another object
```

次のような簡単な関数を使えば、あるオブジェクトをあるメソッドに固定できます

```js
/**
 * オブジェクト o とメソッド m を受け取り、
 * この2つを結合した別の関数を返します
 */
function bind(o, m) {
  return function() {
    return m.apply(o, [].slice.call(arguments));
  }
}

// test
var twosay = bind(two, one.say);
twosay('yo');  // yo, another object
```


### 6.12.3 `Function.prototype.bind()`

EC5 では `Function.prototype` にメソッド `bind()` が追加され、`apply()` や `call()` と同じように簡単に使えます。

```js
/**
 * `someFunc` と `myobj` を結合して `someFunc` が期待する
 * 最初の3つの引数の値を設定しています
 */
var newFunc = obj.someFunc.bind(myobj, 1, 2, 3);
```

ES5 以前の環境のためのポリフィル

```js
if (typeof Function.prototype.bind === 'undefined') {
  Function.prototype.bind = function(thisArg) {
    var fn = this;
    var slice = Array.prototype.slice;
    var args = slice.call(arguments, 1);
    return function() {
      return fn.apply(this.Arg, args.concat(slice.call(arguments)));
    }
  };
}
```


## 6.13 まとめ

JavaScript には、メソッドの拝借、束縛、プロパティのコピー、いくつかのオブジェクトからのプロパティのミックスインといった、より簡潔でエレガントな手段があります。
コードの再利用こそがゴールであり、継承はそのゴールに到達するためのひとつの手段にすぎません。このことをわすれないようにしましょう。
