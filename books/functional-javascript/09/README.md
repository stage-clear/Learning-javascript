# 第9章 クラスを使わないプログラミング

JavaScript 言語に実装されている最小限のツール(関数, オブジェクト, プロトタイプ, そして配列)に初めて接すると, 多くの人ががっかりします.
そのような人々は, （略）JavaScript を改造するために, クラスベースのシステムをどこからか探し出してくるか, あるいは自分の手でその再発明を行います. 
__人々は慣れたものを探しだすという一般的な前提に立てば__, このような行動は理解できます. `257`  

本書でこれまでに学んだことをまとめて, 関数型とオブジェクト指向の考え方をうまく併用する方法を考えることこそが有意義であると言えます. `257`  


### 9.1 データ指向

型の階層を生成することを意図的に避けて, シンプルなデータ型を集めることによってテーブル（8章）やコマンド（4章）のようなより高位のデータモデルを組み立てました. 
メソッドよりも関数に集中することで, オブジェクトの考え方や方法論に依存しないAPIを提供することができました.  
関数型のインターフェイスにこだわることにより, 抽象化されたデータを実装するような具体的なデータ型の重要性は想定的に小さくなりました. そして, 一貫性のある関数型のインターフェイスを維持しつつ, データの実装詳細を変更できる柔軟性がもたらされたのです. `257 - 258`  

JavaScript は, 名前付きデータ型や型階層を作る必要性を迎える, もしくは完全に排除するための様々な
協力な手段を提供します. 代表的なものに以下があります. `260`

- プリミティブデータ型
- 複合型(オブジェクトと配列)
- ビルトインデータ型を使用する関数
- メソッドを格納できる無名オブジェクト
- 型付きオブジェクト
- クラス


__データ思考の階層__  

1. [プリミティブ]
2. [プリミティブ] [プリミティブ]
3. [上記を使った関数]
4. [無名オブジェクト]
5. [型付きオブジェクト]
6. [クラス]


### 9.1.1 関数型を目指して構築

プログラミングにおける作業では, 何らかの計算のさなかに発生するアクティビティが最も大切です. `261`  

例えば, フォームに入力された文字列を読み込んで, 検証して, 別のデータ型に変換し, 計算処理を実行して, 計算された新しい値文字列に変換して送る, という一連の動作を想像してみてください.

レイジーチェーンはオブジェクト中心の考え方であり, 操作するためにはメソッドを連ねる必要があります.
レイジーチェーンは以下の3つのステージに分解できます

1. なんらかのオブジェクトを取得
2. このオブジェクトにチェーンを定義
3. チェーンを実行

```js
function deferreSort() {
  return lazyChain(ary).invoke('sort');
}

var deferredSorts = _.map([[2,1,3],[7,7,1],[0,9,5]], deferredSort);
//=> [<thunk>, <thunk>, <thunk>]

function force(thunk) {
  return thunk.force();
}

_.map(deferredSorts, force);
```

検証の動作をすべて1つの関数(あるいは, 復数の関数かもしれませんが)に集めておくことで,チェーン内の他のステップを気にすることなく検証内容を変更できます. `263`  

```js
var validataTriples = validator(
  'それぞれの配列は3つの要素を持っている必要があります',
  function(arrays) {
    return _.every(arrays, function(a) {
      return a.length === 3;
    });
  });

var validateTripleStore = parial1(
  condition1(validateTriples),
  _.identity
);

validateTripleStore([[2,1,3], [7,7,1], [0,9,5]]);
//=> [[2,1,3], [7,7,1], [0,9,5]]

validateTripleStore([[2,1,3], [7,7,1], [0,9,5,7,7,7,7,7]]);
// Error: それぞれの配列は3つの要素を持っている必要があります.
```

そして, 他の遅延実行処理の定義を行います. (ただし必ずしも遅延実行しなければならないわけではありません.) `263`  

```js
function postProcess(arrays) {
  return _.map(arrays, second);
}
```

ここまでに定義されたパーツを特定のタスクを行うために集めて, より高位のアクティビティを定義できます. `263`  

```js
function procesTriples(data) {
  return pipeline(data
    , JSON.parse
    , validateTripleStore
    , deferredStore
    , force
    , postProcess
    , invoker('sort', Array.prototype.sort)
    , str);
}

// 例)
processTriples('[[2,1,3], [7,7,1], [0,9,5]]');
//=> '1,7,9'

// 例)
$.get('http://dsafas.com', function(data) {
  $('#result').text(processTriples(data));
});

// レポーティングのためのロジックを抽象化する際に, この関数をロジックの一部として利用できます.
var reportDataPackets = _.compose(
  function(s) { $('#result').text(s);},
  processTriples);

reportDataPackets('[[2,1,3], [7,7,1], [0,9,5]]');
// (Webページの要素が変更される)

// そして, 望んだ通りの効果を実行するために, 抽象化されたロジックをアプリケーションに取り付けることができます.
$.get('http://fdsajkf.com', reportDataPackets);
```

一般的に関数を生成するということは, 解決すべき問題をパイプラインの一方から入れたデータを徐々に変換して他方から出すこと, として考えることができます. `265`  

互換性のあるパイプラインはフィードフォワードの作法で最初から最後までつなげることができます.　また、互換性のないパイプラインもアダプタを介してつなげることができます. `265`  

パイプラインのように変換器にデータが流れていくという考え方は, 単一の関数から大きなシステム全体までカバーできるスケーラブルな考え方です. `265`  

しかしながら, オブジェクト指向の考え方が適切な場合があります. 汎用的な mixin を伴うデータ型, 正しく抽象化されている場合です. `265`  


## 9.2 Mixin

### 9.2.1 コアプロトタイプマンジング

```js
(new Contaienr(42)).toString();
//=> '[object Object]'

// この結果は許せません. ここでまず考えられる選択肢としては,
// Containerに特化したtoStringメソッドをその prototype に定義することです.
Container.prototype.toString = function() {
  return ['@<', polyToString(this._value), '>'].join('');
};

(new Container(42)).toString();
//=> '@<42>'

(new Container({a: 42, b: [1,2,3]})).toString();
//=> '@<{'a':42, 'b': [1,2,3]}>'

// しかし, もしコアオブジェクトに機能を追加したい場合はどうでしょうか?唯一の選択肢は, コアプロトタイプそのものに手を出すことです.
Array.prototype.toString = function() {
  return 'DON\'T DO THIS';
};
[1,2,3].toString()
//=> 'DON'T DO THIS
```

この問題は, こうして作成したライブラリを誰か他の人が使わなければならないことになった場合, そこで生成されたすべての配列がこの新しい`Array#toString`メソッドによって汚染されることになることになります. したがって, ArrayやObjectなどのコアデータ型においては, そのようなカスタムの動作を, カスタムデータ型に委譲した関数に隔離しておくほうがはるかによいのです. 
まさにこれを`Container#toString`で行い`polyToString`
に委譲したのです.

* Core Prototype Munging. マンジング(mung/munge)とはいわゆるjargonで, 一見なんということのない復元可能な変更を様々場所に加える事により, システム全体をいつのまにか取り返しの付かない状態まで破壊してしまうような行為のこと.


### 9.2.2 クラス階層構造

> Smalltalk では, すべてがどこか別の場所で起こる ---Adele Goldberg

クラスベースのオブジェクト指向の方法論を使ってシステムを設計している時に, 慣例的にシステムを構成する「モノ」とそれらの関連性を列挙しようとするはずです. オブジェクト指向のレンズを通して問題をみると, 大抵の場合, あるクラスの他のクラスへの関連の仕方は階層的なものになります. 例えば「従業員」は「人」の種類の一つ （略） `271`

```js
function ContainerClass() {}
function ObservedContainerClass() {}
function HoleClass() {}
function CASClass() {}
function TableBaseClass() {}

ObservedContainerClass.prototype = new ContainerClass();
HoleClass.prototype = new ObservedContainerClass();
CASClass.prototype = new HoleClass();
TableBaseClass.prototype = new HoleClass();

// すべての階層関係が縫い合わされたので, それらを期待通りに解決できるかテストします.

(new CASClass()) instanceof HoleClass;
//=> true
(new TableBaseClass()) instanceof HoleClass;
//=> true
(new HoleClass()) instanceof CASClass;
//=> false

// 期待した通りです. 継承は階層を遡りますが, 階層を下方向に伝うことはありません. ここで,
// スタブをいくつか入れてみましょう.

var ContainerClass = Class.extend({
  init: function(val) {
    this._value = val;
  },
});
var c = new ContainerClass(42);

c:
//=> {_value: 42}

c instanceof Class;
//=> true

// ContainerClassはただ値を保持しています. しかし, ObservedContainerClassは追加機能を提供します.

var ObservedContainerClass = ContainerClass.extend({
  observe: function(f) { note('observer を設定'); },
  notify: function() { note('observers に通知'); }
});

// 当然, ObservedContainerClass は自分自身で何かを行うことはあまりありません.
// 代わりに, 値を設定し,　それを通知する方法が必要です.

var HoleClass = ObservedContainerClass.extend({
  init: function (val) {
    this.setValue(val);
  },
  setValue : function(val) {
    this._value = val;
    this.notify();
    return val;
  }
});

// そして期待通り, 新しいHoleClassのインスタンスで継承されたメソッドを利用できます.

var h = new HoleClass(42);
//=> 情報: observersに通知

h.observe(null);
//=> 情報: observerを設定
h.setValue(108);
//情報observersに通知
//=> 108

// そしてこの階層で一番そこで, 新しいクラスと動作を加えます.

var CASClass = HoleClass.extend({
  swap: function(oldVal, newVal) {
    if (!_.isEqual(oldVal, this._value)) {
      fail('現在値が一致しません');
    }
    return this.setValue(newVal);
  }
});
```

CASClassインスタンスがコンペア・アンド・スワップ (CASはCompare And Swapの頭文字)の仕組みを追加しました. この仕組は「『あなたが考える現在値』と『新しい値』を提供すれば, その現在値が本当の現在値と同値である場合に限って, 新しい値を代入する」というものです. この変更の仕組みは非同期プログラミングにおいて特に有効なものです. なぜならば, 現在値がへんこうされていないかどうかを確認するための手段を提供するからです. JavaScript の「Run-to-completion」と, このコンペア-アンド-スワップの組み合わせは, 非同期の値の変更における一貫性を確保するための強力な手段です. `275`  

```js
// 実行
var c = new CASClass(42);
// 情報: observers に通知

c.swap(42, 43);
// 情報: observers に通知

c.swap('not the value', 44);
// Error: 現在値が一致しません
```

__`Run-to-completion`__

一言で言えば, 「Run-to-completion」は JavaScript のイベントループの性質を指しています. つまり、イベントループの特定のtickで実行されている呼び出しは, 次のtickまでに完了することが保証されています. 


### 9.2.3 階層を変更

### 9.2.4 Mixinを使って階層を平坦化

もしそこにあるものがすべて動作だとしたら, 新しい動作を作る方法は新に動作を定義するか, 既存の動作を
「混ぜ込む」ことになります. `278`  
* 本書での`mixin`は, 一般的に「プロトコル」として知られるものと, テンプレートメソッドデザインパターンを足して, 階層を引いたものです.

```js
// Containerに関してここで一旦すべてリセットし, まずContainerの実装をやり直します.
/*
 * Container
 * - init 呼び出しは Underscore の _.identity に委譲します.
 * - 
 */
function Container(val) {
  this._value = val;
  this.init(val);
}
Container.prototype.init = _.identity;
// この init 呼び出しの存在が mixin の特徴です

var c = new Container(42);
c;
//=> {_value: 42}
```

#### Container の `mixin` プロトコル

__拡張プロトコル (mixin拡張の際必須メソッド・プロパティ)__  

- `init`

__インターフェイスプロトコル__  

- コンストラクタ

```js
/*
 * HoleMixin
 * a. ある値の保持
 * b. 検証関数に, 値の検証を委譲する
 * c. 通知関数に, 値の変更時における関連先への通知を委譲する
 * - この段階ではまだ本物のHole型は存在せず,「Holeっぽさ」を描写したHoleMixinのみが存在します
 * HoleMixin#setValue
 * - Hole型であると認定するために必要な状況のセットを提供します.
 */
var HoleMixin = function() {
  setValue: function(newValue) {
    var oldVal = this._value;
    this.validate(newValue);
    this._value = newValue;
    this.notify(oldVal, newValue);
    return this._value;
  }
};

/*
 * Hole
 */
var Hole = function(val) {
  Container.call(this, val);
};
```

#### Container の mixin プロトコル

__拡張プロトコル (mixin 拡張の際必須メソッド・プロパティ)__  

- `notify`
- `validate`


__インターフェイスプロトコル__  

- コンストラクタ
- `setValue`


```js
/*
 * Observer Mixin
 * ObserverMixin#watch
 * - 古い値と新しい値の2つの持つ関数funを引数にとり, _wathcer配列に追加し, watchersに格納された要素数を返します.
 * ObserverMixin#notify
 * - _watchers配列を走査して, 格納された関数を順番に呼び出していきます. そして最後に, 情報を送信した watcher の数を返します.
 */
var ObserverMixin = (function() {
  var _watchers = [];

  return {
    watch: function(fun) {
      _watchers.push(fun);
      return _.size(_watchers);
    },
    notify: function(oldVal, newVal) {
      _.each(_watchers, function(watcher){
        watcher.call(this, oldVal, newVal);
      });
      return _.size(_watchers);
    }
  }
}());
// watchメソッドの実行が失敗する場合に対処するコードを記述しておくことや, watcherを削除する機能を付与することもできます.
```

`ObserverMixin` でしようされているクロージャ `(function(){...}());` は, ` _watchers` オブジェクトをカプセル化してデータを隠蔽する一般的な方法で, `mixin` の状態を隠蔽する際にも最も好ましい手段として使われます. `282`  

```js
/*
 * Validate Mixin
 * ValidateMixin#addValidator
 * - 検証関数を設定する
 * ValidateMixin#init
 * - 有効な初期化ステップはコンテナの開始の値を検証する
 * ValidateMixin#validate
 * - 検証関数が設定されていればそれを実行する
 */

var ValidateMixin = {
  addValidator: function(fun) {
    this._validator = fun;
  },
  init: function(val) {
    this.validate(val);
  },
  validate: function(val) {
    if (existy(this._validator) && !this._validator(val)) {
      fail('不正な値を設定しようとしました:' + polyToString(val));
    }
  }
};
```

```js
_.extend(Hole.prototype
  , HoleMixin
  , ValidateMixin
  , ObserverMixin);
```

`Underscore` の `_.extend` 関数はターゲットオブジェクトを変更してしまうために少々癖があると言及しました. しかし, `mixin` 拡張の場合には, この動作こそがまさに必要とされているものです。 つまり, `_.extend` を使うことによって, すべてのメソッドを `Hole` プロトタイプにコピーできます.

```js
var h = new Hole(42);

h.addValidator(isEven);
// この新しいインスタンスは, 偶数のみを受け付けます.
h.setValue(9);
// Error: 不正な値を設定しようとしました.: 9

h.setValue(108);
//=> 108

h;
//=> {_validator: function isEven(n){...}, value: 108}

h.watch(function(){old, nu} {
  note([old, 'を', nu, 'に変更'].join(''));
});

h.setValue(42);
// 情報: 108を42に変更
//=> 42

h.watch(function(old, nu) {
  note(['veranderende', old, 'tot', nu].join(' '));
});
//=> 2

h.setValue(36);
// 情報: 42 を 36 に変更
// 情報: Veranderende 42 tot 36
//=> 36


### 9.2.5 `mixin` 拡張を使用した新しい仕組み

```js
var SwapMixin = {
  swap: function(fun /*, 任意の数の引数 */){
    var args = _.rest(arguments);
    var newValue = fun.apply(this, construct(this._value, args));

    return this.setValue(newValue);
  }
};
```

__拡張プロトコル__   

- `setValue`   
- `_value` (プロパティ)  

__インターフェイスプロトコル__  

- `swap`  

```js
var o = {_value: 0, setValue: _.identity };
_.extend(o, SwapMixin);
o.swap(construct, [1,2,3]);
//=> [0,1,2,3]
```

```js
var SnapshotMixin = function() {
  snapshot: function() {
    return deepClone(this._value);
  }
};

_.extend(Hole.prototype
  , HoleMixin
  , ValidateMixin
  , ObserverMixin
  , SwapMixin
  , SnapshotMixin);

// 新しいHoleインスタンスは拡張された動作を行う.

var h = new Hole(42);
h.snapshot();
//=> 42
h.swap(always(99));
//=> 99
h.snapshot();
//=> 99
```


### 9.2.6 `Mixin` の混ぜ込みによる新しい型

```js
var CAS = function(val){
  Hole.call(this, val);
};

var CASMixin = {
  swap: function(oldVal, f) {
    if (this._value === oldVal) {
      this.setValue(f(this._value));
      return this._value;
    } else {
      return undefined;
    }
  }
};

_.extend(CAS.prototype
  , HoleMixin
  , ValidateMixin
  , ObserverMixin
  , SwapMixin
  , CASMixin    // SwapMixinよりも後
  , SnapshotMixin);

var c = new CAS(42);

c.swap(42, always(-1));
c.snapshot();
//=> -1
c.swap('not the value', always(100000));
//=> undefined
c.snapshot();
//=> -1
```


### 9.2.7 メソッドは低レイヤーでの操作

```js
function contain() {
  return new Container(value);
}

contain(42);
//=> {_value: 42} (Container型ですが, 誰も気にしません)

function hole(val /*, 検証関数*/) {
  var h = new Hole();
  var v = _.toArray(arguments)[1];

  if (v) h.addValidator(v);
  h.setValue(v);
  v.setValue(val);
  return h;
}

var x = hole(42, always(false));
// Error: 不正な値を設定しようとしました : 42

var swap = invoker('swap', Hole.prototype.swap);

var x = hole(42);
swap(x, sqr);

function cas(val /*, 任意の数の引数 */) {
  var h = hole.apply(this, arguments);
  var c = new CAS(val);
  c._validator = h._validator;
  return c;
}

var compareAndSwap = invoker('swap', CAS.prototype.swap);

function snapshot(o) { return o.snapshot(); }
function addWatcher(o, fun) { o.watch(fun); }

var x = hole(42);

addWatcher(x, note);

swap(x, sqr);
// NOTE: 42 chapter01.js: 38
//=> 1764

var y = cas(9, isOdd);

compareAndSwap(y, 9, always(1));
//=> 1

snapshot(y);
//=> 1
```


## 9.3 `}).call('Finis');`
